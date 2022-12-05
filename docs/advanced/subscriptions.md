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

You must configure web socket support for your Asp.Net server instance separately. The ways in which you perform this configuration will vary widely depending on your CORS requirements, keep-alive support and other needs.

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

> Don't forget to call `.UseWebsockets()` before calling `.UseGraphQL()`

### Create a Subscription

Declaring a subscription is the same as declaring a query or mutation on a controller but with `[Subscription]` and `[SubscriptionRoot]` attributes. Feel free to mix subscriptions with your queries and mutations. They do not need to be kept seperate.

```C#
public class SubscriptionController : GraphController
{
    // other code not shown for brevity

    [SubscriptionRoot("onWidgetChanged", typeof(Widget), EventName = "WIDGET_CHANGED")]
    public IGraphActionResult  OnWidgetChanged(Widget eventData, string filter){
        if(eventData.Name.StartsWith(filter))
        {
            // send the data down to the listening client
            return this.Ok(eventData);
        }
        else
        {
            // use SkipSubscriptionEvent() to disregard the data
            // and not communicate anything to the listening client 
            return this.SkipSubscriptionEvent();
        }
    }
}
```

> Subscriptions can be asyncronous and return a Task&lt;IGraphActionResult&gt; as well.

Here we've declared a new subscription, one that takes in a `filter` parameter to restrict the data that any subscribers receive.

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

Any updated widgets that start with the phrase "Big" will then be sent to the requestor as they are changed on the server. Any other changed widgets will be skipped/dropped and no data will be sent to the client.

### Publish a Subscription Event

In order for the subscription server to send data to any subscribers it has to be notified when its time to do so. It does this via named Subscription Events. These are internal, schema-unique keys that identify when something happened, usually via a mutation. Once the mutation publishes an event, the subscription server will execute the appropriate action method for any subscribers, using the supplied data, and deliver the results to the client.

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

> Notice that the event name used in `PublishSubscriptionEvent()` is the same as the `EventName` property on the `[SubscriptionRoot]` attribute. The subscription server will use the published event name to match which registered subscriptions need to receive the data being published.

### Subscription Event Data Source

In the example above, the data sent with `PublishSubscriptionEvent()` is the same as the first input parameter, called `eventData`, on the subscription field, which is the same as the field return type of the subscription controller method. By default, GraphQL will look for a parameter with the same data type as its own return type and use that as the event data source. It will automatically populate this field with the data from `PublishSubscriptionEvent()`; this argument is not exposed in the object graph.

You can explicitly flag a different parameter, or a parameter of a different data type to be the expected event source with the `[SubscriptionSource]` attribute.

```C#
public class SubscriptionController : GraphController
{
    // other code not shown for brevity
    
    [SubscriptionRoot("onWidgetChanged", typeof(Widget), EventName = "WIDGET_CHANGED")]
    public IGraphActionResult  OnWidgetChanged(
        [SubscriptionSource] WidgetInternal eventData,
        string filter)
    {
        if(eventData.Name.StartsWith(filter))
            return this.Ok(eventData.ToWidget());
        return this.SkipSubscriptionEvent();
    }
}
```

Here the subscription expects that an event is published using a `WidgetInternal` data type that it will internally convert to a `Widget` and send to any subscribers. This can be useful if you wish to share internal objects between your mutations and subscriptions that you don't want publicly exposed.

> The data object published with `PublishSubscriptionEvent()` must have the same type as the `[SubscriptionSource]` on the subscription field.

### Summary

That's all there is for a basic subscription server setup.

1. Add the package reference and update startup.cs
2. Create a new subscription using `[Subscription]` or `[SubscriptionRoot]`
3. Publish an event from a mutation

### React w/ Apollo Client Example

A complete example of single instance subscription server including a react app that utilizes the Apollo Client is available in the [demo projects](../reference/demo-projects) section.

## Subscription Action Results

You saw above the special action result `SkipSubscriptionEvent()` used to instruct graphql to skip this event and not tell the client about it; this can be very useful in scenarios where the subscription supplies filter data to only receive some very specific data and not all items published via a specific event.

