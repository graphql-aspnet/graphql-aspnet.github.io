---
id: graph-controller
title: Graph Controller
sidebar_label: GraphController
---

The `GraphController`, from which all your controllers inherit, has some useful properties you can take advantage of.

## ModelState

The completed model state dictionary with an entry for each validated parameter.

```csharp
// C# Controller
public class CharacterController : GraphController
{
    [Query]
    public IGraphActionResult Hero(Episode episode = Episode.EMPIRE)
    {
        if(!this.ModelState.IsValid)
            return this.BadRequest(this.ModelState);

        //...
    }
}
```

## Request

The field request that initiated the action method call

```csharp
// C# Controller
public class CharacterController : GraphController
{
    [Query]
    public IGraphActionResult Hero(Episode episode = Episode.EMPIRE)
    {
        if(this.Request.Field.IsLeaf)
        {
            // ...
        }
    }
}
```

-   `Request.Field`: Useful metadata related to the field being resolved.

    -   `.TypeExpression`: The type expression describing the return value of this field
    -   `.IsLeaf`: Indicates whether this field returns a leaf value (enum or scalar) or an object.
    -   `.Mode`: Indicates the processing mode of this field (Batch or "per item")
    -   `.FieldSource`: Indicates what member type generated this field; property, method, action etc.
    -   `.DataSource`: The source data item being supplied to the field to be resolved.

-   `Request.Items`: A collection of key/value pairs accessible to all fields and directives in this individual request pipeline.

## User

The `ClaimsPrincipal` created by ASP.NET when this request was authorized.

```csharp
// C# Controller
public class CharacterController : GraphController
{
    [Query]
    public IGraphActionResult Hero(Episode episode = Episode.EMPIRE)
    {
        if(this.User.Identity.Name == "DebbieEast")
        {
            // ...
        }
    }
}
```
