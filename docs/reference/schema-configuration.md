---
id: schema-configuration
title: Schema Configuration
sidebar_label: Schema Configuration
---

This document contains a list of each property available during schema configuration when a call to `AddGraphQL()` is made when your application starts:

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // other code omitted for brevity

    services.AddGraphQL(schemaOptions =>
    {
        // *************************
        // CONFIGURE YOUR SCHEMA HERE
        // *************************
    });
}

public void Configure(IApplicationBuilder appBuilder)
{
    // other code omitted for brevity
    appBuilder.UseGraphQL();
}
```

## Builder Options

### AddController, AddDirective, AddGraphType, AddType

```csharp
// usage examples
schemaOptions.AddGraphType<Donut>();
schemaOptions.AddController<BakeryController>();
```
Adds the single entity of a given type the schema. Use these methods to add individual graph types, directives or controllers. `AddType` acts a catch all and will try to infer the expected action to take against the supplied type. The other entity specific methods will throw an exception should an unqualified type be supplied. For example, trying to supply a controller to `.AddGraphType()` will result in an exception.

### AddSchemaAssembly

```csharp
// usage examples
schemaOptions.AddSchemaAssembly();
```

When declaring a new schema with .`AddGraphQL<TSchema>()`, the runtime will scan the assembly where `TSchema` is declared and auto-add any found required entities (controllers, types, enums, directives etc.) to the schema. 

This method has no effect when using `AddGraphQL()`.

### AddAssembly

```csharp
// usage examples
schemaOptions.AddAssembly(assembly);
```

The runtime will scan the referenced assembly and auto-add any found required entities (controllers, types, enums, directives etc.) to the schema.

### ApplyDirective

```csharp
schemaOptions.ApplyDirective("deprecated")
    .WithArguments("The name field is deprecated.")
    .ToItems(schemaItem => schemaItem.IsGraphField<Person>("name"));
```

Allows for the runtime registration of a type system directive to a given schema item. See the [directives](../advanced/directives.md#applying-type-system-directives) for complete details on how to use this method. 

### AutoRegisterLocalGraphEntities
```csharp
// usage examples
schemaOptions.AutoRegisterLocalGraphEntities = true;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `true`        | `true`, `false`   |

When true, those graph entities (controllers, types, enums etc.) that are declared in the entry assembly for the application are automatically registered to the schema. Typically this is your API project where `Startup.cs` is declared.

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

### DisableIntrospection
```csharp
// usage examples
schemaOptions.DeclarationOptions.DisableIntrospection = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When `true`, any attempts to perform an introspection query by making references to the fields `__schema` and `__type` will fail, preventing exposure of type meta data.

### FieldDeclarationRequirements
```csharp
// usage examples
schemaOptions.DeclarationOptions.FieldDeclarationRequirements = TemplateDeclarationRequirements.Default;
```

| Default Value                             | Acceptable Values |
| ----------------------------------------- | ----------------- |
| `TemplateDeclarationRequirements.Default` | _all enum values_ |

Indicates to the runtime which fields and values of POCO classes must be explicitly declared in order to be added to a schema when said POCO class is added.

By default:

-   All enum values will be included.
-   All properties of POCOs and interfaces will be included.
-   All methods of POCOs and interfaces will be excluded

\* _Controller and Directive action methods are not effected by this setting_

### GraphNamingFormatter

```csharp
// usage examples
schemaOptions.DeclarationOptions.GraphNamingFormatter = new GraphNameFormatter(...);
```

An object that will format any internal name of a class or method to an acceptable name for use in the object graph.

| Entity Type      | Default Format | Examples                             |
| ---------------- | -------------- | ------------------------------------ |
| Graph Type Names | Pascal Casing  | `Donut`, `BigHorse`, `SpeakerSystem` |
| Field Names      | Camel Casing   | `flavor`, `minWidth`, `firstName`    |
| Enum Values      | All Caps       | `CHOCOLATE`, `FEET`, `PHONE_NUMBER`  |
_Default formats for the three different entity types_

> To make radical changes to your name formats, beyond the available options, inherit from `GraphNameFormatter` and override the different formatting methods.

## Execution Options

### EnableMetrics
```csharp
// usage examples
schemaOptions.ExecutionOptions.EnableMetrics = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, metrics and query profiling will be enabled for all queries processed for a given schema.

### QueryTimeout

```csharp
// usage examples
schemaOptions.ExecutionOptions.QueryTimeout = TimeSpan.FromMinutes(2);
```

| Default Value | Acceptable Values          |
| ------------- | -------------------------- |
| null          | Minimum of 10 milliseconds |

The amount of time an individual query will be given to run before being abandoned and canceled by the runtime. By default, the timeout is disabled and a query will continue to execute as long as the underlying HTTP request is also executing.

