---
id: directives
title: Directives
sidebar_label: Directives
sidebar_position: 2
---

## What is a Directive?

Directives decorate parts of your schema or a query document to perform some sort of custom logic. What that logic is, is entirely up to you. There are several directives built into graphql:

-   `@include` : An execution directive that conditionally includes a field or fragment in the results of a graphql query
-   `@skip` : An execution directive that conditionally excludes a field or fragment from the results of a graphql query
-   `@deprecated` : A type system directive that marks a field definition or enum value as deprecated, indicating that it may be removed in a future release of your graph.
-   `@specifiedBy` : A type system directive for a custom scalar that adds a URL pointing to documentation about how the scalar is used. This url is returned as part of an introspection query.

Beyond this you can create directives to perform any sort of action against your graph or query document as seems fit to your use case.

## Anatomy of a Directive

Directives are implemented in much the same way as a `GraphController` but where you'd indicate an action method as being for a query or mutation, directive action methods must indicate the location(s) they can be applied in either a query document or the type system.

```csharp title="SkipDirective.cs"
public sealed class SkipDirective : GraphDirective
{
    [DirectiveLocations(DirectiveLocation.FIELD | DirectiveLocation.FRAGMENT_SPREAD | DirectiveLocation.INLINE_FRAGMENT)]
    public IGraphActionResult Execute([FromGraphQL("if")] bool ifArgument)
    {
        if (this.DirectiveTarget is IIncludeableDocumentPart docPart)
            docPart.IsIncluded = !ifArgument;

        return this.Ok();
    }
}
```

```graphql title="Quring using @skip"
# skip including flavor
query {
    donut(id: 15) {
        id 
        name
        flavor @skip(if: true)
    }
}
```

✅ All directives must:

-   Inherit from `GraphQL.AspNet.Directives.GraphDirective`
-   Provide at least one action method that indicates at least 1 valid `DirectiveLocation`.

✅ All directive action methods must:

-   Share the same method signature
-   The input arguments must match exactly in type, name, casing and declaration order.
-   Return a `IGraphActionResult` or `Task<IGraphActionResult>`

### Action Results

Directives have two built in action results that can be returned:

-   `this.Ok()`
    -   Indicates that the directive completed successfully and processing should continue.
-   `this.Cancel()`
    -   Indicates that the directive did NOT complete successfully and processing should stop.
    -   If this is a type system directive, the target schema will not be generated and the server will fail to start.
    -   If this is an execution directive, the query will be abandoned and the caller will receive an error result.

### Helpful Properties

The following properties are available to all directive action methods:

-   `this.DirectiveTarget` - The `ISchemaItem` or `IDocumentPart` to which the directive is being applied.
-   `this.Request` - The directive invocation request for the currently executing directive. Contains lots of advanced information such as execution phase, the directive type declared on the schema etc.

### Directive Arguments

Directives may contain input arguments just like fields. However, its important to note that while a directive may declare multiple action methods for different locations to seperate your logic better, it is only a single entity in the schema. ALL action methods must share a common signature. The runtime will throw an exception while creating your schema if the signatures of the action methods differ.

```csharp title="Arguments for Directives"
public class MyValidDirective : GraphDirective
{
    [DirectiveLocations(DirectiveLocation.FIELD)]
    public IGraphActionResult ExecuteField(int arg1, string arg2) { /.../ }

    [DirectiveLocations(DirectiveLocation.FRAGMENT_SPREAD)]
    public Task<IGraphActionResult> ExecuteFragSpread(int arg1, string arg2) { /.../ }
}

public class MyInvalidDirective : GraphDirective
{
    [DirectiveLocations(DirectiveLocation.FIELD)]
    // highlight-next-line
    public IGraphActionResult ExecuteField(int arg1, int arg2) { /.../ }

    // method parameters MUST match for all directive action methods.
    [DirectiveLocations(DirectiveLocation.FRAGMENT_SPREAD)]
    // highlight-next-line
    public IGraphActionResult ExecuteFragSpread(int arg1, string arg2) { /.../ }
}
```

:::info
 Directive arguments must match in name, data type and position for all action methods. Being able to use different methods for different locations is a convenience; to GraphQL there is only one directive with one set of parameters.
:::

## Execution Directives

(_**a.k.a. Operation Directives**_)

Execution Directives are applied to query documents and executed only on the  request in which they are encountered. 

### Example: @include

This is the code for the built in `@include` directive:

```csharp
[GraphType("include")]
public sealed class IncludeDirective : GraphDirective
{
    [DirectiveLocations(DirectiveLocation.FIELD | DirectiveLocation.FRAGMENT_SPREAD | DirectiveLocation.INLINE_FRAGMENT)]
    public IGraphActionResult Execute([FromGraphQL("if")] bool ifArgument)
    {
        if (this.DirectiveTarget is IIncludeableDocumentPart idp)
            idp.IsIncluded = ifArgument;

        return this.Ok();
    }
}
```

