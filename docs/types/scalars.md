---
id: scalars
title: Scalars
sidebar_label: Scalars
---

Scalars are the most basic, fundamental unit of content in GraphQL. It is one of two leaf types (the other being [enums](./enums)). You can extend GraphQL with your own [custom scalars](../advanced/custom-scalars) when needed.

GraphQL ASP.NET has 15 built in scalar types.

| Scalar Name    | .NET Type              | Allowed Input Value\*\* |
| -------------- | ---------------------- | ----------------------- |
| Boolean        | System.Boolean         | Boolean                 |
| Byte           | System.Byte            | Number                  |
| DateTime       | System.DateTime        | String or Number        |
| DateTimeOffset | System.DateTimeOffset  | String or Number        |
| Decimal        | System.Decimal         | Number                  |
| Double         | System.Double          | Number                  |
| Float          | System.Single          | Number                  |
| Guid           | System.Guid            | String                  |
| ID             | GraphQL.AspNet.GraphId | String                  |
| Int            | System.Int32           | Number                  |
| Long           | System.Int64           | Number                  |
| String         | System.String          | String                  |
| SignedByte     | System.SByte           | Number                  |
| UInt           | System.UInt32          | Number                  |
| ULong          | System.UInt64          | Number                  |
| Uri            | System.Uri             | String                  |

## Input Value Resolution\*\*

When a value is resolved it's read from the query document (or variable collection) in one of three ways:

-   **String** : A string of characters, delimited by `"quotes"`
-   **Boolean** The string `true` or `false` with no quotes
-   **Number** A string of numbers with an optional decimal point, negative sign or letter `e`, `-123.456e78`.
    -   GraphQL numbers must conform to the [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) standard [Spec § [3.5.2](https://graphql.github.io/graphql-spec/June2018/#sec-Float)]

Scalars used as input arguments require that any supplied value match at least one supported input format before they will attempt to convert the value into the related .NET type. If the value read from the document doesn't match an approved format it is rejected before conversion is attempted. See the table above for the list of allowed formats per scalar type.

## Scalar Names Are Fixed

Unlike other graph types, scalar names are fixed across all schemas. The name defined above (including casing), is how they appear in your schema's introspection queries. These names conform to the accepted standard for graphql type names.

#### Nullable\<T\>

`int?`, `float?` etc.

For the value types listed above, GraphQL will automatically coerce values into the appropriate `Nullable<T>` as required by an argument's type expression.

## GraphQL.AspNet.GraphId

GraphQL defines a special scalar value value called `ID` which is defined as:

"_a unique identifier, often used to refetch an object or as the key for a cache_" [Spec § [3.5.5](https://graphql.github.io/graphql-spec/June2018/#sec-ID)].

GraphQL ASP.NET maintains a struct, `GraphQL.AspNet.GraphID` to hold this value and serializes and deserializes it as a string. You can perform an implicit and explicit conversion between `GraphID` and `System.String`

```csharp
GraphId id = new GraphId("abc");
string str = id;
// str == "abc"


string str = "abc";
GraphId id = (GraphId)str;
// id.Value == "abc"
```
