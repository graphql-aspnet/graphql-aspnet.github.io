---
id: debugging
title: Debugging Your Schema
sidebar_label: Debugging
sidebar_position: 0
---

## Disable Field Asynchronousity

GraphQL will execute sibling fields asynchronously during normal operation. This includes multiple top-level controller action calls. However, during a debugging session, having multiple fields trying to resolve themselves can play havoc with your debug cursor. If you've ever encountered a situation where the yellow line in Visual Studio seemly jumps around to random lines of code then you've experienced this issue.

At startup, it can help to disable asynchronous field resolution and instead force each field to execute in sequential order awaiting its completion before beginning the next one. 

```csharp title="Configure Debug Mode"    
services.AddGraphQL(options =>
{
    // Enable debug mode for the schema
    options.ExecutionOptions.DebugMode = true;
});
```
:::danger Performance Killer
Don't forget to disable debug mode in production though. Awaiting fields individually will _**significantly**_ impact performance.
:::