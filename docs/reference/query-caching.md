---
id: query-cache
title: Query Caching
sidebar_label: Query Caching
---

When GraphQL ASP.NET parses a query, it generates a query plan that contains all the required data needed to execute the requested operation. For most queries this process is near instantaneous but in some particularly large queries it may take an extra moment to generate a full query plan. The query cache will help alleviate this bottleneck by caching a plan for a set period of time to skip the parsing and generation phases when completing a request.

The query cache makes a concerted effort to only cache plans that are truly unique and thus it will take a moment to analyze the incoming query to see if it identical to one that is already cached. For small queries the amount of time it takes to scrub the query text and look up a plan in the cache could be _as long_ as reparsing the query (200-300μs).

Consider using the Query Cache only if:

-   Your application's individual query size is regularly more than 1000 characters in length
-   You make use of a lot of interface graph types and a lot of object graph types for each of those interfaces.
-   When [Profiling](../execution/metrics) reveals a bottleneck in the `parsing` phase of any given query.

## Enabling the Query Cache

At startup, inject the query cache into the service collection. The cache itself is schema agnostic.

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    service.AddGraphQLLocalQueryCache();

    services.AddGraphQL();
}
```

**Note:** Because a query plan contains function pointers and references to local types, the default query cache is currently restricted to being in-process for a single server instance. Query Plan serialization for a shared cache such as Redis is on the road map after v1.0 is complete. If you would like to contribute in this area please reach out!
