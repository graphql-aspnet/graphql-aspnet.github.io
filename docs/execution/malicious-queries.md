---
id: malicious-queries
title: Dealing with Malicious Queries
sidebar_label: Malicious Queries
---

When GraphQL ASP.NET parses a query it creates two values that attempt to describe the query in terms of impact and server load; Max Depth and Estimated Complexity. These values are attached to the generated query plan. There also exists limiters to these values that can be set in the schema configuration such that should any query plan exceed the limits you set, the plan will be rejected and the query not fulfilled.

## Maximum Allowed Field Depth

Field depth refers to how deeply nested a field is within a query.

In this example, for instance, the "search" field has a depth of 4 and the maximum depth reached is 6: `groceryStore > bakery > pastries > recipe > ingredients > name`

```javascript
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
    }
}
```

This becomes important on large object graphs where its possible for a requestor to submit a query that is 10s or 100s of nodes deep. Running such a large query can have performance implications if ran en masse. A large volume of queries against your server executing a perfectly valid, yet deeply nested query will quickly grind things to a halt.

To combat this you can set a maximum allowed depth for any query targeting your schema. During the parsing phase, once GraphQL has gathered enough information about the query document, it will inspect the maximum depth and if it violates your constraint, immediately reject the query without executing it.

To set a maximum allowed depth, set the appropriate property in your schema configuration at startup:

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddGraphQL(options =>
        {
            options.ExecutionOptions.MaxQueryDepth = 15;
        });
}
```

> The default value for `MaxQueryDepth` is `null` or no limit.

## Query Complexity

The field depth is only part of the picture though. The way in which your fields interact with each other also plays a role.

Take for instance this query:

```javascript
query PhoneManufacturer {
    allParts {
        id
        name
        suppliers {
            name
            address
        }
    }
}
```

It would not be far fetched to assume that this phone manufacturer has at least 500 parts in their inventory and that those parts might be sourced from 2-3 individual suppliers. If that's the case our result is going to contain 3000 field resolutions (500 parts \* 3 suppliers \* 2 fields per supplier) just to show the name and address of each supplier. Thats a lot of data!!!! What if we added order history per supplier? Now we'd looking at 100,000+ results. The take away here is that your field resolutions can balloon quickly if you're not careful.

While this query only has a field depth of 3, `allParts -> suppliers -> name`, the performance implications are much more impactful than the bakery in the first example because of the type of data involved. (Side note, this is a perfect example where a [batch operation](../controllers/batch-operations) would improve performance exponentially.)

GraphQL will assign a score to every query plan, its `estimated complexity`, to help gauge the load its likely to incur on the server when trying to execute. As you might expect you can set a maximum allowed complexity value and reject any queries that exceed your limit:

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc()
            .AddGraphQL(options =>
            {
                options.ExecutionOptions.MaxQueryComplexity = 50.00;
            });
}
```

> The default value for `MaxQueryComplexity` is `null` or no limit.

There is no magic bullet for choosing a maximum value as its going to be largely dependent on your data and how customers query it. When logging is enabled, the estimated complexity is written along with the `Query Plan Generated` event. Analyzing the values your queries are producing during development will help you get a feel for things in order to make a good decision for production limitations.

## Calculating Query Complexity

After a query plan is generated each of the operations defined in the document is inspected and weights are applied to each of the fields then summed together to generate a final score.

A complexity score is derived from these attributes:

| Attribute         | Description                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| Operation Type    | This refers to the operation as a whole being a `mutation` or a `query`.                                         |
| Execution Mode    | Whether or not a field is being executed as a batch operation or per source item.                                |
| Resolver Type     | Is the field targeting a controller method, an object property or an object method?                              |
| Type Expression   | Does the field produce 1 single item or a collection of items                                                    |
| Complexity Factor | A user controlled value to influence the calculation for queries or mutations that are particularly long running |

The `estimated complexity` of the query plan is the operation with the highest individual score.

The code for calculating the value can be seen in [`DefaultOperationComplexityCalculator<TSchema>`](https://github.com/graphql-aspnet/graphql-aspnet/blob/develop/src/graphql-aspnet/Defaults/DefaultOperationComplexityCalculator{TSchema}.cs)

> **_Beta Note_**: The exact calculation used for query complexity is still in flux and likely to change before v1.0 is finalized. If you have expertise in this arena and would like to weigh in on the values chosen or the computation formula in general please reach out on Github! We'd love to hear from you.

where `IGraphFieldExecutableOperation` represents the collection of requested fields contexts along with the input arguments, child fields and directives that were parsed.

### Setting a Complexity Weight

You can influence the complexity value of any given field by applying a weight to the field as part of its declaration.

The attributes `[GraphField]`, `[Query]`, `[Mutation]`, `[QueryRoot]`, `[MutationRoot]` expose access to this value.

```csharp
// C# Controller
public class BakeryController : GraphController
{
    // Complexity is a float value
    [QueryRoot(Complexity = 1.3)]
    public Donut RetrieveDonutType(int id){/*...*/}
}
```

-   A factor greater than 1 will increase the weight applied to this field
-   A factor less than 1 will decrease the weight
-   The minimum value is 0 and the default value is `1`

## Implement Your Own Complexity Calculation

You can override how GraphQL calculates the complexity of any given query operation. Implement `IQueryOperationComplexityCalculator<TSchema>` and inject it into your DI container before calling `.AddGraphQL()`.

This interface has one method:

```csharp
public interface IQueryOperationComplexityCalculator<TSchema>
{
    float Calculate(IGraphFieldExecutableOperation operation);
}
```
