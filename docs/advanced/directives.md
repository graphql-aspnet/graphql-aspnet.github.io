---
id: directives
title: Directives
sidebar_label: Directives
---

> Directives were completely reimagined in June 2022, this document represents the new approach to directives.

Directives are implemented in much the same way as a `GraphController` but where you'd indicate an action method as being for a query or mutation, directive action methods must indicate the location(s) they can be applied in either a query document or the type system.

```csharp
    // an example implementation of the @skip directive
    public sealed class SkipDirective : GraphDirective
    {        
        [DirectiveLocations(DirectiveLocation.FIELD | DirectiveLocation.FRAGMENT_SPREAD | DirectiveLocation.INLINE_FRAGMENT)]
        public IGraphActionResult Execute([FromGraphQL("if")] bool ifArgument)
        {
            return ifArgument ? this.Cancel() : this.Ok();
        }
    }
```

## Anatomy of a Directive

All directives must:

-   Inherit from `GraphQL.AspNet.Directives.GraphDirective`
-   Provide at least one action method that indicates at least 1 valid `DirectiveLocation`.

All directive action methods must:

-   Share the same method signature
-   Return `IGraphActionResult` or `Task<IGraphActionResult>`


### Helpful Properties

The following properties are available to all directive action methods:

* `this.DirectiveTarget` - The targeted schema item or resolved field value depending the directive type.
* `this.Request`  - The invocation request for the currently executing directive. Contains lots of advanced information just as execution phase, the executing location etc.


### Directive Arguments

Directives can contain input arguments just like fields. However, its important to note that while a directive may declare multiple action methods for different locations to seperate your logic better, it is only a single entity in the schema. As a result ALL action methods must share a common signature. The runtime will throw an exception while creating your schema if the signatures of each action method differ.

```csharp
    public class MyValidDirective : GraphDirective
    {        
        [DirectiveLocations(DirectiveLocation.FIELD)]
        public IGraphActionResult Execute(int arg1, string arg2) { /.../ }

        [DirectiveLocations(DirectiveLocation.FRAGMENT_SPREAD)]
        public Task<IGraphActionResult> Execute(int arg1, string arg2) { /.../ }
    }

    public class MyInvalidDirective : GraphDirective
    {        
        // method parameters MUST match for all directive action methods.
        [DirectiveLocations(DirectiveLocation.FIELD)]
        public IGraphActionResult Execute(int arg1, int arg2) { /.../ }

        [DirectiveLocations(DirectiveLocation.FRAGMENT_SPREAD)]
        public IGraphActionResult Execute(int arg1, string arg2) { /.../ }
    }
```
> Directive arguments must match in name, data type and position for all action methods. Being able to use different methods for different locations is a convenience; to GraphQL there is only one directive with one set of parameters.


### Returning Data from a Directive

Directives can't directly return data or resolve a field. They can only indicate success or failure. The following helper methods can help to quickly generate an appropriate `IGraphActionResult`.

* `this.Ok()`:
    * The directive executed correctly and processing of the current schema item or target field should continue.
* `this.Cancel()`:
    * The directive failed and the schema should not be generated or the target field should be dropped.

> Throwing an exception within an action method of a directive will cause the current query to fail completely. Use `this.Cancel()` to discard only the currently resolving field. Normal nullability validation rules still apply.

### Directive Target
The `this.DirectiveTarget` property will contain either an `ISchemaItem` for type system directives or the resolved field value for execution directives. This value is useful in performing additional operations such as extending a field resolver during schema generation or taking further action against a resolved field.

### Directive Lifecycle Phases

Each directive is executed in one of three phases as indicated by `this.DirectivePhase`:

* `SchemaGeneration`
    * The directive is being applied during schema generation. `this.DirectiveTarget` will be the `ISchemaItem` targeted by the directive. You can make any necessary changes to the schema item during this phase. Once all type system directives have been applied the schema is read-only and should not be changed.
