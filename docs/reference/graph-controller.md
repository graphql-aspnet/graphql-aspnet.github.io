---
id: graph-controller
title: Graph Controller
sidebar_label: GraphController
sidebar_position: 4
---

✅ See the section on [Controllers & Actions](../controllers/actions.md) for a detailed explination on how action methods work and how to declare them.

The `GraphController`, from which all of your controllers inherit, is a core object used throughout graphql. This page details some lesser known and lesser used object referenced made available to each controller.

## ModelState

The completed model state dictionary contains an entry for each validated parameter.

```csharp
public class CharacterController : GraphController
{
    [Query]
    public IGraphActionResult CreateCharacter(Character characterModel)
    {
        // highlight-next-line
        if(!this.ModelState.IsValid)
            return this.BadRequest(this.ModelState);

        //...
    }
}
```

## Request
The field request generated via the execution pipeline. It contains all the necessary information used by graphql to resolve the current field.

```csharp
public class CharacterController : GraphController
{
    [Query]
    public IGraphActionResult Hero(Episode episode = Episode.EMPIRE)
    {
        // highlight-next-line
        if(this.Request.Field.IsLeaf)
        {
            // ...
        }
    }
}
```
### Notable Items on the Request
-   `Request.Field`: A reference to the graph field definition, on the target schema, for the field currently being resolved.

    -   `.TypeExpression`: The type expression describing the return value of this field
    -   `.IsLeaf`: Indicates whether this field returns a leaf value (enum or scalar) or an object.
    -   `.Mode`: Indicates the processing mode of this field (Batch or "per item")
    -   `.FieldSource`: Indicates what member type generated the field; property, method, action etc.
    -   `.DataSource`: The source data item being supplied to the field to be resolved.

-   `Request.Items`: A collection of key/value pairs accessible to all fields and directives in this individual request pipeline.

## User

The User property contains the `ClaimsPrincipal` created by ASP.NET when this request was authorized. 

```csharp
public class CharacterController : GraphController
{
    [Query]
    public IGraphActionResult Hero(Episode episode = Episode.EMPIRE)
    {
        // highlight-next-line
        if(this.User.Identity.Name == "DebbieEast")
        {
            // ...
        }
    }
}
```

> See the section on [authorization](../controllers/authorization.md) for more details on how users are authenticated and authorized to action methods.

## Schema

The `Schema` property contains a reference to the singleton instance of the schema the current controller is resolving a field for. This object is considered read-only and should not be modified.

```csharp
public class CharacterController : GraphController
{
    [Query]
    public IGraphActionResult Hero(Episode episode = Episode.EMPIRE)
    {
        // highlight-next-line
        IObjectGraphType droidType = this.Schema.KnownTypes.FindGraphType(typeof(Droid), TypeKind.OBJECT);
        // ...
    }
}
```
