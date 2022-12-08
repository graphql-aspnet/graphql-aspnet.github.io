---
id: metrics
title: Profiling Your Queries
sidebar_label: Query Profiling
sidebar_position: 0
---

GraphQL ASP.NET tracks query metrics through the `IGraphQueryExecutionMetrics` interface attached to each query execution context as its processed by the runtime and allows for tracing and timing of individual fields as they are started and completed.

The metrics themselves enable 3 levels of tracing:

-   The start time and duration of a query as a whole.
-   The start time and duration of an arbitrary "phase" of the query.
-   The start and duration of an in individual field resolution.

Out of the box, the GraphQL ASP.NET implements the [Apollo Tracing](https://github.com/apollographql/apollo-tracing) specification for tracking query performance and uses three phases: `Parsing`, `Validation` and `Execution`.

> GraphQL ASP.NET implements the [Apollo Tracing](https://github.com/apollographql/apollo-tracing) format for capturing query profile information.

#### A sample query profile, serialized to json

Query metrics are appended to the `extensions` node of the standard query response. This query of 3 fields will generate a `tracing` object similar to this:

```graphql title="Sample Query"
{
  hero(episode: EMPIRE) {
    id
    name
    __typename
  }
}
```

```json title="Profile Results"
{
  // data and error nodes omitted
  "extensions": {
  "tracing": {
    "version": 1,
    "startTime": "2019-09-29T18:21:35.903+00:00",
    "endTime": "2019-09-29T18:21:35.904+00:00",
    "duration": 4862,
    "execution": {
      "resolvers": [
        {
          "path": [
            "hero"
          ],
          "parentType": "Query",
          "fieldName": "hero",
          "returnType": "Character!",
          "startOffset": 78200,
          "duration": 140500
        },
        {
          "path": [
            "hero",
            "id"
          ],
          "parentType": "Human",
          "fieldName": "id",
          "returnType": "ID!",
          "startOffset": 297900,
          "duration": 24100
        },
        {
          "path": [
            "hero",
            "name"
          ],
          "parentType": "Human",
          "fieldName": "name",
          "returnType": "String",
          "startOffset": 352100,
          "duration": 18200
        },
        {
          "path": [
            "hero",
            "__typename"
          ],
          "parentType": "Human",
          "fieldName": "__typename",
          "returnType": "String!",
          "startOffset": 404300,
          "duration": 18400
        }
      ]
    }
  }
}
```

## Enable Query Profiling

Metrics can be turned on for all requests during configuration in `Startup.cs`:

```csharp title="Enable Metrics at Startup"
services.AddGraphQL(options =>
{
    options.ExecutionOptions.EnableMetrics = true;
});
```

If you choose to override the default processor that accepts HTTP requests you can also enable metrics on a "per request" basis by overriding the `EnableMetrics` property and/or the `CreateRequest()` method to handle any conditional logic. See the section on the [`GraphQL Http Processor`](../reference/http-processor) for more details.

## Delivering Profiling Results

Options to profile a query vs. sending the results to a requestor are separate flags. Since the metrics package is attached to the query's primary context the results can be easily captured either by overriding the default http processor or in the event logger (during the `Request Completed` event) and perform an operation without sending them to the requestor. This allows you to perform silent profiling when necessary and can be a useful tool for random sampling and quality control in many scenarios.

To enable delivery of the metrics results to the requestor, set the appropriate schema configuration property at startup:

```csharp title="Expose Metrics at Startup"
services.AddGraphQL(options =>
{
    options.ResponseOptions.ExposeMetrics = true;
});
```

As with enabling metrics, additional control can be gained by overriding `HandleQueryMetrics()` on the http processor.

## Performance Costs

Just as with [logging](../logging/structured-logging), profiling your queries to this level of detail is not free. There is a performance cost that increases as your queries get larger. Care should be taken on deciding when to enable query profiling. It is recommended to keep profiling turned off in production during normal use.

## Implementing a Custom Profiling Scheme

Customizing the way metrics are captured is not a trivial task but can be done:

1.  Implement `IGraphQueryExecutionMetricsFactory<TSchema>` and register it to your DI container before calling `.AddGraphQL()`. This will override the internal factory and use your implementation to generate metrics packages for any received requests.
2.  Implement `IGraphQueryExecutionMetrics` and have your factory return transient instances of this class when requested.

The runtime will now send metrics events to your objects and you can proceed with handling the data. However, the default pipeline structure is still only going to deliver 3 named phases to your metrics package (Parsing, Validation, Execution). If you want to alter the phase sequence or add new ones, you'll need to implement your own core pipeline components, which is beyond the scope of this documentation.