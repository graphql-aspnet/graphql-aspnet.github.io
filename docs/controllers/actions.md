---
id: actions
title: Controllers & Actions
sidebar_label: Actions
sidebar_position: 0
---


## What is an Action?

:::info
 An action is a method on a controller, marked as being a query or mutation field, that is part of your graph schema.
:::

Controllers and actions are the bread and butter of GraphQL ASP.NET. Just like with Web API, they serve as an entry point into your business logic.

In this graphql query we have two top level query fields: `hero` and `droid`. We declare action methods for each to handle the data request.

```graphql title="Sample Query"
query {
    hero(episode: EMPIRE){
        id
        name
    }
    droid(id: 2001){
        id
        name
        primaryFunction
    }
}
```

```csharp title="Controllers.cs"
// HeroController.cs
public class HeroController : GraphController
{
    [QueryRoot]
    public Human Hero(Episode episode)
    {
        return new Human(...);
    }
}

// DroidController.cs
public class DroidController : GraphController
{
    [QueryRoot]
    public Droid Droid(int id)
    {
        return new Droid(...);
    }
}
```

In the above example, it makes sense these these methods would exist on different controllers, `HeroController` and `DroidController`. However, unlike with a REST API request, which will usually invoke one action method and returns the data generated, GraphQL will invoke every action method requested and aggregates the results. If one action fails, the other may not and the results of both the errors and the data retrieved would be returned.

The data returned by your action methods then return their requested child fields, those data items to their children and so on. In many cases this is just a selection of the appropriate properties on a model object, but more complex scenarios involving child objects, [type extensions](./type-extensions) or directly executing POCO methods can also occur.

