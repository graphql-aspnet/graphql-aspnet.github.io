---
id: code-examples
title: Code Examples
sidebar_label: Code Examples
sidebar_position: 2
---

This page shows a quick introduction to some common scenarios and the C# code to support. 


## A Basic Controller

A simple controller to return data based on the input of an `Enum`.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


```csharp title="HeroController.cs"
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

```graphql title="GraphQL Query"
query {
    hero(episode: EMPIRE) {
        name
        homePlanet
    }
}
```

```js title="JSON Result" 
{
    "data" : {
        "hero": {
            "name" : "Han Solo",
            "homePlanet" : "Corellia"
        }
    }
}
```

:::info Did you notice?
In the query the hero field is `camelCased` but in C# the method is `ProperCased`? GraphQL ASP.NET automatically translates your names appropriately to standard GraphQL conventions. The same goes for your graph type names, enum values etc.

You can implement your own `GraphNameFormatter` and alter the name formats for each of your registered schemas.
:::

## Using an Interface

If your models share a common interface just return it from a controller action and GraphQL ASP.NET takes care of the rest. You can always use a fragment to specify fields of specific object types.


```csharp title="HeroController.cs"
public class HeroController : GraphController
{
    [QueryRoot(typeof(Droid), typeof(Human))]
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
```

```graphql title="GraphQL Query"
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

## No Boilerplate Field Paths

We've used `[QueryRoot]` so far to force a controller action to be a root field on the `query` type. But we can use an approximation of Web API's url templates to create any combination of nested fields needed. When you have 50 controllers with 20-40 actions each, organizing your object hierarchy becomes trivial.


```csharp title="RebelAllianceController.cs"
[GraphRoute("rebels")]
public class RebelAllianceController : GraphController
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

```graphql title="Sample Query"
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


## Dependency Injection

At runtime,  GraphQL invokes your graph controllers and injected services with the same dependency scope as the original HTTP Request. Add a service to a controller's constructor and it will be automatically resolved with its configured scope.

```cs title="PersonsController.cs"
public class PersonsController : GraphController
{
    private IPersonService _personService;
    public PersonsController(IPersonService service)
    {
        _personService = service;
    }

    [QueryRoot("person")]
    public async Task<Human> RetrievePerson(int id)
    {
        return await _personService.RetrievePerson(id);
    }
}
```

```graphql title="Query"
query {
    person(id: 1000) {
        id
        name
        homePlanet
    }
}
```


:::info Did You Notice? 
We switched to an asynchronous method with `Task<Human>`. GraphQL ASP.NET follows your lead and will execute your actions asynchronously or synchronously as needed.
:::

## Authorization

Add the `[Authorize]` attribute and you're done. GraphQL ASP.NET uses the same authorization pipeline as your application.


```csharp title="PersonsController.cs"
public class PersonsController : GraphController
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

```graphql title="Sample Query"
query {
    self {
        id
        name
        title
    }
}
```

#### Notes on Authorization

-   Your controller actions have full access to the same `ClaimsPrincipal` that you get with `this.User` on an web api controller. In fact, its the same object reference.
-   Out of the box, the library performs authorization on a "per field" basis. This includes POCO object properties! If you have a piece of sensitive data attached to a property, say Birthday, on your Person model, then implement your own `IAuthorizeData` attribute and apply it to the property. Unauthorized user's won't be able to query for that field, even if they can access the controller that produced the object its attached or every other field on the object.
-   GraphQL obeys layered authorization requirements as well. Place an authorization attribute at the controller level and it'll be checked before any method level requirements.

## Mutations & Model State

GraphQL ASP.NET will automatically enforce the query specification rules for you, but that doesn't help for business-level requirements like string length or integer ranges. For that, it uses the familiar goodness of Validation Attributes (e.g. `[StringLength]`, `[Range]` etc.).


```csharp title="PersonsController.cs"
public class PersonsController : GraphController
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
```

```csharp title="Human.cs"
public class Human
{
    public int? Id{ get; set; }

    [StringLength(35)]
    public string Name { get; set; }

    public string HomePlanet { get; set; }
}
```

```graphql title="Sample Query"
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

:::info Did You Notice?
We used `Human` as an input argument and as the returned data object. GraphQL ASP.NET will automatically generate the appropriate graph types for `OBJECT` and `INPUT_OBJECT` and add them to your schema when needed.
:::


## Action Results

Just as Web API makes use of `IActionResult` to perform post processing on the result of a controller method, GraphQL ASP.NET makes use of `IGraphActionResult`.

Reusing the previous example, here we make use of `this.BadRequest()` to automatically generate an appropriate error message in the response when model validation fails. Field origin information including the path array and line/column number of the original query are wired up automatically.

```csharp
// C# Controller
public class PersonsController : GraphController
{
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

:::note GraphQL is not Rest
 Unlike WebAPI, `BadRequest()` doesn't generate a HTTP Status 400 error for the request. If there are multiple controller methods being resolved GraphQL can still generate a partial response and render data for other parts of the query. Most "error" related action results add a standard error message to the result with different reason codes.
:::