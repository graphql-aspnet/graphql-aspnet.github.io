---
id: unit-testing
title: Unit Testing
sidebar_label: Unit Testing
---

GraphQL ASP.NET has more than `1700 unit tests and 91% code coverage` of the library proper. Much of this is powered by a test component designed to quickly build a configurable, fully mocked server instance to perform a query. It may be helpful to download the code and extend it for harnessing your own controllers.

The `TestServerBuilder<TSchema>` can be found in the `graphql-aspnet-testframework` project of the primary repo and is dependent on `Moq`. As its part of the core library solution you'll want to remove the project reference to `graphql-aspnet` project and instead add a reference to the nuget package.

This document explains how to perform some common test functions for your own controller methods.

## Create a Test Server

1. Create a new instance of the `TestServerBuilder`. The builder takes in a set of flags to perform some auto configurations for common scenarios such as exposing exceptions or altering the casing of graph type names.
2. Add Your Test Objects

    - Use `.User` to add any permissions to the mocked user account
    - Use `.Authorization` to add any security policy definitions if you wish to test security
    - Use `.AddGraphQL()` to mimic the functionality of schema configuration used when your application starts.
    - Use `.AddGraphType<TType>()` to quickly add any controllers or graph types you wish to test in this run.
    - The `TestServerBuilder` inherits from `ServiceCollection`, add any additional mocked services as needed to ensure your controllers are wired up correctly by the runtime.

3. Build the server instance using `.Build()`

```csharp
// using NUnit syntax
[Test]
public async Task MyController_InvocationTest()
{
    var builder = new TestServerBuilder();
    builder.AddGraphQL(o => {
        o.AddGraphType<MyController>();
    });

    var server = builder.Build();
    //...
}

```

## Execute a Query

1. Mock the query execution context (the object that the runtime acts on) using `.CreateQueryContextBuilder()`
2. Configure the text, variables etc. on the builder.
3. Build the context and submit it for processing
    - Use `ExecuteQuery` to process the context. The `.Result` property will be filled with the final `IGraphOperationResult` which can be inspected.
    - Use `RenderResult` to generate a json string of the completed data package.

```csharp
// using NUnit syntax
[Test]
public async Task MyController_InvocationTest()
{
    // ...
    var server = builder.Build();
    var contextBuilder = server.CreateQueryContextBuilder();
    contextBuilder.AddQueryText("query { controller { actionMethod { property1 } } }");

    var context = contextBuilder.Build();
    var result = await server.RenderResult(context);

    /* result contains the string for:
    {
        "data" : {
            "controller": {
                "actionMethod" : {
                    "property1" : "value1"
                }
            }
        }
    }
    */
}

```
