---
id: input-objects
title: Input Objects
sidebar_label: Input Objects
---

`INPUT_OBJECT` graph types function in much the same way as [object graph types](./objects) do.
While GraphQL is doing its discovery of controllers and graph types, whenever it comes across a class used as a parameter to a method it will attempt to generate the appropriate input type definition.

The rules surrounding naming, field declarations, exclusions, use of `[GraphSkip]` etc. apply to input objects but with a few key differences.

By Default:

-   An input object is named the same as its `class` name, prefixed with `Input_`
    -   i.e. `Input_Donut`, `Input_Employee`
-   All public properties with a `get` and `set` statement will be included.
    -   The return type of the property must be an acceptable type or it will be skipped
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

Because of this restriction it can be helpful to separate your classes between "input" and "output" types much is the same way we do with `ViewModel` vs. `BindingModel` objects in MVC. This is optional, mix and match as needed by your use case.

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

While its possible to have methods be exposed as fields on regular `OBJECT` types they are ignored for input types regardless of the declaration rules applied to the type.

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

## Working With Lists

When constructing a set of items as an input value, GraphQL will instantiate a `List<T>` and fill it with the appropriate data, be that another list, another input object or a scalar. While you can declare a regular array (e.g. `Donut[]`, `int[]` etc.) as your list structure for an input argument, graphql has to rebuild its internal list structure as an array (or nested arrays) to meet the requirements of your method. In some cases, especially with nested lists, this results in a linear increase in processing time. It is recommended to use `IEnumerable<T>` or `IList<T>` to avoid this performance bottleneck when sending a lot of items as input arguments.

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

    // This is a valid nested list
    // schema syntax:  [[[[Donut]]]]
    [Mutation("createDonutsBySet")]
    public bool SoManyDonuts(IEnumerable<List<IEnumerable<List<Donut>>>> donuts)
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
