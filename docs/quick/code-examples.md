---
id: code-examples
title: Code Examples
sidebar_label: Code Examples
---

This page shows a quick introduction to sample graphql queries and the C# code to support. If you need a more complete walk through the links to the left have every thing you need.

These are a great place to start:

<span style="font-size:20px;vertical-align: center;">&#x1F517;</span> [Why Choose GraphQL ASP.NET](../introduction/made-for-aspnet-developers)

<span style="font-size:20px;vertical-align: center;">&#x1F517;</span> [Start a new GraphQL ASP.NET Project](./quick-start)

## A Basic Controller

A simple controller to return data based on the input of an `Enum`.

<div class="sideBySideCode hljs">
<div>

```csharp
// C# Controller
public class HeroController : GraphController
{
    [QueryRoot]
    public Human Hero(Episode episode)
    {
        if(episode == Episode.Empire)
        {
            return new Human()
            {
                Id = 1000,
                Name = "Han Solo",
                HomePlanet = "Corellia",
            }
        }
        else
        {
            return new Human()
            {
                Id = 1001,
                Name = "Luke SkyWalker",
                HomePlanet = "Tatooine",
            }
        }
    }
}
```

</div>
<div>

```js
// GraphQL Query
query {
    hero(episode: EMPIRE) {
        name
        homePlanet
    }
}
```

```js
// response
{
    "data" : {
        "hero": {
            "name" : "Han Solo",
            "homePlanet" : "Corellia"
        }
    }
}
```

</div>
</div>

**Did you notice** that in the query the hero field is `camelCased` but in C# the method is `ProperCased`? GraphQL ASP.NET automatically translates your names appropriately to standard GraphQL conventions. The same goes for your graph type names, enum values etc.

You can implement your own `GraphNameFormatter` and alter the name formats across the board for a single schema or all of them. GraphQL ASP.NET supports multiple schemas running on the same server out of the box.

## Using an Interface

If your models share a common interface just return it from a controller action and GraphQL ASP.NET takes care of the rest. You can always use a fragment to specify fields of specific object types.

<div class="sideBySideCode hljs">
<div>

```csharp
// C# Controller
public class HeroController : GraphController
{
    [QueryRoot]
    public ICharacter Hero(Episode episode)
    {
        if(episode == Episode.Empire)
        {
            return new Human()
            {
                Id = 1000,
                Name = "Han Solo",
                HomePlanet = "Corellia",
            }
        }
        else
        {
            return new Droid()
            {
                Id = 2000,
                Name = "R2R2",
                Type = DroidType.AstroMech
            }
        }
    }
}

// Properties omitted for brevity
public interface ICharacter
{/*...*/}

public class Human : ICharacter
{/*...*/}

public class Droid : ICharacter
{/*...*/}
```

</div>
<div>

```javascript
// GraphQL Query
query {
    hero(episode: JEDI) {
        id
        name

        ... on Human {
            homePlanet
        }

        ... on Droid {
            type
        }
    }
}
```

</div>
</div>

## No Boilerplate Field Paths

We've used `[QueryRoot]` so far to force a controller action to be a root field on the `query` type. But we can use an approximation of MVC's url fragments to create any combination of nested fields needed. When you have 50 controllers with 20-40 actions each, organizing your object hierarchy becomes trivial.

<div class="sideBySideCode hljs">
<div>

```csharp
// C# Controller
[GraphRoute("rebels")]
public class RebelAllianceController
        : GraphController
{
    [Query("directory/hero")]
    public Human RetrieveHero(Episode episode)
    {
        // Wedge is the true hero
        return new Human()
        {
            Id = 1003,
            Name = "Wedge Antilles",
            HomePlanet = "Corellia",
        };
    }
}
```

</div>
<div>

