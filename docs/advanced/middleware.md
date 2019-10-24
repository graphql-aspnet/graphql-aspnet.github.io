---
id: middleware
title: Pipelines and Custom Middleware
sidebar_label: Pipelines & Middleware
---

At the heart of GraphQL ASP.NET are 3 middleware pipelines; chains of components executed in a specific order to produce a result.

-   `Query Execution Pipeline` : Invoked once per request this pipeline is responsible for validating the incoming package on the POST request, parsing the data and executing a query plan.
-   `Field Execution Pipeline` : Invoked once per requested field, this pipeline attempts to generate the requested data by calling the various controller actions and property resolvers.
-   `Field Authorization Pipeline`: This pipeline can be invoked as part of query execution or field execution depending on your schema's configuration. It will perform field authorization checks for each field context.

## Creating New Middleware

Each new middleware component must implement one of the three middleware interfaces depending on the type of component you are creating; much in the way you'd define a filter or middleware component for ASP.NET MVC. The three middleware interfaces are:

-   `IQueryExecutionMiddleware`
-   `IFieldExecutionMiddleware`
-   `IFieldAuthorizationMiddleware`

The interfaces define one method, `InvokeAsync`, with identical signatures save for the type of data context accepted by each.

```csharp
// The Query Execution Middleware Component definition.
public interface IQueryExecutionMiddleware
{
    Task InvokeAsync(
        GraphQueryExecutionContext context,
        GraphMiddlewareInvocationDelegate next,
        CancellationToken cancelToken);
}
```

GraphQL ASP.NET will invoke your component at the appropriate time and pass to it the active data context. Once you have performed any necessary work involving the context invoke the `next` delegate (the second parameter)to pass the context to the next component in the chain.

```csharp
public class MyQueryMiddleware : IQueryExecutionMiddleware
{
    public async Task InvokeAsync(
        GraphQueryExecutionContext context,
        GraphMiddlewareInvocationDelegate next,
        CancellationToken cancelToken)
    {
        // Do any necessary work with the context
        if(context.Request.QueryText == null)
        {
            context.Messages.Critical("No Query Text Provided");
            context.Cancel();
        }

        // invoke the next component in the chain
        await next(context, cancelToken);
    }
}
```

## The Context Object

Each context object has specific data fields required for it to perform its work (detailed below). However, all contexts share a common set of items to govern the flow of work.

-   `Messages`: A collection of messages that will be added to the query result.
-   `Cancel()`: Marks the context as cancelled and sets the `IsCancelled` property to true. It is up to each middleware component to interpret the meaning of cancelled for its own purposes. A canceled field execution context, for instance, will be discarded and not rendered to the output whereas a canceled query context may or may not generate a result depending on when its cancelled.
-   `IsValid`: Determines if the context is in a valid and runnable state. Most middleware components will not attempt to process the component if its not in a valid state and will simply forward the request on. By default, a context is automatically invalidated if an error message is added in a `Critical` state.
-   `User`: The ClaimsPrincipal provided by ASP.NET containing the active user's credentials. May be null if user authentication is not setup for your application.
-   `Metrics`: The metrics package performing any profiling of the query. Various middleware components will stop/start phases of execution using this object. If metrics are not enabled this object will be null.
-   `Items`: A key/value pair collection of items. This field is user driven and not used by the runtime.
-   `Logger`: An `IGraphLogger` instance scoped to the the current query.

## Registering New Middleware

