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

When GraphQL starts building a schema it will read the interfaces attached to any model classes it finds and stage them in a special holding area. However, unless an interface is actually referenced as a return value of a field, be it from an action method or a model property, it won't be added to your schema and won't be visible to introspection queries. That is to say that when you register `Donut`, unless you specifically return `IPastry` from your application, GraphQL will leave it out of the schema. This goes a long ways in preventing clutter in your schema with all the interfaces you may declare internally.

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

<br/>
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
// IPastry.cs
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


## Inheritance

Interface inheritance in GraphQL works differently than it does in .NET.  Take for example, these two interfaces:


```csharp
public interface IPastry
{
    int Id { get; set; }
    string Name { get; set; }
}

public interface IDonut : IPastry
{
    string Flavor{ get; set; }
}

```

In .NET `IDonut`, by virtue of implementing `IPastry`, grants "access" to the Id and Name fields for any object that implements IDonut since said object must implement both interfaces to compile correctly. This is not the case in GraphQL. GraphQL does not attempt to walk or parse any interfaces that are not part of the schema. An interface is added to the schema if its expliclty added at start up or indicated as an allowed return type from one of your controller methods or object fields. This allows you to safely manage your internal interfaces like `IList<T>` without worry that GraphQL will see them and try parse them. 

This can create some less than wanted scenarios. For instance, if only `IDonut` is part of the schema, the fields for `Id` and `Name` won't be seen nor made available in the graph, even though its understandable that you'd want them to be.


<div class="sideBySideCode hljs">
<div>

```csharp
// Startup.cs
services.AddGraphQL(o => 
{
   o.AddGraphType<IDonut>();
});
```

</div>
<div>

```
# IDonut does NOT contain name or id
# because IPastry is not part of the schema
interface IDonut {
  flavor: String
}
```
</div>
</div>
<br/>

However, since the October 2021 update, GraphQL now supports interface inheritance. As a result, as long as both interfaces are included as part of the schema then the fields will wire up as you'd expect.

<div class="sideBySideCode hljs">
<div>

```csharp
// Startup.cs
services.AddGraphQL(o => 
{
  o.AddGraphType<IPastry>();
  o.AddGraphType<IDonut>();
});
```

</div>
<div>

```
interface IPastry {  
  id: Int!
  name: String
}

// IDonut DOES contain name and id
// when IPastry is part of the graph
interface IDonut implements IPastry {  
  id: Int!
  name: String
  flavor: String
}


```
</div>
</div>
<br/>

> GraphQL will NOT attempt to include fields from inherited interfaces unless they are part of the schema.



