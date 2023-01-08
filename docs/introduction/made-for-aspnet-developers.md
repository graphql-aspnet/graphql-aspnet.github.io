---
id: made-for-aspnet-developers
title: Made for ASP.NET Developers
sidebar_label: Made for ASP.NET Developers
sidebar_position: 1
---

This library is designed by people who use [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet) in their day to day activities and is built for similar minded developers. When you first started digging in to GraphQL you most likely came across the plethora of [articles](https://www.graphqlweekly.com/), [documents](https://en.wikipedia.org/wiki/GraphQL), [tutorials](https://www.howtographql.com/) and [groups](https://www.apollographql.com/) centered around JavaScript. JavaScript certainly has the highest adoption rate and with the tools provided by [Apollo](https://www.apollographql.com/) its no surprise. Its amazing how well those tools fit in with the existing knowledge and coding paradigms of JavaScript developers on both sides of the fence (be that front end or back end).

We believe that tooling and workflow is everything when it comes to picking up a technology. Its much more difficult for you (or your team) to adopt something new if there is no connection to what you already know. Migrating your personal development efforts or an entire team from .NET to NodeJS to leverage Apollo Server, for instance, is hard. The learning curve and even the monetary cost of bringing a team up to speed is high. But if you can leverage existing skills you reduce that cost significantly.

> GraphQL ASP.NET aims to reuse your existing knowledge of ASP.NET

This is a core, guiding principle for the development of this library. We aim to reuse what you know. Or if you are still learning, make what you learn transferable to other .NET technologies. When coming from a .NET background, being able to reason about your graph queries in terms of `Controllers` and `Actions` eases the cognitive load as you transition to thinking in terms of Fields and object graphs.

Using familiar concepts like _Binding Models_ and _View Models_; commonly used attributes like `[Authorize]`, `[Required]`, `[StringLength]`; modern ASP.NET's abstraction concepts like `IServiceCollection` and `ILogger` all play a part in hopes of giving you a familiar programming model that you can start using immediately without reinventing too many wheels.

Take, for instance, this controller and a sample query that would call it. Can you tell what it does? If you are familiar with Web API then the answer is probably yes!

```cs title="PersonController.cs"
public class PersonController: GraphController
{
    private IPersonService _service;
    public PersonController(IPersonService personService)
    {
        _service = personService;
    }

    [QueryRoot("person")]
    public async Task<Person> RetrievePerson(int id)
    {
        return await _service.FetchPerson(id);
    }
}
```

```graphql title="Sample Query"
query {
    person(id: 5){
        firstName
        lastName
        title
    }
}
```

Another consideration when trying to implement GraphQL in .NET is the amount of boiler plate code required. Since C# is a strongly typed language the volume of additional coding required to generate an object graph tends to be high, especially in larger graphs. Many libraries take the approach of ultimate flexibility, requiring you to completely code your object graph, and all the fields that can be queried, and individually map all model properties and resolver methods manually. 

To address this, GraphQL ASP.NET has adopted an opinionated approach to its implementation. It makes some minor assumptions about how you will deliver your data in exchange for some much needed code generation and specification support. If the code in the controller above makes sense and feels natural to you; then this library might be worth a look. In terms of GraphQL, this single controller will:

-   Generate a fully qualified schema definition
-   Provide introspection support
-   Generate all required graph types (there are 17 in this example)

The library will automatically wire up your graph controllers and scan your model objects. There is no additional, required configuration. When you add a new controller, new actions or new model properties they are automatically injected everywhere that object is used.

Are you working on a large project that has shared assemblies between services? No problem, you can direct GraphQL on where to look for controllers and model objects or even be explicit in what you want it to consume...down to the individual property level.

:::note You're in control
  Out of the box the library tries to pick the route of least resistance, but there are many ways to control what classes, enums etc. are included (or excluded) in your object graph. 
:::

## Plays Nice with Web API Controllers, Razor Views and Razor Pages

This library is an extension to the standard ASP.NET pipeline, not a replacement. At its core, a graphql query is just another GET or POST route on your application. At startup the library registers a middleware component to handle requests using `appBuilder.Map()`.

Also, if you are integrating into an existing project, you'll find a lot of your utility code should work out of the box which should ease your migration. Any existing services, custom authorization and model validation attributes etc. can be directly attached to graph action methods and input models. You might even find that most of your model objects work with little to no changes as well. 

## Scoped Dependency Injection

Services are injected into graph controllers in the same manner as ASP.NET controllers and with the same scope resolutions.

## User Authorization

The user model is exactly the same. In fact, the `ClaimsPrincipal` passed to `this.User` on a Web API controller is the same instance used to validate any `[Authorize]` attributes on your graph controller actions. Internally, it uses the same `IAuthorizationService` that gets added when you call `.AddAuthorization()` during startup.

## Custom Action Results

Many teams define custom action results beyond `this.Ok()` and `this.BadRequest()` for their REST queries to standardize how they will respond to requests on their Web API controllers to provide consistent messaging, perform some sort of logging or create a common return payload. GraphQL ASP.NET supports this model as well. Out of the box you get support for many of the relevant action results around returning data, indicating an error or denying access, but you can implement your own `IGraphActionResult` to standardize how a given result is converted into a response object and used by the runtime. This includes control to invalidate the field, inject customized error messages or cancel the field request altogether.

_Side Note:_ Not all action results make sense in GraphQL. For instance, you won't find a way to download a file or indicate a 204 (no content) result. A GraphQL field must always return a piece of data (even if its null). Since the `IGraphActionResult` object is only a small piece in an entire query of many fields, its scope of abilities is paired to match.
