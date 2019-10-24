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

### AddGraphType

```csharp
// usage examples
schemaOptions.AddGraphType<Type>()
schemaOptions.AddGraphType(typeof(MyMiddleware))
```
Adds the single graph entity to the schema. Use this method to add individual types, interfaces, directives, controllers or enumerations.

### AddSchemaAssembly

```csharp
// usage examples
schemaOptions.AddSchemaAssembly()
```

When using .`AddGraphQL<TSchema>()` on multi-schema servers, the runtime will scan the assembly where the schema is declared and auto-include any found graph entities (controllers, types enums etc.) on the schema.

### AddGraphAssembly

```csharp
// usage examples
schemaOptions.AddGraphAssembly(Assembly)
```

The runtime will scan the referenced assembly and auto-include any found graph entities (controllers, types enums etc.) on the schema.

### AutoRegisterLocalGraphEntities
```csharp
// usage examples
schemaOptions.AutoRegisterLocalGraphEntities = true;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `true`        | `true`, `false`   |

When true those graph entities (controllers, types, enums etc.) that are declared in the entry assembly for the application are automatically registered to the schema.

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


## Execution Options

### EnableMetrics
```csharp
// usage examples
schemaOptions.ExecutionOptions.EnableMetrics = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, metrics / query profiling will be enabled for all queries processed for a given schema.

### QueryTimeout

```csharp
// usage examples
schemaOptions.ExecutionOptions.QueryTimeout = TimeSpan.FromMinutes(2);
```

| Default Value | Acceptable Values          |
| ------------- | -------------------------- |
| 1 Minute      | Minimum of 10 milliseconds |

The amount of time an individual query will be given to run to completion before being abandoned and canceled by the runtime.

### AwaitEachRequestedField

```csharp
// usage examples
schemaOptions.ExecutionOptions.AwaitEachRequestedField = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, each field and each list member of each field will be executed sequentially rather than asynchronously. This option will greatly impact performance and should only be enabled for [debugging](../development/debugging).

### MaxQueryDepth

```csharp
// usage examples
schemaOptions.ExecutionOptions.MaxQueryDepth = 15;
```

| Default Value | Acceptable Values      |
| ------------- | ---------------------- |
| -_not set_-   | Integer Greater than 0 |

The allowed [field depth](../execution/malicious-queries) of any child field within a given query. If a child is nested deeper than this value the query will be rejected.

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

Represents the http end point where GraphQL will listen for new requests. In multi-schema configurations this value will need to be unique per schema type.

### AuthenticatedRequestsOnly

```csharp
// usage examples
schemaOptions.QueryHandler.AuthenticatedRequestsOnly = false;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `false`       | `true`, `false`   |

When true, only those requests that are successfully authenticated by the ASP.NET runtime will be passed to graphQL. Should an unauthenticated request make it to the graphql query processor it will be immediately rejected. This option has no effect when a custom `HttpProcessorType` is declared.

### HttpProcessorType

```csharp
// usage examples
schemaOptions.QueryHandler.HttpProcessorType = typeof(MyProcessorType);
```

| Default Value |
| ------------- |
| `null` |

When set to a type, GraphQL will attempt to load the provided type from the configured DI container in order to handle graphql requests. Any class wishing to act as an Http Processor must inherit from `IGraphQLHttpProcessor`. It is perhaps easier to extend `DefaultGraphQLHttpProcessor<TSchema>` for most small operations such as handling metrics.
