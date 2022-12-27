---
id: schema-configuration
title: Schema Configuration
sidebar_label: Schema Configuration
sidebar_position: 1
---

This document contains a list of various configuration settings available during schema configuration. All options are added as part of the `.AddGraphQL()` method used at startup.

```csharp title="Adding Schema Configuration Options"
services.AddGraphQL(schemaOptions =>
{
    // *************************
    // CONFIGURE YOUR SCHEMA HERE
    // *************************
});


// Be sure to add graphql to the ASP.NET pipeline builder
appBuilder.UseGraphQL();
```

## Builder Options

### AddAssembly

```csharp
// usage examples
schemaOptions.AddAssembly(assembly);
```

The runtime will scan the referenced assembly and auto-add any found required entities (controllers, types, enums, directives etc.) to the schema.


### AddSchemaAssembly

```csharp
// usage examples
schemaOptions.AddSchemaAssembly();
```

When declaring a new schema with .`AddGraphQL<TSchema>()`, the runtime will scan the assembly where `TSchema` is declared and auto-add any found required entities (controllers, types, enums, directives etc.) to the schema. 

This method has no effect when using `AddGraphQL()`.

### AddType*

Multiple Options: `AddGraphType`, `AddController`, `AddDirective`, `AddType`

```csharp
// usage examples
schemaOptions.AddGraphType<Donut>();
schemaOptions.AddController<BakeryController>();
```
Adds a single entity of a given type the schema. Use these methods to add individual graph types, directives or controllers. `AddType` acts a catch all and will try to infer the expected action to take against the supplied type. The other entity-specific methods will throw an exception should an unqualified type be supplied. For example, trying to supply a controller to `.AddGraphType()` will result in an exception.

### ApplyDirective

```csharp
schemaOptions.ApplyDirective("@deprecated")
    .WithArguments("The name field is deprecated.")
    .ToItems(schemaItem => schemaItem.IsGraphField<Person>("name"));
```

Allows for the runtime registration of a type system directive to a given schema item. 

