---
id: file-uploads
title: File Uploads
sidebar_label: File Uploads
sidebar_position: 0
---

## GraphQL Multipart Request Specification
GraphQL ASP.NET provides built in support for file uploads via an implementation of the `GraphQL Multipart Request Specification`.  You can read the 
specification [here](https://github.com/jaydenseric/graphql-multipart-request-spec) if you are interested in the details.

:::caution
This document covers how to setup a controller to accept files from an http request that conforms to the above specification. It provides sample curl requests that would be accepted for the given sample code but does not explain in detail the various form fields required to complete a request. It is highly recommended to use a [supported client](https://github.com/jaydenseric/graphql-multipart-request-spec#client) when enabling this server extension.
:::

## Enable File Upload Support

While file upload support is shipped as part of the main library it is disabled by default and must be explicitly enabled as an extension to each individual schema. 

```csharp title='Register the Server Extension'
// Startup Code
// other code omitted for brevity
services.AddGraphQL(options => {
    options.RegisterExtension<MultipartRequestServerExtension>();
});
```

:::tip
File uploads and [batch query processing](./batch-processing.md) are implemented as part of the same specification and are encapsulated in the same extension.
:::


## A Basic Controller

Files are received as a special scalar type `GraphQL.AspNet.ServerExtensions.MultipartRequests.FileUpload`. Add a reference in your controller to this 
scalar like you would any other scalar.

```csharp title=ExampleFile Upload Controller
using GraphQL.AspNet.ServerExtensions.MultipartRequests;

public class FileUploadController : GraphController
{
    [MutationRoot("singleFileUpload")]
    // highlight-next-line
    public async Task<int> UploadFile(FileUpload fileRef)
    {
        var stream = await fileRef.OpenFileAsync();
        // do something with the file stream

        return 0;
    }
}
```

The scalar is presented to a query as the type `Upload` as defined in the specification. Be sure to declare your variables as `Upload` type to indicate an uploaded file.

```bash  title="Sample Query"
curl localhost:3000/graphql \
  # highlight-next-line
  -F operations='{ "query": "mutation ($file: Upload) { singleFileUpload(file: $file) }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables", "file"] }' \
  -F 0=@a.txt
```

## Handling Arrays of Files

Arrays of files work just like any other list in GraphQL. When declaring the map variable for the multi-part request, be sure 
to indicate which index you are mapping the file to. The extension will not magically append files to an array. Each mapped file must explicitly declare the element index in an array where it is being placed.

```csharp title=ExampleFile Upload Controller
using GraphQL.AspNet.ServerExtensions.MultipartRequests;

public class FileUploadController : GraphController
{
    [MutationRoot("multiFileUpload")]
    // highlight-next-line
    public async Task<int> UploadFile(IList<FileUpload> files)
    {
        foreach(var file in files)
        {
           using var stream = await fileRef.OpenFileAsync();
           // do something with each file stream
        }

        return 0;
    }
}
```

```bash  title="Sample Query"
curl localhost:3000/graphql \
  -F operations='{ "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }", "variables": { "files": [null, null] } }' \
  # highlight-next-line
  -F map='{ "firstFile": ["variables", "files", 0], "secondFile": ["variables", "files", 1] }' \
  -F firstFile=@a.txt
  -F secondFile=@b.txt
```

:::info
The server extension will only replace existing `null` values in an array declared on a variable collection. It will NOT attempt to arbitrarily add files to an empty or null array. 

Notice in the above curl command that the `files` variable is declared as an array with two elements and that the `map` field 
points to each of those indexed elements.
:::

### Handling an Unknown Number of Files
There are scenarios where you may ask your users to select a few files to upload without knowing how many they might choose. Some tools may be able to smartly determine the number of files and ensure the target array is declared correctly. However, you can always declare an array with more elements than you need. Those not supplied will be set to null.

```bash  title="Sample Query"

# Only two files are supplied, but we've declared room for 6. File indexes 2-6 will be null 
# when the list appears in your controller
curl localhost:3000/graphql \
  -F operations='{ 
                   "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }",  
                   # highlight-next-line
                   "variables": { "files": [null, null, null, null, null, null] } }' \
  -F map='{ "firstFile": ["variables", "files", 0], "secondFile": ["variables", "files", 1] }' \
  -F firstFile=@a.txt
  -F secondFile=@b.txt
```


## File Uploads on Batched Queries
File uploads work in conjunction with batched queries. When processing a multi-part request as a batch, prefix each of the mapped object-path references with an index of the batch you want the file to apply to. As you might guess this is usually handled by a supported client automatically.

```bash  title="Sample Query"
curl localhost:3000/graphql \
  -F operations='[
         { "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }", "variables": { "files": [null, null] } },
         { "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }", "variables": { "files": [null, null] } },
       ]' \
   # highlight-next-line
  -F map='{ "firstFile": [0, "variables", "files", 0], "secondFile": [1, "variables", "files", 0] }' \
  -F firstFile=@a.txt
  -F secondFile=@b.txt
```

## The FileUpload Scalar
The following properties on the `FileUpload` scalar can be useful:

* `FileName` - The name of the file that was uploaded. This property will be null if a non-file form field is referenced
* `MapKey` - The key value used to place this file within a variable collection. This is usually the form field name on the multi-part request.
* `ContentType` -  The supplied `content-type` value sent with the file. This value will be null for non-file fields.
* `Headers` -  A collection of all the headers provided with the uploaded file. This value will be null for non-file fields.

## Opening a File Stream 
When opening a file stream you need to call await a call `FileUpload.OpenFileAsync()`. This method is an abstraction on top of an internal wrapper that standardizes file streams across all implementions (see below for implementing your own file processor).  When working with the standard `IFormFile` interface provided by ASP.NET this call is a simple wrapper for `IFormFile.OpenReadStream()`. 

```csharp title=ExampleFile Upload Controller
using GraphQL.AspNet.ServerExtensions.MultipartRequests;

public class FileUploadController : GraphController
{
    [MutationRoot("singleFileUpload")]
    public async Task<int> UploadFile(FileUpload fileRef)
    {
        // do something with the file stream
        // it is your responsibility to close it
        // highlight-next-line
        var stream = await fileRef.OpenFileAsync();        

        return 0;
    }
}
```

## Custom File Handling 
By default, this extension just splits the request on an `HttpContext` and presents the different parts to the query engine at different times in a manner it expects. This means that any uploaded files are delt under the hood with as `IFormFile` references. While this is likely fine for most users, it can be troublesome with regard to timeouts and large file requests. Also, there may be scenarios where you want to save off files prior to executing a query. Perhaps you'll need to process the file stream multiple times? There are a number of niche cases where working through the raw `IFormFile` is not sufficient. 

You can implement and register your own `IFileUploadScalarValueMaker` to add custom processing logic for each file or blob BEFORE graphql gets ahold of it. For instance, some users may want to write incoming files to local disk or cloud storage and present GraphQL with a stream that points to that local reference, rather than the file reference on the raw request.

```csharp
 public interface IFileUploadScalarValueMaker
{
    // This overload is used when processing traditional files received as part of a 
    // multi-part form through ASP.NET's HttpContext
    Task<FileUpload> CreateFileScalar(IFormFile aspNetFile);

    // This overload is used when processing data received on a 
    // multi-part form field rather than as a formal file upload.
    Task<FileUpload> CreateFileScalar(string mapKey, byte[] blobData);
}
```


```csharp title="Register Your Custom Value Maker"
// startup code

// register your value maker BEFORE calling .AddGraphQL
services.AddSingleton<IFileUploadScalarValueMaker, MyFileUploadScalarValueMaker>();

services.AddGraphQL(options => {
    options.RegisterExtension<MultipartRequestServerExtension>();
});
```

:::tip
You can inherit from `FileUpload` any extend it as needed.
:::

Take a look at the [default upload scalar value maker]("http://google.com") for some helpful details when trying to implement your own.