```javascript
// GraphQL Query
query {
    rebels {
        directory {
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
<br/>

## Dependency Injection

At runtime,  GraphQL invokes your graph controllers and injected services with the same dependency scope as the original HTTP Request. Add a service to a controller's constructor and it will be automatically resolved with its configured scope.

<div class="sideBySideCode hljs">
<div>

```csharp
// C# Controller
public class PersonsController
        : GraphController
{
    private IPersonService _personService;
    public PersonsController(IPersonService service)
    {
        _personService = service;
    }

    // we can also set a different C#
    // method name vs. the graph field name.
    [QueryRoot("person")]
    public async Task<Human> RetrievePerson(int id)
    {
        return await _personService.RetrievePerson(id);
    }
}
```

</div>
<div>

```javascript
// GraphQL Query
query {
    person(id: 1000) {
        id
        name
        homePlanet
    }
}
```

</div>
</div>

**Did You Notice** we switched to an asynchronous method with `Task<Human>`. GraphQL ASP.NET follows your lead and will execute your actions asynchronously or synchronously as needed.

## Authorization

Add the `[Authorize]` attribute and you're done. GraphQL ASP.NET uses the same authorization pipeline as your application.

<div class="sideBySideCode hljs">
<div>

```csharp
// C# Controller
public class PersonsController
        : GraphController
{
    private IPersonService _personService;
    public PersonsController(IPersonService service)
    {
        _personService = service;
    }

    [Authorize]
    [QueryRoot("self")]
    public async Task<Employee> RetrievePerson()
    {
        return await _personService.RetrievePerson(this.User.Name);
    }
}
```

</div>
<div>

```javascript
// GraphQL Query
query {
    self {
        id
        name
        title
    }
}
```

</div>
</div>

#### Notes on Authorization

-   Your controller actions have full access to the same `ClaimsPrincipal` that you get with `this.User` on an MVC controller. In fact, its the same object reference.
-   Out of the box, GraphQL performs authorization on a "per field" basis. This includes POCO object properties! If you have a piece of sensitive data attached to a property, say Birthday, on your Person model, then implement your own `IAuthorizeData` attribute and apply it to the property. Unauthorized user's won't be able to query for that field, even if they can access the controller that produced the object its attached or every other field on the object.
-   GraphQL obeys layered authorization requirements as well. Place an authorization attribute at the controller level and it'll be checked before any method level requirements.

## Updates & Model State

GraphQL ASP.NET will automatically enforce the query specification rules for you, but that doesn't help for business-level requirements like string length or integer ranges. For that, it uses the familiar goodness of `ValidationAttribute` (meaning everything under `System.ComponentModel.DataAnnotations`).

<div class="sideBySideCode hljs">
<div>

```csharp
// C# Controller
public class PersonsController
        : GraphController
{
    /* constructor hidden for brevity */

    [MutationRoot("joinTheResistance")]
    public async Task<Human> CreatePerson(Human model)
    {
        // ***************************
        // Check if the model passed validation
        // requirements before using it
        // ***************************
        if(!this.ModelState.IsValid)
            return null;

        return await _service.CreatePerson(model);
    }
}

public class Human
{
    public int? Id{ get; set; }

    [StringLength(35)]
    public string Name { get; set; }

    public string HomePlanet { get; set; }
}
```

</div>
<div>

```javascript
// GraphQL Query
mutation {
    joinTheResistance(
        newPerson: {
            name: "Lando Calrissian"
            homePlanet: "Bespin" }) {
        id
        name
        homePlanet
    }
}
```

</div>
</div>

**Did You Notice** that we used `Human` as an input argument and the returned data object. GraphQL ASP.NET will automatically generate the appropriate graph types for `OBJECT` and `INPUT_OBJECT` and add them to your schema when needed.

## Custom Action Results

Just as ASP.NET MVC makes use of `IActionResult` to perform post processing on the result of a controller method, GraphQL ASP.NET makes use of `IGraphActionResult`.

Reusing the previous example, here we make use of `BadRequest()` to automatically generate an appropriate error message inside the response payload's `errors` property when model validation fails. Field origin information including the path array and line/column number of the original query are wired up automatically.


```csharp
// C# Controller
public class PersonsController : GraphController
{
    /* constructor hidden for brevity */

    [MutationRoot("joinTheResistance")]
    public async IGraphActionResult CreatePerson(Human model)
    {
        // ***************************
        // Check if the model passes validation
        // requirements before using it
        // ***************************
        if(!this.ModelState.IsValid)
            return this.BadRequest(this.ModelState);

        var result = await _service.CreatePerson(model);
        return result != null
            ? this.Ok(result)
            : this.Error("Woops Something broke");
    }
}

public class Human
{
    public int? Id{ get; set; }

    [StringLength(35)]
    public string Name { get; set; }

    public string HomePlanet { get; set; }
}
```