>See the section on [directives](../advanced/directives.md#using-schema-options) for complete details on how to use this method. 

### AutoRegisterLocalEntities
```csharp
// usage examples
schemaOptions.AutoRegisterLocalEntities = true;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `true`        | `true`, `false`   |

When true, the graph entities (controllers, types, enums etc.) that are declared in the startup assembly for the application are automatically registered to the schema. Typically this is your API project where `Startup.cs` or `Program.cs` is declared.

## Authorization Options

### Method
```csharp
// usage examples
schemaOptions.AuthorizationOptions.Method = AuthorizationMethod.PerField;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `null`        | `PerField`, `PerRequest`   |

Controls how the graphql execution pipeline will authorize a request.

* `PerField`: Each field of a query is evaluated individually allowing a data response to be generated that includes data the user can access and `null` values for those fields the user cannot access.  Any unauthorized fields will also register an error in the response.

* `PerRequest`: All fields of a query are validated BEFORE execution. Each field is validated individually, using its own authorization and authentication requirements. If the current user does not have access to 1 or more requested fields the entire request is denied and an error message generated.

> See [Subscription Security](../advanced/subscriptions#security--query-authorization) for additional considerations regarding authorization and subscriptions.

## Declaration Options

### AllowedOperations

```csharp
// usage examples
schemaOptions.DeclarationOptions.AllowedOperations.Remove(GraphOperationType.Mutation);
```

| Default Value    | Acceptable Values |
| -------------    | ----------------- |
| `Query, Mutation` | `Query`, `Mutatation`, `Subscription` |

Controls which top level operations are available on your schema. In general, this property is managed internally and you do not need to alter it. An operation not in the list will not be configured at start up.

> Subscriptions are automatically added when the subscription library is added via `.AddSubscriptions()`.


### DisableIntrospection
```csharp
// usage examples
schemaOptions.DeclarationOptions.DisableIntrospection = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When `true`, any attempts to perform an introspection query will fail, preventing exposure of type meta data. 

> Note: Many tools, IDEs and client libraries not work if you disable introspection data.

### FieldDeclarationRequirements
```csharp
// usage examples
schemaOptions.DeclarationOptions.FieldDeclarationRequirements = TemplateDeclarationRequirements.Default;
```

| Default Value                             | Acceptable Values |
| ----------------------------------------- | ----------------- |
| `TemplateDeclarationRequirements.Default` | _all enum values_ |

Indicates to the runtime which fields and values of POCO classes must be explicitly declared for them to be added to a schema. 

By default:

-   All values declared on an `enum` **will be** included.
-   All properties of POCOs and interfaces **will be** included.
-   All methods of POCOs and interfaces **will NOT be** included.

> NOTE: Controller and Directive action methods are not effected by this setting.

### GraphNamingFormatter

```csharp
// usage examples
schemaOptions.DeclarationOptions.GraphNamingFormatter = new GraphNameFormatter(...);
```

An object that will format any string to an acceptable name for use in the graph.

| Entity Type      | Default Format | Examples                             |
| ---------------- | -------------- | ------------------------------------ |
| Graph Type Names | Pascal Casing  | `Donut`, `BigHorse`, `SpeakerSystem` |
| Field Names      | Camel Casing   | `flavor`, `minWidth`, `firstName`    |
| Enum Values      | All Caps       | `CHOCOLATE`, `FEET`, `PHONE_NUMBER`  |
_Default formats for the three different entity types_

> To make radical changes to your name formats, beyond the available options, inherit from `GraphNameFormatter` and override the different formatting methods.

## Execution Options

### DebugMode

```csharp
// usage examples
schemaOptions.ExecutionOptions.DebugMode = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, each field and each list member of each field will be executed sequentially with no parallelization. All asynchronous methods will be individually awaited and allowed to throw immediately. A single encountered exception will halt the entire query process. This can be very helpful in preventing a jumping debug cursor.  This option will greatly impact performance and can cause inconsistent query results if used in production. It should only be enabled for [debugging](../development/debugging).


### EnableMetrics
```csharp
// usage examples
schemaOptions.ExecutionOptions.EnableMetrics = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, metrics and query profiling will be enabled for all queries processed for a given schema.

> Note: This option DOES NOT control if those metrics are sent to the query requestor, just that they are generated. See [ExposeMetrics](./schema-configuration#exposemetrics) in the response options for that switch.

### MaxQueryComplexity

```csharp
// usage examples
schemaOptions.ExecutionOptions.MaxQueryComplexity = 50.0f;
```

| Default Value | Acceptable Values    |
| ------------- | -------------------- |
| -_not set_-   | Float Greater Than 0 |

The maximum allowed [complexity](../execution/malicious-queries#query-complexity) value of a query. If a query is scored higher than this value it will be rejected.

### MaxQueryDepth

```csharp
// usage examples
schemaOptions.ExecutionOptions.MaxQueryDepth = 15;
```

| Default Value | Acceptable Values      |
| ------------- | ---------------------- |
| -_not set_-   | Integer Greater than 0 |

The maximum allowed [field depth](../execution/malicious-queries#maximum-allowed-field-depth) of any child field within a given query. If a query contains a child that is nested deeper than this value the query will be rejected.


### QueryTimeout

```csharp
// usage examples
schemaOptions.ExecutionOptions.QueryTimeout = TimeSpan.FromMinutes(2);
```

| Default Value | Acceptable Values          |
| ------------- | -------------------------- |
| -_not set_-   | > 10 milliseconds          |

The amount of time an individual query will be given to run before being abandoned and canceled by the runtime. By default, the timeout is disabled and a query will continue to execute as long as the underlying HTTP request is also executing. The minimum allowed amount of time for a query to run is 10ms.

### ResolverIsolation

```csharp
// usage examples
schemaOptions.ExecutionOptions.ResolverIsolation = ResolverIsolationOptions.ControllerActions | ResolverIsolation.Properties;
```

| Default Value | 
| ------------- | 
| `ResolverIsolationOptions.None` |

Resolver types identified in `ResolverIsolation` are guaranteed to be executed independently. This is different than `DebugMode`. In debug mode a single encountered error will end the request whereas errors encountered in isolated resolvers will still be aggregated. This allows the returning partial results which can be useful in some use cases. 

## Response Options

### AppendServerHeader

```csharp
// usage examples
schemaOptions.ResponseOptions.AppendServerHeader = true;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `true`        | `true`, `false`   |

When true, an `X-GraphQL-AspNet-Server` header with the current library version (e.g. `v1.0.1`) is added to the outgoing response. This option has no effect when a custom `HttpProcessorType` is declared.


### ExposeExceptions

```csharp
// usage examples
schemaOptions.ResponseOptions.ExposeExceptions = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, exception details including message, type and stack trace will be sent to the requestor as part of any error messages. 

:::caution WARNING
Setting this value to true can expose sensitive server details and may be considered a security risk.
:::

### ExposeMetrics

```csharp
// usage examples
schemaOptions.ResponseOptions.ExposeMetrics = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, the full set of metrics gathered when a query is executed is sent to the requestor. This value is disregarded unless `ExecutionOptions.EnableMetrics` is set to true.

> Note: Metrics data for large queries can be quite expansive; double or tripling the size of the json data returned.

### IndentDocument

```csharp
// usage examples
schemaOptions.ResponseOptions.IndentDocument = true;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `true`       | `true`, `false`   |

When true, the default json response writer will indent and "pretty up" the output response to make it more human-readable. Turning off this setting can result in a smaller output response.

### MessageSeverityLevel

```csharp
// usage examples
schemaOptions.ResponseOptions.MessageSeverityLevel = GraphMessageSeverity.Information;
```
| Default Value                      | Acceptable Values                      |
| ---------------------------------- | -------------------------------------- |
| `Information` | \-_any `GraphMessageSeverity` value_\- |

Indicates which messages generated during a query should be sent to the requestor. Any message with a [severity level](https://github.com/graphql-aspnet/graphql-aspnet/blob/master/src/graphql-aspnet/Execution/GraphMessageSeverity.cs) equal to or greater than the provided level will be delivered.

#### Message Severity Levels

|Value   |  Rank  |
|--------|--------|
|

### TimeStampLocalizer

```csharp
// usage examples
schemaOptions.ResponseOptions.TimeStampLocalizer = (dtos) => dtos.DateTime;
```

|Default Value | Acceptable Value                 | 
| -------------|--------------------------------- |
|_`null`_      | `Func<DateTimeOffset, DateTime>` |

A function to convert any system-provided timestamp values present in the output into a value of a given timezone. By default, no localization occurs and all times are delivered in their native `UTC-0` format. This localizer does not effect any query field date values. Only those related to internal messaging (e.g. message creation dates, start and stop times for query metrics etc.) are effected.

## QueryHandler Options

### AuthenticatedRequestsOnly

```csharp
// usage examples
schemaOptions.QueryHandler.AuthenticatedRequestsOnly = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, only those requests that are successfully authenticated by the ASP.NET runtime will be passed to GraphQL. Should an unauthenticated request make it to the graphql query processor it will be immediately rejected. 

:::note  
 This setting acts as a short cut to assigning custom HttpProcessorType.  If you provide your own custom [`HttpProcessorType`](#httpprocessortype) this setting has no effect.
:::


### DisableDefaultRoute

```csharp
// usage examples
schemaOptions.QueryHandler.DisableDefaultRoute = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When set to true the default route and http query processor will **NOT** be registered with the ASP.NET runtime when the application starts. GraphQL queries will not be processed unless manually invoked.


### HttpProcessorType

```csharp
// usage examples
schemaOptions.QueryHandler.HttpProcessorType = typeof(MyProcessorType);
```

| Default Value |
| ------------- |
| `null` |

When set to a `System.Type`, GraphQL will attempt to load the provided type from the configured DI container in order to handle graphql requests. Any class wishing to act as an Http Processor must implement `IGraphQLHttpProcessor<TSchema>`. 

:::tip 
It can be easier to extend `DefaultGraphQLHttpProcessor<TSchema>` instead of implementing the interface from scratch if you only need to make minor changes.
:::

### Route

```csharp
// usage examples
schemaOptions.QueryHandler.Route = "/graphql";
```

| Default Value |
| ------------- |
| `/graphql`    |

Represents the REST end point where GraphQL will listen for new POST and GET requests. In multi-schema configurations this value will need to be unique per schema type.

## Subscription Server Options
These options are available to configure a subscription server for a given schema via `.AddSubscriptions(subscriptionOptions)`

```csharp title="Adding Subscription Configuration Options"
services.AddGraphQL()
        .AddSubscriptions(subscriptionOptions =>
        {
            // *************************
            // CONFIGURE YOUR SUBSCRIPTION
            // OPTIONS  HERE
            // *************************
        });


// Be sure to add graphql to the ASP.NET pipeline builder
appBuilder.UseGraphQL();
```

### AuthenticatedRequestsOnly

```csharp
// usage examples
subscriptionOptions.AuthenticatedRequestsOnly = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, only requests that are successfully authenticated by the ASP.NET runtime will be passed to GraphQL and registered as a subscription client. Connections with unauthenticated sources are immediately closed.

### ConnectionKeepAliveInterval

The interval at which the subscription server will send a protocol-specific message to a connected graphql client informing it the connection is still open.

```csharp
// usage examples
subscriptionOptions.ConnectionKeepAliveInterval = TimeSpan.FromMinutes(2);
```

| Default Value |
| ------------- |
| `2 minutes`    |

:::tip 
This is an application level keep-alive supported by most graphql messaging protocols. This is a different keep-alive than the web socket specific keep alive provided by ASP.NET
:::


### ConnectionInitializationTimeout

When supported by a messaging protocol, represents a timeframe after the connection is initiated in which a successful initialization handshake must occur. 

```csharp
// usage examples
subscriptionOptions.ConnectionInitializationTimeout = TimeSpan.FromSeconds(30);
```

| Default Value |
| ------------- |
| `30 seconds`    |


> Note: Not all messaging protocols require an explicit timeframe or support an inititalization handshake.

### DefaultMessageProtocol

When set, represents a valid and supported messaging protocol that a client should use if it does not specify which protocols it can communicate in.

```csharp
// usage examples
subscriptionOptions.DefaultMessageProtocol = "my-custom-protocol";
```

| Default Value |
| ------------- |
| `null`        |

> Note:  By default, this value is not set and connected clients **MUST** supply a prioritized protocol list.

### DisableDefaultRoute

```csharp
// usage examples
subscriptionOptions.DisableDefaultRoute = false;
```
| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false `       | `true`, `false`   |

When true, GraphQL will not register a component to listen for web socket requests. You must handle the acceptance of web sockets yourself and provision client proxies that can interact with the runtime. If you wish to implement your own web socket middleware handler, viewing [DefaultGraphQLHttpSubscriptionMiddleware&lt;TSchema&gt;](https://github.com/graphql-aspnet/graphql-aspnet/blob/master/src/graphql-aspnet-subscriptions/Engine/DefaultGraphQLHttpSubscriptionMiddleware.cs) may help.



### HttpMiddlewareComponentType

When set, represents the custom middleware component GraphQL will inject into the ASP.NET pipeline to intercept new web socket connection requests. 

```csharp
// usage examples
subscriptionOptions.HttpMiddlewareComponentType = typeof(MyMiddleware);
```

| Default Value |
| ------------- |
| `null`    |

When null, `DefaultGraphQLHttpSubscriptionMiddleware<TSchema>` is used.

### RequireAuthenticatedConnection

Deteremines if a web socket request will be accepted in an unauthenticated state or not.

```csharp
// usage examples
subscriptionOptions.RequiredAuthenticatedConnection = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false `       | `true`, `false`   |

When set to true, the subscription middleware will immediately reject any websocket requests from un-authenticated sources. This option does not include query authorization (i.e. can the user access the fields they are requesting). That occurs after the websocket is established.

When set to false, the subscription middleware will initially accept all web socket requests.


### Route

Similar to the query/mutation query handler route this represents the path the default subscription middleware will look for when accepting new web sockets.

```csharp
// usage examples
subscriptionOptions.Route = "/graphql";
```

| Default Value |
| ------------- |
| `/graphql`    |


Represents the http end point where GraphQL will listen for new web socket requests. In multi-schema configurations this value will need to be unique per schema type.

:::info
Your subscriptions can share the same route as your general queries for a schema or be different, its up to you.
:::

### SupportedMessageProtocols

When populated, represents a list of messaging protocol keys supported by this schema. A connected client MUST be able to communicate in one of the approved 
values or it will be dropped.

```csharp
// usage examples
var myProtocols = new Hashset<string>();
myProtocols.Add("protocol1");
myProtocols.Add("protocol2");
serverOptions.SupportedMessageProtocols = myProtocols;
```

| Default Value |
| ------------- |
| `null`        |

> By default, `SupportedMessageProtocols` is null; meaning any server supported protocol will be usable by the target schema. If set to an empty set, then the schema is effectively disabled as no supported protocols will be matched.
