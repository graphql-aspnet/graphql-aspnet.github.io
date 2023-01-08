---
id: code-examples
title: Code Examples
sidebar_label: Code Examples
sidebar_position: 2
---

This page shows a quick introduction to some common scenarios and the C# code to support. 

## Configuring Services 

The library uses a standard "Add & Use" pattern for configuring services with your application. A route is added to the ASP.NET request pipeline when you call `.UseGraphQL()`. Place it as appropriate amongst any other configurations, routes, authorization etc. when you build your pipeline.

```csharp title="Program.cs"
var builder = WebApplication.CreateBuilder(args);

// Add graphql services to the DI container
// highlight-next-line
builder.Services.AddGraphQL();

var app = builder.Build();

// Configure the HTTP request pipeline
// highlight-next-line
app.UseGraphQL();
app.Run();
```
> _The configuration steps may vary slightly when using a Startup.cs file; typical for .NET 5 or earlier _


## A Basic Controller

A simple controller to return data based on a string value.

```csharp title="HeroController.cs"
public class HeroController : GraphController
{
    [QueryRoot]
    public Human Hero(string episode)
    {
        if(episode == "Empire")
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
    hero(episode: "Empire") {
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
In the query the hero field is `camelCased` but in C# the method is `ProperCased`? Field names are automatically translated to standard GraphQL conventions. The same goes for your graph type names, enum values etc.

You can also implement your own `GraphNameFormatter` and alter the name formats for each of your registered schemas.
:::

## Using an Interface

If your models share a common interface just return it from a controller action and the library will take care of the rest. 

> Don't forget to declare the object types that implement your interface or graphql won't know what resolvers to invoke at runtime. In this example, we've declared them inline but you can easily add them at startup to reduce the noise.

```csharp title="HeroController.cs"
public class HeroController : GraphController
{
    // highlight-next-line
    [QueryRoot(typeof(Droid), typeof(Human))]
    // highlight-next-line
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

## Field Paths

We've used `[QueryRoot]` so far to force a controller action to be a root field on the `query` type. But we can use an approximation of Web API's url templates to create any combination of nested fields needed. When you have 50 controllers with 20-40 actions each, organizing your object hierarchy becomes trivial.


```csharp title="RebelAllianceController.cs"
// highlight-next-line
[GraphRoute("rebels")]
public class RebelAllianceController : GraphController
{
    // highlight-next-line
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

    // highlight-next-line
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

#### ✅ Notes on Authorization

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
        // highlight-start
        if(!this.ModelState.IsValid)
            return null;
        // highlight-end

        return await _service.CreatePerson(model);
    }
}
```

```csharp title="Human.cs"
public class Human
{
    public int? Id{ get; set; }

    // highlight-next-line
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
We used `Human` as an input argument **and** as the returned data object. The library will automatically generate the appropriate graph types for `OBJECT` and `INPUT_OBJECT` and add them to your schema when needed.
:::


## Action Results

Just as Web API makes use of `IActionResult` to perform post processing on the result of a controller method, GraphQL ASP.NET makes use of `IGraphActionResult`.

Reusing the previous example, here we make use of `this.BadRequest()` to automatically generate an appropriate error message in the response when model validation fails. Field origin information including the path array and line/column number of the original query are wired up automatically.

```csharp
// C# Controller
public class PersonsController : GraphController
{
    [MutationRoot("joinTheResistance", typeof(Human))]
    public async IGraphActionResult CreatePerson(Human model)
    {
        // ***************************
        // Check if the model passes validation
        // requirements before using it
        // ***************************
        if(!this.ModelState.IsValid)
        // highlight-next-line
            return this.BadRequest(this.ModelState);

        var result = await _service.CreatePerson(model);
        return result != null
        // highlight-start
            ? this.Ok(result)
            : this.Error("Woops Something broke");
        // highlight-end
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