---
id: interfaces
title: Interfaces
sidebar_label: Interfaces
sidebar_position: 2
---

Interfaces in GraphQL work like interfaces in C#, for the most part. They provide a contract for a set of common fields amongst different objects. When it comes to declaring them, the `INTERFACE` graph type works exactly like [object types](./objects).

By default, when creating an interface graph type, the library:

-   Will name the interface the same as its C# type name.
-   Will include all properties that have a getter.
-   Will ignore any methods.


```csharp title="IPastry.cs"
public interface IPastry
{
    int Id { get; set; }
    string Name { get; set; }
}
```
```graphql title="IPastry Type Definition"
interface IPastry {
  id: Int!
  name: String
}
```
> You can override the default settings in your [schema configuration](../reference/schema-configuration.md#fielddeclarationrequirements) or by use of the [GraphType](../reference/attributes.md#graphtype) and [GraphField](../reference/attributes.md#graphfield) attributes.

## Inheritance and Implmentations

The section on working with interfaces with [action methods](../controllers/actions#working-with-interfaces) provides a great discussion on proper usage but its worth pointing out here as well.

You must let GraphQL know of the possible object types which implement your interface. If your action method returns `IPastry` and you return a `Donut`, but didn't let GraphQL know about the `Donut` class, it won't be able to continue to resolve the requested fields as it won't know which resolvers to call. This is especially true if you use type restricted fragments or spreads.

```csharp title="BakeryController.cs"
public class BakeryController : GraphController
{
    // highlight-next-line
    [QueryRoot(typeof(Donut), typeof(Cake))]
    public IPastry SearchPastries(string name)
    {/* ... */}
}
```

```graphql title="Sample Query"
query {
    searchPastries(name: "chocolate*") {
        id
        name

        ...on Donut {
            isFilled
        }

        ...on Cake {
            icingFlavor
        }
    }
}
```

### Use it to Include it

Unless an interface is actually referenced as a return value of a field, be it from an action method or a model property, it won't be added to your schema and won't be visible to introspection queries. 

That is to say that when you register `Donut`, unless you specifically return `IPastry` from your application, GraphQL will leave it out of the schema. This goes a long ways in preventing security vulnerabilities and reducing clutter in your schema with all the interfaces you may declare internally. For instance, while common in .NET, its doubtful that you ever want to expose `IEnumerable` to your graph.

```csharp title="IPastry is never used"
public class BakeryController : GraphController
{
    [QueryRoot]
    public Donut FindDonut(string name)
    {/* ... */}
}

public class Donut : IPastry
{/*...*/}

// IPastry will be excluded from the schema since
// its not referenced in any controllers or other object properties.
public interface IPastry
{/*...*/}
```


```graphql title="Type Definitions"
# Donut is published on the schema
# but IPastry is not included
type Donut {
  id: Int!
  name: String
  ...
}
```

:::tip 
 Use `schemaOptions.AddGraphType<IPastry>()` during [schema configuration](../reference/schema-configuration) at startup to force GraphQL to publish the interface, even if its never used in the graph. This is true for any graph type.
:::

### Implmenting Other Interfaces

Interfaces implementing other interfaces worksa bit differently than it does in .NET.  Take for example, these two interfaces:

```csharp title="C# Interface Inheritance"
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

In .NET `IDonut`, by virtue of implementing `IPastry`, grants "access" to the `Id` and `Name` fields for any object that implements IDonut since said object must implement both interfaces to compile correctly. However, this is not the case with interfaces in your graphql schema. As said above, since interfaces are not automatically parsed the fields they define are also not automatically included in child interfaces.

```csharp title="Startup Code"
services.AddGraphQL(o => 
{
  // only include IDonut in the schema
  // highlight-next-line
   o.AddGraphType<IDonut>();
});
```

```graphql title="IDonut Type Definition"
# IDonut DOES NOT contain name or id
# because IPastry is not part of the schema
interface IDonut {
  flavor: String
}
```

However, GraphQL does support interface inheritance. As long as both interfaces are included as part of the schema then the fields will wire up as you'd expect.


```csharp title="Startup Code"
services.AddGraphQL(o => 
{
  // Include both interfaces
  // highlight-start
  o.AddGraphType<IPastry>();  
  o.AddGraphType<IDonut>();
  // highlight-end
});
```


```graphql title="Type Definitions"
interface IPastry {  
  id: Int!
  name: String
}

# IDonut DOES contain all the expected fields
# Since IPastry is included
// highlight-next-line
interface IDonut implements IPastry {  
  id: Int!
  name: String
  flavor: String
}
```

:::info
GraphQL will NOT attempt to include inherited fields unless the interface they are declared on is part the schema.
:::

## Interfaces are not Input Objects

The GraphQL specification states that "interfaces are never valid inputs" [[Spec § 3.7](https://graphql.github.io/graphql-spec/October2021/#sec-Interfaces)]. The runtime will reject any attempts to use an interface as a parameter to a method (i.e. a field argument) that is exposed on the graph.

```csharp title="Interfaces cannot be used as input arguments"
public class BakeryController : GraphController
{
    // ERROR!
    // A GraphTypeDeclarationException will be thrown
    [Mutation]
    // highlight-next-line
    public Donut AddNewDonut(IPastry newPastry)
    {/* ... */}
}
```

## Interface Names

Like with other graph types use the `[GraphType]` attribute to indicate a custom name for the interface in the object graph.


```csharp title="Interface Custom Name"
// highlight-next-line
[GraphType("Pastry")]
public interface IPastry
{
    int Id { get; set; }
    string Name { get; set; }
}
```

```graphql title="Graph Type Definition"
interface Pastry {
  id: Int!
  name: String
}
```


## Methods as Fields

By default, interface methods are excluded from being fields on the graph but can be added by tagging the method with `[GraphField]`.


```csharp title="Including a POCO method as a field"
public interface IPastry
{
    // highlight-next-line
    [GraphField("salesTax")]
    decimal CalculateSalesTax(decimal taxPercentage);

    int Id { get; set; }
    string Name { get; set; }
    decimal Price { get; set; }
}
```

```graphql title="IPastry Type Definition"
inteface IPastry {
  // highlight-next-line
  salesTax (taxPercentage: Decimal!): Decimal!
  id: Int!
  name: String
  price: Decimal!
}
```
Just as with [controller actions](../controllers/actions), GraphQL will analyze the signature of the method to determine its return type, expression requirements and input arguments.

> Methods on interfaces lack many of the features of controllers such as being able to perform [model state](../controllers/model-state) validation or provide access to `this.User` and `this.Request`. 

## Excluding Fields

To exclude a single property that you don't want to expose to GraphQL add the `[GraphSkip]` attribute to it:

```csharp title="Excluding a property"
public interface IPastry
{
    int Id { get; set; }
    string Name { get; set; }

    // highlight-next-line
    [GraphSkip]
    decimal Price { get; set; }
}
```

```graphql title="IPastry Type Definition"
interface IPastry {
  id: Int!
  name: String
  # price is not included
}
```
Or force GraphQL to skip all fields except those you explicitly define with a `[GraphField]` attribute:

```csharp title="Require explicit declarations for this type"
// highlight-next-line
[GraphType(FieldDeclarationRequirements = TemplateDeclarationRequirements.RequireAll)]
public interface IPastry
{
    [GraphField]
    int Id { get; set; }

    [GraphField]
    string Name { get; set; }

    decimal Price { get; set; }
}
```

```graphql title="IPastry Type Definition"
# only id and name are included
interface IPastry {
  id: Int!
  name: String
}
```

Or set a schema-wide option during startup:

```csharp title="Set Field Declaration Requirements at Startup"
services.AddGraphQL(options =>
  {
      options.DeclarationOptions.FieldDeclarationRequirements = TemplateDeclarationRequirements.RequireAll;
  });
```

Your schema will follow a cascading model of inclusion rules in order of increasing priority from `schema -> class -> field` level declarations. This can be useful in multi-schema setups where a class may be shared but you don't want the exposed fields to be different or if there is a secure field that you want to guarantee is not exposed regardless of the schema.

## Forced Interface Exclusions

Perhaps there exists an interface in a shared assembly used amongst multiple work teams that contains some utility classes that absolutely, positively CANNOT be exposed to GraphQL at any cost. 

In these cases, add `[GraphSkip]` to an interface and GraphQL will throw a `GraphTypeDeclarationException` if its ever asked to include it in a schema. 

```csharp title="Prevent a Type from EVER Being Included in the Graph"
// ERROR, GraphTypeDeclarationException will be thrown!
[GraphSkip]
public interface IPastry
{
    int Id { get; set; }
    string Name { get; set; }
    decimal Price { get; set; }
}
```

> This rule is enforced at the template level and is applied to the `System.Type`. Its not specific to the `INTERFACE` graph type. Any class, interface, enum etc. with the `[GraphSkip]` attribute will be permanantly skipped.