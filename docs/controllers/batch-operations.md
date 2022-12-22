---
id: batch-operations
title: Batch Operations
sidebar_label: Batch Operations
sidebar_position: 5
---

:::caution 
Read the section on [type extensions](./type-extensions) before reading this document. Batch Operations expand on type extensions and understanding how they work is critical.
:::

## The N+1 Problem

There are plenty of articles on the web discussing the theory behind the N+1 problem ([links below](./batch-operations#other-resources)). Instead, we'll jump into an into an example to illustrate the issue when it comes to GraphQL.

Let's build on our example from the discussion on type extensions where we created an extension to retrieve `Cake Orders` for a **single** `Bakery`. What if we're a national chain and need to see the last 50 orders for each of our stores in a region? This seems like a reasonable thing an auditor would do so lets alter our controller to fetch all our bakeries and then let our type extension fetch the cake orders.

```csharp title="Retrieving Multiple Bakeries"
public class Bakery
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class BakedGoodsCompanyController : GraphController
{
    [QueryRoot("bakeries")]
    public async Task<List<Bakery>> RetrieveBakeries(Regions region = Regions.All)
    {/*...*/}

    // declare the type extension as a controller action.
    [TypeExtension(typeof(Bakery), "orders")]
    public async Task<List<CakeOrder>> RetrieveCakeOrders(Bakery bakery, int limitTo = 15){

        return await _service.RetrieveCakeOrders(bakery.Id, limitTo);
    }
}
```

```graphql title="Sample Query"
query {
    bakeries(region: SOUTH_WEST){
        name
        orders(limitTo: 50) {
            id
            writtenPhrase
        }
    }
}
```

Well that was easy, right? Not so fast!

 The `bakeries` field returns a `List<Bakery>` but the `RetrieveCakeOrders` method takes in a single `Bakery`. GraphQL will, **for each bakery retrieved**, execute the `orders` field to retrieve its orders. If `bakeries` retrieved 50 stores in the south west region, graphql will execute `RetrieveCakeOrders` 50 times, which will execute 50 database queries.

This is the N+1 problem. `1 query` for the bakeries + `N queries` for the cake orders, where N is the number of bakeries first retrieved.

If only we could batch the cake orders request and fetch all the orders for all the bakeries at once, then assign the `Cake Orders` back to their respective bakeries, we'd be a lot better off. No matter the number of bakeries retrieved, we'd execute 2 queries; 1 for `bakeries` and 1 for `orders`.This is where batch extensions come in to play.

## \[BatchTypeExtension\] Attribute

A batch operation is implemented as a type extension but with the word `Batch` in it. Lets look at an example:

```csharp title="A Batch Type Extension"
public class BakedGoodsCompanyController : GraphController
{
    [QueryRoot("bakeries")]
    public async Task<List<Bakery>> RetrieveBakeries(Region region){/*...*/}

    // declare the batch operation as an extension
    // highlight-next-line
    [BatchTypeExtension(typeof(Bakery), "orders", typeof(List<CakeOrder>))]
    public async Task<IGraphActionResult> RetrieveCakeOrders(
        IEnumerable<Bakery> bakeries,
        int limitTo = 15)
    {
        //fetch all the orders at once
        var allOrders = await _service.RetrieveCakeOrders(bakeries.Select(x => x.Id), limitTo);

        // return the batch of orders
        return this.StartBatch()
            .FromSource(bakeries, bakery => bakery.Id)
            .WithResults(allOrders, cakeOrder => cakeOrder.BakeryId)
            .Complete();
    }
}
```

Key things to notice:

-   We've used `[BatchTypeExtension]` instead of `[TypeExtension]`
-   The method takes in an `IEnumerable<Bakery>` instead of a single `Bakery`.
-   The method returns an action result created from `this.StartBatch()`

The contents of your extension method is going to vary widely from use case to use case. Here we've forwarded the ids of the bakeries to a service to fetch the orders. The important take away is that `RetrieveCakeOrders` is now called only once, regardless of how many items are in the `IEnumerable<Bakery>` parameter.

GraphQL works behind the scenes to pull together the items generated from the parent field and passes them to your batch method.

## Data Loaders

You'll often hear the term `Data Loaders` when reading about GraphQL implementations. Methods that load the child data being requested as a single operation before assigning to each of the parents. There is no difference with GraphQL ASP.NET. You still have to write that method. But with the ability to capture action method parameters and clever use of an `IGraphActionResult` we can combine the data load phase with the assignment phase into a single batch operation, at least on the surface. The aim is to make it easy to read and easier to write.

## Returning Data

`this.StartBatch()` returns a builder to define how you want GraphQL to construct your batch. We need to tell it how each of the child items we fetched maps to the parents that were supplied (if at all).

In the example we matched on a bakery's primary key selecting `Bakery.Id` from each of the source items and pairing it against `CakeOrder.BakeryId` from each of the results. This is enough information for the builder to generate a valid result. Depending on the contents of your data, the type expression of your extension there are few scenarios that emerge:

**1 Source -> 1 Result**

If you've defined your extension field to be a single item (i.e. `CakeOrder` instead of `IEnumerable<CakeOrder>`) GraphQL will enforce the type check and reject/fail the resolution for any parent item mapped to more than one child. This is useful for sibling relationships where two objects might be related but aren't otherwise aggregated together. For example, a person and their spouse.

**1 Source -> N Results**

If you've defined your extension to return a collection of children, like in the example, then GraphQL will generate an array of 0 or more children for every parent included in the batch.

**N Sources -> N Results**

To GraphQL, many to many relationships are treated the same as one to many. Internally, it doesn't care how you map your data, only that the type expression of the results are enforced. Each child can map to multiple parents and in the cases of overlap, GraphQL will resolve the requested fields of that child once then render it to each parent in the outgoing response package.

**1 Source -> No Results**

For sibling relationships there are only two options; either the data exists and a value is returned or it doesn't and `null` is returned. But with parent/child relationships, sometimes you want to indicate that no results were _included_ for a parent item and sometimes you want to indicate that no results _exist_. This could be represented as being an empty array vs `null`. When working with children, for every parent supplied to `this.StartBatch`, GraphQL will generate a field result of **at least** an empty array. To indicate a parent item should receive `null` instead of `[]` exclude it from the batch.

> Excluding a source item from `this.StartBatch()` will result in it receiving `null` for its resolved field value.

Note that it is your method's responsibility to be compliant with the type expression of the field in this regard. If a field is marked as `NON_NULL` and you exclude the parent item from the batch (resulting in a null result for the field for that item) the field will be marked invalid and register an error.

#### Returning `IDictionary<TSource, TValue>`

Using `this.StartBatch` is the preferred way of returning data from a batch extension but there is a small amount of overhead to it. It has to join two separate lists of data on a common key, which could take a few extra cycles for large data sets.

Another option would be to generate the same result yourself while you're generating your data set. Once its all said and done, `this.StartBatch()` creates an `IDictionary<TSource, TValue>` where `TSource` is a parent object and `TValue` is either a single child or an `IEnumerable<Child>` depending on the type definition of your field. A batch extension is the only operation that will accept a return type of `IDictionary`.

> When returning `IDictionary<TSource, TValue>`, the key **MUST** be the original object reference supplied to the the extension method, not a copy.

This is the above batch operation reconfigured to a custom dictionary. Note that when we use an `IDictionary` return type, GraphQL is able to infer our field data type and an explicit declaration is no longer needed on the attribute.

```csharp title="Using a Custom Dictionary"
public class BakedGoodsCompanyController : GraphController
{
    [QueryRoot("bakeries")]
    public async Task<List<Bakery>> RetrieveBakeries(Region region){/*...*/}

    // declare the batch operation as an extension
    [BatchTypeExtension(typeof(Bakery), "orders")]
    public async Task<IDictionary<Bakery, IEnumerable<CakeOrder>>> RetrieveCakeOrders(
        IEnumerable<Bakery> bakeries,
        int limitTo = 15)
    {
        //fetch all the orders at once
        Dictionary<Bakery, IEnumerable<CakeOrder>> allOrders = await _service
                .RetrieveCakeOrders(bakeries, limitTo);

        return allOrders;
    }
}
```

## Other Resources

[What is the N+1 Problem in GraphQL?](https://itnext.io/what-is-the-n-1-problem-in-graphql-dd4921cb3c1a)
