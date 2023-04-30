---
id: file-uploads
title: File Uploads
sidebar_label: File Uploads
sidebar_position: 0
---
<span className="pill">.NET 6+</span>

## GraphQL Multipart Request Specification
GraphQL ASP.NET provides built in support for file uploads via an implementation of the [GraphQL Multipart Request Specification](https://github.com/jaydenseric/graphql-multipart-request-spec).

:::caution
This document covers how to setup a controller to accept files from an http request that conforms to the above specification. It provides sample curl requests that would be accepted for the given sample code but does not explain in detail the various form fields required to complete a request. It is highly recommended to use a [supported client](https://github.com/jaydenseric/graphql-multipart-request-spec#client) when enabling this server extension.
:::

## Enable File Upload Support

While file upload support is shipped as part of the main library it is disabled by default and must be explicitly enabled as an extension to each schema. 

```csharp title='Register the Server Extension'
// Startup Code
// other code omitted for brevity
services.AddGraphQL(options => {
    options.AddMultipartRequestSupport();
});
```

:::tip
File uploads and [batch query processing](./batch-processing.md) are implemented as part of the same specification and are encapsulated in the same "multi-part request" extension.
:::


## A Basic Controller

Files are received as a special C# class named `FileUpload`. Add a reference in your controller to this 
scalar like you would any other scalar.

<span style={{"color": "red"}}>Warning: Be sure to dispose of the file stream when you are finished with it.</span>
<br/>
<br/>

```csharp title=ExampleFile Upload Controller
public class FileUploadController : GraphController
{
    [MutationRoot("singleFileUpload")]
    // highlight-next-line
    public async Task<int> UploadFile(FileUpload fileRef)
    {
        using var stream = await fileRef.OpenFileAsync();
        // do something with the file stream

        return 0;
    }
}
```

The scalar in your schema is named `Upload` per the specification. Be sure to declare your graphql variables as an `Upload` type to indicate an uploaded file.

```graphql title="Use the Upload graph type for variables"
mutation ($file: Upload) { 
    singleFileUpload(file: $file) 
}
```

```bash  title="Sample curl Query"
curl localhost:3000/graphql \
  # highlight-next-line
  -F operations='{ "query": "mutation ($file: Upload) { singleFileUpload(file: $file) }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@a.txt
```

## Handling Arrays of Files

Arrays of files work just like any other list in GraphQL. When declaring the map variable for the multi-part request, be sure 
to indicate which index you are mapping the file to. The extension will not magically append files to an array. Each mapped file must explicitly declare the element index in an array where it is being placed.

<span style={{"color": "red"}}>Warning: Be sure to dispose of each file stream when you are finished with it.</span>
<br/>
<br/>

```csharp title="Example File Upload Controller"
using GraphQL.AspNet.ServerExtensions.MultipartRequests;

public class FileUploadController : GraphController
{
    [MutationRoot("multiFileUpload")]
    // highlight-next-line
    public async Task<int> UploadFile(IEnumerable<FileUpload> files)
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

```graphql title="Declaring a list of files on a graphql query"
# highlight-next-line
mutation ($files: [Upload]) { 
    multiFileUpload(file: $files) 
}
```

```bash  title="Sample Curl"
curl localhost:3000/graphql \
# highlight-next-line
  -F operations='{ "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }", "variables": { "files": [null, null] } }' \  
  -F map='{ "firstFile": ["variables", "files", 0], "secondFile": ["variables", "files", 1] }' \
  -F firstFile=@a.txt
  -F secondFile=@b.txt
```

### Handling an Unknown Number of Files
There are scenarios where you may ask your users to select a few files to upload without knowing how many they might choose. As long each declaration in your `map` field points to a position that _could be_ a valid index, the target array will be resized accordingly. 

```bash  title="Adding Two Files"
curl localhost:3000/graphql \
  -F operations='{ 
                   "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }",  
                   # highlight-next-line
                   "variables": { "files": [] } }' \
  -F map='{ "firstFile": ["variables", "files", 0], "secondFile": ["variables", "files", 1] }' \
  -F firstFile=@a.txt
  -F secondFile=@b.txt
```


In the above example, the `files` array will be automatically expanded to include indexes 0 and 1 as requested by the `map`:

```json title="Resultant Operations Object"
{
    "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }",  
    "variables": { "files": [<firstFile>, <secondFile>] }
}
```

### Skipping Array Indexes 
If you skip any indexes in your `map` declaration, the target array will be expanded to to include the out of sequence index. This can produce null values in your array and result in an error if your variable declaration does not allow nulls.

```bash  title="Adding One File To Index 5"
# Only one file is supplied but its mapped to index 5
# the final array at 'variables.files` will be 6 elements long with 5 null elements.
curl localhost:3000/graphql \
  -F operations='{ 
                   "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }",  
                   # highlight-next-line
                   "variables": { "files": [] } }' \
  # highlight-next-line
  -F map='{ "firstFile": ["variables", "files", 5] }' \
  -F firstFile=@a.txt