Here is a complete list of the various "subscription specific" action results:

* `SkipSubscriptionEvent()` - Instructs the server to skip the raised event, the client will not receive any data.
* `OkAndComplete(data)` - Works just like `this.Ok()` but ends the subscription after the event is completed.  The client is informed that no additional data will be sent and that the server is closing the subscription permanently. This, however; does not close the underlying websocket connection.

## Scaling Subscription Servers

Using web sockets has a natural limitation in that any single server instance has a maximum number of socket connections that it can realistically handle before being overloaded. Additionally, all cloud providers impose an artifical limit for many of their pricing tiers. Once that limit is reached no additional clients can register subscriptions.

Ok no problem, just scale horizontally, spin up additional ASP.NET server instances, add a load balancer and have the new requests open a web socket connection to these additional server instances, right? Not so fast.

With the examples above, events published by any mutation using `PublishSubscriptionEvent()` are routed internally, directly to the local subscription server meaning only those clients connected to the server where the event was raised will receive it. Clients connected to other server instances will never know an event was raised. This represents a big problem for large scale websites, so what do we do?

[This diagram](../assets/2022-10-subscription-server.pdf) shows a high level differences between the default, single server configuration and a custom scalable solution.

### Custom Event Publishing

Instead of publishing events internally, within the server instance, we need to publish our events to some intermediate source such that any server can be notified of the change. There are a variety of technologies to handle this scenario; be it a common database or messaging technologies like RabbitMQ, Azure Service Bus etc.

#### Implement `ISubscriptionEventPublisher`

Whatever your technology of choice the first step is to create and register a custom publisher that implements `ISubscriptionEventPublisher`. How your publisher class functions will vary widely depending on your implementation.

```C#
public interface ISubscriptionEventPublisher
{
    /// <summary>
    /// Publishs a new subscription event to be acted on.
    /// </summary>
    /// <param name="eventData">The event to publish.</param>
    Task PublishEvent(SubscriptionEvent event);
}
```

Register your publisher with the DI container BEFORE calling `.AddGraphQL()`

```C#
services.AddSingleton<ISubscriptionEventPublisher, MyEventPublisher>();

// other code omitted for brevity

services.AddGraphQL()
        .AddSubscriptions();
```

> GraphQL ASP.NET will use your registered publisher instead of its default, internal publisher.

<span style="color:pink;">Publishing Subscription Events externally is not trivial. You'll have to deal with concerns like data serialization, package size etc..</span>

### Consuming Published Events

At this point, we've successfully published our events to some external data source. Now we need to consume them. How that occurs is, again, implementation specific. Perhaps you run a background hosted service to watch for messages on an Azure Service Bus topic or perhaps you periodically pole a database table to look for new events. The ways in which data may be shared is endless.

Once you rematerialize a `SubscriptionEvent` you need to let GraphQL know that it occurred. this is done using the `ISubscriptionEventRouter`. In general, you won't need to implement your own router, just inject it into your listener then call `RaisePublishedEvent` and GraphQL will take it from there.

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
                _router.RaisePublishedEvent(eventData);
            }
        }
    }
