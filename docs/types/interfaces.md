---
id: interfaces
title: Interfaces
sidebar_label: Interfaces
---

Interfaces in GraphQL work like interfaces in C#. They provide a contract for a set of common fields of different objects. In regards to declarations, the `INTERFACE` graph type works exactly like [object types](./objects).

By Default, when creating an interface graph type GraphQL:

-   Will name the interface the same as its C# type name.
-   Will include all properties that have a getter.
-   Will ignore any methods.

<div class="sideBySideCode hljs">
<div>

```csharp
// IPastry.cs
public interface IPastry
{
    int Id { get; set; }
    string Name { get; set; }
}
```

</div>
<div>

```
// GraphQL Type Definition
interface IPastry {
  id: Int!
  name: String
}
```

</div>
</div>

## Object Graph Types Must be Known

The section on [working with interfaces](../controllers/actions#working-with-interfaces) with action methods provides a great discussion on proper usage but its worth pointing out here as well.

> When a method returns an interface, GraphQL still needs to be told of the OBJECT types that implement that interface.
>
> (i.e. If your schema contains `IPastry` it must also contain `Cake` and `Donut`.)

Since an interface graph type contains no implementation details, an object graph type is always matched to any retrieved data to provide instructions on how to proceed with child field resolution.

You must let GraphQL know of the possible object types you intend to return as the interface. If your action method returns `IPastry` and you return a `Donut`, but didn't let GraphQL know about the `Donut` class, it won't be able to continue to resolve the requested fields and fail.

Most of the time GraphQL is smart enough to figure out which object types you're referencing by looking at the complete scope of actions and objects in your schema and won't bug you about it. But the steps outlined with defining action methods describe ways to ensure you have no issues.

## Use It To Include It

When GraphQL ASP.NET starts building a schema it will read the interfaces attached to any model classes it finds and stage them in a special holding area. However, unless an interface is actually referenced as a return value of a field, be it from an action method or a model property, it won't be added to your schema and won't be visible to introspection queries. That is to say that when you register `Donut`, unless you specifically return `IPastry` from your application, GraphQL will leave it out of the schema. This goes a long ways in preventing clutter in your schema with all the interfaces you may declare internally.

<div class="sideBySideCode hljs">
<div>

```csharp
public class BakeryController : GraphController
{
    [QueryRoot]
    public Donut FindDonut(string name)
    {/* ... */}
}

public class Donut : IPastry
{/*...*/}

// IPastry will be excluded from the schema since
// its not referenced in any controllers
public interface IPastry
{/*...*/}
```

</div>
<div>

```
// Donut is published on the schema
// without IPastry
type Donut {
  id: Int!
  name: String
  ...
}
```

</div>
</div>

Of course if you call `.AddGraphType<IPastry>()` during [schema configuration](../reference/schema-configuration) GraphQL will happily publish the type even if its never used in the graph.

## Interfaces are not Input Objects

The GraphQL specification states that "interfaces are never valid inputs" [Spec § [3.7](https://graphql.github.io/graphql-spec/October2021/#sec-Interfaces)]. As a result the runtime will reject any attempts to use an interface as an action method parameter.

```csharp
public class BakeryController : GraphController
{
    // ERROR!
    // A GraphTypeDeclarationException will be thrown
    [Mutation]
    public Donut AddNewDonut(IPastry newPastry)
    {/* ... */}
}

public class Donut : IPastry
{/*...*/}
```

An exception to this is with [type extensions](../controllers/type-extensions). A type extension is supplied the object reference returned from the parent-field to assist in child-field resolution and this can be an interface reference, specifically the interface returned by the parent field. Since this method parameter is not exposed on the object graph there is no violation of the specification.

## Interface Names

Like with other graph types use the `[GraphType]` attribute to indicate a custom name for the interface in the object graph.

<div class="sideBySideCode hljs">
<div>

```csharp
// Donut.cs
[GraphType("Pastry")]
public interface IPastry
{
    int Id { get; set; }
    string Name { get; set; }
}
```

</div>
<div>

```
// GraphQL Type Definition
interface Pastry {
  id: Int!
  name: String
}
```

</div>
</div>