* `BeforeFieldResolution`
    * The directive is currently executing BEFORE its target field is resolved. `this.DirectiveTarget` will be null. You must explicitly tell a directive to execute before field resolution via the `[DirectiveInvocation]` attribute. By default this phase will be skipped.
* `AfterFieldResolution`
    * The directive is currently executing AFTER its target field is resolved. `this.DirectiveTarget` will contain the resolved field value. This value can be freely edited and the result will be used as the field result.  You are responsible for ensuring type consistancy. Altering the concrete data type of `DirectiveTarget` may cause a query to fail or yield unpredictable results.

## Execution Directives

### Example: @include Directive

This is the code for the built in `@include` directive:

```csharp
    [GraphType("include")]
    public sealed class IncludeDirective : GraphDirective
    {        
        [DirectiveLocations(DirectiveLocation.FIELD | DirectiveLocation.FRAGMENT_SPREAD | DirectiveLocation.INLINE_FRAGMENT)]
        public IGraphActionResult Execute([FromGraphQL("if")] bool ifArgument)
        {
            return ifArgument ? this.Ok() : this.Cancel();
        }
    }
```

This Directive:

-   Declares its name using the `[GraphType]` attribute
    -   The name will be derived from the class name if the attribute is omitted
-   Defines that it can be included in a query document at all applicable field selection locations using the `[DirectiveLocations]` attribute
    -   This is similar to using the `[Query]` or `[Mutation]` attributes for a controller method. 
    -   In addition to defining where the directive can be used this attribute also indicates which action method is invoked at that location. You can use multiple action methods as long as they have the same signature.
-   Uses the `[FromGraphQL]` attribute to declare the input argument's name in the schema
    - This is because `if` is a keyword in C# and we don't want the argument being named `ifArgument` in the graph.
-   Is executed once for each field or fragment field its applied to in a query document

> The action method name `Execute` in this example is arbitrary. Method names can be whatever makes the most sense to you.

### Directive Execution Order

When more than one directive is encountered for a single field, they are executed in the order encountered, from left to right, in the source text.

### Working with Fragments

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

-   **`allPasteries`**: @directive1

-   **`flavor`**: @directiveA -> @directiveB -> @directiveC

*   **`size`**: @directiveA -> @directiveB

*   **`length`**: @directiveD

*   **`id`, `name`, `width`**: _-no directives-_

Since the `donutData` fragment is spread into the `allPastries` field its directives are also spread into the fields at the "top-level" of the fragment.

### Sharing Data with Fields

It is recommended that your directives act independently and be self contained. But if your use case calls for a need to share data with the fields they are targeting, the key-value pair collection `Items` that can be used:

-   `this.Request.Items` is a collection scoped to the current field execution. These values are available to all executing directives as well as the field resolver within the current pipeline.


## Type System Directives
### Example: @toUpper

This directive will extend the resolver of a field to turn any strings into upper case letters.

```csharp
    public class ToUpperDirective : GraphDirective
    {
        [DirectiveLocations(DirectiveLocation.FIELD_DEFINITION)]
        public IGraphActionResult Execute()
        {
            // ensure we are working with a graph field definition and that it returns a string
            var field = this.DirectiveTarget as IGraphField;
            if (field != null)
            {
                // ObjectType represents the .NET Type of the data returned by the field
                if (field.ObjectType != typeof(string))
                    throw new Exception("This directive can only be applied to string fields");

                // update the resolver to execute the orignal
                // resolver then apply upper caseing to the string result
                var resolver = field.Resolver.Extend(ConvertToupper);
                item.UpdateResolver(resolver);
            }

            return this.Ok();
        }

        private static Task ConvertToupper(FieldResolutionContext context, CancellationToken token)
        {
            if (context.Result is string)
                context.Result = context.Result?.ToString().ToUpper();

            return Task.CompletedTask;
        }
    }
```

This Directive: 

* Targets any FIELD_DEFINITION.
* Ensures that the target field returns returns a string.
* Extends the field's resolver to convert the result to an upper case string.
* The directive is executed once per field its applied to when the schema is created. The extension method is executed on every field resolution.
    * If an exception is thrown the schema will fail to create and the server will not start.
    * if the action method returns a cancel result (e.g. `this.Cancel()`) the schema will fail to create and the server will not start.