```

```json title="Resultant Operations Object"
{
    "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }",  
    // highlight-next-line
    "variables": { "files": [null, null, null, null, null, <firstFile>] }
}
```

## File Uploads on Batched Queries
File uploads work in conjunction with batched queries. When processing a multi-part request as a batch, prefix each of the mapped object-path references with an index of the batch you want the file to apply to. As you might guess this is usually handled by a supported client automatically.

```bash  title="Sample Query"
curl localhost:3000/graphql \
  -F operations='[
         { "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }", "variables": { "files": [] } },
         { "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }", "variables": { "files": [] } },
       ]' \
   # highlight-next-line
  -F map='{ "firstFile": [0, "variables", "files", 0], "secondFile": [1, "variables", "files", 0] }' \
  -F firstFile=@a.txt
  -F secondFile=@b.txt
```

## The FileUpload Scalar
The following properties on the `FileUpload` C# class can be useful:

* `FileName` - The name of the file that was uploaded. This property will be null if a non-file form field is referenced.
* `MapKey` - The key value used to place this file within a variable collection. This is usually the form field name on the multi-part request.
* `ContentType` -  The supplied `content-type` value sent with the file. This value will be null for non-file fields.
* `Headers` -  A collection of all the headers provided with the uploaded file. This value will be null for non-file fields.

## Opening a File Stream 
When opening a file stream you need to await a call `FileUpload.OpenFileAsync()`. This method is an abstraction on top of an internal wrapper that standardizes file streams across all implementions (see below for implementing your own file processor).  When working with the standard `IFormFile` interface provided by ASP.NET this call is a simple wrapper for `IFormFile.OpenReadStream()`. 

```csharp title=ExampleFile Upload Controller
using GraphQL.AspNet.ServerExtensions.MultipartRequests;

public class FileUploadController : GraphController
{
    [MutationRoot("singleFileUpload")]
    public async Task<int> UploadFile(FileUpload fileRef)
    {
        // do something with the file stream
        // it is your responsibility to close and dispose of it
        // highlight-next-line
        using var stream = await fileRef.OpenFileStreamAsync();        

        return 0;
    }
}
```

## Custom File Handling 
By default, this extension splits the POST request on an `HttpContext` and presents the different parts to the query engine in a manner it expects. This means that any uploaded files are consumed under the hood as ASP.NET's built in `IFormFile` interface. While this is fine for most users, it can be troublesome with regard to timeouts and large file requests. Also, there may be scenarios where you want to save off files prior to executing a query or perhaps you'll need to process the file stream multiple times. 

You can implement and register your own `IFileUploadScalarValueMaker` to add custom processing logic for each file or blob BEFORE graphql gets ahold of it. For instance, some users may want to write incoming files to local disk or cloud storage and present GraphQL with a stream that points to that local reference, rather than the file reference on the http request.

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
// other startup code omitted

// register your scalar value maker BEFORE calling .AddGraphQL
services.AddSingleton<IFileUploadScalarValueMaker, MyFileUploadScalarValueMaker>();

services.AddGraphQL(options => {
    options.AddMultipartRequestSupport();
});
```

:::tip
You can inherit from `FileUpload` and extend it as needed on your custom maker. However, be sure to declare your method parameters as `FileUpload` in your controllers so that GraphQL knows what scalar you are requesting.
:::

Take a look at the [default upload scalar value maker](https://google.com) for some helpful details when trying to implement your own.

## Timeouts and File Uploads

Be mindful of any query timeouts you have set for your schemas. ASP.NET may start processing your query before all the file contents are made available to the server as long as it has the initial POST request. This also means that your graphql queries may start executing before the file contents arrive.

While this asysncronicty usually works to your advantage, allowing your queries to begin processing before all the files are uploaded to the server; you may find that your queries pause on `.OpenFileStreamAsync()` waiting for the file stream to become available if there is a network delay or a large file being uploaded. If you have a [custom timeout](../reference/schema-configuration.md#querytimeout) configured for a schema, it may trigger while waiting for the file. Be sure to set your timeouts to a long enough period of time to avoid this scenario.