---
id: directives
title: Directives
sidebar_label: Directives
---

Directives are implemented in much the same way as `GraphController` but where you'd indicate a a graph controller method as being for a query or mutation, directives must indicate where they can be declared and when they should execute.

## Anatomy of a Directive

All directives must:

-   Inherit from `GraphQL.AspNet.Directives.GraphDirective`
-   Provide at least one appropriate life cycle action method definition

All directive action methods must:

-   Share the same method signature
-   Return `IGraphActionResult`

This is the code for the built in `@include` directive:

```csharp
    [GraphType("include")]
    [DirectiveLocations(ExecutableDirectiveLocation.AllFieldSelections)]
    public sealed class IncludeDirective : GraphDirective
    {
        public IGraphActionResult BeforeFieldResolution([FromGraphQL("if")] bool ifArgument)
        {
            return ifArgument ? this.Ok() : this.Cancel();
        }
    }
```

This Directive:

-   Declares its name using the `[GraphType]` attribute
    -   The name will be derived from the class name if the attribute is omitted
-   Defines that it can be included in a query document at all applicable field selection locations using the `[DirectiveLocations]` attribute
    -   This is the default behavior and will be set automatically if the attribute is omitted.
-   Declares a life cycle method of `BeforeFieldResolution` and provides one required input argument
-   Uses the `[FromGraphQL]` attribute to declare the input argument's name in the schema

### Directive Life Cycle Methods

GraphQL ASP.NET offers two points in the field pipeline at which a directive could be invoked. By declaring your methods as one of these two method names (or both), you can invoke the directive at that point in the lifecycle:

-   `BeforeFieldResolution`
    -   This method is executed before a controller method is called.
-   `AfterFieldResolution`
    -   The method is executed after the controller method is called.

> Directive life cycle methods must have an identical signature

While a directive may declare both life cycle methods independently, it is only a single entity in a schema. As a result both life cycle methods must share a common signature (i.e. the same input parameters and return type). The runtime will throw an exception when your schema is created if the signatures differ.

### Returning Data from a Directive

Directives can't directly return data or resolve a field but they can influence the field data using `this.Request.DataSource`. This property gives you direct access to the data items the field is currently resolving as well as the resolved values and current item state if executing `AfterFieldResolution`. You're free to manipulate this data as necessary and can change the resolved value, cancel a specific item etc.

**Directives Must Return IGraphActionResult**

Since directives don't directly return data, they must always return a `IGraphActionResult` to fully declare their intent. In the include directive, we're returning `this.Ok()` and `this.Cancel()` which allows us to affect the pipeline processing status, signaling for it to continue or cancel.

## How Directives are Executed

Directives are executed as a middleware component in the field execution pipeline. If the request supplies any directives to be ran, they are executed in the pipeline and depending on the result, the pipeline is allowed to continue or not.

The include directive above is very simple. Depending on the input argument it either returns `this.Ok()` indicating everything executed fine and processing of the pipeline should continue, or it returns `this.Cancel()` to end the request. The include directive does not attempt to influence or filter the incoming data items, its an "all or nothing" directive.

## Directive Execution Order

When more than one directive is encountered for a single field they are executed in sequence in the order declared in the source text. No directive has precedence over another and all will be executed.

## Working with Fragments

Directives attached to spreads and named fragments are executed for each of the top level fields in the fragment.

In this example :

```javascript
query {
    bakery {
        allPastries @directive1 {
            id
            name
            ...donutData @directiveA
        }
    }
}

fragment donutData on Donut @directiveB {
    flavor @directiveC
    size {
        length @directiveD
        width
    }
}
```

The directives executed, in order, for each field are:

-   **`allPasteries`**: `@directive1`

-   **`flavor`**: `@directiveA`, `@directiveB`, `@directiveC`

*   **`size`**: `@directiveA`, `@directiveB`

*   **`length`**: `@directiveD`

*   **`id`, `name`, `width`**: _-no directives-_

Since the `donutData` fragment is spread into the `allPastries` field its directives are also spread into the fields at the "top-level" of the fragment.

## Sharing Data with Fields

It is recommended that your directives act independently and be self contained. But if your use case calls for a need to share data with the fields they are targeting, the key-value pair collection `Items` that can be used:

-   `this.Request.Items` is a collection scoped to the current field execution. These values are available to all executing directives as well as the field resolver within the current pipeline.
