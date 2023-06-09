---
id: multipart-requests
title: Multipart Form Request Extension
sidebar_label: File Uploads & Batching
sidebar_position: 0
---

<span className="pill">.NET 6+</span>

## Multipart Request Specification
GraphQL ASP.NET provides built in support for batch query processing and file uploads via an implementation of the [GraphQL Multipart Request Specification](https://github.com/jaydenseric/graphql-multipart-request-spec).

This extension requires a minimum version of `v1.2.0` of the main library and you must target .NET 6 or later. This extension will not work with the .NET standard implementation.

:::info
This document covers how to submit a batch query and upload files that conform to the above specification. It provides sample curl requests that would be accepted for the given sample code but does not explain in detail the various form fields required to complete a request. It is highly recommended to use a [supported client](https://github.com/jaydenseric/graphql-multipart-request-spec#client) when enabling this server extension.
:::

## Enable The Extension

While the multipart form extension is shipped as part of the main library it is disabled by default and must be explicitly enabled on each schema. 

```csharp title='Register the Server Extension'
// Startup Code
// other code omitted for brevity
services.AddGraphQL(options => {
    options.AddMultipartRequestSupport();
});
```

## File Uploads
Files submitted on a post request are automatically routed to your controllers as a custom scalar. Out of the box, any .NET `IFormFile` and any form field not explicitly declared by the specification will be converted into a file scalar and can be mapped into your query's variables collection. 

### A Basic Controller

Files are received as a special C# class named `FileUpload`. Use it in your action methods like you would any other scalar (e.g. int, string etc.). Note that even though it is a class, as opposed to a primitative, GraphQL still handles it as a scalar; much in the same way `Uri` is also considered a scalar.

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

### Handling Arrays of Files

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

### File Uploads on Batched Queries
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

### FileUpload Scalar
The following properties on the `FileUpload` C# class can be useful:

* `FileName` - The name of the file that was uploaded. This property will be null if a non-file form field is referenced.
* `MapKey` - The key value used to place this file within a variable collection. This is usually the form field name on the multi-part request.
* `ContentType` -  The supplied `content-type` value sent with the file. This value will be null for non-file fields.
* `Headers` -  A collection of all the headers provided with the uploaded file. This value will be null for non-file fields.

### Opening a File Stream 
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

### Custom File Handling 
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

Take a look at the [default upload scalar value maker](https://github.com/graphql-aspnet/graphql-aspnet/blob/master/src/graphql-aspnet/ServerExtensions/MultipartRequests/Engine/TypeMakers/DefaultFileUploadScalarValueMaker.cs) for some helpful details when trying to implement your own.

### Timeouts and File Uploads

Be mindful of any query timeouts you have set for your schemas. ASP.NET may start processing your query before all the file contents are made available to the server as long as it has the initial POST request. This also means that your graphql queries may start executing before the file contents arrive.

While this asysncronicty usually works to your advantage, allowing your queries to begin processing before all the files are uploaded to the server; you may find that your queries pause on `.OpenFileStreamAsync()` waiting for the file stream to become available if there is a network delay or a large file being uploaded. If you have a [custom timeout](../reference/schema-configuration.md#querytimeout) configured for a schema, it may trigger while waiting for the file. Be sure to set your timeouts to a long enough period of time to avoid this scenario.


## Batch Queries

### Processing a Batch of Queries
Provide an "operations" form field that represents an array of graphql requests, the engine will automatically detect the array and return an array of responses in the same order as they were received. Each query is processed asyncronously and independently. 

```bash  title="Example Batch Query"
curl localhost:3000/graphql \
  #highlight-start
  -F operations='[
         { "query": "query { findUser(lastName: \"Smith\") {firstName lastName} }" },
         { "query": "query { findUser(lastName: \"Jones\") {firstName lastName} }" },
       ]' \
   # highlight-end
```

```json title="Example Json Serialized Response"
[
   {
        "data": {
            "findUser": {
                "firstName": "Baily",
                "lastName": "Smith"
            }
        }
   },
   {
        "data": {
            "findUser": {
                "firstName": "Caleb",
                "lastName": "Jones"
            }
        }
   }
]
```

### Processing a Single Query
Provide an "operations" form field that represents a single query and the engine will automatically detect and return a normal graphql response.

```bash  title="Example Batch Query"
curl localhost:3000/graphql \
  #highlight-next-line
  -F operations='{ "query": "query { findUser(lastName: \"Smith\") {firstName lastName} }" }' \
```

```json title="Example Json Serialized Response"
{
    "data": {
        "findUser": {
            "firstName": "Baily",
            "lastName": "Smith"
        }
    }
}
```

:::info
The extension is backwards compatible with standard graphql http request processing. If a request is recieved that is not a multi-part form POST request, normal graphql processing will occur.
:::

### Batch Execution Order is Never Guaranteed
While the order of the results is guaranteed to be the same order in which the queries were received, there is no guarantee that the queries are executed in any specific order. This means if you submit a batch of 5 requests, each requests may complete in a randomized order. If the same batch is submitted 3 times, its possible that the execution order will be different each time. 

For queries this is usally not an issue, but if you are batching mutations, make sure you don't have any unexpected dependencies or side effects between queries. If your controllers perform business logic against an existing object and that object is modified by more than of your mutations its highly possible that the state of the object may be unexpectedly modified in some executions but not in others. 

Take this controller and query:
```csharp title="Example Controller"
public class FileUploadController : GraphController
{
    [MutationRoot("addMoney")]
    // highlight-next-line
    public async Task<Item> AddMoney(int itemId, int dollarsToAdd)
    {
        var item =await _service.RetrieveItem(itemId);
        item.CurrentTotal += dollarsToAdd;

        await _service.UpdateItem(item);
        return item;
    }
}
```

```bash  title="Example Batch Query"
curl localhost:3000/graphql \
  #highlight-start
  -F operations='[
         { "query": "mutation { addMoney(itemId: 34, dollarsToAdd: 5) {id currentTotal} }" },
         { "query": "mutation { addThreeDollars(itemId: 34, , dollarsToAdd: 3) {id currentTotal} }" },
       ]' \
   # highlight-end
```

Assuming that the initial value of `currentTotal` was 0, all three of these responses are equally likely to occur depending on the order in which the execution engine decides to process the queries.
```json title=Sample Json Results
// When the queries are executed in declared order
[
    {
        "data": {
            "addMoney": {
                "id": 34,
                "currentTotal": 5
            }
        }
    },
    {
        "data": {
            "addMoney": {
                "id": 34,
                "currentTotal": 8
            }
        }
    },
]

// When the queries are executed in reverse order
[
    {
        "data": {
            "addMoney": {
                "id": 34,
                "currentTotal": 8
            }
        }
    },
    {
        "data": {
            "addMoney": {
                "id": 34,
                "currentTotal": 3
            }
        }
    },
]

// When the queries are executed simultaniously
// The final result updated to the datastore is unknown
[
    {
        "data": {
            "addMoney": {
                "id": 34,
                "currentTotal": 5
            }
        }
    },
    {
        "data": {
            "addMoney": {
                "id": 34,
                "currentTotal": 3
            }
        }
    },
]
```

Under the hood, the batch process will parse and submit all queries to the engine simultaniously and wait for them to finish before structuring a result object. 
:::caution
Ensure there are no dependencies between queries in a batch. An expected order of execution is never guaranteed.
:::


## Configuration
There are several configuration settings specific to extension. They can all be toggled when the extension is registered. Each configuration is specific 
to the targeted schema.

```csharp title='Configuring the Server Extension'
// Startup Code
// other code omitted for brevity
services.AddGraphQL(options => {
    // highlight-start
    options.AddMultipartRequestSupport(mpOptions => {
        // set mpOptions here
    });
    // highlight-end
});
```

### MapMode
```csharp
// usage example
mpOptions.MapMode = MultipartRequestMapHandlingMode.Default;
```

A bitwise flag enumeration allowing the inclusion of different types of values for the `map` field dictated by the specification. Both options are enabled by default.

| Option | Description |
| ------------- | ----------------- |
| `AllowStringPaths`       | When enabled, the short-hand syntax for `object-path`, which uses a dot-delimited string instead of an array to indicate a json path, is acceptable for a map value.  |
| `SplitDotDelimitedSingleElementArrays`       | When enabled, the extension will examine single element arrays and, if that element is a string, treat it as a string, allowing it to be split as a dot-delimited string if the option is enabled. When not enabled, single element arrays are treated as a single path value.  |

### RequestMode

```csharp
// usage example
mpOptions.RequestMode = MultipartRequestMode.Default;
```

A bitwise flag enumeration that controls which parts of the multi-part request extension are enabled. By default, both batch queries and file uploads are enabled.

| Option | Description |
| ------------- | ----------------- |
| `FileUploads`       | When enabled, the server extension will process file uploads. When disabled, any included files or form fields treated as files will cause the request to be rejected.  |
| `BatchQueries`       | When enabled, the extension will attempt to process properly formatted batch queries. When disabled, any attempt to submit a batch query will cause the request to be rejected.  |

### MaxFileCount

```csharp
// usage example
mpOptions.MaxFileCount = 15;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `null`       | `null`, number   |

When set, the extension will process, at most, the indicated amount of files. If more files appear on the request than the value indicated the request is automatically rejected. By default this value is set to `null` or no limit.

### MaxBlobCount

```csharp
// usage example
mpOptions.MaxBlobCount = 15;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `null`       | `null`, number   |

When set, the extension will process, at most, the indicated amount of additional, non-spec form fields (e.g. additional text blobs). If more blobs appear on the request than the value indicated the request is automatically rejected. By default this value is set to `null` or no limit.

### RegisterMultipartRequestHttpProcessor

```csharp
// usage example
mpOptions.RegisterMultipartRequestHttpProcessor = true;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `true`       | `true`, `false`   |

Determines if, when registering the extension, the default multipart http processor is registered. When set to true, the extension will attempt to replace any other registered http processor(i.e. the object that is handed an HttpContext via a route). When false, no processor is registered. You are expected to provide your own handling for multipart requests. The extension will always register its other required objects (the form parser, the custom scalar etc.).




### RequireMultipartRequestHttpProcessor

```csharp
// usage example
mpOptions.RequireMultipartRequestHttpProcessor = true;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `true`       | `true`, `false`   |

Determines if, when starting up the application, the extension will check that the required http processor is registered. When set to true, if the required processor is not registered a configuration exception will be thrown and the server will fail to start.  This can be helpful when registering multiple extensions to ensure that a valid processor is registered such that multipart-form requests will be handled correctly.

## Demo Project
See the [demo projects](../reference/demo-projects.md) for a sample project utilizing [jaydenseric's apollo-upload-client](https://github.com/jaydenseric/apollo-upload-client) as a front end for performing file uploads against this  extension.