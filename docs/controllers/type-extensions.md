---
id: type-extensions
title: Type Extensions
sidebar_label: Type Extensions
sidebar_position: 4
---

## Working with Child Data
_The Motiviation for using Type Extensions_

Before we dive into type extensions we have to talk about parent-child relationships. So far, the examples we've seen have used well defined fields in an object graph. Be that an action method on a controller or a property on an object. But when we think about real world data, there are scenarios where that poses a problem. Lets suppose for a moment we have a chain of bakery stores that let customers place orders for cakes at an individual store and customize the writing on the cake.

```csharp title="Sample Bakery Model"
public class Bakery
{
    public int Id { get; set; }
    // highlight-next-line
    public List<CakeOrder> Orders { get; set; }
}

public class CakeOrder
{
    public Customer Customer { get; set; }
    public string  WrittenPhrase { get; set; }
    // highlight-next-line
    public Bakery Bakery { get; set; }
}

// ...Customer class excluded for brevity
```

But consider the following scenarios:

-   What happens when we retrieve a single `CakeOrder` via a controller?
-   Do we automatically have to populate the entire `Bakery` and `Customer` objects?
    -   Even if a caller didn't request any of that data?
-   What happens when retrieving a bakery that may have 1000s of cake orders?

Our application is going to slow to a crawl very quickly doing all this extra data loading. In the case of a single Bakery, a timeout may occur trying to fetch many years of cake orders to populate the bakery instance from a database query only to discard them when a graphql query doesn't ask for it. If we're using something like Entity Framework how do we know when to use an Include statement to populate the child data? (Hint: you don't)

One solution could be to use lazy loading on our model.

```csharp title="Lazy Loading Child Data (Terrible!)"
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

We've talked before about GraphQL maintaining a 1:1 mapping between a field in the graph and a method to retrieve data for it (i.e. its assigned resolver). What prevents us from creating a method to fetch a list of Cake Orders and saying, "Hey, GraphQL! When someone asks for a set of bakery orders call a custom method instead of a property getter on the `Bakery` class." As it turns out, that is exactly what a `Type Extension` does.

```csharp title="Using a Type Extension"
public class Bakery
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class BakedGoodsCompanyController : GraphController
{
    [QueryRoot("bakery")]
    public Bakery RetrieveBakery(int id){/*...*/}

    // declare a extension to the Bakery object
    // highlight-next-line
    [TypeExtension(typeof(Bakery), "orders")]
    public async Task<List<CakeOrder>> RetrieveCakeOrders(Bakery bakery, int limitTo = 15)
    {
        return await _service.RetrieveCakeOrders(bakery.Id, limitTo);
    }
}
```

Much Cleaner!!

There is a lot to unpack here, so lets step through it:

-   We've declared the `RetrieveBakery` method as a root field named `bakery` that allows us to fetch a single bakery.
-   We've added a method named `RetrieveCakeOrders`, declared it as an _extension_ to the `Bakery` object and gave it a field name of `orders`.
-   The extension returns `List<CakeOrder>` as the type of data it generates.
-   The method takes in a `Bakery` instance (more on that in a second) as well as an integer, with a default value of `15`, to limit the number of orders to retrieve.

Now we can query the `orders` field from anywhere a bakery is returned in the object graph and GraphQL will invoke our method:

```graphql title="Sample Query"
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

:::tip 
Type Extensions allow you to attach new fields to a graph type without altering the original `System.Type`.
:::

#### ❓ But what about the Bakery parameter?

When we return a value from a property, an instance of an object must exist in order to supply that value. That is to say if you want the `Name` property of a bakery, you need a bakery instance to retrieve it from.  The same is true for a `type extension` except that instead of calling a property getter on the instance, graphql hands the entire object to your method and lets you figure out what needs to happen to resolve the field.

GraphQL inspects the type being extended and finds a parameter on the method to match it. It captures that parameter, hides it from the object graph, and fills it with the result of the parent field, in this case the resolution of field `bakery(id: 5)`.

This is immensely scalable:

✅ There are no wasted cycles fetching `CakeOrders` unless the requestor specifically asks for them.<br/>
✅ We have full access to [type expression validation](../advanced/type-expressions) and [model validation](./model-state) for our other method parameters.<br/>
✅Since its a controller action we have full access to graph action results and can return `this.Ok()`, `this.Error()` etc. to give a rich experience.<br/>
✅[Field Security](./authorization) and use of the `[Authorize]` attribute is also wired up for us. <br/>
✅The bakery model is greatly simplified.

## Can Every Field be a Type Extension?

Theoretically, yes. But take a moment and think about performance. For basic objects with few dozen properties which is faster:

-   _Option 1:_ One database query to retrieve 24 columns of a single record then only use six in a data result
-   _Option 2:_ Six separate database queries, one for each column requested.

Type extensions shine in parent-child relationships when preloading lots of data is a concern. But be careful not to isolate every graph field just to avoid retrieving extra data at all. Fetching a few extra bytes from a database is negligible compared to querying a database 20 individual times. Your REST APIs were already querying extra data and they were likely transmitting that data to the client.

It comes down to your use case. There are times when it makes sense to seperate things using type extensions and times when preloading whole objects is better. For many applications, once you've deployed to production, the queries being executed are finite. Design your model objects and extensions to be performant in the ways your data is being requested, not in the ways it _could be_ requested.