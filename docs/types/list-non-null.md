---
id: list-non-null
title: List & Non-Null
sidebar_label: List & Non-Null
sidebar_position: 6
---

In addition to the six fundamental graph types, GraphQL contains two meta graph types: [LIST and NON_NULL](https://graphql.org/learn/schema/#lists-and-non-null).

-   `NON_NULL` : Indicates that the Graph Type its describing must not be a null value, be that as an input argument or returned from a field
-   `LIST`: Indicates that GraphQL should expect a collection of objects instead of just a single item.

These meta types aren't anything concrete like a scalar or an enum. Instead they "wrap" another graph type (such as `int` or `Donut`). They are used to describe the usage of a graph type in a field or input argument:

For example, we would say:

-   "A field that returns a `Float` number."
-   "A field that must return a `Person`."
-   "An input argument that must be a `Date`."

We can even describe complex scenarios:

-   "A field that **might** return a collection of `persons` but when returned, each person **must** be a valid reference."
-   "An input argument that **must** be a list that contains lists of `integers`." (e.g. `[[1, 2], [5, 15]]`)

## Type Expressions

Together these "wrappers" make up a field's `Type Expression`. GraphQL ASP.NET will automatically infer a type expression for every field and every input argument when generating your schema.

The following assumptions about your data are made when creating type expressions:

✅  Reference types **can be** null <br/>
✅  Value types **cannot be** null <br/>
✅  Nullable value types (e.g. `int?`) **can be** null <br/>
✅  When a reference type implements `IEnumerable<TType>` it will be expressed as a "list of `TType`"

Type Expressions are commonly shown in the GraphQL schema syntax for field definitions. Here are a few examples of a .NET type and its equivalent type expression in schema syntax.

| .NET Type                               | Type Expression |
| --------------------------------------- | --------------- |
| int                                   | Int!          |
| float?                                | Float         |
| IEnumerable&lt;Person&gt;                   | [Person]      |
| Person[]                               | [Person]      |
| List&lt;bool&gt;                            | [Boolean!]    |
| IReadOnlyList&lt;long&gt;                  | [Long!]        |
| IReadOnlyList&lt;long?&gt;                  | [Long]        |
| IEnumerable&lt;List&lt;ICollection&lt;Donut&gt;&gt;&gt; | [[[Donut]]]   |

> The `!` indicates NON_NULL and `[]` for a LIST.

### Overriding Type Expressions

You may need to override the default behavior from time to time. For instance, a `string`, which is a reference type, is nullable by default but you may want to enforce non-nullability at the query level and declare that null is not valid for a given argument. Or, perhaps, an object implements `IEnumerable` but you don't want graphql to treat it as a list.

You can override the default type expression of any field or argument by defining a [custom type expression](../advanced/type-expressions) when needed.