### DebugMode

```csharp
// usage examples
schemaOptions.ExecutionOptions.DebugMode = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, each field and each list member of each field will be executed sequentially rather than asynchronously. All asynchronous methods will be individually awaited and allowed to throw immediately. A single encountered exception will halt the entire query process. This can be very helpful in preventing a jumping debug cursor as query branches are normally executed in parallel.  This option will greatly impact performance and can cause inconsistent query results if used in production. It should only be enabled for [debugging](../development/debugging).

### ResolverIsolation

```csharp
// usage examples
schemaOptions.ExecutionOptions.ResolverIsolation = ResolverIsolationOptions.ControllerActions | ResolverIsolation.Properties;
```

| Default Value | 
| ------------- | 
| `ResolverIsolation.None` |

Resolver types identified in `ResolverIsolation` are guaranteed to be executed independently. This is different than `DebugMode`. In Debug mode a single encountered error will end the request whereas errors encountered in isolated resolvers will still be aggregated. This allows the returning partial results which can be useful in some use cases. 

### MaxQueryDepth

```csharp
// usage examples
schemaOptions.ExecutionOptions.MaxQueryDepth = 15;
```

| Default Value | Acceptable Values      |
| ------------- | ---------------------- |
| -_not set_-   | Integer Greater than 0 |

The maximum allowed [field depth](../execution/malicious-queries) of any child field within a given query. If a child is nested deeper than this value the query will be rejected.

### MaxQueryComplexity

```csharp
// usage examples
schemaOptions.ExecutionOptions.MaxQueryComplexity = 50.0f;
```

| Default Value | Acceptable Values    |
| ------------- | -------------------- |
| -_not set_-   | Float Greater Than 0 |

The maximum allowed [complexity](../execution/malicious-queries) value of a query. If a query is scored higher than this value it will be rejected.

## Response Options

### ExposeExceptions

```csharp
// usage examples
schemaOptions.ResponseOptions.ExposeExceptions = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, exception details including message, type and stack trace will be sent to the requestor as part of any error messages. Setting this value to true can expose sensitive server details and is considered a security risk. Disable in any production environments.

### ExposeMetrics

```csharp
// usage examples
schemaOptions.ResponseOptions.ExposeMetrics = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, the full Apollo trace gathered when a query is executed is sent to the requestor. This value is disregarded unless `ExecutionOptions.EnableMetrics` is set to true.

### AppendServerHeader

```csharp
// usage examples
schemaOptions.ResponseOptions.AppendServerHeader = true;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `true`        | `true`, `false`   |

When true, an `X-PoweredBy` header is added to the outgoing response to indicate it was generated from graphql. This option has no effect when a custom `HttpProcessorType` is declared.

### MessageSeverityLevel

```csharp
// usage examples
schemaOptions.ResponseOptions.AppendServerHeader = GraphMessageSeverity.Information;
```
| Default Value                      | Acceptable Values                      |
| ---------------------------------- | -------------------------------------- |
| `GraphMessageSeverity.Information` | \-_any `GraphMessageSeverity` value_\- |

Indicates which messages generated during a query should be sent to the requestor. Any message with a value at or above the provided level will be delivered.

### TimeStampLocalizer

```csharp
// usage examples
schemaOptions.ResponseOptions.TimeStampLocalizer = (dtos) => dtos.DateTime;
```

| Func<DateTimeOffset, DateTime>    |
| --------------------------------- |
| `(dtOffset) => dtOffset.DateTime` |

A function to convert any timestamps present in the output into a value of a given timezone. By default no localization occurs and all times are delivered in their native `UTC-0`. This localizer does not effect any query data values, only those messaging related components.

## QueryHandler Options

### DisableDefaultRoute

```csharp
// usage examples
schemaOptions.QueryHandler.DisableDefaultRoute = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When set to true the default handler and query processor will not be registered with the ASP.NET runtime when the application starts.

### Route

```csharp
// usage examples
schemaOptions.QueryHandler.Route = "/graphql";
```

| Default Value |
| ------------- |
| `/graphql`    |

Represents the REST end point where GraphQL will listen for new POST requests. In multi-schema configurations this value will need to be unique per schema type.

### AuthenticatedRequestsOnly

```csharp
// usage examples
schemaOptions.QueryHandler.AuthenticatedRequestsOnly = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, only those requests that are successfully authenticated by the ASP.NET runtime will be passed to GraphQL. Should an unauthenticated request make it to the graphql query processor it will be immediately rejected. This option has no effect when a custom `HttpProcessorType` is declared.

### HttpProcessorType

```csharp
// usage examples
schemaOptions.QueryHandler.HttpProcessorType = typeof(MyProcessorType);
```

| Default Value |
| ------------- |
| `null` |

