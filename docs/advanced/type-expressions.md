---
id: type-expressions
title: Type Expressions
sidebar_label: Type Expressions
sidebar_position: 1
---

The GraphQL specification states that when a field resolves a value that doesn't conform to the expected type expression of the field that the value is rejected, converted to null and an error added to the response.

When the library builds a schema it makes as few assumptions as possible about the data returned from your fields to result in as few errors as possible.

These assumptions are:

-   Fields that return reference types **can be** null
-   Fields that return primatives or value types (including structs) **cannot be** null
-   Fields that return Nullable primatives or value types (e.g. `int?`) **can be** be null.
-   When a field returns an object that implements `IEnumerable<TType>` it will be presented to GraphQL as a "list of `TType`".

Basically, if your method is able to return a value...then its valid as far as GraphQL is concerned.

Lets look at an example:

```csharp title="BakeryController.cs"
[GraphRoute("bakery")]
public class BakeryController : GraphController
{
    [Query("donut")]
    public Donut RetrieveDonut(int id)
    {/*...*/}
}
```
```graphql title="Sample Query"
query {
    bakery {
        donut(id: 15){
            name
            flavor
        }
    }
}
```

Assuming `Donut` was a class (a reference type), this action method could return a donut object or `null`. But should the donut field, from a GraphQL perspective, allow a null return value? The code certainly does and the rules above say fields that return a reference type can be null...but that's not what's important. Its ultimately your decision to decide if a "null donut" is allowed, not the C# compiler and not the assumptions made by the library.

On one hand, if a null value is returned, regardless of it being valid, the _outcome_ of the field is the same. When we return a null no child fields are processed. On the other hand, if null is not allowed we need to tell someone, let them know its nulled out not because it simply _is_ null but because a schema violation occurred.

## Field Type Expressions

You can add more specificity to your fields by using the `TypeExpression` property of the various field declaration attributes.

```csharp title="Example Custom Type Expressions"
// Declare that a donut MUST be returned (null is invalid)
// ----
// Final Schema Syntax:  Donut!
// highlight-next-line
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
// highlight-next-line
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
// highlight-next-line
[Query("donut", TypeExpression = "[Type!]!")]
public IEnumerable<Donut> RetrieveDonut(string id)
{/*...*/}
```

:::info `Type` is a place holder 
The type name used in the examples (e.g. `Type`) is arbitrary and can be any valid string. The correct type name for the target field will be used in its place at runtime.
:::

## Input Argument Type Expressions

Similar to fields, you can use the `TypeExpression` property on `[FromGraphQL]` to add more specificity to your input arguments.

```csharp title="Type Expression on an Argument"
// Force the argument "id" to supply a string (it cannot be supplied as null)
// -----------------
// Final Type Expression of the 'id' arg:  String!
[Query]
// highlight-next-line
public Donut RetrieveDonut([FromGraphQL(TypeExpression = "Type!")] string id)
{/*...*/}
```


## Runtime Type Validation

Note that the library will accept your type string even if it would be impossible, from a C# perspective, to return data that would match.

```csharp title="Data and Type Expression Mismatch"
// QUERY EXECUTION ERROR
// GraphQL will attempt to process a single Donut as a list and will fail
// highlight-next-line
[Query("donut", TypeExpression ="[Type]")]
public Donut RetrieveDonut(string id)
{/*...*/}
```

When executing a query and resolving a field, should one of your action methods (or even your object properties) not return data conforming to the type expression that's defined for it, GraphQL will reject the data. The value is set to null and an error is registered in the response for the field in question. The runtime will not attempt to resolve any referenced child fields for a rejected value.

If the rejected field does not allow nulls, the error is propagated up to its parent, which is then also set to null. If that parent field can't return a null value the error continues up until it reaches a field that can be null or the entire field collection is nulled out. \[Spec § [6.4.4](https://graphql.github.io/graphql-spec/October2021/#sec-Errors-and-Non-Nullability)\]

:::danger 
When declared, the runtime will use your `TypeExpression` as law for any field declarations; skipping its internal checks. You can setup a scenario where by you could return data that the runtime could never validate as being correct and GraphQL will happily process it and return an error every time. 
:::

> "With great power comes great responsibility"  -Uncle Ben

