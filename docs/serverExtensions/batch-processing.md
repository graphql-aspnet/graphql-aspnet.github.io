---
id: batch-processing
title: Batch Query Processing
sidebar_label: Batch Processing
sidebar_position: 1
---

## GraphQL Multipart Request Specification
GraphQL ASP.NET provides built in support for batch query processing via an implementation of the `GraphQL Multipart Request Specification`.  You can read the specification [here](https://github.com/jaydenseric/graphql-multipart-request-spec) if you are interested in the details.

## Enable Batch Query Support

While batch query support is shipped as part of the main library it is disabled by default and must be explicitly enabled as an extension to each individual schema. 

```csharp title='Register the Server Extension'
// Startup Code
// other code omitted for brevity
services.AddGraphQL(options => {
    options.RegisterExtension<MultipartRequestServerExtension>();
});
```


:::note
Batch query processing and [file uploads](./file-uploads.md) are implemented as part of the same specification and therefore are encapsulated in the same extension.
:::