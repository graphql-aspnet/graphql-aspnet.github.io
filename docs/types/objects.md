---
id: objects
title: The Object Graph Type
sidebar_label: Objects
sidebar_position: 0
---

The `OBJECT` graph type is one of six fundamental types defined by GraphQL. We can think of a graph query like a tree and if [scalar values](./scalars), such as `string` and `int`, are the leafs then objects are the branches.

✅ Use a `class` or `struct` to identify an object type in a schema.

Here we've defined a `Donut` model class. The runtime will convert it, automatically, into an object graph type. If you're familiar with GraphQL's own type definition language the equivalent expression is shown below.

```csharp title="Donut.cs"
public class Donut
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DonutType Type { get; set; }
    public decimal Price { get; set; }
}
```

```graphql title="Donut Type Definition"
type Donut {
  id: Int!
  name: String
  type: DonutType!
  price: Decimal!
}
```

By Default, object graph types:

-   Are named the same as the `class` or `struct` name
-   Have all public properties with a `get` statement included as fields
    -   The return type of a property must be of an acceptable type or it will be skipped

> You can override the default settings in your [schema configuration](../reference/schema-configuration.md#fielddeclarationrequirements) or by use of the [GraphType](../reference/attributes.md#graphtype) and [GraphField](../reference/attributes.md#graphfield) attributes.

## Custom Naming

Give the object a different name in the graph from that of your C# class with the `[GraphType]` attribute.

```csharp title="Declaring a Custom Type Name"
[GraphType("Doughnut")]
public class Donut
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DonutType Type { get; set; }
    public decimal Price { get; set; }
}
```

```graphql title="Donut Type Definition"
type Doughnut {
  id: Int!
  name: String
  type: DonutType!
  price: Decimal!
}
```

## Methods as Fields

By default, POCO class methods are excluded from being fields on the graph but can be added by tagging the method with `[GraphField]`.


```csharp title="Including a POCO method as a field"
public class Donut
{
    // highlight-next-line
    [GraphField("salesTax")]
    public decimal CalculateSalesTax(decimal taxPercentage)
    {
        return this.Price * taxPercentage;
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public DonutType Type { get; set; }
    public decimal Price { get; set; }
}
```

```graphql title="Donut Type Definition"
type Donut {
  // highlight-next-line
  salesTax (taxPercentage: Decimal!): Decimal!
  id: Int!
  name: String
  type: DonutType!
  price: Decimal!
}
```

Just as with [controller actions](../controllers/actions), GraphQL will analyze the signature of the method to determine its return type, expression requirements and input arguments.

> Methods on POCO classes lack many of the features of controllers such as being able to perform [model state](../controllers/model-state) validation or provide access to `this.User` and `this.Request`. 

## Excluding Fields

To exclude a single property that you don't want to expose to GraphQL add the `[GraphSkip]` attribute to it:

```csharp title="Excluding a property"
public class Donut
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DonutType Type { get; set; }

    // highlight-next-line
    [GraphSkip]
    public decimal Price { get; set; }
}
```

```graphql title="Donut Type Definition"
type Donut {
  id: Int!
  name: String
  type: DonutType!
  # price is not included
}
```
Or force GraphQL to skip all fields except those you explicitly define with a `[GraphField]` attribute:

```csharp title="Require explicit declarations for this type"
// highlight-next-line
[GraphType(FieldDeclarationRequirements = TemplateDeclarationRequirements.RequireAll)]
public class Donut
{
    [GraphField]
    public int Id { get; set; }

    [GraphField]
    public string Name { get; set; }

    public DonutType Type { get; set; }
    public decimal Price { get; set; }
}
```

```graphql title="Donut Type Definition"
# only id and name are included
type Donut {
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

## Excluding A Class

By Default, GraphQL won't include your class in a schema unless:

-   Its referenced in a controller OR
-   Referenced by a graph type that is referenced in a controller OR
-   Tagged with `[GraphType]`.

But certian schema configurations can override this behavior and allow GraphQL to greedily include classes that it'll never use. This can expose them in an introspection query unintentionally. You can flag a class such that it skipped unless GraphQL can determine that the object is required to fulfill a request to the schema.

This is also helpful to prevent objects that are only used as an `INPUT_OBJECT` from being accidentally added as an `OBJECT` and can reduce the clutter in your schema.


```csharp title="Prevent the Type From Being Auto Included"
// highlight-next-line
[GraphType(PreventAutoInclusion = true)]
public class Donut
{
    [GraphField]
    public int Id { get; set; }

    [GraphField]
    public string Name { get; set; }

    public DonutType Type { get; set; }
    public decimal Price { get; set; }
}
```

## Forced Class Exclusions

There are times where preventing auto-inclusion is not enough. Perhaps there is a shared assembly amongst work teams that contains some graph types and some utility classes that absolutely, positively CANNOT be exposed to GraphQL at any cost. Yet those classes are required for the graph types to function.

In these cases, add `[GraphSkip]` to the class itself and GraphQL will throw a `GraphTypeDeclarationException` if its ever asked to include the class in a schema. Be that as an explicit reference or through discovery in a controller. This will occur when the schema is first initialized, rendering your application dead. But better a crash when a developer is testing a new change vs. unknowingly leaking sensitive information.


```csharp title="Prevent a Type from EVER Being Included in the Graph"
// ERROR, GraphTypeDeclarationException will be thrown!
[GraphSkip]
public class SuperSensitiveData
{
    public int SecretSaltPhrase => "123456";
}
```

> This rule is enforced at the template level and is applied to the `System.Type` across the board.  Any class, interface, enum etc. with the `[GraphSkip]` attribute will be permanantly skipped.

## Structs as Objects
The usage of `struct` types as an `OBJECT` graph type is fully supported. The same rules listed above that apply to `class` types also apply to `struct` types.  The only difference is that since structs are value types there are non-nullable by default. 

```csharp title="Using a Coffee struct"
public class CoffeeController: GraphController
{
  [QueryRoot]
  public Coffee RetrieveCoffee(string flavor){ /*...*/}
}

public struct Coffee
{
  public string Flavor{ get; set; }
}
```

```graphql title="GraphQL Type Definition"
# Coffee must be returned
type Query {
  retrieveCoffee(flavor: String) : Coffee!
}
```

Use the standard `Nullable<T>` syntax to make them nullable (e.g. `Coffee?`):
```csharp title="Using a 'Nullable' Coffee struct"
public class CoffeeController: GraphController
{
  [QueryRoot]
  public Coffee? RetrieveCoffee(string flavor){ /*...*/}
}

public struct Coffee
{
  public string Flavor{ get; set; }
}
```

```graphql title="GraphQL Type Definition"
# Coffee or null may be returned
type Query {
  retrieveCoffee(flavor: String) : Coffee
}
```

## Reuse as Input Objects

Both `class` and `struct` types can be used as an `INPUT_OBJECT` and an `OBJECT` graph type. See the section on [input objects](./input-objects) for some of the key differences and requirements.


## Object Inheritance

Class inheritance as we think of it in .NET is not concept in GraphQL.  As a result, there is no association between two objects in the graph even if they share an inheritance structure in .NET.

```csharp title="C# Class Inheritance"
public class Pastry
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class Donut : Pastry
{
    string Flavor{ get; set; }
}
```

```graphql title="GraphQL Type Definitions"
# Pastry and Donut have similar fields 
# but are NOT related in the Graph
type Pastry {  
  id: Int!
  name: String
}

type Donut {  
  id: Int!
  name: String
  flavor: String
}
```

:::tip 
GraphQL ASP.NET is smart enough to figure out your intent with object use (i.e. [Liskov Subsitutions](https://en.wikipedia.org/wiki/Liskov_substitution_principle)). If you return a `Donut` where a `Pastry` is indicated by the graph. The library will happily use your donut as a pastry for any field resolutions.
:::

## Implementing Interfaces

> Read the section on [interfaces](./interfaces.md) for details on how to use them.

Graphql will not attempt to "auto include" the interfaces implemented by your objects in your schema. This is both a security measure to prevent information from leaking as well as a decluttering technique. Its unlikely that your schema cares about the myriad of interfaces you may declare on your business objects. 

However, when an interface is included in schema, graphql will sense the inclusion and automatically wire up the necessary information on your objects that implement.

```csharp title="Including a Pastry"
public class PastryController: GraphController
{
  [QueryRoot("retrievePastry", typeof(Donut))]
  public IPastry RetrievePastry(string id){/* ... */}
}
```
```graphql title="GraphQL Type Definition"
interface IPastry {
  id: String!
  name: String
}

# donut will automatically declare that it implements IPastry when its 
# included in the schema
// highlight-next-line
type Donut implements IPastry {
    id: String!
    name: String
    flavor: DonutFlavor
}
```