:::note 
Since mutations may have a shared state or could otherwise produce race conditions in a data store, top level fields in a mutation operation are executed sequentially, in the order they are declared. All child requests there after are dispatched and executed asynchronously [[Spec § 6.2.2](https://graphql.github.io/graphql-spec/October2021/#sec-Mutation)\].
:::
---

To declare an action you first declare a controller that inherits from `GraphQL.AspNet.Controllers.GraphController`, then create a method with the the appropriate attribute to indicate it as a query or mutation method.

**An Action Method:**
 
 ✅ **Must** declare an [operation type](./actions#declaring-an-operation-type) or a [type extension](../controllers/type-extensions) attribute. <br/>
 ✅ **Must** declare a return type. <br/>
 ✅ **May** be synchronous or asynchronous. <br/>
 🧨 **Must not** return `System.Object`. <br/>
 🧨 **Must not** declare, as an input parameter, an object that implements any variation of `IDictionary`. <br/>

See below for more detail of the [input](./actions#method-parameters) and [return](./actions#returning-data) parameter restrictions.

## Declaring An Operation Type

Attributes `[Query]`, `[QueryRoot]`, `[Mutation]` and `[MutationRoot]` are used to declare your action methods. Usage of the mutation and query attributes are exactly the same, they differ only in which of the root graph types to place a field reference. Lets look at the most common ways to use them:

<br/>

💻  `[Query]`, `[Mutation]`

When used alone, without any parameters, the field name in the schema is the same as the method name.

```csharp  title="Using [Query] & [Mutation]"
public class BakeryController : GraphController
{
    // highlight-next-line
    [Query]
    public Donut FindDonut(int id)
    {/* ... */ }

    // highlight-next-line
    [Mutation]
    public CakeModel UpdateCake(CakeModel cake)
    {/* ... */ }
}
```

```graphql title="Sample Query"
query {
    bakery {
        findDonut(id: 5){
            name
            flavor
        }
    }
}   

mutation  {
    bakery {
        updateCake(cake: {id: 5, name: "Birthday Cake"}){
            id
            name
        }
    }
}
```

<br/>
<br/>

💻   `[Query("donut")]`,`[Mutation("alterCake")]`

You can supply the name of the field you want to use in the schema allowing for different naming schemes in your C# code vs. your object graph. 

```csharp  title="Using [Query] & [Mutation]"
public class BakeryController : GraphController
{
    // highlight-next-line
    [Query("donut")]
    public Donut FindDonut(int id)
    {/* ... */ }

    // highlight-next-line
    [Mutation("alterCake")]
    public CakeModel UpdateCake(CakeModel cake)
    {/* ... */ }
}
```

```graphql title="Sample Query"
query {
    bakery {
        donut(id: 5){
            name
            flavor
        }
    }
}   

mutation  {
    bakery {
        alterCake(cake: {id: 5, name: "Birthday Cake"}) {
            id
            name
        }
    }
}
```

<br/>
<br/>

💻  `[Query("donut", typeof(Donut))]`, `[Mutation("donut", typeof(CakeModel))]`

 Sometimes, especially when you return action results, you may need to explicitly declare what data type you are returning from the method. This is because returning `IGraphActionResult` obfuscates the results from the templating engine and it won't be able to infer the underlying type expression of the field. 


```csharp  title="Using [Query] & [Mutation]"
public class BakeryController : GraphController
{
    [Query("donut")]
    public Donut FindDonut(int id)
    {/* ... */ }

    // highlight-next-line
    [Mutation("alterCake",typeof(CakeModel))]
    public async Task<IGraphActionResult> UpdateCake(CakeModel cake)
    {
        await _service.UpdateCake(cake);
        return this.Ok(cake);
    }
}
```

<br/>
<br/>

💻 `[QueryRoot]`, `[MutationRoot]`

These are special overloads to `[Query]` and `[Mutation]`. They are declared in the same way but instruct GraphQL to ignore any inherited field fragments from the controller.

```csharp  title="Using [QueryRoot]"
public class BakeryController : GraphController
{
    // highlight-next-line
    [QueryRoot("donut")]
    public Donut FindDonut(int id)
    {/* ... */ }
}
```

```graphql title="Sample Query"
# Notice the bakery field is gone!
query {
    donut(id: 5){
        name
        flavor
    }
}   
```

<br/>
<br/>

💻 `[GraphRoute]`

If you'll recall, Web API uses `[Route("somePathSegment")]` declared on a controller to nest all the REST end points under that url piece. The same holds true here. Graph controllers can declare `[GraphRoute("someFieldName")]` under which all the controller actions will be nested as child fields. This is the default behavior even if you don't declare a custom name (your controller name is used). Using the `QueryRoot` and `MutationRoot` attributes negates this and appends the action directly to the root graph type.


```csharp  title="Using [GraphRoute]"
// highlight-next-line
[GraphRoute("BakedGoods")]
public class BakeryController : GraphController
{
    [Query("donut")]
    public Donut FindDonut(int id)
    {/* ... */ }
}
```

```graphql title="Sample Query"
query {
    bakedGoods {
        donut(id: 5){
            name
            flavor
        }
    }
}   
```

A complete explanation of the constructors for these attributes is available in the [attributes reference](../reference/attributes) and a detailed explanation of the nesting rules is available under the [field paths](./field-paths) section.

## Returning Data

GraphQL creates your schema by first looking your controller action methods for the objects they return. It then inspects the properties/methods on those objects for other objects, then the properties of those child objects and so on. In GraphQL, there are no unknown or variable fields. For the library to determine your schema it MUST know what each action method returns. 

Unlike rest, the data you return is restricted to formats acceptable by graphql.

### Working with Dictionaries

Dictionary types, such as `Dictionary<TKey,TValue>`, are generally not useful in GraphQL. They are forbidden as input parameters, since its not possible to validate arbitrary key/value pairs, and GraphQL makes no use of their lookup abilities as output objects. 

This isn't to say that dictionaries should be ignored. On the contrary, use them as needed to generate your data and perform your business logic. Just don't return a dictionary from your action method. 

However, [Batch operations](../controllers/batch-operations), also called `Data Loaders`, are a special type of extension method that uses dictionaries to map child data to multiple parents. Batch operations are incredibly important to the performance of your queries when you start working with large quantities of deeply nested parent/child relationships.

### Lists and Nulls

Rules concerning GraphQL's two meta graph types, [LIST and NON_NULL](../types/list-non-null) apply to action methods as well. Like all fields, the runtime will attempt to determine the complete [type expression](../advanced/type-expressions) for your action method and you have the ability to override it as needed.

### Working with Interfaces

Returning an [interface graph type](../types/interfaces) is a great way to deliver heterogeneous data results, especially in search operations. One got'cha is that the runtime must know the possible concrete object types that implement that interface in case a query uses a fragment with a type specification. That is to say that if we return `IPastry`, we must let GraphQL know that `Cake` and `Donut` exist and should be a part of our schema. Just like with C#, interfaces in graphql contain no logic. If i return an `IPastry`, GraphQL still needs to know if the actual object is a `Cake` or a `Donut` and invoke the correct resolver for any child fields.

:::info
When your action method returns an interface you must declare OBJECT types that implement that interface in some other way. 

e.g. If your schema contains `IPastry`, it must also contain `Cake` and `Donut`.
:::
Take this example:

```csharp title="BakeryController.cs"
public class BakeryController : GraphController
{
    [QueryRoot]
    // highlight-next-line
    public IPastry SearchPastries(string name)
    {/* ... */}
}
```

```graphql title="Query"
query {
    searchPastries(name: "chocolate*") {
        id
        name

        ...on Donut {
            isFilled
        }

        ...on Cake {
            icingFlavor
        }
    }
}
```

No where in our code have we told GraphQL about `Cake` or `Donut`. When it goes to parse the fragments declared in the query it will try to validate that graph types exist named `Cake` and `Donut` to ensure the fields in the fragments are valid, since we've never declared those graph types it won't be able to.

There are a number of ways to indicate these required relationships in your code in order to generate your schema correctly.

<br/>

 📃 **Add OBJECT Types Directly to the Action Method**

If you have just two or three possible types, add them directly to the query attribute. You can safely add your types across multiple methods as needed, it will only be included in the schema once.

```csharp
public class BakeryController : GraphController
{
    // highlight-next-line
    [QueryRoot(typeof(Cake), typeof(Donut))]
    public IPastry SearchPastries(string name)
    {/* ... */}
}
```

<br/>

📜 **Using the PossibleTypes attribute**

The `[Query]` attribute can get a bit hard to read with a ton of data in it (especially with [Unions](../types/unions)). Use the `[PossibleTypes]` attribute to help with readability.

```csharp
public class BakeryController : GraphController
{
    [QueryRoot]
    // highlight-next-line
    [PossibleTypes(typeof(Cake), typeof(Donut), typeof(Scone), typeof(Croissant))]
    public IPastry SearchPastries(string name)
    {/* ... */}
}
```

<br/>

🧮 **Declare Types at Startup**

The [schema configuration](../reference/schema-configuration) contains a host of options for auto-loading graph types. Here we've added our 100s and 1000s of types of pastries at our bakery to a shared assembly, obtained a reference to it through one of the types it contains, then added the whole assembly to our schema. GraphQL will automatically scan the assembly and ingest all the graph types mentioned in any controllers it finds as well as any objects marked with the `[GraphType]` attribute.

```csharp title="startup code"
// we can define all our objects in a single assembly, then load it
Assembly pastryAssembly = Assembly.GetAssembly(typeof(Cake));

services.AddGraphQL(options =>
{
    // highlight-next-line
    options.AddAssembly(pastryAssembly);
});
```

<br/>

⚠️ **A Note On Type Ingestion**


You might be wondering, "if I just define `Cake` and `Donut` in my application, why can't GraphQL just include them like it does the controller?".

It certainly can, but there are risks to arbitrarily grabbing class references not exposed on a schema. With introspection queries, all of those classes and their method/property names could be exposed and pose a security risk. It might not be able to query the data, but imagine if a enum named `EmployeeDiscountCodes` was accidentally added to your graph. All the values of that enum would be publically exposed via introspection.

To combat this GraphQL will only ingest types that are:

-   Referenced in a `GraphController` action method **OR**
-   Attributed with at least once instance of a `[GraphType]` or `[GraphField]` attribute somewhere within the class **OR**
-   Added explicitly at startup during `.AddGraphQL()`.

This behavior is controlled with your schema's declaration configuration to make it more or less restrictive based on your needs. Ultimately you are in control of how aggressive or restrictive GraphQL should be; even going so far as declaring that every type be declared with `[GraphType]` and every field with `[GraphField]` lest it be ignored completely. The amount of automatic vs. manual wire up will vary from use case to use case but you should be able to achieve the result you desire.

### Graph Action Results

Action Results provide a clean way to standardize your responses to different conditions across your application. In a Web API controller, if you've ever used `this.OK()` or `this.NotFound()` you've used the concept of an action result before. 

Using action results can make your code a lot more readable and provide helpful, customizable messaging to the requestor. 

For Example, using `this.Error()` injects a custom error message into the response providing some additional information other than just a null result. 

```csharp title="BakeryController.cs"
// BakeryController.cs
public class BakeryController : GraphController
{
    [QueryRoot(typeof(IPastry))]
    public async Task<IGraphActionResult> SearchPastries(string name)
    {
        if(name == null || name.Length < 3)
        {
            // highlight-next-line
            return this.Error(GraphMessageSeverity.Warning, "At least 3 characters is required");
        }
        else
        {
            var results = await _service.SearchPastries(name);            
            return this.Ok(results);
        }
    }
}
```

> The full list of graph action results can be found in the [reference section](../advanced/graph-action-results) .


Create a class that implements `IGraphActionResult` and create your own.

```csharp title="IGraphActionResult.cs"
public interface IGraphActionResult
{
    Task Complete(BaseResolutionContext context);
}
```

`IGraphActionResult` has one method. It accepts the raw resolution context (either a `FieldResolutionContext` or a `DirectiveResolutionContext`) that you can manipulate as needed. Combine this with any data you supply to your action result when you instantiate it and you have the ability to generate any response with any data value or any number and type of error messages etc. Take a look at the source code for built in [graph action results](https://github.com/graphql-aspnet/graphql-aspnet/tree/master/src/graphql-aspnet/Controllers/ActionResults) for some more detailed examples.

:::caution Its Not REST
Action results for graph fields are not the same as REST action results.  For Example, `BadRequest()` does not return an HTTP status 400 for the request. An errored field is usually just one of many in the query and graphql supports partial query resolution. We use the `errors` collection on a graphql response to provide details on what happened with any given field. The overall query will almost always return an HTTP status 200.
:::

## Method Parameters

GraphQL will inspect your method parameters and add the appropriate [`SCALAR`](../types/scalars), [`ENUM`](../types/enums) and [`INPUT_OBJECT`](../types/input-objects) graph types to your schema automatically.

### Naming your Input Arguments

By default, GraphQL will name a field' arguments the same as the parameter names in your method. Sometimes you'll want to override this, like when needing to use a C# keyword as an argument name. Use the `[FromGraphQL]` attribute on the parameter to accomplish this.

```csharp title="Overriding a Default Argument Name"
public class BakeryController : GraphController
{
    [QueryRoot]    
    // highlight-next-line
    public IEnumerable<Donut> SearchDonuts([FromGraphQL("name")] string searchText)
    {/* ... */}
}
```

We can then execute the query:

```graphql title="Sample Query"
// GraphQL Query
query {
    searchPastries(name: "chocolate*") {
        id
        name
        flavor
    }
}
```

### Default Argument Values

In GraphQL, not all field arguments are required. Add a default value to your method parameters to mark them as optional:

```csharp title="Using an Optional Field Argument"
public class BakeryController : GraphController
{
    [QueryRoot]    
    // highlight-next-line
    public Donut SearchDonuts(string name = "*")
    {/* ... */}
}
```

```graphql title="Sample Query"
# Pass a value
query {
    searchDonuts(name: "Chocolate*"){
        id
        flavor
    }
}

# The default value for name will be used (e.g. "*")
query {
    searchDonuts {
        id
        flavor
    }
}
```

<br />

⚠️ **Nullable vs. Not Required**

Note that there is a difference between "nullable" and "not required" for field arguments. If we have a nullable int as an input parameter, without a default value we still have to pass it to the field, even if we pass it as `null`; just like if we were to invoke the method from our C# code.

```csharp title="NumberController.cs"
public class NumberController : GraphController
{
    // "seed" is still required, but you can supply null
    [QueryRoot]    
    // highlight-next-line
    public int CreateRandomInt(int? seed)
    {/* ... */}
}
```

```graphql title="Sample Queries"
# The argument must be passed
# but it can passed as null
query {
    createRandomInt(seed: null)
}

## *** 
## ERROR, argument not supplied
## *** 
query {
    createRandomInt
}
```

By also defining a default value we can achieve the flexibility we are looking for.

```csharp title="NumberController.cs"
public class NumberController : GraphController
{    
    [QueryRoot]
    // highlight-next-line
    public int CreateRandomInt(int? seed = null)
    {/* ... */}
}
```

```graphql title="Sample Queries"
# Pass a value
query {
    createRandomInt(seed: 5)
}

# Pass null
query {
    createRandomInt(seed: null)
}

# Or omit the parameter (value received: null)
query {
    createRandomInt
}
```

### Working With Lists

When constructing a set of items as an argument to an action method, GraphQL will instantiate a `List<T>` internally and fill it with the appropriate data; be that another list, another input object, a scalar etc. While you can declare an array (e.g. `Donut[]`, `int[]` etc.) as your list structure for an input argument, graphql has to rebuild its internal representation as an array (or nested arrays) to meet the requirements of your method.  In some cases, especially with nested lists, this results in an `O(N)` increase in processing time. 

:::tip 
Use `IEnumerable<T>` or `IList<T>` as your argument types to avoid a performance bottleneck when sending lots of items as input data.
:::

This example shows various ways of accepting collections of data as inputs to controller actions.

```csharp title="BakeryController.cs"
public class BakeryController : GraphController
{
    // a list of donuts
    // schema syntax:  [Donut]
    [Mutation("createDonuts")]
    public bool CreateDonuts(IEnumerable<Donut> donuts)
    {/*....*/}

    // when used as a "list of list"
    // schema syntax:  [[Donut]]
    [Mutation("createDonutsBySet")]
    public bool CreateDonuts(List<List<Donut>> donuts)
    {/*....*/}

    // when supplied as a regular array
    // schema syntax:  [Donut]
    [Mutation("donutsAsAnArray")]
    public bool DonutsAsAnArray(Donut[] donuts)
    {/*....*/}

    // This is a valid nested list believe it or not
    // schema syntax:  [[[Donut]]]
    [Mutation("mixedDonuts")]
    public bool MixedDonuts(List<IEnumerable<Donut[]>> donuts)
    {/*....*/}
}
```

### Don't Use Dictionaries

You might be tempted to use a dictionary as a parameter to accept arbitrary key value pairs into your methods. GraphQL will reject it and throw a declaration exception when your schema is created:


```csharp title="BakeryController.cs"
public class BakeryController : GraphController
{
    // ERROR, a GraphTypeDeclarationException
    // will be thrown.
    [QueryRoot]
    public IEnumerable<Donut>
        SearchDonuts(IDictionary searchParams)
    {/* ... */}
}
```


```graphql title="Invalid Arguments"
# ERROR, Unknown arguments on searchDonuts
query {
    searchDonuts(
        name: "jelly*"
        filled: true
        dayOld: false){
            id
            name
    }
}
```

At runtime, GraphQL will try to validate every argument on every field passed on a query. No where have we declared an argument `filled` to be a boolean or `name` to be a string.

Well, lets just pass it as an input object to a declared argument, right?

```graphql title="Invalid Input Object"
# ERROR, Unknown fields on searchParams
query {
    searchDonuts( searchParams : {name: "jelly*" filled: true dayOld: false }){
        id
        name
    }
}
```

But this is also not allowed. All we've done is pushed the problem down one level. No where on our `IDictionary` type is there a `Name` property declared as a string or a `Filled` property declared as a boolean. Since GraphQL can't fully validate the query against the schema before executing it, it's rejected.

Instead declare a search object with the parameters you need and use it as the input:

```csharp title="BakeryController.cs"
public class DonutSearchParams
{
    public string Name { get; set; }
    public bool? Filled { get; set; }
    public bool? DayOld { get; set; }
}

public class BakeryController : GraphController
{
    [QueryRoot]
    public IEnumerable<Donut> SearchDonuts(DonutSearchParams searchParams)
    {/* ... */}
}
```

```graphql title="Valid Query"
query {
    searchDonuts( searchParams : {filled: true}){
        id
        name
    }
}
```

## Cancellation Tokens

As with REST based action methods, your graph controller action methods can accept an optional `CancellationToken`. This is useful when doing some long running activities such as IO, database queries, API orchestration etc. To make use of a cancellation token simply add it as a parameter to your method. GraphQL will automatically capture the token, wire it up for you and hide it from your schema.

```csharp title="BakeryController.cs | Adding a CancellationToken"
public class BakeryController : GraphController
{
    // Add a CancellationToken to your controller method
    [QueryRoot(typeof(IEnumerable<Donut>))]
    // highlight-next-line
    public async Task<IGraphActionResult> SearchDonuts(string name, CancellationToken cancelToken)
    {/* ... */}
}
```

:::caution
 Depending on your usage of the cancellation token a `TaskCanceledException` may be thrown. GraphQL will not attempt to intercept this exception and will log it as an error-level, unhandled exception event if allowed to propegate. The query will still be cancelled as expected.
:::

### Defining a Query Timeout

By default, the library does not define a timeout for an executed query. The query will run as long as the underlying HTTP connection is open. In fact, the `CancellationToken` passed to your action methods is the same Cancellation Token offered on the HttpContext when it receives the initial request.

Optionally, you can define a query timeout for a given schema:

```csharp title="Startup Code"
services.AddGraphQL(o =>
{
    // define a 2 minute timeout for every query.
    // highlight-next-line
    o.ExecutionOptions.QueryTimeout = TimeSpan.FromMinutes(2);
})
```

When a timeout is defined, the token passed to your action methods is a combined token representing the HttpContext as well as the timeout operation. That is to say the token will indicate a cancellation if the allotted query time expires or the http connection is closed, which ever comes first. When the timeout expires the caller will receive a response indicating the timeout. However, if the its the HTTP connection that is closed, the operation is simply halted and no result is produced.

:::danger Timeouts and Subscriptions
The same rules for cancellation tokens apply to subscriptions as well. Since the websocket connection is a long running operation it will never be closed until the connection is closed. To prevent some processes from spinning out of control its a good idea to define a query timeout when implementing a subscription server. This way, even though the connection remains open the query will terminate and release resources if something goes awry.
:::