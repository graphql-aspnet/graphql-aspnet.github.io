---
id: unions
title: Unions
sidebar_label: Unions
---

## Unions

Unions are an aggregate graph type representing multiple, different `OBJECT` types with no guaranteed fields or interfaces in common; for instance, `Salad` or `Bread`. Because of this, unions define no fields themselves but provide a common way to query the fields of the union members when one is encountered.

Unlike other graph types there is no concrete representation of unions. Where a `class` is an object graph type or a .NET enum is an enum graph type there is no analog for unions. Instead unions are virtual types that exist at runtime based their declaration site in a `GraphController`.

## Declaring a Union

You can declare a union in your action method using one of the many overloads to the query and mutation attributes:

<div class="sideBySideCode hljs">
<div>

```csharp
public class KitchenController : GraphController
{
    [QueryRoot(
        "searchFood",
        "SaladOrBread",
        typeof(Salad),
        typeof(Bread))]
    public ????? RetrieveFood(string name)
    {/* ... */}
}
```

</div>
<div>

```js
// Example GraphQL Query
query {
    searchFood(name: "caesar*") {
        ...on Salad {
            name
            hasCroutons
        }

        ...on Bread {
            name
            hasGarlic
        }
    }
}
```

</div>
</div>
<br/>

In this example we :

-   Declared an action method named `RetrieveFood` with a field name of `searchFood`
-   Declared a union on our graph named `SaladOrBread`
-   Included two object types in the union: `typeof(Salad)` and `typeof(Bread)`

Unlike with [interfaces](./interfaces) where the possible types returned from an action method can be declared else where, you MUST provide the types to include in the union in the declaration.

> Union member types must be declared as part of the union.

### What to Return for a Union

Notice we have a big question mark on what the action method returns in the above example. From a C# perspective, there is no `IFood` interface shared between `Salad` and `Bread`. This represents a problem for static-typed languages like C#. Since unions are virtual types there exists no common `System.Type` that you can return for generated data. `System.Object` might work but it tends to be too general and the runtime will reject it as a safe guard.

So what do you do? Return an `IGraphActionResult` instead and let the runtime handle the details.

```csharp
public class KitchenController : GraphController
{
    // service injection omitted for brevity

    [QueryRoot("searchFood", "SaladOrBread", typeof(Salad), typeof(Bread))]
    public async Task<IGraphActionResult> SearchFood(string name)
    {
        if(name.Contains("green"))
        {
            Salad salad = await _saladService.FindSalad(name);
            return this.Ok(salad);
        }
        else
        {
            Bread bread = await _breadService.FindBread(name);
            return this.Ok(bread);
        }
    }
}
```

Under the hood, GraphQL ASP.NET looks at the returned object type at runtime to evaluate the graph type reference then continues on in that scope with the returned value.

## Union Proxies

If you need to reuse your unions in multiple methods you'll want to create a class that implements `IGraphUnionProxy` (or inherits from `GraphUnionProxy`) to encapsulate the details, then add that as a reference in your controller methods instead of the individual types. This can also be handy for uncluttering your code if you have a lot of possible types for the union. The return type of your method will still need to be `IGraphActionResult`. You cannot return a `IGraphUnionProxy` as a value.

```csharp
public class KitchenController : GraphController
{
    [QueryRoot("searchFood", typeof(SaladOrBread))]
    public async Task<IGraphActionResult> SearchFood(string name)
    {/* ... */}
}

// SaladOrBread.cs
using GraphQL.AspNet.Schemas.TypeSystem;
public class SaladOrBread : GraphUnionProxy
{
     public SaladOrBread()
        : base(typeof(Salad), typeof(Bread))
    {}
}
```

>  You can create a union proxy by inheriting from `GraphUnionProxy` or directly implementing `IGraphUnionProxy`

## Union Name Uniqueness

Union names must be unique in a schema. If you do declare a union in multiple action methods without a proxy, GraphQL will attempt to validate the references by name and included types. As long as all declarations are the same, that is the name and the set of types match, then there is no issue. Otherwise, a `GraphTypeDeclarationException` will be thrown.

## Liskov Substitutions

[Liskov substitutions](https://en.wikipedia.org/wiki/Liskov_substitution_principle) (the L in [SOLID](https://en.wikipedia.org/wiki/SOLID)) are an important part of object oriented programming and .NET. To be able to have one class masquerade as another allows us to easily extend our code's capabilities without any rework.


```csharp
public class Bread
{}

public class Roll : Bread
{}

public class Bagel : Roll
{}

public class Oven 
{
    public void Bake(Bread bread)
    {
        // We can pass in Bread, Roll or Bagel and the oven
        // will happily bake it.
    }
}
```
<br/>

However, this presents a problem when when dealing with UNIONs and GraphQL.
<div class="sideBySideCode hljs">
<div>

```csharp
public class BakeryController : GraphController
{
    [QueryRoot("searchFood", 
               "RollOrBread", 
                typeof(Roll), typeof(Bread))]
    public IGraphActionResult SearchFood(
            string name)
    {
        return new Bagel();
    }
}
```

</div>
<div>

```js
query {
    searchFood(name: "Everything"){
        ... on Bread { 
                name, 
                type 
        }
        ... on Roll { 
                name, 
                hardness 
        }
    }
}
```

</div>
</div>
<br/>

Most of the time, GraphQL ASP.NET can correctly interpret which type it should match on to allow the query to progress. However, in the above example, we declare a union, `RollOrBread`, that is of types `Roll` and `Bread`  yet we return a `Bagel` from the action method. 

Since `Bagel` inherits from `Roll` and subsequently from `Bread` which type should we match against when executing the following query?

The bagel is both the type `Roll` AND the type `Bread`, it could be used as either. GraphQL ASP.NET will be unable to determine which type to use and can't advance the query to select the appropriate fields. The query result is said to be indeterminate. 

GraphQL ASP.NET offers a way to allow you to take control of your unions and make the determination on your own. The `ResolveType` method of `IGraphUnionProxy` will be called whenever a query result is indeterminate, allowing you to choose which of your UNION's allowed types should be used. 

> Note: `IGraphUnionProxy.ResolveType` is not based on the explicit value being inspected, but only on the `System.Type`.  The results for a given field are cached for speedier type resolution on subsequent queries.

```csharp
// RollOrBread.cs
public class RollOrBread : GraphUnionProxy
{
    public RollOrBread()
        : base(typeof(Roll), typeof(Bread))
    {}

    public override Type ResolveType(Type runtimeObjectType)
    {
        if (runtimeObjectType == typeof(Bagel))
            return typeof(Roll);
        else
            return typeof(Bread);
    }
}

// BakeryController.cs
public class BakeryController : GraphController
{
    [QueryRoot("searchFood", typeof(RollOrBread))]
    public IGraphActionResult SearchFood(string name)
    {
        return new Bagel();
    }
}
```

The query will now interpret all `Bagels` as `Rolls` and be able to process the query correctly.

If, via your logic you are unable to determine which of your Union's types to return then return null and GraphQL will supply the caller with an appropriate error message stating the query was indeterminate. Also, returning any type other than one that was formally declared as part of your Union will result in the same indeterminate state.

**Note:** Most of the time GraphQL ASP.NET will never call the `ResolveType` method on your UNION. If your union types do not share an inheritance chain, for instance, the method will never be called. If your types do share an inheritance chain, such as in the example above, considering using an interface graph type along with specific fragments instead of a UNION, to avoid the issue altogether.
