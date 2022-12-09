---
id: multi-schema-support
title: Multi-Schema Support
sidebar_label: Multi-Schema Support
sidebar_position: 5
---

GraphQL ASP.NET supports multiple schemas on the same server out of the box. Each schema is recognized by the runtime by its concrete type. To register multiple schemas you'll need to create your own type that implements `ISchema`

## Implement ISchema

While it is possible to implement `ISchema` directly, if you don't require any extra functionality in your schema its easier to just subclass the default schema.

```csharp title="Declaring Custom Schemas"
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

```csharp title="Adding A Custom Schema"
services.AddGraphQL<SchemaType>();
```

### Give Each Schema its Own HTTP Route

The query handler will attempt to register a schema to `/graphql` as its URL by default; you'll want to ensure that each schema has its own endpoint by updating the individual routes.

```csharp title="Adding Multiple Schemas"
services.AddGraphQL<EmployeeSchema>((options) =>
    {
        options.QueryHandler.Route = "/graphql_employees";
        // add assembly or graph type references here
    });

services.AddGraphQL<CustomerSchema>((options) =>
    {
        options.QueryHandler.Route = "/graphql_customers";
        // add assembly or graph type references here
    });
```


## Disable Local Graph Entity Registration

You may want to disable the registering of local graph entities (the entities in the startup assembly) on one or both schemas lest you want each schema to contain the same controllers and graph types.

```csharp title="Startup Code"
// Optionally Disable Local Entity Registration
services.AddGraphQL<EmployeeSchema>(o => 
{
    o.AutoRegisterLocalEntities = false;
});
```