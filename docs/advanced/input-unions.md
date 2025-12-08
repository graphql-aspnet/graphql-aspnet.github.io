---
id: input-unions
title: Input Unions
sidebar_label: Input Unions
sidebar_position: 3
---



Input unions (Spec § [3.10.1](https://spec.graphql.org/September2025/#sec-OneOf-Input-Objects)) are a variant on standard input objects such that only one of the defined fields may be used in a query. This can be helpful if you have an input object, such as search parameters, that gives multiple ways to search, but you want the user submitting a query to choose exactly one option to search by.

By definition an input union is a standard [input object](../types/input-objects.md) (a class or a struct), all rules of standard input objects apply (i.e. field names must be unique, no use of interfaces etc.).  However...

**Input unions:**<br/>
✅ MUST have no default values declared on any field.<br/>
✅ MUST have all nullable fields

:::warning
A declaration exception will be thrown and the server will fail to start if either of these rules are violated for any declared input union.
:::

## Creating An Input Union
An object can be declared as an input union in multiple ways:

### Using Attribution

Use the `[OneOf]` attribute to mark an object as ALWAYS being an input union. Any place the class or struct is referenced as an input to a method it will be handled as an input union.

```csharp  title="Declaring an input union with the [OneOf] attribute"
// highlight-next-line
[OneOf]
[GraphType(InputName = "SearchOptions")]
public class SearchDonutParams
{
   public string Name {get; set;}
   public Flavor? Flavor {get; set; } // assume flavor is an enum
}
```

```csharp title="Using an Input Union in a Controller"
public class BakeryController : GraphController
{
     [QueryRoot("findDonuts")]     
     // highlight-next-line
     public List<Donut> FindDonuts(SearchDonutParams search)
     {
        /// guaranteed that only one value (name or flavor) is non-null
        return [];
     }
}
```

```graphql title="Equivilant schema type definition"
## relevant graphql type generated
input SearchOptions @oneOf {
  name: String
  flavor: Flavor
}
```

### Inherit from GraphInputUnion

Creating a class that inherits from `GraphInputUnion` works in the same way as using `[OneOf]` but adds some additional quality of life features in terms of metadata and default value handling.  

_See below for details on using `GraphInputUnion`_


```csharp title="Inheriting from GraphInputUnion"
[GraphType(InputName  "SearchParams")]
// highlight-next-line
public class SearchDonutParams : GraphInputUnion
{
   public string Name {get; set;}
   public Flavor? Flavor {get; set; } // assume flavor is an enum
}
```

```csharp title="Using an Input Union in a Controller"
public class BakeryController : GraphController
{
     [QueryRoot("findDonuts")]     
     // highlight-next-line
     public List<Donut> FindDonuts(SearchDonutParams search)
     {
        /// guaranteed that only one value (name or flavor) is non-null
        return [];
     }
}
```

```graphql title="Equivilant schema type definition"
## relevant graphql type generated
input SearchOptions @oneOf {
  name: String
  flavor: Flavor
}
```

## Nullable Fields
The specification defines an input union as *"a special variant of Input Object where exactly one field must be set and non-null, all others being omitted."* (Spec § [3.10.1](https://spec.graphql.org/September2025/#sec-OneOf-Input-Objects)). As such, all properties declared on a class or struct that is being used as an input union must be nullable, the supplied query MUST set exactly one field to a non-null value on a query document.

```csharp title="Example Scenarios"

// 🧨 FAIL: Flavor is non-nullable. A graph declaration exception will be thrown at start up.
[OneOf]
public class SearchDonutParams
{
   public string Name {get; set;}
   public Flavor Flavor {get; set; } // assume flavor is an enum
}

// 🧨 FAIL: Name declares a default value.  A graph declaration exception will be thrown at start up.
[OneOf]
public class SearchDonutParams
{
  public SearchDonutParams
  {
    this.Name = "%";
  }

   public string Name {get; set;}
   public Flavor? Flavor {get; set; } // assume flavor is an enum
}

// ✅ SUCCESS
[OneOf]
public class SearchDonutParams
{
   public string Name {get; set;}
   public Flavor? Flavor {get; set; }
}
```

## Using `GraphInputUnion`
This special base type can be used to expose some additional, quality of life methods for dealing with nullability and default values.

```csharp
public abstract class GraphInputUnion
{
   // Will return the value, if it was supplied on the query, otherwise fallbackValue.
   // this method is is heavily optimized to be performant at runtime
   public TReturn ValueOrDefault<TValue, TReturn>(Expression<Func<TObject, TValue>> selector, TReturn fallbackValue = default);
}

[GraphType(InputName = "SearchParams")]
public class SearchDonutParams : GraphInputUnion
{
   public string Name {get; set;}

   public Flavor? Flavor {get; set; } // assume flavor is an enum
}


// Sample Usage
public class BakeryController : GraphController
{
     [QueryRoot("findDonuts")]
     public List<Donut> FindDonuts(SearchDonutParams search)
     {        
        InternalSearchParams internalParams = new();
        internalParams.Name = search.ValueOrDefault(x => x.Name, "%");
        internalParams.Flavor = search.ValueOrDefault(x => x.Flavor, Flavor.All);
        return  _service.SearchDonuts(internalParams);
     }
}
```

:::info
The `ValueOrDefault()` method will return a type of the fallback value, NOT of the input object property. This allows you to return non-null defaults in place of nullable values that must be passed on the input object. This should greatly reduce bloat in transferring query supplied values and reasonable fallbacks when necessary. When returning non-reference types, they must have compatibility between the nullable and non-nullable versions (e.g. `int` and `int?`)
:::


## Support
Input Unions are supported in *GraphQL ASP.NET version 1.6* or later