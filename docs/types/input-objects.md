---
id: input-objects
title: Input Objects
sidebar_label: Input Objects
---

`INPUT_OBJECT` graph types represent complex data supplied to field arguments or directives. Anytime you want to pass more data than a single string or a number, perhaps an Address or a new Employee, you use an INPUT_OBJECT to represent that entity in GraphQL.  When the system scans your controllers, if it comes across a class used as a parameter to a method it will attempt to generate the appropriate input type definition to represent that class.

The rules surrounding naming, field declarations, exclusions, use of `[GraphSkip]` etc. apply to input objects but with a few key differences:

-   Unless overridden, an input object is named the same as its `class` name, prefixed with `Input_` (e.g. `Input_Address`, `Input_Employee`)
-   Only public properties with a `get` and `set` will be included.
    -   Properties cannot return a `Task<T>`, an `interface` and cannot implements `IGraphUnionProxy` or `IGraphActionResult`. Such properties are always skipped.
-   Methods are always skipped.

## Names

Input object types can be given customized names, just like with object types, using the `[GraphType]` attribute.

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
Add `[Required]` (from System.ComponentModel) to any property to force a user to supply the field in a query document. The type expression will also automatically become non-nullable if it otherwise would have been nullable and no default value will be assigned to the field. For example string fields are nullable by default, adding `[Required]` will convert the type expression of the property to `String!` automatically.

Any non-required field will automatically be assigned a default value that will be made available to introspection queries. This default value is equivilant to the property value of the object when the object is instantiated via its default constructor.  Use the constructor to set any default values you wish to surface. 

<div class="sideBySideCode hljs">
<div>

```csharp
// Donut.cs
public class Donut
{
    public Donut()
    {
        this.Type = "Vanilla";
        this.Price = 2.99;
        this.IsAvailable = true;
    }

    [Required]
    public string Name { get; set; }

    public int Id { get; set; }
    public string Type { get; set; }
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
  type: DonutType! = "Vanilla"
  bakery: Input_Bakery = null
  price: Decimal! = 2.99
  isAvailable: Boolean! = true
}
```

</div>
</div>
<br/>


## Working With Lists

When constructing a set of items as an input value, GraphQL will instantiate a `List<T>` and fill it with the appropriate data, be that another list, another input object or a scalar. While you can declare an array (e.g. `Donut[]`, `int[]` etc.) as your list structure for an input argument, graphql has to rebuild its internal representation as an array (or nested arrays) to meet the requirements of your method. In some cases, especially with nested lists, this results in a linear increase in processing time. It is recommended to use `IEnumerable<T>` or `IList<T>` to avoid this performance bottleneck when sending a lot of items as input arguments.

This example shows various ways of accepting collections of data as inputs to controller actions.

```csharp
public class BakeryController : GraphController
{
    // a list of donuts
    // schema syntax:  [Donut]
    [Mutation("createDonuts")]
    public bool CreateDonuts(IEnumerable<Donut> donuts)
    {/*....*/}

    // when used as a "list of list"
    // schema syntax:  [[Donut]]
    [Mutation("createDonutsBySet")]
    public bool CreateDonuts(List<List<Donut>> donuts)
    {/*....*/}

    // when supplied as a regular array
    // schema syntax:  [Donut]
    [Mutation("donutsAsAnArray")]
    public bool DonutsAsAnArray(Donut[] donuts)
    {/*....*/}    

    // This is a valid nested list
    // schema syntax:  [[[Donut]]]
    [Mutation("mixedDonuts")]
    public bool MixedDonuts(List<IEnumerable<Donut[]>> donuts)
    {/*....*/}

    // when used as a field of another input object
    [Mutation("createDonutCollection")]
    public bool CreateDonuts(DonutCollection donutCollection)
    {/*....*/}

}

public class DonutCollection
{
    public List<Donut> Donuts { get; set; }
}

```