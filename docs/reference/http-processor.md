---
id: http-processor
title: HTTP Processor
sidebar_label: HTTP Processor
sidebar_position: 6
---

The `DefaultGraphQLHttpProcessor<TSchema>` is mapped to a route for the target schema and accepts an `HttpContext` from the ASP.NET runtime. It inspects the received payload (the query text and variables) then packages an `IGraphOperationRequest` and sends it to the GraphQL runtime. Once a result is generated the controller forwards that response to the response writer for serialization.

## Extending the Http Processor

Extending the http processor allows you to add custom code and interject into a few places in the request processing flow. It most cases its easier to extend the default implementation than rolling your own or replacing the handler altogether.

First, extend from `DefaultGraphQLHttpProcessor<TSchema>` for your target schema. The processor is instantiated from your DI container on a "per request" basis. Any services referenced in your constructor will need to be servable from `IServiceProvider`. Those required by the default processor are automatically injected during the call to `AddGraphQL()`.

```csharp title="Create a Custom HTTP Processor"
public class MyHttpProcessor : DefaultGraphQLHttpProcessor<MySchema>
{
    public MyHttpProcessor(
            MySchema schema,
            ISchemaPipeline<MySchema, GraphQueryContext> queryPipeline,
            IGraphResponseWriter<MySchema> writer,
            IGraphQueryExecutionMetricsFactory<MySchema> metricsFactory,
            IGraphEventLogger logger = null)
        : base(schema, queryPipeline, writer, metricsFactory, logger)
    {
    }
}
```

Second, override the http processor reference in your `Startup.cs`:

```csharp title="Register Your Custom Processor"
services.AddGraphQL<MySchema>(options =>
{
    options.QueryHandler.HttpProcessorType = typeof(MyHttpProcessor);
});
```

That's all there is. Your processor will now serve requests for your schema.

## Helpful Methods

These methods can be overridden to provide custom logic at various points in the query operation.

### CreateRequest(queryData)

Override this method to supply your own `IGraphOperationRequest` to the runtime.

-   `queryData`: The raw data package read from the HttpContext

### HandleQueryException(exception)

Override this method to provide some custom processing to an unhandled exception. If this method returns an `IGraphOperationResult` it will be sent to the requestor, otherwise return null to allow a status 500 result to be generated.

It is exceedingly rare that this method will ever be called. The runtime will normally attach exceptions as messages to the graphql response. This method exists as a catch all _just in case_ something occurs beyond all expected constraints.

-   `exception`: The exception that was thrown and unhandled by the runtime.

### HandleQueryMetrics(metrics)

Override this method to perform some custom processing on a set of query metrics that were gathered for the executed query. This method will only be called if metrics were actually gathered.

-   `metrics`: the `IGraphQueryExecutionMetrics` package that was populated during the request.

### ExposeExceptions

Override this property to conditionally expose exceptions on the outgoing response. This can be useful to return true for users authorized as administrators yet hide the data from others.

### ExposeMetrics

Override this property to conditionally expose gathered metrics on the outgoing response.
