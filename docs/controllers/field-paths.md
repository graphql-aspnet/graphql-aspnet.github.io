---
id: field-paths
title: Field Paths
sidebar_label: Field Paths
sidebar_position: 2
hide_title: true
---

## What is a Field Path?
 GraphQL is statically typed. Each field in a query must always resolve to a single graph type known to the schema. In .NET terms that means each field must be represented by a method or property on some class or struct.  Traditionally speaking, this can introduce a lot of overhead in defining intermediate types that do nothing but organize our data.

Let's think about this query:

```graphql title="Sample Query"
query {
    groceryStore {
        bakery {
            pastries {
                    donut(id: 15){
                        name
                        flavor
                    }
                }
        }
        deli {
            meats {
                beef (id: 23) {
                    name
                    cut
                }
            }
        }    
    }
}
```

Knowing what we know, you may think we need to create types for the grocery store, the bakery, pastries, a donut, the deli counter, meats, beef etc. in order to create properties and methods for all those fields. Its a lot of setup for what basically boils down to two methods to retrieve a donut and a cut of beef by their respective ids.

However, with GraphQL ASP.NET, using a templating pattern similar to what we do with REST controllers we can create rich graphs with very little boiler plate. Adding a new arm to your graph is as simple as defining a path to it in a controller.

```csharp title="Sample Controller"
// highlight-next-line
[GraphRoute("groceryStore")]
public class GroceryStoreController : GraphController
{
    // highlight-next-line
    [Query("bakery/pastries/donut")]
    public Donut RetrieveDonut(int id)
    {/* ...*/}

    // highlight-next-line
    [Query("deli/meats/beef")]
    public Meat RetrieveCutOfBeef(int id)
    {/* ...*/}
}
```

Internally, for each encountered path segment (e.g. `bakery`, `meats`), GraphQL generates a virutal, intermediate graph type to fulfill resolver requests for you and acts as a pass through to your real code. It does this in concert with your real code and performs a lot of checks at start up to ensure that the combination of your real types as well as virutal types can be put together to form a functional graph.  If a collision occurs the server will fail to start.

:::info Intermediate Type Names
You may notice some object types in your schema named as `Query_Bakery`, `Query_Deli` these are the virtual types generated at runtime to create a valid schema from your path segments.
:::

## Declaring Field Paths

Declaring fields works just like it does with a REST query.  You can nest fields as deep as you want and spread them across any number of controllers in order to create a rich organizational hierarchy to your data. This is best explained by code, take a look at these two controllers:

```csharp title="BakeryController.cs"
// highlight-next-line
[GraphRoute("groceryStore/bakery")]
public class BakeryController : GraphController
{
    // highlight-next-line
    [Query("pastries/search")]
    public IEnumerable<IPastry> SearchPastries(string nameLike)
    {/* ... */}

    // highlight-next-line
    [Query("pastries/recipe")]
    public Task<Recipe> RetrieveRecipe(int id)
    {/* ... */}

    // highlight-next-line
    [Query("breadCounter/orders")]
    public IEnumerable<BreadOrder> FindOrders(int customerId)
    {/* ... */}
}
```
```csharp title="PharmacyController.cs"
// highlight-next-line
[GraphRoute("groceryStore/pharmacy")]
public class PharmacyController : GraphController
{
    // highlight-next-line
    [Query("employees/search")]
    public IPastry SearchEmployees(string nameLike)
    {/* ... */}

    // highlight-next-line
    [QueryRoot("pharmacyHours")]
    public HoursOfOperation RetrievePharmacyHours(DayOfTheWeek day)
    {/* ... */}

    // highlight-next-line
    [Query("orders")]
    public IEnumerable<Prescription> FindOrders(int customerId)
    {/* ... */}
}
```

And this single query we can perform:

```graphql title="Sample Query"
query SearchGroceryStore {
    groceryStore {
        bakery {
            pastries {
                search(nameLike: "chocolate"){
                    name
                    type
                }
                recipe(id: 15) {
                    name
                    ingredients {
                        name
                    }
                }
            }
        }
        pharmacy {
            orders(customerId: 45123){
                dayOrdered
                type
                doctorsName
            }
        }
    }
    pharmacyHours(day: MONDAY){
        openAt
        closeAt
    }
}
```

With REST, this is probably 4 separate requests or one super contrived request but with GraphQL and a carefully thought out set of field paths we can model our data hierarchy quickly and without over complicating the code. There is no more code in this example than would be required by a REST API; we've just changed how its interpreted at runtime.

## Actions Must Have a Unique Path

Each field of each type in your schema must uniquely map to one method or property getter; commonly referred to as its resolver. We can't declare a field twice.

Take this example:

```csharp title="Overloaded Methods"
[GraphRoute("bakery")]
public class BakeryController : GraphController
{
    // Both Methods represent the same 'orderDonuts' field on the graph

    [Mutation]
    // highlight-next-line
    public BoxOfDonuts OrderDonuts(int quantity){/*...*/}

    [Mutation]
    // highlight-next-line
    public BoxOfDonuts OrderDonuts(string type, int quantity){/*...*/}
}
```

From a GraphQL perspective this equivilant to trying to define a `bakery` type with two fields named `orderDonuts`. Since both methods map to a field path of `[mutation]/bakery/orderDonuts` this would cause a `GraphTypeDeclarationException` to be thrown when your application starts. 