This Directive:

-   Declares its name using the `[GraphType]` attribute
    -   The name will be derived from the class name if the attribute is omitted
-   Declares that it can be applied to a query document at all field selection locations using the `[DirectiveLocations]` attribute
-   Uses the `[FromGraphQL]` attribute to declare the input argument's name in the schema
    -   This is because `if` is a keyword in C# and we don't want the argument being named `ifArgument` in the schema.
-   Is executed once for each field, fragment spread or inline fragment to which its applied in a query document.

> The action method name `Execute` in this example is arbitrary. Method names can be whatever makes the most sense to you.

### Directive Execution Order

When more than one directive is encountered for a single location, they are executed in the order encountered, from left to right, in the source text.

In this example :

```graphql title="Using Multiple Execution Directives"
query {
    bakery {
        allPastries{
            id @directiveA @directiveB
            name
        }
    }
}
```

The directives attached to the `id` field are executed in order from left to right:

1.  @directiveA
2.  @directiveB

### Influencing Field Resolution

Execution directives are applied to document parts, not schema items. As a result they aren't directly involved in resolving fields but instead influence the document that is eventually translated into a query plan and executed. However, one common use case for execution directives includes augmenting the results of a field after its resolved. For instance, perhaps you had a directive that could conditionally turn a string field into an upper case string when applied (i.e. `@toUpper`).

For this reason it is possible to apply a 'PostResolver' directly to an `IFieldDocumentPart`. This post resolver is executed immediately after the primary field resolver is executed.

```csharp title="ToUpperDirective.cs"
public class ToUpperDirective : GraphDirective
{
    [DirectiveLocations(DirectiveLocation.FIELD)]
    public IGraphActionResult UpdateResolver()
    {
        if (this.DirectiveTarget as IFieldDocumentPart fieldPart)
        {
            //
            if (fieldPart.Field?.ObjectType != typeof(string))
                throw new GraphExecutionException("ONLY STRINGS!"); // - hulk

            // add a post resolver to the target field document
            // part to perform the conversion when the query is
            // ran
            // highlight-next-line
            fieldPart.PostResolver = ConvertToUpper;
        }

        return this.Ok();
    }

    private static Task ConvertToUpper(
        FieldResolutionContext context,
        CancellationToken token)
    {
        if (context.Result is string)
            context.Result = context.Result?.ToString().ToUpperInvariant();

        return Task.CompletedTask;
    }
}
```

```graphql title="Using @toUpper"
query {
    bakery {
        allPastries{
            id
            name @toUpper
        }
    }
}
```

#### Working with Batch Extensions

Batch extensions work differently than standard field resolvers; they don't resolve a single item at a time. This means our `@toUpper` example above won't work as `context.Result` won't be a string. Should you employ a post resolver that may be applied to a batch extension you'll need to handle the resultant dictionary differently than you would a single field value. The dictionary will always be of the format `IDictionary<TSource, TResult>` where `TSource` is the data type of the field that owns the field the directive was applied to and `TResult` is the data type or an `IEnumerable` of the data type the target field returns. The dictionary is always keyed by source item reference.

:::caution Be Careful with Batch Type Extensions
 Batch Extensions will return a dictionary of data not a single item. Your post resolver must be able to handle this dictionary if applied to a field that is a `[BatchExtensionType]`.
:::

## Type System Directives

(_**a.k.a. Schema Directives**_)

Type System directives are applied to schema items and executed at start up while the schema is being created. 

### Example: @toLower

This directive will extend the resolver of a field, as its declared **in the schema**, to turn any strings into lower case letters.

```csharp title="Example: ToLowerDirective.cs"
public class ToLowerDirective : GraphDirective
{
    [DirectiveLocations(DirectiveLocation.FIELD_DEFINITION)]
    public IGraphActionResult Execute()
    {
        // ensure we are working with a graph field definition and that it returns a string
        if (this.DirectiveTarget is IGraphField field)
        {
            // ObjectType represents the .NET Type of the data returned by the field
            if (field.ObjectType != typeof(string))
                throw new Exception("This directive can only be applied to string fields");

            // update the resolver to execute the orignal
            // resolver then apply lower casing to the string result
            var resolver = field.Resolver.Extend(ConvertToLower);
            field.UpdateResolver(resolver);
        }

        return this.Ok();
    }

    private static Task ConvertToLower(FieldResolutionContext context, CancellationToken token)
    {
        if (context.Result is string)
            context.Result = context.Result?.ToString().ToLower();

        return Task.CompletedTask;
    }
}
```

This Directive:

