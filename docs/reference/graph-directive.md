---
id: graph-directive
title: Graph Directive
sidebar_label: GraphDirective
---

These are some useful properties of a `GraphDirective` available to all life cycle methods at runtime.

## ModelState

The completed model state dictionary with an entry for each validated parameter **of the directive**. The model state for the field being resolved is not accessible by the directive.

```csharp
public class AllowDirective : GraphDirective
{
    public IGraphActionResult BeforeResolution(FilterModel model)
    {
        if(!this.ModelState.IsValid)
            return this.BadRequest(this.ModelState);

        //...
    }
}
```

## Request

The individual directive request spawned from the field pipeline.

```csharp
public class AllowDirective : GraphDirective
{
    public IGraphActionResult BeforeResolution(FilterModel model)
    {
        if(this.Request.SourceData is Human human)
        {
            // ...
        }
    }
}
```

-   `Request.Directive`: Useful metadata related to the directive type being resolved.
-   `Request.LifeCycle`: The enumeration value indicating which life cycle point is being executed.
-   `Request.DirectiveLocation`: Indicates location in the query text this directive instance is currently being executed.
-   `Request.DataSource`: The source data item being supplied to the field to be resolved.
-   `Request.Items`: A collection of key/value pairs accessible to all fields and directives in this individual request pipeline.

## User

The `ClaimsPrincipal` created by ASP.NET when this request was authorized.

```csharp
// C# Controller
public class MyCustomDirective : GraphDirective
{
    public IGraphActionResult BeforeResolution(FilterModel model)
    {
        if(this.User.Identity.Name == "DebbieEast")
        {
            // ...
        }
    }
}
```
