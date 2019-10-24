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

If you need to reuse your unions in multiple methods you'll want to create a class that implements `IGraphUnionProxy` to encapsulate the details, then add that as a reference in your controller methods instead of the individual types. This can also be handy for uncluttering your code if you have a lot of possible types for the union. The return type of your method will still need to be `IGraphActionResult`. You cannot return a `IGraphUnionProxy` as a value.

```csharp
public class KitchenController : GraphController
{
    [QueryRoot("searchFood", typeof(SaladOrBread))]
    public async Task<IGraphActionResult> SearchFood(string name)
    {/* ... */}
}

// SaladOrBread.cs
using GraphQL.AspNet.Interfaces.TypeSystem;
public class SaladOrBread : IGraphUnionProxy
{
    public string Name { get; } = "SaladOrBread";
    public string Description { get; } string.Empty;
    public HashSet<Type> Types { get; } = new HashSet<Type>(new [] { typeof(Salad), typeof(Bread)});
    public bool Publish { get; } = true;
}
```

## Union Name Uniqueness

Union names must be unique in a schema. If you do declare a union in multiple action methods without a proxy, GraphQL will attempt to validate the references by name and included types. As long as all declarations are the same, that is the name and the set of types match, then there is no issue. Otherwise, a `GraphTypeDeclarationException` will be thrown.