### Example: @deprecated

The @deprecated directive is a built in directive provided by graphql to indication deprecation on a field definition or enum value. Below is the code for its implementation.

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

* Targets a FIELD_DEFINITION or ENUM_VALUE.
* Marks the field or enum value as deprecated and attaches the provided deprecation reason
* The directive is executed once per field and enum value its applied to when the schema is created.

### Applying Type System Directives

#### Using the `[ApplyDirective]` attribute

If you have access to the source code of a given type and want to apply a directive to it directly use the `[ApplyDirective]` attribute:

<div class="sideBySideCode hljs">
<div>

```csharp
// Person.cs
public class Person 
{
    [ApplyDirective(typeof(ToUpperDirective))]
    public string Name{ get; set; }
}
```

</div>
<div>

```javascript
// GraphQL Type Definition Equivilant
type Person  {
  name: String @toUpper
}
```

</div>
</div>
<br/>
<br/>
If different schemas on your server will use different implementations of the directive you can also specify the directive by name. This name is case sensitive and must match the name of the registered directive in the target schema.


<div class="sideBySideCode hljs">
<div>

```csharp
// Person.cs
[ApplyDirective("monitor")]
public class Person 
{
    public string Name{ get; set; }
}
```

</div>
<div>

```javascript
// GraphQL Type Definition Equivilant
type Person @monitor  {
  name: String
}
```

</div>
</div>

<br/>
<br/>
**Adding Arguments with [ApplyDirective]**

Arguments added to the apply directive attribute will be passed to the directive in the order they are encountered. The supplied values must be coercable into the expected data types for an input parameters.

<div class="sideBySideCode hljs">
<div>

```csharp
// Person.cs
public class Person 
{
    [ApplyDirective(
        "deprecated", 
        "Names don't matter")]
    public string Name{ get; set; }
}
```

</div>
<div>

```javascript
// GraphQL Type Definition Equivilant
type Person  {
  name: String @deprecated("Names don't matter")
}
```

</div>
</div>

<br/>

#### Using Schema Options

Alternatively, instead of using attributes to apply directives you can apply directives during schema configuration:

<div class="sideBySideCode hljs">
<div>

```csharp
// startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // other code ommited for brevity

    services.AddGraphQL(options =>
    {
        options.AddGraphType<Person>();

        // mark Person.Name as deprecated
        options.ApplyDirective("monitor")
            .ToItems(schemaItem => 
                schemaItem.IsObjectGraphType<Person>());
    }
}
```

</div>
<div>

```javascript
// GraphQL Type Definition Equivilant
type Person  @monitor {
  name: String
}
```

</div>
</div>

<br/>

> The `ToItems` filter can be invoked multiple times. A schema item must match all filter criteria in order for the directive to be applied. 

> Type system directives are applied in the order of declaration with the `[ApplyDirective]` attributes taking precedence over the `.ApplyDirective()` method.

**Adding arguments via .ApplyDirective()**

Adding Arguments via schema options is a lot more flexible than via the apply directive attribute. Use the `.WithArguments` method to supply either a static set of arguments for all matched schema items
or a `Func<ISchemaItem, object[]>` that returns a collection of any parameters you want on a per item basis.


<div class="sideBySideCode hljs">
<div>

```csharp
// startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // other code ommited for brevity

    services.AddGraphQL(options =>
    {
        options.AddGraphType<Person>();
        options.ApplyDirective("deprecated")
            .WithArguments("Names don't matter")
            .ToItems(schemaItem => 
                schemaItem.IsGraphField<Person>("name"));
    }
}
```


</div>
<div>

```javascript
// GraphQL Type Definition Equivilant
type Person  {
  name: String @deprecated("Names don't matter")
}
```

</div>
</div>


<br/>

### Repeatable Directives

GraphQL ASP.NET supports repeatable type system directives. Sometimes it can be helpful to apply your directive to an schema item more than once, especially if you would like to supply different parameters on each application.

