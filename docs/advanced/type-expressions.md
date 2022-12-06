---
id: type-expressions
title: Type Expressions
sidebar_label: Type Expressions
---

The GraphQL specification states that when a field resolves a value that doesn't conform to the type expression of the field that the value is rejected, converted to null and an error added to the response.

When GraphQL ASP.NET build a schema it makes as few assumptions as possible about the data returned from your fields to result in as few errors as possible.

These assumptions are:

-   Fields that return reference types **can be** null
-   Fields that return value types **cannot be** null
-   Fields that return Nullable value types (e.g. `int?`) **can be** be null.
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

This action method could return a `Donut` or return `null`. But should the donut field, from a GraphQL perspective, allow a null return value? The code certainly does and the rules above say fields that return a reference type can be null...but that's not what's important. Its ultimately your decision to decide if a "null donut" is allowed, not the C# compiler and not the assumptions made by the library.

On one hand, if a null value is returned, regardless of it being valid, the _outcome_ of the field is the same. When we return a null no child fields are processed. On the other hand, if null is not allowed we need to tell someone, let them know its nulled out not because it simply _is_ null but because a schema violation occurred.

## Field Type Expressions

You can add more specificity to your fields by using the `TypeExpression` property of the various field declaration attributes.

```csharp

// Declare that a donut MUST be returned (null is invalid)
// ----
// Final Schema Syntax:  Donut!
[Query("donut", TypeExpression = "Type!")]
public Donut RetrieveDonut(string id)
{/*...*/}


// Declare that a list must be returned but the elements of the list
// could be null:
// valid:    [donut1, null, donut2, donut3]
// valid:    []
// invalid:  null
// ----
// Final Schema Syntax:  [Donut]!
[Query("donut", TypeExpression = "[Type]!")]
public IEnumerable<Donut> RetrieveDonut(string id)
{/*...*/}


// Declare that a list must be returned AND the elements of the list
// must not be null:
// valid:    [donut1, donut2, donut3]
// valid:    []
// invalid:  [donut1, null, donut2]
// invalid:  null
// ----
// Final Schema Syntax:  [Donut!]!
[Query("donut", TypeExpression = "[Type!]!")]
public IEnumerable<Donut> RetrieveDonut(string id)
{/*...*/}
```

> The value `Type` used in the examples is arbitrary and can be any valid string. The correct type name for the target schema will be used in its place at runtime.

<span style="color:pink;">**Warning**: When declared, the runtime will use your `TypeExpression` as law for any field declarations; skipping its internal checks. You can setup a scenario where by you could return data that the runtime could never validate as being correct and GraphQL will happily process it and return an error every time. </span>

```csharp
// QUERY EXECUTION ERROR
// GraphQL will attempt to process Donut as an IEnumerable and will fail to resolve every time this
// field is invoked
[Query("donut", TypeExpression ="[Type]")]
public Donut RetrieveDonut(string id)
{/*...*/}
```

"With great power comes great responsibility"  -Uncle Ben

## Input Argument Type Expressions

Similar to fields, you can use the `TypeExpression` property on `[FromGraphQL]` to add more specificity to your input arguments.

```csharp
// Force the argument "id" to supply a string (it cannot be supplied as null)
// -----------------
// Final Type Expression of the 'id' arg:  String!
[Query]
public Donut RetrieveDonut([FromGraphQL(TypeExpression = "Type!")] string id)
{/*...*/}
```