---
id: type-expressions
title: Custom Type Expressions
sidebar_label: Type Expressions
---

GraphQL states that when a field returns a value that doesn't conform to the required definition of the field that the value is rejected, converted to null and an error added to the response.

GraphQL ASP.NET makes as few assumptions as possible about the data returned from your fields to result in as few errors as possible.

These assumptions are made:

-   Fields that return reference types **can be** null
-   Fields that return value types **cannot be** null
-   Fields that return Nullable value types (e.g. `int?`) **can be** be null
-   When a field returns an object that implements `IEnumerable<TType>` it will be presented to GraphQL as a "list of `TType`".

Basically, if your method is able to return a value...then its valid as far as GraphQL is concerned.

Lets look at an example:

<div class="sideBySideCode hljs">
<div>

```csharp
// C# Controller
[GraphRoute("bakery")]
public class BakeryController : GraphController
{
    [Query("donut")]
    public Donut RetrieveDonut(int id)
    {/*...*/}
}
```

</div>
<div>

```javascript
query {
    donut(id: 15){
        name
        flavor
    }
}
```

</div>
</div>
<br/>

This action method could return a `Donut` or return `null`. But should the `donut` field allow a null value? The code certainly does and the rules above say fields that return a reference type can be null...but that's not what's important. Its ultimately your decision to decide if a null donut is allowed, not the C# compiler and not the assumptions made by the library.

On one hand, if a null value is returned, regardless of it being valid, the _outcome_ of the field is the same. When we return a null no child fields are processed. On the other hand, if null is not allowed we need to tell someone, let them know its nulled out not because it simply _is_ null but because a schema violation occurred.

## Using an Alternate Type Expression

Most of the time, using the `TypeExpression` property of a field declaration attribute is sufficient to indicate your intentions.

```csharp

// Declare that an MUST be returned (null is invalid)
// ----
// Schema Syntax:  Donut!
[Query("donut", TypeExpression = TypeExpressions.IsNotNull)]
public Donut RetrieveDonut(string id)
{/*...*/}


// Declare that a list must be returned but the elements of the list
// could be null:
// valid:    [donut1, null, donut2, donut3]
// valid:    []
// invalid:  null
// ----
// Schema Syntax:  [Donut]!
[Query("donut", TypeExpression = TypeExpressions.IsNotNullList)]
public IEnumerable<Donut> RetrieveDonut(string id)
{/*...*/}


// Declare that a list must be returned AND the elements of the list
// must not be null:
// valid:    [donut1, donut2, donut3]
// valid:    []
// invalid:  [donut1, null, donut2]
// invalid:  null
// ----
// Schema Syntax:  [Donut!]!
[Query("donut", TypeExpression = TypeExpressions.IsNotNull | TypeExpressions.IsNotNullList)]
public IEnumerable<Donut> RetrieveDonut(string id)
{/*...*/}
```

> The `TypeExpression` property is available on `[Query]`, `[QueryRoot]`, `[Mutation]`, `[MutationRoot]`, `[Subscription]`, `[SubscriptionRoot]` and `[GraphField]`

## Declaring a TypeDefinition

Using the `TypeExpressions` enumeration above is a convenient way to indicate the requirements of a field but in rare occasions you'll need to take it one step further and declare a complete type definition.

Take for instance this type:

```csharp
IEnumerable<IEnumerable<IEnumerable<string>>>
```

The possible scenarios for our data could be endless:

-   A list of a list of a list of strings
-   A list of a list of a list of strings that can't be null
-   A list that returns a list that could be a list or null that contains a list that contains a string
-   ...and so on

For this we have declare the full type definition our self as an array of `MetaGraphType`s

```csharp
// Declare that the the method will return a "list of a list of a list of strings" and that any element could be null
// This is equivalent to the defaults applied by GraphQL
// ----
// Schema Syntax:  [[[String]]]
[Query("names", TypeDefinition = [MetaGraphTypes.IsList, MetaGraphTypes.IsList, MetaGraphTypes.IsList])]
public IEnumerable<IEnumerable<IEnumerable<string>>> GenerateNames(int seed)
{/*...*/}

// Declare that we will return a "list of a list of a list of strings" and while any list could be null,
// the strings themselves cannot be null
// ----
// Schema Syntax:  [[[String!]]]
[Query("names", TypeDefinition = [MetaGraphTypes.IsList, MetaGraphTypes.IsList, MetaGraphTypes.IsList, MetaGraphTypes.IsNotNull])]
public IEnumerable<IEnumerable<IEnumerable<string>>> GenerateNames(int seed)
{/*...*/}

// Declare that the return type is a "list of a list of non-null lists of strings".
// ----
// Schema Syntax:  [[[String]!]]
[Query("names", TypeDefinition = [MetaGraphTypes.IsList, MetaGraphTypes.IsList,  MetaGraphTypes.IsNotNull, MetaGraphTypes.IsList])]
public IEnumerable<IEnumerable<IEnumerable<string>>> GenerateNames(int seed)
{/*...*/}
```

> The `TypeDefinition` property is available on `[Query]`, `[QueryRoot]`, `[Mutation]`, `[MutationRoot]`, `[Subscription]`, `[SubscriptionRoot]` and `[GraphField]`

**Warning**: When declared, the runtime will accept your `TypeDefinition` or `TypeExpression` as law. You can setup a scenario where by you could return data that the runtime could never validate and GraphQL will happily process it and cause an error every time. For instance returning a single integer but declaring a `TypeDefinition` of a list of integers or declaring a list of donuts but only returning a single instance.

```csharp
// ERROR
// GraphQL will expect an IEnumerable to be returned and will fail every time this
// field is invoked
[Query("donut", TypeDefinition = [MetaGraphTypes.IsList])]
public Donut RetrieveDonut(string id)
{/*...*/}
```

"With great power comes great responsibility" - Uncle Ben