When set to a type, GraphQL will attempt to load the provided type from the configured DI container in order to handle graphql requests. Any class wishing to act as an Http Processor must implement `IGraphQLHttpProcessor`. In most cases it may be easier to extend `DefaultGraphQLHttpProcessor<TSchema>`.

## Subscription Server Options
These options are available to configure a subscription server for a given schema via `.AddSubscriptions(serverOptions)` or `.AddSubscriptionServer(serverOptions)`

### DisableDefaultRoute

```csharp
// usage examples
serverOptions.DisableDefaultRoute = false;
```
| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false `       | `true`, `false`   |

When true, GraphQL will not register a component to listen for web socket requests. You must handle the acceptance of web sockets yourself and inform the subscription server that a new one exists. If you wish to implement your own web socket middleware handler, viewing [DefaultGraphQLHttpSubscriptionMiddleware<TSchema>](https://github.com/graphql-aspnet/graphql-aspnet/blob/master/src/graphql-aspnet-subscriptions/Defaults/DefaultGraphQLHttpSubscriptionMiddleware.cs) may help.


### Route

Similar to the query/mutation query handler route this represents the path the default subscription middleware will look for when accepting new web sockets

```csharp
// usage examples
serverOptions.Route = "/graphql";
```

| Default Value |
| ------------- |
| `/graphql`    |


Represents the http end point where GraphQL will listen for new requests. In multi-schema configurations this value will need to be unique per schema type.

### HttpMiddlewareComponentType

The middleware component GraphQL will inject into the ASP.NET pipeline to intercept new web socket connection requests.

```csharp
// usage examples
serverOptions.HttpMiddlewareComponentType = typeof(MyMiddleware);
```

| Default Value |
| ------------- |
| `null`    |

When null, `DefaultGraphQLHttpSubscriptionMiddleware<TSchema>` is used.

### KeepAliveInterval

The interval at which the subscription server will send a message to a connected client informing it the connection is still open.

```csharp
// usage examples
serverOptions.KeepAliveInterval = TimeSpan.FromMinutes(2);
```

| Default Value |
| ------------- |
| `2 minutes`    |

This is a different keep alive than the websocket-level keep alive interval. The default apollo subscription server implementation uses this value to know when to send its "CONNECTION_KEEP_ALIVE" message type to a client.

### MessageBufferSize

The size of the message buffer, in bytes used to extract and deserialize a message being received from a connected client.

```csharp
// usage examples
serverOptions.MessageBufferSize = 4 * 1024;
```

| Default Value |
| ------------- |
| `4kb`    |


### MaxConcurrentClientNotifications

The maximum number of connected clients a server will attempt to communicate with at one time.

```csharp
// usage examples
serverOptions.MaxConcurrentClientNotifications = 50;
```

| Default Value | Minimum Value |
| ------------- | ----------------- |
| `50`       | `1`   |

If for instance, there are 100 connected clients, all of which are subscribed to the same event, the subscription server will attempt to communicate new data to at most 50 of them at one time with remaining clients being queued and notified as the original 50 acknowledge the event. This can help throttle resources and prevent a subscription server from being overloaded.

### RequireAuthenticatedConnection

Deteremines if a web socket request will be accepted in an unauthenticated state or not.

```csharp
// usage examples
serverOptions.RequiredAuthenticatedConnection = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false `       | `true`, `false`   |

When set to true, the subscription middleware will immediately reject any websocket requests from un-authenticated sources. This option does not include query authorization (i.e. can the user access the fields they are requesting). That occurs after the websocket is established.

When set to false, the subscription middleware will initially accept all web socket requests.



## Global Configuration Settings
Global settings effect the entire server instance, they are not restricted to a single schema registration. Instead they should be set before calling `.AddGraphQL()`
```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
   // setup any global configuration options before 
   // calling AddGraphQL()
   GraphQLProviders.GlobalConfiguration.CONFIG_OPTION_NAME

   services.AddGraphQL();
}
```
### ControllerServiceLifetime
```csharp
GraphQLProviders.GlobalConfiguration.ControllerServiceLifetime = ServiceLifetime.Transient
```


| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `Transient `       | `Transient`, `Scoped`, `Singleton`   |

The configured service lifetime is what all controllers and directives will be registered as within the DI container during schema setup.

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
   // All controllers will be registered as Scoped
   GraphQLProviders.GlobalConfiguration.ControllerServiceLifetime = ServiceLifetime.Scoped;
   services.AddGraphQL();
}
```
If you need to register only one or two controllers as a different scope add them to the DI container prior to calling `.AddGraphQL()`

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
   // MyController will be registered as Scoped
   services.AddScoped<MyController>();

   // all other controllers will be registered as Transient
   services.AddGraphQL();
}
```