Each pipeline can be extended using the `SchemaBuilder` returned from calling `.AddGraphQL()` at startup. Each schema that is added to GraphQL will generate its own builder with its own set of pipelines and components. They can be configured independently as needed.

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // obtain a reference to the builder after adding
    // graphql for your schema
    var schemaBuilder = services.AddGraphQL(options =>
        {
            options.ExecutionOptions.MaxQueryDepth = 15;
        });

    // add new middleware components to any pipeline
    schemaBuilder.QueryExecutionPipeline.AddMiddleware<MyQueryMiddleware>();
}
```

Instead of adding to the end of the existing pipeline you can also call `.Clear()` to remove the default components and rebuild the pipeline from scratch. See below for the list of default middleware components and their order of execution. This can be handy when needing to inject a new component into the middle of the execution chain.

#### Middleware is served from the DI Container

Each pipeline is registered as a singleton instance in your service provider but the components within the pipeline are invoked according to the service lifetime you supply when you register them allowing you to setup dependencies as necessary.

> Register your middleware components with the `Singleton` lifetime scope whenever possible.

It is recommended that your middleware components be singleton in nature if possible. The field pipelines can be invoked many dozens (or hundreds) of times per request and fetching new middleware instances for each invocation could impact performance. The internal pipeline manager will retain references to any singleton middleware components once they are generated and avoid this bottleneck whenever possible. All default components are registered as a singletons.

## Query Execution Pipeline

The query execution pipeline is invoked once per request. It is supplied with the raw query text from the user and orchestrates the necessary calls to generate a a valid GraphQL result than can be returned to the client. It contains 9 components, in order of execution they are:

1. `ValidQueryRequestMiddleware` : Ensures that the data request recieved is valid and runnable (i.e. was a request provided, is query text defined etc.).
2. `RecordQueryMetricsMiddleware`: Governs the query profiling for the context. It will start the recording and terminate it after all other components have completed their operations.
3. `QueryPlanCacheMiddleware` : When the query cache is enabled for the schema this component will analyze the incoming query text and attempt to fetch a pre-cached query plan from storage.
4. `ParseQueryPlanMiddleware`: When required, this component will lex/parse the query text into a usable document from which a query plan can be created.
5. `GenerateQueryPlanMiddleware`: When required, this component will attempt to generate a fully qualified query plan for its target schema using a parsed document on the context.
6. `AssignQueryOperationMiddleware` : Marries the operation on the request with the operations in the active query plan and selects the appropriate one to be invoked.
7. `AuthorizeQueryOperationMiddleware`: If the schema is configured for `PerRequest` authorization this component will invoke the field authorization pipeline for each field of the selected operation that has security requirements and assign authorization results as appropriate.
8. `ExecuteQueryOperationMiddleware` : Uses the active operation and dispatches field execution contexts to resolve each field of the operation.
9. `PackageQueryResultMiddleware`: Performs a final set of checks on the resolved field data and generates an `IGraphOperationResult` for the query.

#### GraphQueryExecutionContext

In addition to the common properties defined above, the query execution context defines a number of useful fields:

```csharp
public class GraphQueryExecutionContext
{
    public IGraphOperationRequest Request { get; }
    public IGraphOperationResult Result { get; set; }
    public IGraphQueryPlan QueryPlan { get; set; }
    public IList<GraphDataItem> FieldResults { get; }

    // common properties omitted for brevity
}
```

-   `Request`: The raw request data received on the HTTP request. Provides access to the query text, requested operation and any passed variable data.
-   `Result`: The created `IGraphOperationResult`. This property will be null until the result is created.
-   `QueryPlan`: the created (or retrieved from cache) query plan for the current query.
-   `FieldResults`: The individual, top-level data fields resolved for the selected operation. These fields are eventually packaged into the result object.

## Field Execution Pipeline

The field execution pipeline is executed once for each field of data that needs to be resolved. Its primary job is to turn a request for a field into a data value that can be returned to the client. It contains 5 components, in order of execution they are:

1. `ValidateFieldExecutionMiddleware` : Validates that the context and required invocation data has been correctly supplied.
2. `AuthorizeFieldMiddleware` : If the schema is configured for `PerField` authorization this component will invoke the field authorization pipeline for the current field and assign authorization results as appropriate.
3. `InvokeDirectiveResolversMiddleware` : Any directives that were attached to the active field are executed and their results acted on accordingly.
4. `InvokeFieldResolverMiddleware` : The field resolver is called and a data value is created for the active context. This middleware component is ultimately responsible for invoking your controller actions.
5. `ProcessChildFieldsMiddleware` : If any child fields were registered with the invocation context for this field they are dispatched using the context's field result as the new source object.

#### GraphFieldExecutionContext

In addition to the common properties defined above the field execution context defines a number of useful properties:

```csharp
public class GraphFieldExecutionContext
{
    public IGraphFieldRequest Request { get; }
    public object Result { get; set; }

    // common properties omitted for brevity
}
```

-   `Request`: The field request containing any source data, a reference to the metadata for the field as defined by the schema and a reference to the invocation requirements determined by the query plan.
-   `Result`: The raw data object produced from the field resolver. This value is passed as the source value to any child fields.

## Field Authorization Pipeline

The field authorization pipeline can be invoked as part of query execution or field execution depending on your schema's configuration. It contains 1 component:

1. `FieldAuthorizationCheckMiddleware`: Inspects the active `ClaimsPrincipal` against the security requirements of the field on the context and generates a `FieldAuthorizationResult` indicating if the user is authorized or not. This component makes no decisions in regards to the authorization state. It is up to the other pipelines to act on the authorization results that are generated.

#### GraphFieldAuthorizationContext

In addition to the common properties defined above the field authorization context defines a number of useful properties:

```csharp
 public class GraphFieldAuthorizationContext
{
    public IGraphFieldAuthorizationRequest Request { get; }
    public FieldAuthorizationResult Result { get; set; }

    // common properties omitted for brevity
}
```

-   `Request`: Contains the field metadata for this context, including the security rules that need to be checked.
-   `Result`: The generated authorization result indicating if the user is authorized or unauthorized for the field. This result will contain additional detailed information as to why a request was not authorized. This information is automatically added to any generated log events.
