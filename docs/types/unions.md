---
id: unions
title: Unions
sidebar_label: Unions
sidebar_position: 3
---

Unions are an aggregate graph type representing multiple, different `OBJECT` types with no guaranteed fields or interfaces in common; for instance, `Salad` or `House`. Because of this, unions define no fields themselves but provide a common way to query the fields of the union members when one is encountered.

Unlike other graph types there is no concrete representation of unions. Where a `class` is an object graph type or a .NET `enum` is an enum graph type there is no analog for unions. Instead unions are semi-virtual types that are created from proxy classes that represent them at design time.

## Declaring a Union

You can declare a union in your action method using one of the many overloads to the query and mutation attributes:

```csharp title="Declaring an 'inline' Union on an Action Method"
public class DataController : GraphController
{
    // highlight-next-line
    [QueryRoot("search", "SaladOrHouse", typeof(Salad), typeof(House))]
    public ????? SearchData(string name)
    {/* ... */}
}
```

```graphql  title="Example Query"
query {
    search(name: "green*") {
        ...on Salad {
            name
            hasCroutons
        }

        ...on House {
            postalCode
            squareFeet
        }
    }
}
```

In this example we :

-   Declared an action method named `SearchData` with a graph field name of `search`
-   Declared a union type on our graph named `SaladOrHouse`
-   Included two object types in the union: `Salad` and `House`

:::tip
Unlike with [interfaces](./interfaces) where the possible types returned from an action method can be declared else where, you MUST provide all of the types to include in the union in the declaration.
:::

### What to Return for a Union

Notice we have a big question mark on what the action method returns in the above example. From a C# perspective, in this example, there is no `IDataItem` interface shared between `Salad` and `House`. This represents a problem for static-typed languages like C#. Since unions are virtual types there exists no common type that you can return for generated data. `System.Object` might work but it tends be too general and the runtime will reject it as a safe guard.

So what do you do? Return an `IGraphActionResult` instead and let the runtime handle the details.

```csharp title="Return IGraphActionResult When Working With Unions"
public class DataController : GraphController
{
    // service injection omitted for brevity

    [QueryRoot("search", "SaladOrHouse", typeof(Salad), typeof(House))]
    // highlight-next-line
    public async Task<IGraphActionResult> SearchData(string text)
    {
        if(name.Contains("green"))
        {
            Salad salad = await _saladService.FindSalad(text);
            return this.Ok(salad);
        }
        else
        {
            House house = await _houses.FindHouse(text);
            return this.Ok(house);
        }
    }
}
```

:::info
Any controller action that declares a union MUST return an `IGraphActionResult`
:::

#### Returning a List of Objects
Perhaps the most complex scenario when working with unions is returning a list of objects. Since there there is no way to declare a `List<T>` that the library could analyze we have to explicitly declare the field to let GraphQL what is going on.


```csharp title="Return a List of Objects"
public class DataController : GraphController
{
    // service injection omitted for brevity
    // highlight-next-line
    [QueryRoot("search", "SaladOrHouse", typeof(Salad), typeof(House), TypeExpression = "[Type]")]
    public async Task<IGraphActionResult> SearchData(string text)
    {
        Salad salad = await _saladService.FindSalad(text);
        House house = await _houses.FindHouse(text);

        var dataItems = new List<object>();
        dataItems.Add(salad);
        dataItems.Add(house);

        return this.Ok(dataItems);
    }
}
```
> Here we've added a custom type expression to tell GraphQL that this field returns a list of objects. GraphQL will then process each item on the list according to the rules of the union.

## Union Proxies

In the example above, we declare the union inline on the query attribute. But what if we wanted to reuse the `SaladOrHouse` union in multiple places. You could declare the union exactly the same on each method or use a union proxy. 

Create a class that implements `IGraphUnionProxy` or inherits from `GraphUnionProxy` to encapsulate the details, then add that as a reference in your controller methods instead of the individual types. This can also be handy for uncluttering your code if you have a lot of possible types for the union. The return type of your method will still need to be `IGraphActionResult`. You cannot return a proxy as a value.

