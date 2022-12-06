---
id: type-extensions
title: Type Extensions
sidebar_label: Type Extensions
---

## Working with Child Data

Before we dive into `type extensions` we have to talk about parent-child relationships. So far, the examples we've seen have used well defined fields in an object graph. Be that an action method on a controller or a property on an object.

But when we think about real world data, there are scenarios where that poses a problem. Lets suppose for a moment we have a chain of bakery stores that let customers place orders for cakes at an individual store and customize the writing on the cake.

A C# model might look something like this:

```csharp
public class Bakery
{
    public int Id { get; set; }
    public List<CakeOrder> Orders { get; set; }
}

public class CakeOrder
{
    public Customer Customer { get; set; }
    public string  WrittenPhrase { get; set; }
    public Bakery Bakery { get; set; }
}

// ...Customer class excluded for brevity
```

Given what we've seen so far:

-   What happens when we retrieve a Cake Order?
-   Do we automatically have to populate the entire `Bakery` and `Customer`?
    -   Even if a query didn't request any of that data?
-   What about retrieving a bakery that may have 1000s of cake orders?

Our application is going to slow to a crawl very quickly doing all this extra data loading. In the case of a single Bakery, a timeout may occur trying to fetch many years of cake orders to populate the bakery instance from a database query only to discard them when a graphql query doesn't ask for it.

One solution could be to use lazy loading on our model.

```csharp
public class Bakery
{

    private ICakeService _service;
    private Lazy<List<CakeOrder>> _orders;

    public Bakery(int id, ICakeService service)
    {
        this.Id = id;
        _service = service;
        _orders = new Lazy<List<CakeOrder>>(this.RetrieveCakeOrders);
    }

    private List<CakeOrder> RetrieveCakeOrders()
    {
        return _service.RetrieveCakeOrders(this.Id);
    }

    public int Id { get; }
    public List<CakeOrder> Orders => _orders.Value;
}
```

Well that's just plain awful. We've over complicated our bakery model and made it dependent on a service instance to exist. If this was a real world example, you'd need some sort of error handling in there too.

## The [TypeExtension] Attribute

So what do we do? We've talked before about GraphQL maintaining a 1:1 mapping between a field in the graph and a method to retrieve data for it (i.e. its assigned resolver). What prevents us from creating a method to fetch a list of Cake Orders and saying, "Hey, GraphQL! When someone asks for the field `[type]/bakery/orders` call our method instead of a property getter on the `Bakery` class. As it turns out, that is exactly what a `Type Extension` does.

```csharp
// Bakery.cs
public class Bakery
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class BakedGoodsCompanyController : GraphController
{
    [QueryRoot("bakery")]
    public Bakery RetrieveBakery(int id){/*...*/}

    // declare the type extension as a controller action.
    [TypeExtension(typeof(Bakery), "orders")]
    public async Task<List<CakeOrder>> RetrieveCakeOrders(Bakery bakery, int limitTo = 15){

        return await _service.RetrieveCakeOrders(bakery.Id, limitTo);
    }
}
```

Much Cleaner!!

There is a lot to unpack here, so lets step through it:

-   We've declared the `RetrieveBakery` method as a root field named `bakery` that allows us to fetch a single bakery.
-   We've added a method named `RetrieveCakeOrders`, declared it as an _extension_ to the `Bakery` graph type and gave it a field name of `orders`.
-   The method returns `List<CakeOrder>` as the type of data it generates.
-   The method takes in a `Bakery` instance (more on that in a second) as well as an integer, with a default value of `15`, to limit the number of orders to retrieve.

Now we can query the `orders` field from anywhere a bakery is returned in the object graph and GraphQL will invoke our method instead searching for a property named `Bakery.Orders`.

```javascript
query {
    bakery(id: 5){
        name
        orders(limitTo: 50) {
            id
            writtenPhrase
        }
    }
}
```

> Type Extensions allow you to attach new fields to a graph type without altering the original `System.Type`.

#### But what about the Bakery parameter?

When you declare a type extension it will only be invoked in context of the type being extended.

When we return a value from a property, an instance of an object must exist in order to supply that value. That is to say if you want the `Name` property of a bakery, you need a bakery instance to retrieve it from.  The same is true for a `type extension` except that instead of calling a property getter on the instance, graphql hands the entire object to our method and lets us figure out what needs to happen to resolve the field.

GraphQL inspects the type being extended and finds a parameter on the method to match it. It captures that parameter, hides it from the object graph, and fills it with the result of the parent field, in this case the resolution of field `bakery(id: 5)`.

This is immensely scalable:

-   There are no wasted cycles fetching `CakeOrders` unless the requestor specifically asks for them.
-   We have full access to [type expression validation](../advanced/type-expressions) and [model validation](./model-state) for our other method parameters.
-   Since its a controller action we have full access to graph action results and can return `this.Ok()`, `this.Error()` etc. to give a rich developer experience.
-   [Field Security](./authorization) is also wired up for us.
-   The bakery model is greatly simplified.

#### Can every field be a type extension?

Theoretically, yes. But take a moment and think about performance. For basic objects with few dozen properties which is faster:

-   One database query to retrieve 24 columns of a single record then only use six in a graph result.
-   Six separate database queries, one for each string value requested.

Type extensions shine in parent-child relationships when preloading data is a concern but be careful not to go isolating every graph field just to avoid retrieving data. Fetching a few extra bytes from a database is negligible compared to querying a database 20 individual times. Your REST APIs likely do it as well and they even transmit that data down the wire to the client and the client has to discard it.

It comes down to your use case. There are times when it makes sense to query data separately using type extensions and times when preloading whole objects is better. For many applications, once you've deployed to production, the queries being executed are finite. Design your model objects and extensions to be performant in the ways your data is being requested, not in the ways it _could be_ requested.