```

The router will take care of the details in figuring out which schema the event is destined for, which clients have active subscriptions etc. and forward it accordingly.


### Azure Service Bus Example

A complete example of a bare bones example, including serialization and deserialization using the Azure Service Bus is available in the [demo projects](../reference/demo-projects) section.

> The demo project represents a functional starting point and lacks a lot of the error handling and resilency needs of a production environment.

## Subscription Server Configuration

When using the `.AddSubscriptions()` extension method two seperate operations occur:

1. The subscription server components are registered to the DI container, the graphql execution pipeline is modified to support registering subscriptions and a middleware component is appended to the ASP.NET pipeline to intercept and communicate the correct web socket connections.

2. A middleware component is appended to the end of the graphql execution pipeline to formally publish any events staged via `PublishSubscriptionEvent()` 

Some applications may wish to split these operations in different server instances for handling load or just splitting different types of traffic. For example, having one set of servers dedicated to query/mutation operations (stateless requests) and others dedicated to handling subscriptions and websockets (stateful requests).

The following granular configuration options may be useful:

-   `.AddSubscriptionServer()` :: Only configures the ASP.NET pipeline to intercept websockets and adds the subscription server components to the DI container.

-   `.AddSubscriptionPublishing()` :: Only configures the graphql execution pipeline to publish events. Subscription creation and websocket support is **NOT** enabled.

## Security & Query Authorization

Because subscriptions are long running and registered before any data is processed, the subscription server requires a [query authorization method](../reference/schema-configuration#authorization-options) of `PerRequest`. This allows the subscription query to be fully validated before its registered with the server. This authorization method is set globally at startup and will apply to queries and mutations as well.

This is different than the default behavior when subscriptions are not enabled. Queries and mutations, by default, will follow a `PerField` method allowing for partial query resolutions.

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

Out of the box, the library supports subscriptions over websockets using `graphql-transport-ws`, the modern protocol used by many client libraries. It also provides support for the legacy protocol `graphql-ws` (originally maintained by Apollo). A client requesting either protocol over a websocket will work with no additional configuration.

### Supported Protocols

-   [graphql-transport-ws](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md)
-   [graphql-ws](https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md) (_legacy_)

### Creating Custom Protocols

If you wish to add support for your own websocket messaging protocol you need to implement `ISubscriptionClientProxyFactory` and create instances
of a `ISubscriptionClientProxy` that can communicate with a connected client in your chosen protocol.

```csharp
public interface ISubscriptionClientProxyFactory
{
    // Create client proxy instances that
    // act as an intermediary to communicate server-side events
    // to the client connection
    Task<ISubscriptionClientProxy<TSchema>> CreateClient<TSchema>(IClientConnection connection)
        where TSchema : class, ISchema;

    // The unique name of your sub-protocol. A client connection requesting your
    // protocol, by name, will be handed to this
    // factory to create the appropriate client proxy.
    string Protocol { get; }
}
```

And inject it into your DI container before calling AddGraphQL:

```C#
// startup
services.AddSingleton<ISubscriptionClientProxyFactory, MyClientProxyFactory>();

services.AddGraphQL()
        .AddSubscriptions();
```

> `ISubscriptionClientProxyFactory` is expected to be a singleton; it is only instantiated once when the server first comes online. The `ISubscriptionClientProxy<TSchema>`instances it creates should be unique per `IClientConnection` instance.

The server will listen for subscription registrations from your client proxy and send back published events when new data is available. It is up to your proxy to interprete these events, generate an appropriate result (including executing queries against the runtime), serialize the data and send it to the connected client on the other end.

<span style="color:pink">The complete details of implementing a custom graphql client proxy are beyond the scope of this documentation. Take a peek at the subscription library source code for some clues on how to get started. </span>

## Other Communication Options

While websockets is the primary medium for persistant connections its not the only option. Internally, the library supplies an `IClientConnection` interface which encapsulates a raw connection websocket received from .NET. This interface is currently implemented as a `WebSocktClientConnection` which is responsible for reading and writing raw bytes to the socket. Its not a stretch of the imagination to implement your own custom client connection, invent a way to capture said connections and basically rewrite the entire communications layer of the subscriptions module.

Please do a deep dive into the subscription code base to learn about all the intricacies of building your own communications layer and how you might go about registering it with the runtime. If you do try to tackle this very large effort don't hesitate to reach out. We're happy to partner with you and meet you half way on a solution if it makes sense for the rest of the community.

## Performance Considerations

In a production app, its very possible that you may have lots of subscription events fired and communicated to a lot of connected clients in short succession. Its important to understand how the receiving servers will process those events and plan accordingly. 

When the router receives an event it looks to see which clients are subscribed to that event and queues up a work item for each one. Internally, this work is processed, concurrently if necessary, up to a server-configured maximum. Once this maximum is reached, new work will only begin as other work finishes up.

Each work item is, for the most part, a standard query execution. But with lots of events being delivered on a server saturated with clients, each potentially having multiple subscriptions, along with regular queries and mutations executing as well...limits must be imposed otherwise CPU utilization could unreasonably spike...and it may spike regardless in some use cases. 

By default, the max number of work items the router will deliver simultaniously is `500`.  This is a global, server-wide pool, shared amongst all registered schemas. You can manually adjust this value by changing it prior to calling `.AddGraphQL()`.   This value defaults to a low number on purpose, use it as a starting point to dial up the max concurrency to a level you feel comfortable with in terms of performance and cost. The only limit here is server resources and other environment limitations outside the control of graphql. 

```csharp
// Startup.cs

