---
id: subscriptions
title: Subscriptions
sidebar_label: Subscriptions
---

## Initial Setup

Successfully handling subscriptions in your GraphQL AspNet server can be straight forward for single server environments or very complicated for multi-server and scalable solutions. First we'll look at adding subscriptions for a single server.

### Install the Subscriptions Package

The first step to using subscriptions is to install the subscription server package.

```Powershell
 PS> Install-Package GraphQL.AspNet.Subscriptions -AllowPrereleaseVersions
```

This adds the necessary components to create a subscription server for a given schema such as communicating with web sockets, parsing subscription queries and responding to events.

### Configure the Server Instance

You must configure web socket support for your Asp.Net server instance separately. The ways in which you perform this configuration will vary widely depending on your needs. CORS requirements, keep-alive support etc. will be different for each scenario.

After web sockets are added to your server, add subscription support to the graphql registration.

```C#
// startup.cs

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddWebSockets(/*...*/);

        services.AddGraphQL()
                .AddSubscriptions();
    }

    public void Configure(IApplicationBuilder app)
    {
        // other required data not shown for brevity
        app.UseWebSockets();

        app.UseGraphQL();
    }
```

> Don't forget to add `UseWebsockets` in the `Configure` method of startup.cs

### Create a Subscription

Declaring a subscription is the same as declaring a query or mutation on a controller but with `[Subscription]` and `[SubscriptionRoot]` attributes.

```C#
public class SubscriptionController : GraphController
{
    // other code not shown for brevity
    // EventName will default to the subscription field name
    // if not supplied
    [SubscriptionRoot("onWidgetChanged", typeof(Widget), EventName = "WIDGET_CHANGED")]
    public IGraphActionResult  OnWidgetChanged(Widget eventData, string filter){
        if(eventData.Name.StartsWith(filter))
            return this.Ok(eventData);
        return this.Ok();
    }
}
```

> Subscriptions can be asyncronous and return a Task&lt;IGraphActionResult&gt; as well.

Here we've declared a new subscription the server will respond to, one that takes in a `filter` parameter to restrict the data that any subscribers receive.

A query to invoke this subscription may look like this:

```javascript
subscription {
    onWidgetChanged(filter: "Big"){
        id
        name
        description
    }
}
```

Any updated widgets that start with the phrase "Big" will then be sent to the requestor as they are changed on the server.

### Publish a Subscription Event

In order for the subscription server to send data to any subscribers it has to be notified when something changes. It does this via named Subscription Events. These are internal, unique keys that identify when something happened, usually via a mutation. Once the mutation publishes an event, the subscription server will inspect the published data and, assuming the data type matches the expected data for the subscription, it will execute the subscription method for any connected subscribers and deliver the results as necessary.

```C#
public class MutationController : GraphController
{
    // other code not shown for brevity

    [MutationRoot("updateWidget", typeof(Widget))]
    public async Task<IGraphActionResult> OnWidgetChanged(int id, string name){
        var widget = _service.RetrieveWidget(id);
        widget.Name = name;

        await _service.UpdateWidget(widget);

        // publish a new event to let any subscribers know
        // something changed
        this.PublishSubscriptionEvent("WIDGET_CHANGED", widget);
        return this.Ok(widget);
    }
}
```

> Notice that the event name used in `PublishSubscriptionEvent` is the same as the `EventName` property on the `[SubscriptionRoot]` attribute. The subscription server will use the published event name to match which registered subscriptions need to receive the data being published.

### Subscription Event Data Source

In the example above, the data sent with `PublishSubscriptionEvent` is the same as the first input parameter called `eventData` on the subscription field, which is the same as the field return type of the controller method. By default, graphql will look for a parameter with the same data type as its field return type and use that as the event data source. It will automatically populate this field with the data from `PublishSubscriptionEvent` and this field is not exposed in the object graph.

You can explicitly flag a different parameter, or a parameter of a different data type to be the expected event source with the `[SubscriptionSource]` attribute.

```C#
public class SubscriptionController : GraphController
{
    // other code not shown for brevity
    // EventName will default to the subscription field name
    // if not supplied
    [SubscriptionRoot("onWidgetChanged", typeof(Widget), EventName = "WIDGET_CHANGED")]
    public IGraphActionResult  OnWidgetChanged(
        [SubscriptionSource] WidgetInternal eventData,
        string filter)
    {
        if(eventData.Name.StartsWith(filter))
            return this.Ok(eventData.ToWidget());
        return this.Ok();
    }
}
```

