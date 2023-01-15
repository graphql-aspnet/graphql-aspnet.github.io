---
id: graph-directive
title: Graph Directive
sidebar_label: GraphDirective
sidebar_position: 5
---
✅ See the section on [Directives](../advanced/directives.md) for a detailed explination on how directive action methods work and how to declare them.

The `GraphDirective`, from which all of your directives inherit, is a core object used throughout graphql. This page details some lesser known and lesser used object referenced made available to each directive.


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

### Notable Items on the Request

-   `Request.Directive`: Useful metadata related to the directive type being resolved.
-   `Request.LifeCycle`: The enumeration value indicating which life cycle point is being executed.
-   `Request.DirectiveLocation`: Indicates location in the query text this directive instance is currently being executed.
-   `Request.DataSource`: The source data item being supplied to the field to be resolved.
-   `Request.Items`: A collection of key/value pairs accessible to all fields and directives in this individual request pipeline.

## User

The `ClaimsPrincipal` created by ASP.NET when this request was authorized.

```csharp
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


## Schema

The `Schema` property contains a reference to the singleton instance of the schema the current controller is resolving a field for. This object is considered read-only and should not be modified.

```csharp
public class AllowDirective : GraphDirective
{
    public IGraphActionResult BeforeResolution(FilterModel model)
    {
        // highlight-next-line
        IObjectGraphType droidType = this.Schema.KnownTypes.FindGraphType(typeof(Droid), TypeKind.OBJECT);
        // ...
    }
}
```
:::caution
 For type system directives, executed as part of schema construction, the schema object available may be incomplete or null. Avoid using and do not rely on the data in `this.Schema` for type system directives.
:::