Add the `[Repeatable]` attribute to the directive definition and you can the apply it multiple times using the standard methods. GraphQL tools that support this new syntax 
will be able to properly interprete your schema.

```csharp    
    // apply repeatable attribute
    [Repeatable]
    public sealed class ScanItemDirective : GraphDirective
    {
        [DirectiveLocations(DirectiveLocation.OBJECT)]
        public IGraphActionResult Execute(string scanType)
        { /* ... */}
    }

    // Option 1: Apply the directive to the class directly
    [ApplyDirective("@scanItem", "medium")]
    [ApplyDirective("@scanItem", "high")]
    public class Person
    {
    }

    // Option 2: Apply the directive at startup
    services.AddGraphQL(o => {
        // ...
        o.ApplyDirective("@scanItem")
            .WithArguments("medium")
            .ToItems(item => item.IsObjectGraphType<Person>());
        o.ApplyDirective("@scanItem")
            .WithArguments("high")
            .ToItems(item => item.IsObjectGraphType<Person>());
    });
```

> Order matters. The repeated directives will be executed in the order they are encountered with those applied via attribution taking precedence.


## Directives as Services
Directives are invoked as services through your DI container when they are executed.  When you add types to your schema during its initial configuration, GraphQL ASP.NET will automatically register any directives it finds attached to your entities as services in your `IServiceCollection` instance. However, there are times when it cannot do this, such as when you apply a directive by its string declared name. These late-bound directives may still be discoverable later and graphql will attempt to add them to your schema whenever it can.  However, it may do this after the opportunity to register them with the DI container has passed.

When this occurs, if your directive contains a public, parameterless constructor graphql will still instantiate and use your directive as normal. If the directive contains dependencies in the constructor that it can't resolve, execution of that directive will fail and an exception will be thrown. To be safe, make sure to add any directives you may use to your schema during the `.AddGraphQL()` configuration method.  Directives are directly discoverable and will be included via the `options.AddAssembly()` helper method as well.

The benefit of ensuring your directives are part of your `IServiceCollection` should be apparent:
*  The directive instance will obey lifetime scopes (e.g. transient, scoped, singleton).
*  The directive can be instantiated with any dependencies or services you wish; making for a much richer experience.

## Directive Security
Directives are not considered a layer of security by themselves. Instead, they are invoked within the security context of their applied target:

* **Execution Directives** - Execute in the same context as the field to which they are applied. If the requestor can resolve the field, they can also execute the directives attached to that field.

* **Type System Directives** - Are implicitly trusted and executed without a `ClaimsPrincipal` while the schema is being built. No additional security is applied to type system directives.

> WARNING: Only use type system directives that you trust. They will always be executed when applied to one or more schema items.

## Understanding the Type System
GraphQL ASP.NET builds your schema and all of its types from your controllers and objects. In general, this is done behind the scenes and you do not need to interact with it. However, when applying type system directives you are affecting the final generated schema at run time and need to understand the various parts of it. If you have a question don't be afraid to ask on [github](https://github.com/graphql-aspnet/graphql-aspnet). 

**UML Diagrams**

These [uml diagrams](../assets/2022-05-graphql-aspnet-type-system-interface-diagrams.pdf) detail the major interfaces and their most useful properties of the type system. However,
these diagrams are not exaustive. Look at the [source code](https://github.com/graphql-aspnet/graphql-aspnet/tree/master/src/graphql-aspnet/Interfaces/TypeSystem) for the full definitions.

**Helpful Extensions**

There are a robust set of of built in extensions for `ISchemaItem` that can help you filter your data when applying directives. See the [full source code](https://github.com/graphql-aspnet/graphql-aspnet/tree/master/src/graphql-aspnet/Configuration/SchemaItemExtensions.cs) for details.

## Demo Project
See the [Demo Projects](../reference/demo-projects.md) page for a demonstration on creating a type system directive for extending a field resolver and an execution directives
 that manipulates a string field result at runtime.