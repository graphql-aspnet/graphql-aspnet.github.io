---
id: objects
title: The Object Graph Type
sidebar_label: Objects
sidebar_position: 0
---

The `object graph type` is one of six fundamental types defined by GraphQL. We can think of a graph query like a tree and if [scalar values](./scalars), such as `string` and `int`, are the leafs then objects are the branches.

In GraphQL ASP.NET a C# `class` or `struct` is used to identify an `OBJECT` type in a schema.

Here we've defined a `Donut` model class. The runtime will convert it, automatically, into a graph type. If you're familiar with GraphQL's own type definition language the equivalent expression is shown below.

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

-   Are named the same as the `class` name
-   Have all public properties with a `get` statement included as fields
    -   The return type of a property must be an acceptable type or it will be skipped

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
  salesTax (taxPercentage: Decimal!): Decimal!
  id: Int!
  name: String
  type: DonutType!
  price: Decimal!
}
```

Just as with [controller actions](../controllers/actions), GraphQL will analyze the signature of the method to determine its return type, expression requirements and input arguments.

Object methods lack many of the abilities of controllers such as being able to perform [model state](../controllers/model-state) validation or provide access to `this.User` and `this.Request`. It is recommended to keep your methods simple, like on the example, but its not required.

## Excluding Fields

To exclude a single property that you don't want to expose to GraphQL add the `[GraphSkip]` attribute to it:

```csharp title="Excluding a property"
public class Donut
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DonutType Type { get; set; }

    [GraphSkip]
    public decimal Price { get; set; }
}
```

```graphql title="Donut Type Definition"
type Donut {
  id: Int!
  name: String
  type: DonutType!
}
```
Or force GraphQL to skip all fields except those you explicitly define with a `[GraphField]` attribute:

```csharp title="Require explicit declarations for this type"
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

GraphQL will follow a cascading model of inclusion rules. Indicating a rule on the `[GraphType]` attribute will override any settings declared by the schema. This can be useful in multi-schema setups where a class may be shared but you don't want the exposed fields to be different or if there is a secure field that you want to guarantee is not exposed regardless of the schema.

## Excluding A Class

By Default, GraphQL won't include your class in a schema unless:

-   Its referenced in a controller OR
-   Referenced by a graph type that is referenced in a controller OR
-   Tagged with `[GraphType]`.

But schema configurations can override this behavior and allow GraphQL to greedily include classes that it'll never use. This can expose them in an introspection query unintentionally. You can flag a class such that it skipped unless GraphQL can determine that the object is required to fulfill a request to the schema.

This is also helpful to prevent objects that are only used as an `INPUT_OBJECT` from being accidentally added as an `OBJECT` and can reduce the clutter in your schema.


```csharp title="Prevent the Type From Being Auto Included"
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

In these cases, add `[GraphSkip]` to the class itself and GraphQL will throw a `GraphTypeDeclarationException` if its ever asked to include the class in a schema. Be that as an explicit reference or through discovery in a controller. This will occur when the schema is first initialized by your `IServiceProvider`, rendering your application dead. But better a crash when a developer is testing a new change than unknowingly leaking sensitive details.


```csharp title="Prevent a Type from EVER Being Included in the Graph"
// ERROR, GraphTypeDeclarationException will be thrown!
[GraphSkip]
public class SuperSensitiveData
{
    public int SecretSaltPhrase => "123456";
}
```

This rule is enforced at the template level and is applied to any `System.Type` across the board. Its not specific to the `OBJECT` graph type. If you tag an `interface` or an `enum` with `[GraphSkip]` it will cause the same failure.

## Structs as Objects
The usage of `struct` types as an `OBJECT` graph type is fully supported. The same rules listed above that apply to `class` types also apply to `struct` types. 

## Reuse as Input Objects

Both `class` and `struct` types can be used as an `INPUT_OBJECT` and an `OBJECT` graph type. See the section on [input objects](./input-objects) for some of the key differences and requirements.


## Inheritance

Class inheritance as we think of it in .NET is not concept in GraphQL.  As a result, there is no association between two objects in the graph even if they share an inheritance structure in .NET.

```csharp title="Class Inheritance"
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