-   Targets a FIELD_DEFINITION.
-   Ensures that the target field returns a string.
-   Extends the field's resolver to convert the result to a lower-case string.
-   The directive is executed once per field definition its applied to when the schema is created. The extended resolver method is executed on every field resolution.

:::info Type System Directives
 Notice the difference in this type system directive vs. the `@toUpper` execution directive above. Where as toUpper was declared as a PostResolver on the document part, this directive extends the primary resolver of an `IGraphField` and affects ALL queries that request this field.
:::

### Example: @deprecated

The `@deprecated` directive is a built in type system directive provided by graphql to indicate deprecation on a field definition or enum value. Below is the code for its implementation.

```csharp
public sealed class DeprecatedDirective : GraphDirective
{
    [DirectiveLocations(DirectiveLocation.FIELD_DEFINITION | DirectiveLocation.ENUM_VALUE)]
    public IGraphActionResult Execute([FromGraphQL("reason")] string reason = "No longer supported")
    {
        if (this.DirectiveTarget is IGraphField field)
        {
            field.IsDeprecated = true;
            field.DeprecationReason = reason;
        }
        else if (this.DirectiveTarget is IEnumValue enumValue)
        {
            enumValue.IsDeprecated = true;
            enumValue.DeprecationReason = reason;
        }

        return this.Ok();
    }
}
```

This Directive:

-   Targets a FIELD_DEFINITION or ENUM_VALUE.
-   Marks the field or enum value as deprecated and attaches the provided deprecation reason
-   The directive is executed once per field definition and enum value its applied to when the schema is created.

### Applying Type System Directives

#### Using the `[ApplyDirective]` attribute

If you have access to the source code of a given type you can use the `[ApplyDirective]` attribute:


```csharp title="Person.cs"
public class Person
{
    [ApplyDirective(typeof(ToLowerDirective))]
    public string Name{ get; set; }
}
```

```graphql title="Person Type Definition"
type Person  {
  name: String @toLower
}
```

If different schemas on your server will use different implementations of the directive you can also specify the directive by name. This name is case sensitive and must match the name of the registered directive in the target schema. At runtime, the concrete class declared as the directive in each schema will be instantiated and used.

```csharp title="Apply a Directive By Name"
[ApplyDirective("monitor")]
public class Person
{
    public string Name{ get; set; }
}
```
```graphql title="Person Type Definition"
type Person @monitor  {
  name: String
}
```
**Adding Argument Values with [ApplyDirective]**

Arguments added to the apply directive attribute will be passed to the directive in the order they are encountered. The supplied values must be coercable into the expected data types for any input parameters.


```csharp title="Applying Directive Arguments"
public class Person
{
    [ApplyDirective("deprecated", "Names don't matter")]
    public string Name{ get; set; }
}
```

```graphql title="Person Type Definition"
type Person  {
  name: String @deprecated("Names don't matter")
}
```

#### Using Schema Options

Alternatively, instead of using attributes to apply directives you can apply directives during schema configuration:

```csharp title="Apply Directives at Startup"
services.AddGraphQL(options =>
{
    options.AddGraphType<Person>();

    // mark Person.Name as deprecated
    options.ApplyDirective("monitor")
        .ToItems(schemaItem => schemaItem.IsObjectGraphType<Person>());
}
```

```graphql title="Person Type Definition"
type Person  @monitor {
  name: String
}
```

> The `ToItems` filter can be invoked multiple times. A schema item must match all filter criteria in order for the directive to be applied.

> Type system directives are applied in order of declaration with the `[ApplyDirective]` attributes taking precedence over the `.ApplyDirective()` method.

**Adding arguments via .ApplyDirective()**

Adding Arguments via schema options is a lot more flexible than via attributes. Use the `.WithArguments` method to supply either a static set of arguments for all matched schema items
or a `Func<ISchemaItem, object[]>` that returns a collection of any parameters you want on a per item basis.


```csharp title="Apply Directives at Startup With Arguments"
// startup code
services.AddGraphQL(options =>
{
    options.AddGraphType<Person>();
    // highlight-start
    options.ApplyDirective("@deprecated")
        .WithArguments("Names don't matter")
        .ToItems(schemaItem => schemaItem.IsGraphField<Person>("name"));
    // highlight-end
}
```

```graphql title="Person Type Definition"
type Person  {
  name: String @deprecated("Names don't matter")
}
```

### Repeatable Directives

GraphQL ASP.NET supports repeatable type system directives. Sometimes it can be helpful to apply your directive to an schema item more than once, especially if you supply different parameters on each application.

Add the `[Repeatable]` attribute to the directive definition and you can then apply it multiple times using the standard methods. GraphQL tools that support this the repeatable syntax will be able to properly interprete your schema.

