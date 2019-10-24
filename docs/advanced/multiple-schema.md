---
id: multi-schema-support
title: Multi-Schema Support
sidebar_label: Multi-Schema Support
---

GraphQL ASP.NET supports multiple schemas on the same server out of the box. Each schema is recognized by the runtime by its concrete type. To register multiple schemas you'll need to implement your own type that inherits from `ISchema`

## Implement ISchema

While it is possible to implement directly from `ISchema` if you don't require any extra functionality in your schema its easier to just subclass the default schema.

```csharp
public class EmployeeSchema : GraphSchema
{
    public override string Name => "Employee Schema";
}

public class CustomerSchema : GraphSchema
{
    public override string Name => "Customer Schema";
}
```

## Register Each Schema

Each schema can be registered using an overload of `.AddGraphQL()` during startup.

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // other configuration entries omitted for brevity

    services.AddGraphQL<EmployeeSchema>((options) =>
        {
            options.AutoRegisterLocalGraphEntities = false;
            options.QueryHandler.Route = "/graphql_employees";
            // add assembly or graph type references here
        });

    services..AddGraphQL<CustomerSchema>((options) =>
        {
            options.AutoRegisterLocalGraphEntities = false;
            options.QueryHandler.Route = "/graphql_customers";
            // add assembly or graph type references here
        });
}
```

#### Disable Local Graph Entity Registration

You'll most likely want to disable registering of local graph entities (the entities in the startup assembly) on one or both schemas lest you want each schema contain those controllers and graph types.

#### Give Each Schema its Own HTTP Route

GraphQL ASP.NET will attempt to register a schema to `/graphql` for it to receive POST requests. You'll want to ensure that each schema has its own endpoint by updating the individual routes.
