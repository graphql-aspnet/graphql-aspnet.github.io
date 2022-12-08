---
id: field-paths
title: Field Paths
sidebar_label: Field Paths
sidebar_position: 2
---

 GraphQL is statically typed. Each field in a query must always resolve to a single graph type known to the schema. This can make query organization rather tedious and adds A LOT of boilerplate code if you wanted to introduce even the slightest complexity to your graph.

Let's think about this query:

```ruby
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

Knowing what we know about GraphQL's requirements, we need to create types for the grocery store, the bakery, pastries, a donut, the deli counter, meats, beef etc. Its a lot of setup for what basically boils down to two methods to retrieve a donut and a cut of beef by their respective ids.

This is where `virtual graph types` come in. Using a templating pattern similar to what we do with REST queries we can create rich graphs with very little boiler plate. Adding a new arm to your graph is as simple as defining a path to it in a controller.

```csharp
[GraphRoute("groceryStore")]
public class GroceryStoreController : GraphController
{
    [Query("bakery/pastries/donut")]
    public Donut RetrieveDonut(int id)
    {/* ...*/}

    [Query("deli/meats/beef")]
    public Meat RetrieveCutOfBeef(int id)
    {/* ...*/}
}
```

Internally, for each encountered path segment (e.g. `bakery`, `meats`), GraphQL generates a `virutal graph type` to fulfill resolver requests for you and act as a pass through to your real code. It does this in concert with your real code and performs a lot of checks at start up to ensure that the combination of your real types as well as virutal types can be put together to form a functional graph.  If a collision occurs the server will fail to start.

:::info Virtual Type Names
You may notice some object types in your schema named as `Query_Bakery`, `Query_Deli` these are the virtual types generated at runtime to create a valid schema from your path segments.
:::

#### Another Example

You can nest fields as deep as you want and spread them across any number of controllers in order to create a rich organizational hierarchy to your data. This is best explained by code, take a look at these two controllers:

```csharp title="BakeryController.cs"
[GraphRoute("groceryStore/bakery")]
public class BakeryController : GraphController
{
    [Query("pastries/search")]
    public IEnumerable<IPastry> SearchPastries(string nameLike)
    {/* ... */}

    [Query("pastries/recipe")]
    public Recipe RetrieveRecipe(int id)
    {/* ... */}

    [Query("breadCounter/orders")]
    public IEnumerable<BreadOrder> FindOrders(int customerId)
    {/* ... */}
}
```
```csharp title="PharmacyController.cs"
[GraphRoute("groceryStore/pharmacy")]
public class PharmacyController : GraphController
{
    [Query("employees/search")]
    public IPastry SearchEmployees(string nameLike)
    {/* ... */}

    [QueryRoot("pharmacyHours")]
    public HoursOfOperation RetrievePharmacyHours(DayOfTheWeek day)
    {/* ... */}

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

Each field in your object graph must uniquely map to one method (or getter property), commonly referred to as its resolver.

Take this example:

```csharp
public class BakeryController : GraphController
{
    [QueryRoot]
    public Donut RetrieveDonutType(int id){/*...*/}
}

public class Donut
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Icing Icing { get; set; }
}

public class Icing
{
    public IcingType Type { get; set; }
    public string Name { get; set; }
    public bool MegaSugar { get; set; }
}
```
```graphql
query {
    donut(id: 5){
        id
        name
        icing {
            type
            name
            megaSugar
        }
    }
}
```

We can identify 8 unique fields:

```javascript
[query]                     // the top level query 
[query]/retrieveDonutType   // the root level action method
[type]/donut/id             // the id property of the donut object
[type]/donut/name
[type]/donut/icing
[type]/icing/type
[type]/icing/name
[type]/icing/megaSugar
```

But what about method overloading?

```csharp title="Overloaded Methods"
[GraphRoute("bakery")]
public class BakeryController : GraphController
{
    // Both Methods represent the same 'orderDonuts' field on the object graph
    [Mutation]
    public Manager OrderDonuts(int quantity){/*...*/}

    [Mutation]
    public Manager OrderDonuts(string type, int quantity){/*...*/}
}
```

From a GraphQL perspective this equivilant to trying to define a `bakery` type with two fields named `orderDonuts`. Since both methods map to a field path of `[mutation]/bakery/orderDonuts` this would cause a `GraphTypeDeclarationException` to be thrown when your application starts. 

With MVC the ASP.NET runtime could inspect any combinations of parameters passed on the query string or the POST body to work out which overload to call. You might be thinking, why can't GraphQL inspect the passed input arguments and make the same determination?

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

We'd pair these methods with different URL fragments and could work out which method to call in a REST request based on the full structure of the URL.

However, the GraphQL specification states that input arguments can be passed in any order [Spec § [2.6](https://graphql.github.io/graphql-spec/October2021/#sec-Language.Arguments)]. GraphQL, by definition, does not supply enough information in its query syntax to decide which overload to invoke. To combat the issue, the runtime will reject any field that it can't uniquely identify.

No problem through, there are a number of ways fix the conflict.

### Declare Explicit Names

One approach is to declare explicit names for each of your methods. Not only does this resolve the conflict but should an errant refactor of your code occur, your graph fields won't magically be renamed to their new method names and break your front-end.

```csharp title="Use Explicit Field Names"
[GraphRoute("bakery")]
public class BakeryController : GraphController
{
    // GraphQL treats these fields differently!
    [Mutation("orderDonutsByQuantity")]
    public Manager OrderDonuts(int quantity){/*...*/}

    [Mutation("orderDonutsByType")]
    public Manager OrderDonuts(string type, int quantity){/*...*/}
}
```

Now we have unique field paths:

```javascript
[query]/bakery/orderDonutsByQuantity
[query]/bakery/orderDonutsByType
```

But this can feel a bit awkward in some situations so instead...

### Change The Hierarchy

Another alternative is to change where in the object graph the field sits. Here we've moved one field to the root mutation type and left the other under the controller's own `bakery` field. This can be a good strategy if you have one primary way of interacting with your data and a few auxillary methods such as a quick dozen donuts at the drive thru window or going into the shop and selecting which ones you want.


```csharp title="Change the Field Path"
[GraphRoute("bakery")]
public class BakeryController : GraphController
{
    [MutationRoot("orderDonuts")]
    public IEnumerable<Donut> OrderDonuts(int count)
    {/*...*/}

    [Mutation("orderDonuts")]
    public IEnumerable<Donut> OrderDonuts(
        string type,
        int count)
    {/*...*/}
}
```

```graphql title="Sample Queries"
mutation {
    orderDonuts(count: 12){
        name
        flavor
    }
}

mutation {
    bakery {
        orderDonuts(
                type: "Chocolate"
                count: 3){
            name
            flavor
        }
    }
}
```

And the unique field paths are:

```ruby
[mutation]/orderDonuts
[mutation]/bakery/orderDonuts
```

### Combine the Fields

Lastly, we can make use of input objects with optional fields and combine parameters into a more robust method.

```csharp title="Use an Input Object"
[GraphRoute("bakery")]
public class BakeryController : GraphController
{
    [Mutation("orderDonuts")]
    public IEnumerable<Donut> OrderDonuts(DonutOrderModel order)
    {/*...*/}
}

public class DonutOrderModel
{
    public int? Quantity { get; set; }
    public string Type { get; set; }
}
```

Which can be called by either of these mutations:

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

You can alter the naming formats for fields, enum values and graph types using the declaration options on your [schema configuration](../reference/schema-configuration).