```csharp title="Repeatable Directives"
[Repeatable]
public sealed class ScanItemDirective : GraphDirective
{
    [DirectiveLocations(DirectiveLocation.OBJECT)]
    public IGraphActionResult Execute(string scanType)
    { /* ... */}
}

// Option 1: Apply the directive to the class directly
// highlight-start
[ApplyDirective("@scanItem", "medium")]
[ApplyDirective("@scanItem", "high")]
// highlight-end
public class Person
{}

// Option 2: Apply the directive at startup
services.AddGraphQL(o => {
    // ...
    // highlight-start
    o.ApplyDirective("@scanItem")
        .WithArguments("medium")
        .ToItems(item => item.IsObjectGraphType<Person>());
    o.ApplyDirective("@scanItem")
        .WithArguments("high")
        .ToItems(item => item.IsObjectGraphType<Person>());
    // highlight-end
});
```

```graphql title="Person Type Definition"
type Person @scanItem("medium") @scanItem("high") {
  name: String 
}
```

### Understanding the Type System

GraphQL ASP.NET builds your schema and all of its types from your controllers and objects. In general, this is done behind the scenes and you do not need to interact with it. However, when applying type system directives you are affecting the generated schema and need to understand the various parts of it. If you have a question don't be afraid to ask on [github](https://github.com/graphql-aspnet/graphql-aspnet).

**UML Diagrams**

These [uml diagrams](../assets/2022-10-graphql-aspnet-structural-diagrams.pdf) detail the major interfaces and their most useful properties of the type system. However, these diagrams are not exaustive. Look at the [source code](https://github.com/graphql-aspnet/graphql-aspnet/tree/master/src/graphql-aspnet/Interfaces/Schema) for the full definitions.

**Helpful Extensions**

There are a robust set of of built in extensions for `ISchemaItem` that can help you filter your data when applying directives. See the [full source code](https://github.com/graphql-aspnet/graphql-aspnet/blob/master/src/graphql-aspnet/Configuration/SchemaItemFilterExtensions.cs) for details.

## Directives as Services

Directives are invoked as services through your DI container when they are executed. When you add types to your schema during its initial configuration, GraphQL ASP.NET will automatically register any directives it finds attached to your entities as services in your `IServiceCollection` instance. However, there are times when it cannot do this, such as when you apply a directive by its string declared name. These late-bound directives may still be discoverable later and graphql will attempt to add them to your schema whenever it can. However, it may do this after the opportunity to register them with the DI container has passed.

When this occurs, if your directive contains a public, parameterless constructor graphql will still instantiate and use your directive as normal. If the directive contains dependencies in the constructor that it can't resolve, execution of that directive will fail and an exception will be thrown. To be safe, make sure to add any directives you may use to your schema during the `.AddGraphQL()` configuration method. Directives are directly discoverable and will be included via the `options.AddAssembly()` helper method as well.

The benefit of ensuring your directives are part of your `IServiceCollection` should be apparent:

-   The directive instance will obey lifetime scopes (e.g. transient, scoped, singleton).
-   The directive can be instantiated with any dependencies or services you wish; making for a much richer experience.

## Directive Security

Directives can be secured like controller actions. However, where a controller action represents a field in the graph, a directive action does not. Regardless of the number of action methods, there is only one directive definition in your schema. As a result, the directive is secured at the class level not the method level. Any applied security parameters effect ALL action methods equally.

Take for example that the graph schema included a field of data that, by default, was always rendered in a redacted state (meaning it was obsecured) such as social security number. You could have a directive that, when supplied by the requestor, would unredact the field and allow the value to be displayed.

```csharp title="Applying Authorization to Directives"
// highlight-next-line
[Authorize(Policy = "admin")]
public sealed class UnRedactDirective : GraphDirective
{
    [DirectiveLocations(DirectiveLocation.FIELD)]
    public IGraphActionResult Execute()
    { /* ... */}
}
```

> A user must adhere to the requirements of the `admin` policy in order to apply the `@unRedact` directive to a field. If the user is not part of this policy and they attempt to apply the directive, the query will be rejected.

### Security Scenarios

-   **Execution Directives** - These directives execute using the same security context and `ClaimsPrincipal` applied to the HTTP request; such as an oAuth token. Execution directives are evaluated against the source document while its being constructed, BEFORE it is executed. As a result, if an execution directive fails authorization, the document fails to be constructed and no fields are resolved. This is true regardless of the authorization method assigned to the schema.

-   **Type System Directives** - These directives are executed during server startup, WITHOUT a `ClaimsPrincipal`, while the schema is being built. As a result, type system directives should not contain any security requirements, they will fail to execute if any security parameters are defined.

> Since type system directives execute outside of a specific user context, only apply type system directives that you trust.

## Demo Project

See the [Demo Projects](../reference/demo-projects.md) page for a demonstration on creating a type system directive for extending a field resolver and an execution directives
that manipulates a string field result at runtime.