```csharp title="Example Using IGraphUnionProxy"
public class KitchenController : GraphController
{
    // highlight-next-line
    [QueryRoot("searchFood", typeof(SaladOrHouse))]
    public async Task<IGraphActionResult> SearchFood(string name)
    {/* ... */}
}

// highlight-next-line
public class SaladOrHouse : GraphUnionProxy
{
     public SaladOrHouse()
    {
        this.Name = "SaladOrHouse";
        this.AddType(typeof(Salad));
        this.AddType(typeof(House));
    }
}
```

> If you don't supply a name, graphql will use the class name of the proxy as the name of the union.

## Union Name Uniqueness

Union names must be unique in a schema. If you do declare a union in multiple action methods without a proxy, GraphQL will attempt to merge the references by name and included types. As long as all declarations are the same, that is the name and the set of included types, then graphql will accept the union. Otherwise, a `GraphTypeDeclarationException` will be thrown at startup.

```csharp title="An Invalid Union Declaration"
public class KitchenController : GraphController
{
    // highlight-next-line
    [QueryRoot("search", "SaladOrHouse", typeof(Salad), typeof(House))]
    public async Task<IGraphActionResult> SearchData(string name)
    {/* ... */}

    // ERROR: Union members for 'SaladOrHouse' are different
    // -----------------
    // highlight-next-line
    [QueryRoot("fetch", "SaladOrHouse", typeof(Salad), typeof(House), typeof(GameConsole))]
    public async Task<IGraphActionResult> RetrieveItem(int id)
    {/* ... */}
}
```

## Liskov Substitutions

[Liskov substitutions](https://en.wikipedia.org/wiki/Liskov_substitution_principle) (the L in [SOLID](https://en.wikipedia.org/wiki/SOLID)) are an important part of object oriented programming. To be able to have one class masquerade as another allows us to easily extend our code's capabilities without any rework.

For Example, the Oven object below can bake any type of bread!

```csharp title="Liskov Substitution Example"
public class Bread
{}

public class Roll : Bread
{}

public class Bagel : Roll
{}

public class Oven 
{
    // highlight-next-line
    public void Bake(Bread bread)
    {
        // We can pass in Bread, Roll or Bagel to the oven.
    }
}
```

However, this presents a problem when when dealing with UNIONs and GraphQL:

```csharp title="BakeryController.cs"
public class BakeryController : GraphController
{
    // highlight-next-line
    [QueryRoot("searchFood", "RollOrBread",  typeof(Roll), typeof(Bread))]
    public IGraphActionResult SearchFood(string name)
    {
        // Should GraphQL treat a bagel 
        // as a Roll or Bread ??
        // highlight-next-line
        var myBagel = new Bagel();
        return this.Ok(myBagel);
    }
}
```
```graphql title="Sample Query"
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

Most of the time, graphql can correctly interpret the correct type of a returned data object and continue processing the query. However, in the above example, we declare a union, `RollOrBread`, that is of types `Roll` or `Bread`  yet we return a `Bagel` from the action method. 

Since `Bagel` is both a `Roll` and `Bread` which type should graphql match against when executing the inline fragments? Since it could be either, graphql will be unable to determine which type to use and can't advance the query to select the appropriate fields. The query result is said to be indeterminate. 

#### IGraphUnionProxy.MapType
Luckily there is a way to allow you to take control of your unions and make the determination on your own. The `MapType` method provided by `IGraphUnionProxy` will be called whenever a query result is indeterminate, allowing you to choose which of your union's allowed types should be used. 


```csharp title="Using a Custom Type Mapper"
public class RollOrBread : GraphUnionProxy
{
    public RollOrBread()
    {
        this.AddType(typeof(Roll));
        this.AddType(typeof(Bread));
    }

    // highlight-start
    public override Type MapType(Type runtimeObjectType)
    {
        if (runtimeObjectType == typeof(Bagel))
            return typeof(Roll);
        else
            return typeof(Bread);
    }
    // highlight-end
}
```

The query will now interpret all `Bagels` as `Rolls` and be able to process the query correctly.

If, via your logic you are unable to determine which of your Union's types to use then return `null` and GraphQL will supply the caller with an appropriate error message stating the query was indeterminate. Also, returning any type other than one that was formally declared as part of your Union will result in the same indeterminate state.

Most of the time GraphQL ASP.NET will never call `MapType` on your union proxy. If your union types do not share an inheritance chain, for instance, the method will never be called.

:::caution
  The `MapType()` function is not based on a resolved value, but only on the `System.Type` that was encountered. This is by design to guarantee consistency in query execution. 
:::
