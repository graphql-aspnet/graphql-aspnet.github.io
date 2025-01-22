---
id: scalars
title: Scalars
sidebar_label: Scalars
sidebar_position: 5
---

Scalars are the most basic, fundamental unit of content in GraphQL. It is one of two leaf types (the other being [enums](./enums)). You can extend GraphQL with your own [custom scalars](../advanced/custom-scalars) when needed.

GraphQL ASP.NET has 20 built in scalar types.

| Scalar Name    | .NET Type              | Allowed Input Value |
| -------------- | ---------------------- | ------------------- |
| Boolean        | System.Boolean         | Boolean             |
| Byte           | System.Byte            | Number              |
| DateOnly       | System.DateOnly        | String or Number    |
| DateTime       | System.DateTime        | String or Number    |
| DateTimeOffset | System.DateTimeOffset  | String or Number    |
| Decimal        | System.Decimal         | Number              |
| Double         | System.Double          | Number              |
| Float          | System.Single          | Number              |
| Guid           | System.Guid            | String              |
| ID             | GraphQL.AspNet.GraphId | String or Number    |
| Int            | System.Int32           | Number              |
| Long           | System.Int64           | Number              |
| Short          | System.Int16           | Number              |
| String         | System.String          | String              |
| SignedByte     | System.SByte           | Number              |
| TimeOnly       | System.TimeOnly        | String              |
| UInt           | System.UInt32          | Number              |
| ULong          | System.UInt64          | Number              |
| Uri            | System.Uri             | String              |
| UShort         | System.UInt16          | Number              |

:::info 
 You must target .NET 8.0 or later to use `DateOnly` and `TimeOnly`
:::

## Input Value Resolution

When a scalar value is resolved, it's read from the query document (or variable collection) in one of three ways:

-   **String** : A string of characters, delimited by `"quotes"`
-   **Boolean** The value `true` or `false` without quotes
-   **Number** A sequence of numbers with an optional decimal point, negative sign or the letter `e` without quotes
    -   example: `-123.456e78`
    -   GraphQL numbers must conform to the [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) standard [Spec § [3.5.2](https://graphql.github.io/graphql-spec/October2021/#sec-Float)]

Scalars used as input arguments require that any supplied value match at least one supported input format before they will attempt to convert the value into the related .NET type. If the value read from the document doesn't match an approved format it is rejected before conversion is attempted. 

For example, the library will accept dates as numbers or strings. If you try to supply a boolean value, `true`, the query is rejected outright and no parsing attempt is made. This can come in handy for custom scalar types that may have multiple serialization options.

See the table above for the list of allowed formats per scalar type.

#### Working With Dates

Date valued scalars (e.g. `DateTime`, `DateTimeOffset`, `DateOnly`) can be supplied as an [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) compliant string value or as a number representing the amount of time from the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time).

Examples:

| Supplied Value  | Parsed Date |
|-----------------|-------------|
|`"2022-12-30T18:30:38.259+00:00"`  |Dec. 30, 2022 @  6:30:38.259 PM (UTC - 0) |
|`"2022-12-30"`                     |Dec. 30, 2022 @  00:00:00.000 AM (UTC - 0) |
|`1586965574234`                    | April 15, 2020 @ 3:46:14.234 AM (UTC - 0) |
|`1586940374`                       | April 15, 2020 @ 3:46:14.000 AM (UTC - 0) |

:::tip Epoch Values
Dates supplied as an epoch number can be supplied with or without milliseconds.
:::

> Note: If a time component is supplied to a `DateOnly` scalar, it will be truncated and only the date portion will be used. 

By Default, the library will serialize all dates as an `RFC 3339` compliant string.


## Scalar Names Are Fixed

Unlike other graph types, scalar names are fixed across all schemas. The name defined above (including casing), is how they appear in your schema's introspection queries. These names conform to the accepted standard for graphql type names. This is true for any custom scalars you may build as well.

#### Nullable&lt;T&gt;

`int?`, `float?` etc.

For the value types listed above, GraphQL will automatically coerce values into the appropriate `Nullable<T>` as required by an argument's type expression.

## ID Scalar

GraphQL defines a special scalar value value called `ID` which is defined as:

> _a unique identifier, often used to refetch an object or as the key for a cache_" [Spec § [3.5.5](https://graphql.github.io/graphql-spec/October2021/#sec-ID)].

GraphQL ASP.NET maintains a struct, `GraphQL.AspNet.GraphId` to hold this value and will always serialize it to a string. However, per the specification, when supplying values on a query document, ID can accept strings or integers as input values. Floating point numbers and boolean values are not allowed.

- Valid ID values
    - `"abc"`
    -  `34`
    - `-200`
- Invalid ID Values
    - `true`
    -  `4.0` 

:::note Integer Value Range
When using an integer value for an ID scalar, the minimum allowed value is `long.MinValue` and the maximum allowed value is `ulong.MaxValue`
:::

You can perform an implicit and explicit conversion between `GraphId` and `System.String` as well.

```csharp title="Converting GraphId"
GraphId id = new GraphId("abc");
string str = id;
// str == "abc"

string str = "abc";
GraphId id = (GraphId)str;
// id.Value == "abc"
```

## Custom Scalars
See the section on [custom scalars](../advanced/custom-scalars.md) for details on creating your own scalar types.

### Working with Structs

Structs, by default, will be treated like [object graph types](./objects.md). Sometimes it may make sense to create a custom scalar out of a struct, for example, the default scalar for `Guid`. Use your best judgement when determining if a struct should be a scalar or not. But always try to opt for fewer scalars when possible.