// Adjust the max concurrent communications value
// BEFORE calling .AddGraphQL()
SubscriptionServerSettings.MaxConcurrentReceiverCount = 50;

services.AddGraphQL()
        .AddSubscriptions();
```

### Event Multiplication

Think carefully about your production scenarios when you introduce subscriptions into your application.  For each subscription event raised, each open subscription monitoring that event must execute a standard graphql query, with the supplied event data, to generate a result and send it to its connected client. 

If, for instance, you have `200 clients` connected to a single server, each with `3 subscriptions` open against ONE event, thats `600 individual queries` that must be executed to process the event completely. Even if you call `SkipSubscriptionEvent` to drop the event and no send data to a client, the query still must be executed to determine the subscriber is not interested in the data.  Suppose your server receives 5 mutations in rapid succession, all of which raise the event, thats a spike of `3,000 queries`, instantaneously, that the server must process.  

Balancing the load can be difficult. Luckily there are some [throttling levers](/docs/reference/global-configuration#subscriptions) you can adjust.

> Raising subscription events can exponentially increase the load on each of your servers. Think carefully when you deploy subscriptions to your application.


### Dispatch Queue Monitoring

Internally, whenever a subscription server instance receives an event, the router checks to see which of the currently connected clients need to process that event. The client/event combination is then put into a dispatch queue that is continually processed via a background service according to the throttling limits you've specified. If events are received faster than they can be dispatched they are queued, in memory, until resources are freed up. 

There is built in monitoring of this queue that will automatically [record a log event](../logging/subscription-events.md#subscription-event-dispatch-queue-alert) when a given threshold is reached. 

#### Default Event Alert Threshold
This event is recorded at a `Critical` level when the queue reaches `10,000 events`. This alert is then re-recorded once every 5 minutes if the 
queue remains above 10,000 events.

#### Custom Event Alert Thresholds

In some high volume scenarios, its not uncommon or unexpected for the dispatch queue to spike beyond the default monitoring levels from time to time.  If you need more granular control of the notifications, register an instance of `ISubscriptionClientDispatchQueueAlertSettings` to your DI container before adding GraphQL and your settings will be used instead.

In the example below, if the queue reaches 1,000 events, the debug level alert will be recorded. If 30 seconds pass and the queue is still above 1000 events, the debug level alert will be recorded again. However, if the queue crosses 10,000 events then the warning level alert will be recorded (the debug alert is then ignored).  If the queue reaches 100k events then a critical level alert will be recorded every 15 seconds until it drops below 100k.

 Lower level thresholds (as determined by number of queued events) will not be triggered if a higher level is on active cool down.

```csharp
// startup configuration
var thresholds = new SubscriptionClientDispatchQueueAlertSettings();
thresholds.AddThreshold(
    LogLevel.Debug,
    1000,
    TimeSpan.FromSeconds(30));

thresholds.AddThreshold(
    LogLevel.Warning,
    10000,
    TimeSpan.FromSeconds(120));

thresholds.AddThreshold(
    LogLevel.Critical,
    100000,
    TimeSpan.FromSeconds(15));
    
// register the interface as a singleton
services.AddSingleton<ISubscriptionClientDispatchQueueAlertSettings>(alerts);

// normal graphql configuration
services.AddGraphQL();


```

> Consider using the built in `SubscriptionClientDispatchQueueAlertSettings` object for a standard implementation of the required interface.
