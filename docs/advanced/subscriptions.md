---
id: subscriptions
title: Subscriptions
sidebar_label: Subscriptions
---

## Initial Setup

Successfully handling subscriptions in your GraphQL AspNet server can be straight forward for single server environments or very complicated for multi-server and scalable solutions.  First we'll look at adding subscriptions for a single server.

### Install the Subscriptions Package
The first step to using subscriptions is to install the subscription server package.

```Powershell
 PS> Install-Package GraphQL.AspNet.Subscriptions -AllowPrereleaseVersions
```

This adds the necessary components to create a subscription server for a given schema such as communicating with web sockets, parsing subscription queries and responding to events.

### Configure the GraphQL Instance

You must configure web socket support for your Asp.Net server instance separately. The ways in which you perform this configuration will vary widely depending on your needs. CORS requirements, keep -alive support etc. will be different for each scenario.

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

### Subscription Event Source Data
In the example above, the data sent with `PublishSubscriptionEvent` is the same as the first input parameter called `eventData` which is the same as the field return type of the controller method. By default, the subscription will look for a parameter with the same data type as its field return type and use that as the event data source.

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


### Summary
That's all there is for a basic subscription server setup.
1. Add the package reference and update startup.cs
2. Create a new subscription using `[Subscription]` or `[SubscriptionRoot]`
3. Publish an event from a mutation

### React w/ Apollo Client Example

A complete example of single instance subscription server including a react app that utilizes the Apollo Client is available in the [demo projects](../reference/demo-projects) section.

## Scaling Subscription Servers
Using web sockets has a natural limitation in that any each server instance has a maximum number of socket connections that it can handle. Once that limit is reached no additional clients can register subscriptions.

Ok no problem, just scale horizontally, spin up additional ASP.NET server instances and have the new requests open a web socket connection to these additional server instances, right?  Not so fast.

With the examples above events published by any mutation using `PublishSubscriptionEvent` are routed internally directly to the local subscription server meaning only those clients connected to the server where the event was raised will receive it. Clients connected to other server instances will never know an event was raised. This represents a big problem for large scale websites, so what do we do?

### Custom Event Publishing
Instead of publishing events internally, within the server instance, we need to publish our events to some intermediate source such that any server can be notified of the change.  There are a variety of technologies to handle this scenario; be it a common database or messaging technologies like RabbitMQ, Azure Service Bus etc.

#### Implement `ISubscriptionEventPublisher`
Whatever your technology of choice the first step is to create and register a custom publisher such that any raised events are published externally. How your individual class functions will vary widely depending on your implementation.

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
At this point, we've successfully published our events to some external data source. Now we need to consume them.  How that occurs is, again, implementation specific. Perhaps you run a background hosted service to watch for messages on an Azure Service Bus topic or perhaps you periodically pole a database table to look for new events.  The ways in which data may be shared is endless.

Once you rematerialize a `SubscriptionEvent` you need to let GraphQL know that it occurred. this is done using the `ISubscriptionEventRouter`. In general, you won't need to implement your own router, just inject it into your listener service then call `RaiseEvent` and GraphQL will take it from there.

```C#
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
>See [schema configuration](../reference/schema-configuration#subscription-server-options) for information on individual subscription server configuration options.

Currently, when using the `.AddSubscriptions()` extension method  two seperate operations occur:

1. The subscription server components are registered to the DI container, the graphql execution pipeline is modified to support registering subscriptions and a middleware component is appended to the ASP.NET pipeline to intercept web sockets and forward client connections to the the subscription server component.

2. A middleware component is appended to the end of the graphql execution pipeline to notify the `ISubscriptionEventPublisher` of any events raised by queries or mutations.

Some applications may wish to split these operations in different server instances for handling load or just splitting different types of traffic. For example, having one set of servers dedicated to query/mutation operations (stateless requests) and others dedicated to handling subscriptions and websockets (stateful requests).

The following more granular configuration options are available:

* `.AddSubscriptionServer()` :: Only configures the ASP.NET pipeline to intercept websockets and adds the subscription server components to the DI container.

* `.AddSubscriptionPublishing()` :: Only configures the graphql execution pipeline and the `ISubscriptionEventPublisher`. Subscription registration and Websocket support is **NOT** enabled.


## Security & Query Authorization

Because subscriptions are long running and registered before a any data is processed, the subscription server requires a [query authorization method](../reference/schema-configuration#authorization-options) of `PerRequest`. This allows the subscription query to be fully validated before its registered with the server. This authorization method is set globally at startup and will apply to queries and mutations as well.

This is different than the default behavior when subscriptions are not enabled.  Queries and mutations, by default, will follow a `PerField` method allowing for partial query resolutions.

**Note:** Allowing `PerField` authorization for subscriptions is slated for a future release.




