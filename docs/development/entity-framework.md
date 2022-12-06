---
id: entity-framework
title: Using Entity Framework
sidebar_label: Entity Framework
---

## DbContext and Parallel Query Operations
In a standard REST application we would register our `DbContext` like so:

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<AppDbContext>(o =>
        {
            o.UseSqlServer("<connectionString>");
        });
}
```
This default registration adds the `DbContext` to the DI container is as a `Scoped` service. Meaning one instance is generated per Http request. However, consider the following graph controller and query:


<div class="sideBySideCode hljs">
<div>

```csharp
// Some code omitted for brevity
public class FoodController : GraphController
{    
    private AppDbContext _context;
    public FoodController(AppDbContext context){}

    [QueryRoot]
    public IFood SearchMeat(string name){}

    [QueryRoot]
    public IFood SearchVeggies(string name){}
}
```

</div>
<div>

```js
// GraphQL Query
query {
    searchMeat(name: "steak*") {
        name
    }
    searchVeggies(name: "green*") {
        name
    }
}
```

</div>
</div>
<br/>

The `FoodController` contains two action methods both of which are executed by the query. This means two instances of the controller are needed, once for each field resolution, since they are executed in parallel. While the controller itself is registered with the DI container as transient the `DbContext` is not, it is shared between the controller instances.  This can result in an exception being thrown :

![Ef Core Error](../assets/ef-core-error.png)

This is caused by graphql attempting to execute both controller actions simultaneously. Ef Core will reject multiple active queries. There are a few ways to handle this and each comes with its own trade offs:

## Register DbContext as Transient

One way to correct this problem is to register your DbContext
as a transient object.

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<AppDbContext>(o =>
        {
            o.UseSqlServer("<connectionString>");
        }, ServiceLifetime.Transient);
}
```
Now each controller instance will get its own DbContext and the queries can execute in parallel without issue. 

The tradeoff here is that you lose the singular scoped unit-of-work for the whole request granted by the shared context. 

If you have services registered to the DI container that make use of the DbContext you would want to register them as `Transient` as well lest one scoped service be created for the request trapping a single DbContext instance. Sometimes, however; this is unavoidable, especially with legacy code...

## Execute Controller Actions in Isolation
Another option is to instruct graphql to execute its controller actions in sequence, rather than in parallel. 

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddGraphQL(o =>
        {
            o.ExecutionOptions.ResolverIsolation = ResolverIsolationOptions.ControllerActions;
        }
}
```
This will instruct graphql to execute each encountered controller action one after the other. Your scoped `DbContext` would then be able to process the queries without issue.

The tradeoff with this method is an increase in processing time since the methods are called in sequence. All other field resolutions would be executed in parallel.

If your application has other resources or services that may have similar restrictions, it can be beneficial to isolate the other resolver types as well. You can add them to the ResolverIsolation configuration option as needed.
