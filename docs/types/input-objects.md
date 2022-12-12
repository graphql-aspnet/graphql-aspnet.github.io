---
id: input-objects
title: Input Objects
sidebar_label: Input Objects
sidebar_position: 1
---

`INPUT_OBJECT` graph types (a.k.a. input objects) represent complex data supplied to arguments on fields or directives. Anytime you want to pass more data than a single string or a number, perhaps an Address or a new Employee record, you use an INPUT_OBJECT to represent that entity in GraphQL.  When the system scans your controllers, if it comes across a class or struct used as a parameter to a method it will attempt to generate the appropriate input type definition to represent that class.

The rules surrounding naming, field declarations, exclusions, use of `[GraphSkip]` etc. apply to input objects but with a few key differences:

-   Unless overridden, an input object is named the same as its class name, prefixed with `Input_` (e.g. `Input_Address`, `Input_Employee`)
-   Only public properties with a `get` and `set` will be included.
    -   Property return types cannot be `Task<T>`, an `interface` and cannot implement `IGraphUnionProxy` or `IGraphActionResult`. Such properties are always skipped.
-   Methods are always skipped.

## Customized Type Names

Input objects can be given customized names, just like with object types, using the `[GraphType]` attribute. 

```csharp title="Customized Input Object Type Name"
[GraphType(InputName = "NewDonutModel")]
public class Donut
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DonutType Type { get; set; }
    public decimal Price { get; set; }
}
```

```graphql title="Donut Type Definition"
input NewDonutModel {
  id: Int! = 0
  name: String = null
  type: DonutType! = FROSTED
  price: Decimal! = 0
}
```

>Note the specific callout to `InputName` in the attribution.

## Use an Empty Constructor

When GraphQL executes a query it will attempt to create an instance of your input object then assign the key/value pairs received on the query to the properties. In order to do the initial instantiation it requires a public parameterless constructor to do so.

```csharp title="Input Objects MUST have a Public, Parameterless Constructor
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

> Because of this consturctor restriction it can be helpful to separate your classes between "input" and "output" types much is the same way we do with `ViewModel` vs. `BindingModel` objects with REST queries in ASP.NET. This is optional, mix and match as needed by your use case.

## Properties Must Have a Public Setter

Properties without a setter are ignored. At runtime, GraphQL compiles an expression tree with the set assignments declared on the graph type, it won't attempt to sneakily reflect and invoke a private or protected setter.

```csharp title="Properties must Have a Public Setter"
public class Donut
{
    public int Id { get; }
    public string Name { get; set; }
    public DonutType Type { get; set; }
    public decimal Price { get; set; }
}
```

```graphql title="Donut Type Definition"
# Id field is not included 

input Input_Donut {
  name: String = null
  type: DonutType! = FROSTED
  price: Decimal! = 0
}
```


## Methods are Ignored

While its possible to have methods be exposed as resolvable fields on regular `OBJECT` types, they are ignored for input types regardless of the declaration rules applied to the type.

```csharp title="Methods Are Ignored on Input Objects"
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
# CalculateSalesTax is not included
input Input_Donut {
  id: Int! = 0
  name: String = null
  type: DonutType! = FROSTED
  price: Decimal! = 0
}
```


## Required Fields And Default Values
Add `[Required]` (from System.ComponentModel) to any property to force a user to supply the field in a query document.

Any non-required field will automatically be assigned a default value if not supplied. This default value is equivilant to the property value of the object when its instantiated via its public, parameterless constructor.


```csharp title="Add the Required attribute for force a query to define a value"
public class Donut
{
    public Donut()
    {
        // set custom defaults if needed
        this.Type = DonutType.Frosted;
        this.Price = 2.99;
        this.IsAvailable = true;
    }

    [Required]
    public string Name { get; set; }

    public int Id { get; set; }
    public DonutType Type { get; set; }
    public Bakery Bakery { get;set; }
    public decimal Price { get; set; }    
    public bool IsAvailable { get; set; }
}
```

```graphql title="Donut Type Definition"
# No Default Value on Name
input Input_Donut {
  name: String
  id: Int! = 0    
  type: DonutType! = FROSTED
  bakery: Input_Bakery = null
  price: Decimal! = 2.99
  isAvailable: Boolean! = true
}
```


## Non-Nullability
By default, all properties that are reference types (i.e. classes) are nullable and all value types (primatives, structs etc.) are non-nullable

```csharp title="Recipe can be null, it is a reference type"
public class Donut
{
    public Recipe Recipe { get; set; }  // reference type
    public int Quantity { get; set; }   // value type
}
```

```graphql title="Input Donut Definition"
input Input_Donut {
  recipe: Input_Recipe = null  # nullable
  quantity: Int! = 0           # not nullable
}
```


If you want to force a reference type to be non-null you can use the `[GraphField]` attribute to augment the field's type expression.

```csharp title="Force Recipe to be non-null"
public class Donut
{
    public Donut()
    {
        this.Recipe = new Recipe("Flour, Sugar, Salt");
    }

    [GraphField(TypeExpression = "Type!")]
    public Recipe Recipe { get; set; }  // reference type
    public int Quantity { get; set; }   // value type
}
```

```graphql title="Input Donut Definition"
input Input_Donut {
  recipe: Input_Recipe! = {Ingredients : "Flour, Sugar, Salt" }  
  quantity: Int! = 0                   
}
```

:::info Did You Notice?
 We assigned a recipe in the class's constructor to use as the default value.
 
 Any non-nullable field, that does not have the `[Required]` attribute, MUST have a default value assigned to it that is not `null`. 
 
 A `GraphTypeDeclarationException` will be thrown at startup if this is not the case.
:::

#### Combine Non-Null and [Required]
Combine the [Required] attribute with a custom type expression to force a user to supply a non-null value for the field on a query document.

```csharp title="Force Owner to be non-null And Required"
public class Bakery
{
    public Bakery()
    {
    }

    [Required]
    [GraphField(TypeExpression = "Type!")]
    public Person Owner { get; set; }
}
```

```graphql title="Donut Type Definition"
# No Default Value is supplied. owner must be supplied on a query
input Input_Bakery {
  owner: Input_Person!
}
```

## Enum Fields and Coercability

Any default value declared for an input field must be coercible by its target graph type in the target schema. Because of this there is a small got'cha situation with enum values. 

Take a look at this example of an enum and input object:

```csharp title="Using an Enum as a field type"
public class Donut 
{
    public string Name { get; set; }
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
thats the default value (0) of the enum. However, the enum value `Vanilla` is marked as being skipped in the schema. 

Because of this mismatch, a `GraphTypeDeclarationException` will be thrown when the introspection data for your schema is built. As a result, the server will fail to start until the problem is corrected. 

You can get around this by setting an included enum value in the consturctor:


```csharp title="Using an Enum as a field type"
public class Donut 
{
    public Donut()
    {
        // set the value of flavor to an enum value 
        // included in the graph
        this.Flavor = DonutFlavor.Chocolate;
    }

    public string Name { get; set; }
    public DonutFlavor Flavor { get; set; }
}

```

:::caution
 Enum values used for the default value of input object properties MUST also exist as values in the schema or an exception will be thrown.
:::