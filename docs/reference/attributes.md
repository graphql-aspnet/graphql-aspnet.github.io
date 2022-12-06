---
id: attributes
title: Attributes
sidebar_label: Attributes
---

This document contains an alphabetical reference of each of the class, property and method attributes used by GraphQL ASP.NET.

## ApplyDirective

Declares that a given type system directive should be applied to the target schema item (an object, a field, an enum etc.). See the page on [type system directives](../advanced/directives.md#type-system-directives) for complete details on how to build your own. Directives can be applied by type, by name and with or without parameters.


```csharp
public class Person 
{
    // apply by registered system type
    [ApplyDirective(typeof(DeprecatedDirective))]
    public string FirstName{ get; set; }

     // apply by name, also with a reason parameter
    [ApplyDirective("deprecated", "Last Name is deprecated")]
    public string LastName{ get; set; }
}
```

## BatchTypeExtension

Declares a controller action method as a field on another graph type rather than a query or mutation action. All source items needing this field resolved will be resolved in a single field request.
The batch method must declare a parameter of `IEnumerable<TypeToExtend>`.

#### `[BatchTypeExtension(typeToExtend, fieldName)]`

-   `typeToExtend` - The graph type to which this field will be added
-   `fieldName` - The name to give to this field.

Declares a batch type extension with the given field name. The return type of this field will be taken from the return type of the method. The return type of the method must be `IDictionary<TypeToExtend, ReturnFieldType>`

```csharp
// C# Controller
public class HeroController : GraphController
{
    [BatchTypeExtension(typeof(Human), "droids")]
    public IDictionary<Human, IEnumerable<Droid>> Hero(IEnumerable<Human> humans)
    {
        //....
    }
}
```

#### `[BatchTypeExtension(typeToExtend, fieldName, returnType)]`

-   `typeToExtend` - The graph type to which this field will be added
-   `fieldName` - The name to give to this field.
-   `returnType` - The type of data returned from this field

Declares a batch type extension return type explicitly allowing use of `IGraphActionResult` and more importantly, `this.StartBatch()` for generating
a batch collection result.

```csharp
// C# Controller
public class HeroController : GraphController
{
    [BatchTypeExtension(typeof(Human), "droids", typeof(IEnumerable<Droid>))]
    public IGraphActionResult Hero(IEnumerable<Human> humans)
    {
        //....
    }
}
```

#### `[BatchTypeExtension(typeToExtend, fieldName, unionName, unionTypeA, unionTypeB, additionalUnionTypes)]`

-   `typeToExtend` - The graph type to which this field will be added
-   `fieldName` - The name to give to this field.
-   `unionName` - The name to give to the union in the object graph
-   `unionTypeA` - The first member type of the union (must be an object, not an interface)
-   `unionTypeB` - The second member type of the union (must be an object, not an interface)
-   `additionalUnionTypes` - N additional union types to declare as part of this union

Declares the batch type extension as returning a union rather than a single specific data type.

```csharp
// C# Controller
public class HeroController : GraphController
{
    [BatchTypeExtension(typeof(Human), "bestFriend", "DroidOrHuman", typeof(Droid), typeof(Human))]
    public IGraphActionResult Hero(IEnumerable<Human> humans)
    {
        //....
    }
}
```

## Deprecated

Indicates to any introspection queries that the field or action method is deprecated and due to be removed.

#### `[Deprecated]`

#### `[Deprecated(reasonText)]`

-   `reasonText` - The reason for the deprecation that is displayed in an introspection query.

```csharp
// C# Controller
public class CharacterController : GraphController
{
    [Query]
    [Deprecated("Use the field SuperHero, this field will be removed soon")]
    public IGraphActionResult Hero(Episode episode = Episode.EMPIRE)
    {
        //....
    }
}
```

## Description

Adds a human-readable description to any type, interface, field, parameter, enum value etc.

#### `[Description(text)]`

-   `text` - The text to display in an introspection query.

```csharp
// C# Controller
[Description("A field containing information related to the characters of Star Wars")]
public class CharacterController : GraphController
{
    [Query]
    [Description("The hero of a given Star Wars Episode (Default: EMPIRE)")]
    public IGraphActionResult Hero(Episode episode = Episode.EMPIRE)
    {
        //....
    }
}
```

## DirectiveLocations

A set of flags indicating where in a query document the given directive can be declared. Also serves to indicate which directive action 
method should be invoked for a particular location.

#### `[DirectiveLocations(directiveLocation)]`

```csharp    
    public sealed class AllowFragment : GraphDirective
    {
        [DirectiveLocations(ExecutableDirectiveLocation.FRAGMENT_SPREAD | ExecutableDirectiveLocation.INLINE_FRAGMENT)]
        public IGraphActionResult Execute([FromGraphQL("if")] bool ifArgument)
        {
            return ifArgument ? this.Ok() : this.Cancel();
        }
    }
```

## DirectiveInvocationPhase

A seldom used attribute to instruct the runtime as to when the directive should be invoked. By default all directives are set to be executable
during `SchemaGeneration` and `AfterFieldResolution` depending on the allowed target locations.

#### `[DirectiveInvocationPhase(phases)]`

-   `phases` - A bitwise set of `DirectiveInvocationPhase` values indicating when in the execution pipelines this directive should be invoked.

```csharp    
    [DirectiveInvocationPhase(DirectiveInvocationPhase.AfterFieldResolution)]
    public sealed class AllowFragment : GraphDirective
    {
        [DirectiveLocations(ExecutableDirectiveLocation.FIELD)]
        public IGraphActionResult Execute([FromGraphQL("if")] bool ifArgument)
        {
            return ifArgument ? this.Ok() : this.Cancel();
        }
    }
```

## FromGraphQL

Indicates additional or non-standard settings related to the method parameter its attached to. Can be used for controller action methods 
and directive action methods.

#### `[FromGraphQL(argumentName)]`

-   `argumentName`: The name of this parameter in the object graph

```csharp
// C# Controller
public class CharacterController : GraphController
{
    [Query]
    public IGraphActionResult Hero([FromGraphQL("id")] int heroId)
    {
        //....
    }
}
```

#### `[FromGraphQL(TypeExpression = "Type!")]`

-   `TypeExpression`: A custom type expression, in query syntax language, to declare explicit nullability and list rules for this parameter.

```csharp
// C# Controller
public class CharacterController : GraphController
{

    [Query]
    public IGraphActionResult Hero(
        [FromGraphQL(TypeExpression  = "Type!")] string heroId)
    {
        //....
    }
}
```

## GraphEnumValue

Acts to explicitly declare an enumeration value as being exposed on an enumeration graph type.

#### `[GraphEnumValue]`

#### `[GraphEnumValue(name)]`

-   `name`: the name to use in the object graph for this enum value.

```csharp
public enum Episode
{
    NewHope,
    Empire,

    [GraphEnumValue("Jedi")]
    ReturnOfTheJedi,
}
```

## GraphField

Acts to explicitly declare a method or property as being part of a graph type.

#### `[GraphField]`

#### `[GraphField(name)]`

-   `name` - The name of this field as it should appear in the object graph to be queried
```csharp
public class Human
{
    public int Id{get; set; }

    [GraphField("name")]
    public string FullName { get; set; }
}
```

#### `[GraphField(TypeExpression = "Type!")]`
-   `TypeExpression` - Define a custom type expression; useful in setting a normally optional input field (such as a string or other object) to being required. Supply the type expression as a valid graphql syntax type expression. 

```csharp
public class Human
{
    public int Id{get; set; }

    [GraphField(TypeExpression = "Type!")]
    public Employer Boss { get; set; }
}
```

## GraphRoot

Indicates that the controller should not attempt to register a virtual field for itself and that all methods should be extended off the their respective root types.

#### `[GraphRoot]`

<div class="sideBySideCode hljs">
<div>

```csharp
[GraphRoot]
public class HeroController : GraphController
{
    [Query]
    public Human Hero(Episode episode)
    {
        //..
    }
}
```

</div>
<div>

```js
# GraphQL Query
query {
    hero(episode: EMPIRE) {
        name
        homePlanet
    }
}
```

</div>
</div>

## GraphRoute

Indicates a field path in each root graph type where this controller should append its action methods.

#### [GraphRoute(template)]

-   `template` - A set of `/` separated path segments representing a nested set of fields where the controller should reside.
    -   The `"[controller]"` meta tag can be used and will be replaced by the controller name at runtime.

<div class="sideBySideCode hljs">
<div>

```csharp
[GraphRoute("starWars/characters")]
public class HeroController : GraphController
{
    [Query]
    public Human Hero(Episode episode)
    {
        //..
    }
}
```

</div>
<div>

```js
// GraphQL Query
query {
    starWars {
        characters {
            hero(episode: EMPIRE) {
                name
                homePlanet
            }
        }
    }
}
```

</div>
</div>

## GraphSkip

Indicates that the entity to which its attached should be skipped and not included in a schema. GraphSkip can be defined on any controller, method, property, interface, enum or enum value.

#### `[GraphSkip]`

```csharp
// C# Controller
public class CharacterController : GraphController
{
    [Query]
    [GraphSkip]
    public IGraphActionResult Hero([FromGraphQL("id")] int heroId)
    {
        // this method will not be included in the graph
    }
}
```

## GraphType

Indicates additional or non-standard settings for the the class, interface or enum to which its attached. Also indicates the item is explicitly declared as a graph type and should be included in a schema.

#### [GraphType(name)]

-   `name` : The name of graph type as it should appear in the object graph

#### [GraphType(name, inputName)]

-   `name` : The name of graph type as it should appear in the schema when used as an `OBJECT`
-   `inputName`: The name of the graph type in the schema when used as an `INPUT_OBJECT` 

```csharp
[GraphType("person", "personModel")]
public class Human
{
    public int Id{get; set; }
    public string FullName { get; set; }
}
```

## Mutation, MutationRoot, Query, QueryRoot

Controller action method attributes that indicate the method belongs to the specified operation type (query or mutation). When declared as "Root" (i.e. `QueryRoot`), it indicates that the action method should be declared directly on its operation graph type and not nested underneath a controller's virtual field.

> All 4 action method attributes have identical constructor options

#### [Query(template)]

-   `template` - The field path template to use for this method.

```csharp
public class CharacterController : GraphController
{
    [Query("hero")]
    public Human RetrieveTheHero(Episode episode)
    {
        // ....
    }
}
```

#### [Query(returnType, params otherTypes)]

-   `returnType`: the expected return type of this field.
    -   must be used when this field returns an `IGraphActionResult`
-   `otherTypes`: additional possible types this field could return.
    -   Can be used to declare possible concrete types when this field returns an interface.

```csharp
public class CharacterController : GraphController
{
    [Query(typeof(Droid), typeof(Human))]
    public ICharacter Hero(Episode episode)
    {
        // ....
    }
}
```

#### [Query(template, returnType)]

-   `template` - The field path template to use for this method.
-   `returnType`: the expected return type of this field.
    -   must be used when this field returns an `IGraphActionResult`

```csharp
public class CharacterController : GraphController
{
    [Query("hero", typeof(Human))]
    public IGraphActionResult RetrieveTheHero(Episode episode)
    {
        // ....
    }
}
```

#### `[Query(template, unionName, unionTypeA, unionTypeB, additionalUnionTypes)]`

-   `template` - The field path template to use for this method.
-   `unionName` - The name to give to the union in the object graph
-   `unionTypeA` - The first member type of the union (must be an object, not an interface)
-   `unionTypeB` - The second member type of the union (must be an object, not an interface)
-   `additionalUnionTypes` - N additional union types to declare as part of this union

```csharp
public class CharacterController : GraphController
{
    [Query("hero", "DroidOrHuman", typeof(Droid), typeof(Human))]
    public IGraphActionResult RetrieveCharacter(int id)
    {
        // ....
    }
}
```

** Additional Properties **

-   `TypeExpression`: Define a custom type expression; useful in setting a normally optional field (such as a string or other object) to being required. Supply the type expression as a valid graphql syntax type expression.

```csharp
public class CharacterController : GraphController
{
    // declare that this field must return a value (a null human is not allowed)
    [Query("hero", typeof(Human), TypeExpression = "Type!")]
    public IGraphActionResult RetrieveTheHero(Episode episode)
    {
        // ....
    }
}
```

## TypeExtension

Declares a controller action method as a field on another graph type rather than a query or mutation action.

#### `[TypeExtension(typeToExtend, fieldName)]`

-   `typeToExtend` - The graph type to which this field will be added
-   `fieldName` - The name to give to this field.

Declares a type extension with the given field name. The return type of this field will be taken from the return type of the method.

```csharp
// C# Controller
public class DroidController : GraphController
{
    [TypeExtension(typeof(Droid), "ownedBy")]
    public Human RetrieveDroidOwner(Droid droid)
    {
        //....
    }
}
```

#### `[TypeExtension(typeToExtend, fieldName, returnType)]`

-   `typeToExtend` - The graph type to which this field will be added
-   `fieldName` - The name to give to this field.
-   `returnType` - The type of data returned from this field

Declares a type extension with an explicit return type. useful when returning `IGraphActionResult`.

```csharp
// C# Controller
public class HeroController : GraphController
{
    [TypeExtension(typeof(Human), "ownedBy", typeof(Droid))]
    public IGraphActionResult RetrieveDroidOwner(Droid droid)
    {
        //....
    }
}
```

#### `[TypeExtension(typeToExtend, fieldName, unionName, unionTypeA, unionTypeB, additionalUnionTypes)]`

-   `typeToExtend` - The graph type to which this field will be added
-   `fieldName` - The name to give to this field.
-   `unionName` - The name to give to the union in the object graph
-   `unionTypeA` - The first member type of the union (must be an object, not an interface)
-   `unionTypeB` - The second member type of the union (must be an object, not an interface)
-   `additionalUnionTypes` - N additional union types to declare as part of this union

Declares the type extension as returning a union rather than a specific data type.

```csharp
// C# Controller
public class HeroController : GraphController
{
    [TypeExtension(typeof(Droid), "bestFriend", "DroidOrHuman", typeof(Droid), typeof(Human))]
    public IGraphActionResult RetrieveDroidsBestFriend(Droid droid)
    {
        //....
    }
}
```