Here the subscription expects that an event is published using a `WidgetInternal` data type that it will internally convert to a `Widget` and send to any subscribers. This can be useful if you wish to share internal objects between your mutations and subscriptions that you don't want publicly exposed.

> The data object published with `PublishSubscriptionEvent` must have the same type the `[SubscriptionSource]` on the subscription field.

### Summary

That's all there is for a basic subscription server setup.

1. Add the package reference and update startup.cs
2. Create a new subscription using `[Subscription]` or `[SubscriptionRoot]`
3. Publish an event from a mutation

### React w/ Apollo Client Example

A complete example of single instance subscription server including a react app that utilizes the Apollo Client is available in the [demo projects](../reference/demo-projects) section.

## Scaling Subscription Servers

Using web sockets has a natural limitation in that any each server instance has a maximum number of socket connections that it can handle. Once that limit is reached no additional clients can register subscriptions.

Ok no problem, just scale horizontally, spin up additional ASP.NET server instances, add a load balancer and have the new requests open a web socket connection to these additional server instances, right? Not so fast.

With the examples above events published by any mutation using `PublishSubscriptionEvent` are routed internally directly to the local subscription server meaning only those clients connected to the server where the event was raised will receive it. Clients connected to other server instances will never know an event was raised. This represents a big problem for large scale websites, so what do we do?

### Custom Event Publishing

Instead of publishing events internally, within the server instance, we need to publish our events to some intermediate source such that any server can be notified of the change. There are a variety of technologies to handle this scenario; be it a common database or messaging technologies like RabbitMQ, Azure Service Bus etc.

#### Implement `ISubscriptionEventPublisher`

Whatever your technology of choice the first step is to create and register a custom publisher. How your individual class functions will vary widely depending on your implementation.

```C#
    public interface ISubscriptionEventPublisher
    {
        /// <summary>
        /// Publishs a new subscription event to be acted on.
        /// </summary>
        /// <param name="eventData">The event to publish.</param>
        /// <returns>Task.</returns>
        Task PublishEvent(SubscriptionEvent event);
    }
```

Register your publisher with the DI container BEFORE calling `.AddGraphQL()`

```C#
// startup.cs

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<ISubscriptionEventPublisher, MyEventPublisher>();

        // other code omitted for brevity

        services.AddGraphQL()
                .AddSubscriptions();
    }
```

> GraphQL ASP.NET will use your registered publisher instead of its default, internal publisher.

Publishing your SubscriptionEvents externally is not trivial. You'll have to deal with concerns like data serialization, package size etc..

### Consuming Published Events

At this point, we've successfully published our events to some external data source. Now we need to consume them. How that occurs is, again, implementation specific. Perhaps you run a background hosted service to watch for messages on an Azure Service Bus topic or perhaps you periodically pole a database table to look for new events. The ways in which data may be shared is endless.

Once you rematerialize a `SubscriptionEvent` you need to let GraphQL know that it occurred. this is done using the `ISubscriptionEventRouter`. In general, you won't need to implement your own router, just inject it into your listener service then call `RaiseEvent` and GraphQL will take it from there.

```csharp
 public class MyListenerService : BackgroundService
    {
        private readonly ISubscriptionEventRouter _router;
        private bool _notStopped = true;

        public MyListenerService(ISubscriptionEventRouter router)
        {
            // other parameters omitted for brevity
            _router = router;
        }

       protected override async Task ExecuteAsync(CancellationToken t)
        {
            while (_notStopped)
            {
                SubscriptionEvent eventData = /* Fetch Next Event*/;
                _router.RaiseEvent(eventData);
            }
        }
    }
```

The router will take care of figuring out which schema the event is destined for, which local subscription servers are registered to receive that event and forward the data as necessary for processing.

### Azure Service Bus Example

A complete example of a scalable subscription configuration including serialization and deserialization using the Azure Service Bus is available in the [demo projects](../reference/demo-projects) section.

## Subscription Server Configuration

