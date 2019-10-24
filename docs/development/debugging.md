---
id: debugging
title: Debugging Your Schema
sidebar_label: Debugging
---

## Disable Field Asynchronousity

GraphQL will execute sibling fields asynchronously during normal operation. However, during a debugging session having multiple fields trying to resolve themselves, especially when tied to database operations, can play havoc with your debug cursor. If you've ever encountered a situation where the yellow line in Visual Studio seemly jumps around to random lines of code you've experienced this issue.

At startup it helps to disable asynchronous field resolution and instead force each field to execute in sequential order awaiting its completion before beginning the next one. Don't forget to disable this in production though as awaiting fields individually will significantly impact performance.

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddGraphQL(options =>
        {
            options.ExecutionOptions.AwaitEachRequestedField = true;
        });
}
```

## Increase the Query Timeout

GraphQL will automatically abandon long running queries to prevent a resource drain. It may be helpful to up this timeout length in development. By default the timeout is `1 minute`.

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddGraphQL(options =>
        {
            options.ExecutionOptions.QueryTimeout = TimeSpan.FromMinutes(30);
        });
}
```
