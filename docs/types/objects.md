---
id: objects
title: The Object Graph Type
sidebar_label: Objects
---

The `object graph type` is one of six fundamental types defined by GraphQL. We can think of a graph query like a tree and if [scalar values](./scalars), such as `string` and `int`, are the leafs then objects are the branches.

In GraphQL ASP.NET a C# `class` is used to identify an `object` in a schema.

Here we've defined a `donut` model class. The runtime will convert it, automatically, into a graph type. If you're familiar with GraphQL's own type definition language the equivalent expression is shown to the right.

<div class="sideBySideCode hljs">
<div>

```csharp
// Donut.cs
public class Donut
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DonutType Type { get; set; }
    public decimal Price { get; set; }
}
```

</div>
<div>

```
# GraphQL Type Definition
type Donut {
  id: Int!
  name: String
  type: DonutType!
  price: Decimal!
}
```

</div>
</div>

\*The `DonutType` enumeration is covered in the [enum type](./enums) section.

By Default, object graph types:

-   Are named the same as the `class` name
-   Have all public properties with a `get` statement included as fields
    -   The return type of the property must be an acceptable type or it will be skipped

## Custom Naming

Give the object a different name in the graph from that of your C# class with the `[GraphType]` attribute.

<div class="sideBySideCode hljs">
<div>

```csharp
// Donut.cs
[GraphType("Doughnut")]
public class Donut
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DonutType Type { get; set; }
    public decimal Price { get; set; }
}
```

</div>
<div>

```
// GraphQL Type Definition
type Doughnut {
  id: Int!
  name: String
  type: DonutType!
  price: Decimal!
}
```

</div>
</div>
<br/>

## Methods as Fields

By default, POCO class methods are excluded from being fields on the graph but can be added by tagging the method with `[GraphField]`.

<div class="sideBySideCode hljs">
<div>

```csharp
// Donut.cs
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

</div>
<div>

```
// GraphQL Type Definition
type Donut {
  salesTax: Decimal
  id: Int!
  name: String
  type: DonutType!
  price: Decimal!
}
```

</div>
</div>
<br/>

Just as with [controller actions](../controllers/actions), GraphQL will analyze the signature of the method to determine its return type, expression requirements and input arguments.

Object methods lack many of the abilities of controllers such as being able to perform [model state](../controllers/model-state) validation or provide access to `this.User` and `this.Request`. It is recommended to keep your methods simple, like on the example, but its not required.

## Excluding Fields

To exclude a single property that you don't want to expose to GraphQL add the `[GraphSkip]` attribute to it:

<div class="sideBySideCode hljs">
<div>

```csharp
// Donut.cs
public class Donut
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DonutType Type { get; set; }

    [GraphSkip]
    public decimal Price { get; set; }
}
```

</div>
<div>

```
// GraphQL Type Definition
type Donut {
  id: Int!
  name: String
  type: DonutType!
}
```

</div>
</div>
<br/>

Or force graphQL to skip all fields except those you explicitly define with a `[GraphField]` attribute:

```csharp
// Donut.cs
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

// GraphQL Type Definition
type Donut {
  id: Int!
  name: String
}
```

Or set a schema-wide option during startup:

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // ...other code omitted
    services.AddGraphQL(options =>
            {
                options.DeclarationOptions.FieldDeclarationRequirements =
                    TemplateDeclarationRequirements.RequireAll;
            });
}
```

GraphQL will follow a cascading model of inclusion rules. Indicating a rule on the `[GraphType]` attribute will override any settings declared by the schema. This can be useful in multi-schema setups where a class may be shared but you don't want the exposed fields to be different or if there is a secure field that you want to guarantee is not exposed regardless of the schema.

## Excluding A Class

By Default, GraphQL won't include your class in a schema unless:

-   Its referenced in a controller.
-   Referenced by a graph type that is referenced in a controller.
-   Tagged with `[GraphType]`.

But schema configurations can override this behavior and allow GraphQL to greedily include classes that it'll never use. This can expose them in an introspection query unintentionally. You can flag a class such that auto-inclusion will be skipped unless GraphQL can determine that the object is required to fulfill a request to the schema.

This is also helpful to prevent objects that are only used as an `INPUT_OBJECT` from being accidentally added as an `OBJECT` and can reduce the clutter in your schema.

```csharp
// Donut.cs
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

```csharp
// ERROR, GraphTypeDeclarationException will be thrown!
[GraphSkip]
public class SuperSensitiveData
{
    public int SecretSaltPhrase => "123456";
}
```

This rule is enforced at the template level and is applied to any .NET `System.Type` across the board. Its not specific to the `OBJECT` graph type. If you tag an `interface` or an `enum` with `[GraphSkip]` it will cause the same failure.

## Classes as Input Objects

A class can be used as both an `INPUT_OBJECT` and an output `OBJECT` graph type. See the section on [input objects](./input-objects) for some of the key differences and requirements.
