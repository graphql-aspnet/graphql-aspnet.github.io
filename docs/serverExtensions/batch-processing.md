---
id: batch-processing
title: Batch Query Processing
sidebar_label: Batch Processing
sidebar_position: 1
---
<span className="pill">.NET 6+</span>

## GraphQL Multipart Request Specification
GraphQL ASP.NET provides built in support for batch query processing via an implementation of the [GraphQL Multipart Request Specification](https://github.com/jaydenseric/graphql-multipart-request-spec).

:::caution
This document covers how to submit a batch query that conforms to the above specification. It provides sample curl requests that would be accepted for the given sample code but does not explain in detail the various form fields required to complete a request. It is highly recommended to use a [supported client](https://github.com/jaydenseric/graphql-multipart-request-spec#client) when enabling this server extension.
:::

## Enable Batch Query Support

While batch query support is shipped as part of the main library it is disabled by default and must be explicitly enabled as an extension to each individual schema. 

```csharp title='Register the Server Extension'
// Startup Code
// other code omitted for brevity
services.AddGraphQL(options => {
    options.AddMultipartRequestSupport();
});
```


:::tip
Batch query processing and [file uploads](./file-uploads.md) are implemented as part of the same specification and therefore are encapsulated in the same extension.
:::

## Processing a Single Query
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

## Processing a Batch of Queries
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
## Batch Execution Order is Never Guaranteed
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