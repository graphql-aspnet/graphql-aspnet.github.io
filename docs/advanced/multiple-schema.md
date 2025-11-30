---
id: multi-schema-support
title: Multi-Schema Support
sidebar_label: Multi-Schema Support
sidebar_position: 6
---

GraphQL ASP.NET supports multiple schemas on the same server out of the box. Each schema is recognized by its concrete .NET type. 

## Create a Custom Schema

To register multiple schemas you'll need to create your own class that implements `ISchema`. While it is possible to implement `ISchema` directly, if you don't require any extra functionality in your schema its easier to just inherit from the default `GraphSchema`. Updating the `Name` and `Description` is highly encouraged as the information is referenced in several different messages and can be very helpful in debugging.

```csharp title="Declaring Custom Schemas"
// highlight-next-line
public class EmployeeSchema : GraphSchema
{
    // The schema name may be referenced in some error messages
    // and log entries.
    public override string Name => "Employee Schema";

    // The description is publically available via introspection queries.
    public override string Description => "Employee Related Data";
}

// highlight-next-line
public class CustomerSchema : GraphSchema
{
    public override string Name => "Customer Schema";
    public override string Description => "Customer Related Data";
}
```

> Implementing `ISchema` and its dependencies from scratch is not a trivial task and is beyond the scope of this documentation.


## Register Each Schema

Each schema can be registered using an overload of `.AddGraphQL()` during startup.

By default, the query handler will attempt to register a schema to `/graphql` as its URL. You'll want to ensure that each schema has its own endpoint by updating individual routes as necessary. 

```csharp title="Adding Multiple Schemas"
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGraphQL<EmployeeSchema>((options) =>
{
    // highlight-next-line
    options.QueryHandler.Route = "/graphql_employees";
    // add assembly or graph type references here
});

builder.Services.AddGraphQL<CustomerSchema>((options) =>
{
    // highlight-next-line
    options.QueryHandler.Route = "/graphql_customers";
    // add assembly or graph type references here
});

var app = builder.Build();

// highlight-next-line
app.UseGraphQL();
app.Run();
```

:::note
Each schema **must** be configured to use its own endpoint.
:::

## Disable Local Graph Entity Registration

(optional) You may want to disable the registering of local graph entities (the entities in the startup assembly) on one or both schemas lest you want each schema to contain the same controllers and graph types.

```csharp title="Startup Code"
// Optionally Disable Local Entity Registration
services.AddGraphQL<EmployeeSchema>(o => 
{
    // highlight-next-line
    o.AutoRegisterLocalEntities = false;
});
```