With Web API, the ASP.NET runtime could inspect any combinations of parameters passed on the query string or the POST body to work out which overload to call. You might be thinking, why can't GraphQL inspect the passed input arguments and make the same determination?

Putting aside that it [violates the specification](http://spec.graphql.org/October2021/#sec-Objects), in some cases it probably could. But looking at this example we run into an issue:

```csharp 
[GraphRoute("bakery")]
public class BakeryController : GraphController
{
    // Both Methods represent the same 'orderDonuts' field on the object graph
    [Mutation]
    public Manager OrderDonuts(int quantity, string type){/*...*/}

    [Mutation]
    public Manager OrderDonuts(string type, int quantity){/*...*/}
}
```
GraphQL states that input arguments can be passed in any order [Spec § [2.6](https://graphql.github.io/graphql-spec/October2021/#sec-Language.Arguments)]. By definition, there is not enough information in the query syntax language to decide which overload to invoke. To combat the issue, the runtime will reject any field that it can't uniquely identify.

No problem through, there are a number of ways fix the conflict.

### Declare Explicit Names

You can declare explicit names for each of your methods. Not only does this resolve the method overloading conflict but should an errant refactor of your code occur, your graph fields won't magically be renamed to their new method names and break your front-end.

```csharp title="Use Explicit Field Names"
[GraphRoute("bakery")]
public class BakeryController : GraphController
{
    // GraphQL treats these fields differently!
    
    // highlight-next-line
    [Mutation("orderDonutsByQuantity")]
    public Manager OrderDonuts(int quantity){/*...*/}

    // highlight-next-line
    [Mutation("orderDonutsByType")]
    public Manager OrderDonuts(string type, int quantity){/*...*/}
}
```

But this can feel a bit awkward in some situations so instead...

### Change The Hierarchy

Another alternative is to change where in the object graph the field sits. Here we've moved one field to the root mutation type and left the other under the controller's own `bakery` field. This can be a good strategy if you have one primary way of interacting with your data and a few auxillary methods such as a quick dozen donuts at the drive thru window or going into the shop and selecting which ones you want.


```csharp title="Change the Field Path"
[GraphRoute("bakery")]
public class BakeryController : GraphController
{    
    // highlight-next-line
    [MutationRoot("orderDonuts")]
    public IEnumerable<Donut> OrderDonuts(int count)
    {/*...*/}

    // highlight-next-line
    [Mutation("orderDonuts")]
    public IEnumerable<Donut> OrderDonuts(
        string type,
        int count)
    {/*...*/}
}
```

```graphql title="Sample Queries"
mutation {
    orderDonuts(count: 12) {
        name
        flavor
    }
}

mutation {
    bakery {
        orderDonuts(type: "Chocolate" count: 3) {
            name
            flavor
        }
    }
}
```

### Combine the Fields

Lastly, we can make use of input objects with optional fields and combine parameters into a more robust method.

```csharp title="Use an Input Object"
[GraphRoute("bakery")]
public class BakeryController : GraphController
{
    [Mutation("orderDonuts")]    
    // highlight-next-line
    public IEnumerable<Donut> OrderDonuts(DonutOrderModel order)
    {/*...*/}
}

public class DonutOrderModel
{
    public int? Quantity { get; set; }
    public string Type { get; set; }
}
```

```graphql title="Sample Queries"
mutation byQuantity {
    bakery{
        orderDonuts (order: {quantity: 12}){
            id
            type
        }
    }
}

mutation byType {
    bakery{
        orderDonuts (order: {type: "Chocolate" quantity: 12}){
            id
            type
        }
    }
}
```

When you start thinking about large object graphs, 100s of controllers and 100s of types, you have to put some thought in to how you organize your data. Coming up with an intuitive structure to your hierarchy is going to be dependent on your audience and use cases. There is no one-size fits all approach, but with the ability to move graph fields by updating one string, its trivial to build as you iterate.

## Field Path Names

:::info
 Each segment of a virtual field path must individually conform to the required naming standards for fields and graph type names.
:::

In reality this primarily means don't start your fields with a double underscore, `__`, as thats reserved by the introspection system. The complete regex is available in the source code at `Constants.RegExPatterns.NameRegex`.

These are some valid field paths:

```csharp title="Valid Field Fragments"
[Mutation("store/bakery/deliCounter/sandwiches/order")]
[Mutation("path1/path2/path3/path4/")]
[Mutation("path1/path1/path1/path1/path1/path1/path1/path1/path1")]
```

But if even one segment of the path is invalid GraphQL will reject it completely.

```csharp title="Invalid Field Fragments"
[Query("store/__bakery")] // can't start with "__"
[Query("store/βakery")]  // unicode characters are not allowed
[Query("path1/path2/path 33")]  // spaces are not allowed
```

### Schema Naming Formats

At runtime, when your schema is generated, the naming requirements it defines will be enforced for each path segment. By default this means `camelCasing` on field names.

If you declare:

```csharp
[Mutation("Store/Bakery/DeliCounter")]
```

You would still query with :

```javascript
mutation {
    store {
        bakery {
            deliCounter {
                ...

        }
    }
}
```

You can alter the naming formats for fields, enum values and graph types using the declaration options on your [schema configuration](../reference/schema-configuration#graphnamingformatter).
