---
id: unit-testing
title: Unit Testing
sidebar_label: Unit Testing
sidebar_position: 1
---

<span className="pill">.NET 6+</span>
<br/>
<br/>

:::info
Your test projects must target .NET 6 or greater to use the test framework
:::

GraphQL ASP.NET has more than `3500 unit tests and 91% code coverage`. All the internal integration tests are powered by a framework designed to quickly build a configurable, fully mocked server instance to perform a query against the runtime. It may be helpful to use and extend the framework to test your own controllers.

This document explains how to perform some common test functions for your own controller methods.


## Install the Framework

Add a reference to the [Nuget Package](https://www.nuget.org/packages/GraphQL.AspNet.TestFramework) `GraphQL.AspNet.TestFramework` to your unit test project. The framework is just a class library and not dependent on any individual testing framework like NUnit or XUnit. However, it does mock some runtime only objects and, as a result, is dependent on [Moq](https://www.nuget.org/packages/Moq).

```powershell title="Install the Test Framework"
# Using the dotnet CLI
> dotnet add package GraphQL.AspNet.TestFramework

# Using Package Manager Console
> Install-Package GraphQL.AspNet.TestFramework
```



## Create a Test Server

1. Create a new instance of the `TestServerBuilder`. The builder takes in an optional set of flags to perform some auto configurations for common scenarios such as exposing exceptions or altering the casing of graph type names.
2. Configure your test scenario

    - Use `.User` to add any permissions to the mocked user account
    - Use `.Authorization` to add any security policy definitions if you wish to test security
    - Use `.AddGraphQL()` to mimic the functionality of schema configuration used when your application starts.
    - `TestServerBuilder` implements `IServiceCollection`. Add any additional mocked services as needed to ensure your controllers are wired up correctly by the runtime.

3. Build the server instance using `.Build()`

```csharp title="Configuring a Test Server Instance"
[Test]
public async Task MyController_InvocationTest()
{
    // Arrange
    var builder = new TestServerBuilder();
    builder.AddGraphQL(o => {
        o.AddController<MyController>();
    });

    // Act
    var server = builder.Build();

    // continued...
}

```

:::tip Custom Schemas
Use `TestServerBuild<TSchema>` to test against a custom defined schema instance.
:::

## Execute a Query

Follow these steps to execute a query against the runtime. If your controller is registered to the test server and the appropriate field is requested in the query, it will be invoked.

1. Create a builder to generate a mocked execution context (the object that the runtime acts on) using `.CreateQueryContextBuilder()`
2. Configure the query text, variables etc. on the builder.
3. Build the context and submit it for processing:
    - Use `server.ExecuteQuery()` to process the context. `context.Result` will be filled with the final `IQueryExecutionResult` which can be inspected for resultant data fields and error messages.
    - Use `server.RenderResult()` to generate the json string a client would recieve if they performed the query.


```csharp title="Executing a Test Query"
[Test]
public async Task MyController_InvocationTest()
{    
    // Arrange
    var builder = new TestServerBuilder();
    builder.AddGraphQL(o => {
        o.AddController<MyController>();
    });

    var server = builder.Build();
    var queryBuilder = server.CreateQueryContextBuilder();
    queryBuilder.AddQueryText("query { controller { actionMethod { property1 } } }");

    var queryContext = queryBuilder.Build();

    // Act
    var result = await server.RenderResult(queryContext);

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

## Other Test Scenarios

### Throwing Exceptions 
If you need to test that your controller throws an appropriate exception you can inspect the response object (instead of rendering a result). The exception will be attached to an error message generated during the query execution.

```csharp title="Testing for Thrown Exceptions"
[Test]
public async Task MyController_InvocationTest()
{    
    // Arrange
    var builder = new TestServerBuilder();
    builder.AddGraphQL(o => {
        o.AddController<MyController>();
    });

    var server = builder.Build();
    var queryBuilder = server.CreateQueryContextBuilder();
    queryBuilder.AddQueryText("query { controller { actionMethod { property1 } } }");

    var queryContext = queryBuilder.Build();

    // Act
    // Use ExecuteQuery instead of RenderResult to obtain the response object
    // highlight-next-line
    var result = await server.ExecuteQuery(queryContext);

    // Assert
    // ensure a message was captured
    Assert.IsNotNull(result);    
    Assert.AreEqual(1, result.Messages.Count);
    Assert.IsInstanceOf(typeof(MyException), result.Messages[0].Exception);
}
```

:::tip 
Use `server.ExecuteQuery` to obtain a reference to the response object. This allows you to interrogate the message data before its rendered as a json document.
:::


### Authn & Authz 

Test authentication and authorization scenarios by configuring both the policies the server should support and the claims or roles the user will present during the test.

```csharp
[Test]
public async Task WhenUserHasPolicy_ThenAllowExecution()
{    
    // Arrange
    var builder = new TestServerBuilder();
    builder.AddGraphQL(o => {
        o.AddController<MyController>();
    });

    // configure the policies the server will recognize
    // and the claims the user context will have.
    // This specific test assumes that the controller method 
    // defines an authorization requirement of "policy1".
    // highlight-start
    builder.Authorization.AddClaimPolicy("policy1", "myClaimType", "myClaimValue");
    builder.UserContext.AddUserClaim("myClaimType", "myClaimValue")
    // highlight-end

    var server = builder.Build();
    var queryBuilder = server.CreateQueryContextBuilder();
    queryBuilder.AddQueryText("query { controller { actionMethod { property1 } } }");

    var queryContext = queryBuilder.Build();

    // Act
    var result = await server.RenderResult(queryContext);

    // Assert
    // ....
}
```

The user context is always injected when you run a query on the test server. By default it is an anonymous user and credentials are applied when you add a claim or policy to the context during setup. 

## Demo project
See the [demos page](../reference/demo-projects.md) for a working demo using XUnit. 