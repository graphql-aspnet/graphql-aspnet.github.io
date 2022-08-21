---
id: input-objects
title: Input Objects
sidebar_label: Input Objects
---

`INPUT_OBJECT` graph types (a.k.a. input objects) represent complex data supplied to arguments on fields or directives. Anytime you want to pass more data than a single string or a number, perhaps an Address or a new Employee, you use an INPUT_OBJECT to represent that entity in GraphQL.  When the system scans your controllers, if it comes across a class used as a parameter to a method it will attempt to generate the appropriate input type definition to represent that class.

The rules surrounding naming, field declarations, exclusions, use of `[GraphSkip]` etc. apply to input objects but with a few key differences:

-   Unless overridden, an input object is named the same as its class name, prefixed with `Input_` (e.g. `Input_Address`, `Input_Employee`)
-   Only public properties with a `get` and `set` will be included.
    -   Property return types cannot be `Task<T>`, an `interface` and cannot implement `IGraphUnionProxy` or `IGraphActionResult`. Such properties are always skipped.
-   Methods are always skipped.

## Customized Type Names

Input objects can be given customized names, just like with object types, using the `[GraphType]` attribute. 

<div class="sideBySideCode hljs">
<div>

```csharp
// Donut.cs
[GraphType(InputName = "NewDonutModel")]
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
input NewDonutModel {
  id: Int!
  name: String
  type: DonutType!
  price: Decimal!
}
```

</div>
</div>
<br/>

>Not the specific callout to `InputName` in the attribution.

## Use an Empty Constructor

When GraphQL executes a query it will attempt to create an instance of your input object then assign the key/value pairs received on the query to the properties. In order to do the initial instantiation it requires a public parameterless constructor to do so.

```csharp
public class BakeryController : GraphController
{
    [Mutation("createDonut")]
    public bool CreateNewDonut(DonutModel donut)
    {/*....*/}
}

// DonutModel.cs
public class DonutModel
{
    //Use a public parameterless constructor
    public DonutModel()
    {
    }

    public int Id { get; set; }
    public string Name { get; set; }
}
```

Because of this restriction it can be helpful to separate your classes between "input" and "output" types much is the same way we do with `ViewModel` vs. `BindingModel` objects with REST queries in ASP.NET. This is optional, mix and match as needed by your use case.

## Properties Must Have a Public Setter

Properties without a setter are ignored. At runtime, GraphQL compiles an expression tree with the set assignments declared on the graph type, it won't attempt to sneakily reflect and invoke a private or protected setter.

<div class="sideBySideCode hljs">
<div>

```csharp
// Donut.cs
public class Donut
{
    public int Id { get; }
    public string Name { get; set; }
    public DonutType Type { get; set; }
    public decimal Price { get; set; }
}
```

</div>
<div>

```ruby
// GraphQL Type Definition
// No Id field is included on the INPUT_OBJECT

input Input_Donut {
  name: String
  type: DonutType!
  price: Decimal!
}
```

</div>
</div>
<br/>

## Methods are Ignored

While its possible to have methods be exposed as resolvable fields on regular `OBJECT` types, they are ignored for input types regardless of the declaration rules applied to the type.

<div class="sideBySideCode hljs">
<div>

```csharp
// Donut.cs
public class Donut
{
    [GraphField("salesTax")]
    public decimal CalculateSalesTax(
        decimal taxPercentage)
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

```ruby
# GraphQL Type
# Definition
input Input_Donut {
  id: Int!
  name: String
  type: DonutType!
  price: Decimal!
}
```

</div>
</div>
<br/>

## Required Fields And Default Values
Add `[Required]` (from System.ComponentModel) to any property to force a user to supply the field in a query document.

Any non-required field will automatically be assigned a default value if not supplied. This default value is equivilant to the property value of the object when its instantiated via its public, parameterless constructor.

<div class="sideBySideCode hljs">
<div>

```csharp
// Donut.cs
public class Donut
{
    public Donut()
    {
        // set custom defaults if needed
        this.Type = DonutType.Vanilla;
        this.Price = 2.99;
        this.IsAvailable = true;
    }

    [Required]
    public string Name { get; set; }

    public int Id { get; set; }
    public DonutType Type { get; set; }
    public Bakery Bakery { get;set; }
    public decimal Price { get; set; }    
    public decimal IsAvailable { get; set; }
}
```

</div>
<div>

```ruby
# GraphQL Type Definition
input Input_Donut {
  name: String!
  id: Int! = 0    
  type: DonutType! = VANILLA
  bakery: Input_Bakery = null
  price: Decimal! = 2.99
  isAvailable: Boolean! = true
}
```

</div>
</div>
<br/>

## Non-Nullability
By default, all properties that are reference types (i.e. classes) are nullable and all value types (primatives, structs etc.) are non-nullable


<div class="hljs">

```csharp
// Donut.cs
public class Bakery
{
    // a reference to another object
    public Person Owner { get; set; }
}
```

```ruby
# GraphQL Type Definition
input Input_Donut {
  owner: Input_Person = null
}
```

</div>
<br/>

If you want to force a value to be supplied (either on a query document or by default) you can use the [GraphField] attribute to augment the field.


<div class="hljs">

```csharp
// Donut.cs
public class Bakery
{
    public Bakery()
    {
        this.Owner = new Person("Bob Smith");
    }

    // a reference to another object
    [GraphField(TypeExpression = TypeExpressions.IsNotNull)]
    public Person Owner { get; set; }
}
```
```ruby
# GraphQL Type Definition
input Input_Donut {
  owner: Input_Person! = { name: "Bob Smith" }
}
```
</div>
<br/>


> Any field explicitly or implicitly declared as non-nullable, that is not required, MUST have a default value assigned to it that is not `null`.


Add the [Required] attribute to force a user to supply a non-null value for the field on a query document.


<div class="hljs">

```csharp
// Donut.cs
public class Bakery
{
    public Bakery()
    {
    }

    // a reference to another object
    [Required]
    [[GraphField(TypeExpression = TypeExpressions.IsNotNull)]]
    public Person Owner { get; set; }
}
```
```ruby
# GraphQL Type Definition
input Input_Donut {
  owner: Input_Person!
}
```
</div>
<br/>

## Default Values Must be Coercible
Any default value declared for an input field must be coercible by its target graph type in the target schema. 

### Enum Values 

Take a look at this example of an enum and input object:

```csharp
public class Donut 
{
    public string Name{ get; set; }
    public DonutFlavor Flavor { get; set; }
}

public enum DonutFlavor
{
    [GraphSkip]
    Vanilla = 0,
    Chocolate = 1,

}
```

When `Donut` is instantiated the value of Flavor will be `Vanilla` because 
thats the default value (0) of the enum's underlying data type (int). However, the enum value `Vanilla` is marked as being skipped in the schema. 

Because of this mismatch, a `GraphTypeDeclarationException` will be thrown when the introspection data for your schema is built. As a result, the server will fail to start until the problem is corrected.

> Enum values used for the default value of input object properties MUST also exist as values in the schema or an exception will be thrown.