> See [schema configuration](../reference/schema-configuration#subscription-server-options) for information on individual subscription server configuration options.

Currently, when using the `.AddSubscriptions()` extension method two seperate operations occur:

1. The subscription server components are registered to the DI container, the graphql execution pipeline is modified to support registering subscriptions and a middleware component is appended to the ASP.NET pipeline to intercept web sockets and forward client connections to the the subscription server component.

2. A middleware component is appended to the end of the graphql execution pipeline to notify the `ISubscriptionEventPublisher` of any events raised by queries or mutations.

Some applications may wish to split these operations in different server instances for handling load or just splitting different types of traffic. For example, having one set of servers dedicated to query/mutation operations (stateless requests) and others dedicated to handling subscriptions and websockets (stateful requests).

The following more granular configuration options are available:

-   `.AddSubscriptionServer()` :: Only configures the ASP.NET pipeline to intercept websockets and adds the subscription server components to the DI container.

-   `.AddSubscriptionPublishing()` :: Only configures the graphql execution pipeline and the `ISubscriptionEventPublisher`. Subscription registration and Websocket support is **NOT** enabled.

## Security & Query Authorization

Because subscriptions are long running and registered before any data is processed, the subscription server requires a [query authorization method](../reference/schema-configuration#authorization-options) of `PerRequest`. This allows the subscription query to be fully validated before its registered with the server. This authorization method is set globally at startup and will apply to queries and mutations as well.

This is different than the default behavior when subscriptions are not enabled. Queries and mutations, by default, will follow a `PerField` method allowing for partial query resolutions.

**Note:** Allowing `PerField` authorization for subscriptions is slated for a future release.

## Query Timeouts

By default GraphQL does not define a timeout for an executed query. The query will run as long as the underlying HTTP connection is open. This is true for subscriptions as well. Given that the websocket connection is never closed while the end user is connected, any query executed through the websocket will be allowed to run for an infinite amount of time which can have some unintended side effects and consume resources unecessarily.

Optionally, you can define a query timeout for a given schema, which the subscription server will obey:

```csharp
// startup.cs
services.AddGraphQL(o =>
{
    // define a 2 minute timeout per query or subscription event executed.
    o.ExecutionOptions.QueryTimeout = TimeSpan.FromMinutes(2);
})
```

## Websocket Protocols

Out of the box, the library supports subscriptions over websockets using `graphql-transport-ws`, the modern protocol used by many client libraries as well as the legacy protocol `graphql-ws` (originally maintained by Apollo). A client requesting either protocol over a websocket will work with no additional configuration.

### Supported Protocols

-   [graphql-transport-ws](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md)
-   [graphql-ws](https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md) (_legacy_)

### Creating Custom Protocols

If you wish to add support for your own websocket messaging protocol you need to implement `ISubscriptionClientProxyFactory` and create instances
of a `ISubscriptionClientProxy` that can communicate with a connected client in your chosen protocol.

```csharp
    public interface ISubscriptionClientProxyFactory
    {
        // Use this factory to create a client proxy instance that
        // acts as an intermediary to communicate server-side events
        // to your client connection
        Task<ISubscriptionClientProxy<TSchema>> CreateClient<TSchema>(IClientConnection connection)
            where TSchema : class, ISchema;

        // The unique name of the sub-protocol. A client requesting your
        // protocol name will be handed to this
        // factory to create the appropriate client proxy the server can
        // communicate with.
        string Protocol { get; }
    }
```

And inject it into your DI container:

```C#
// startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddSingleton<ISubscriptionClientProxyFactory, MyClientProxyFactory>();

    services.AddGraphQL()
            .AddSubscriptions();
}
```

> `ISubscriptionClientProxyFactory` is expected to be a singleton and is only instantiated once per schema. The `ISubscriptionClientProxy<TSchema>`instances it creates should be unique per `IClientConnection` instance (i.e. transient).

The server will listen for subscription registrations from your client proxy and send back published events when new data is available. It is up to your proxy to interprete these events, generate an appropriate result (including executing queries against the runtime), serialize the data and send it to the connected client on the other end.

The details of implementing a custom graphql client proxy is beyond the scope of this documentation. Take a peek at the subscription library source code for some clues on how to get started.

## Other Communication Options

While websockets is the primary medium for persistant connections its not the only option. Internally, the library supplies an `IClientConnection` interface which encapsulates a raw connection websocket received from .NET. This interface is currently implemented as a `WebSocktClientConnection` which is responsible for reading and writing raw bytes to the socket. Its not a stretch of the imagination to implement your own custom client connection, invent a way to capture said connections and basically rewrite the entire communications layer of the subscriptions module.

Please do a deep dive into the subscription code base to learn about all the intracasies of building your own communications layer and how you might go about registering it with the runtime. If you do try to tackle this very large effort don't hesitate to reach out. We're happy to partner with you and meet you half way on a solution if it makes sense for the rest of the community.
