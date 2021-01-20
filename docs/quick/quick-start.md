---
id: quick-start
title: Quick Start Guide
sidebar_label: Quick Start
---

This guide will help you get a GraphQL project up and running so you can start experimenting. We'll cover the following:

1.  Create a new ASP.NET MVC Project.
2.  Add the GraphQL ASP.NET Nuget Package.
3.  Write some code to create a `Person` model object and a `PersonController` to deliver it.
4.  Register GraphQL ASP.NET in `Startup.cs`.

This guide uses [Visual Studio 2019](https://visualstudio.microsoft.com/) but the steps are similar for other IDEs, including JetBrains [Rider](https://www.jetbrains.com/rider/).

The goal is to be able to open any GraphQL query tool such as [GraphiQL](https://electronjs.org/apps/graphiql) or [Altair](https://altair.sirmuel.design/), point it at our server and execute this query:

```javascript
query {
    person(id: 18) {
        id
        firstName
        lastName
        forceUser
    }
}
```

To generate this response:

```javascript
{
    "data": {
        "person": {
            "id": 18,
            "firstName": "Luke",
            "lastName": "Skywalker",
            "forceUser": true
        }
    }
}
```

---

## Step 1: Create a new ASP.NET MVC Project

From the Visual Studio 2019 start screen:

1. Choose `Create new Project`
2. Select `ASP.NET Core Web Application`.
    - Enter your project's name and choose a location.
3. Choose `API` when prompted to select a project type.
    - GraphQL ASP.NET has no view layer so we can forgo including Razor and other related options.

![Create an API Project](assets/quick-start-1-choose-api.png)

## Step 2: Add the GraphQL ASP.NET Nuget Package

1. Open the package manager `View -> Other Windows -> Package Manager Console`
2. Enter the command `Install-Package GraphQL.AspNet -AllowPrereleaseVersions`
    - GraphQL ASP.NET has no external dependencies other than standard Microsoft packages. Follow the prompts to allow these packages to be installed for the project.
> Be sure to include the `-AllowPrereleaseVersions` flag. GraphQL ASP.NET is still in beta.

![Create an API Project](assets/quick-start-2-package-manager.png)

## Step 3: Write Some Code

### Person.cs

Create a new class file called `Person.cs` and paste the following code.

```cs
// Create a new "Person" model object
namespace GraphQLDemo
{
    public class Person
    {
        public int Id{ get; set; }
        public string FirstName{ get; set; }
        public string LastName { get; set; }
        public bool ForceUser { get; set; }
        public string FavoriteSong { get; set; }
    }
}
```

The properties your model defines are automatically registered as fields on the object graph and can be queried in any order when a `Person` requested.

### PersonsController.cs

Add a new class file called `PersonController.cs` and paste the following code.

```csharp
// Create a new GraphController to handle the request
using GraphQL.AspNet.Attributes;
using GraphQL.AspNet.Controllers;
namespace GraphQLDemo
{
    public class PersonsController : GraphController
    {
        [QueryRoot("person")]
        public Person RetrievePerson(int id)
        {
            // Normally you'd do a database lookup here
            return new Person()
            {
                Id = id,
                FirstName = "Luke",
                LastName = "Skywalker",
                ForceUser = true,
                FavoriteSong = "Papa was a Rollin' Stone",
            };
        }
    }
}
```

In an MVC controller, we'd generate a data object and pass it off to our Razor View for rendering. In GraphQL, we return the object back to GraphQL and let it handle which properties to render to the requestor based on their query.

For an REST endpoint we'd use `[Route("person")]`, `[HttpGet("person")]` or similar attributes to specify the url template and HTTP verb for our action. In GraphQL, we have to specify if the action is a `[Query]` or a `[Mutation]` operation. Here we've chosen to use the special`[QueryRoot]` attribute to indicate that the action is both a query and exists at the top most level of our object graph. See the section on [declaring field paths](../controllers/field-paths) for a complete set of options and recommendations.

## Step 4: Startup.cs

1. Add a call to `AddGraphQL()` in in the ConfigureServices method.
2. Add a call to `UseGraphQL()` in the Configure method.

We need to register GraphQL to the application instance. This registers it for dependency injection and sets up the HTTP route to allow it to receive requests.

```csharp
// Startup.cs
using GraphQL.AspNet.Configuration.Mvc;
namespace GraphQLDemo
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services){

            // ...other code omitted for brevity
            services.AddGraphQL();
        }

        public void Configure(IApplicationBuilder application){

            // ...other code hidden for brevity
            application.UseGraphQL();
        }
    }
}
```

_**Note:**_ Calling `.UseGraphQL()` will register the graphql handler for your schema into the ASP.NET http pipeline. Be sure to call it at an appropriate point. For instance, if you need authorization support in GraphQL, `.UseGraphQL()` will need to be called after `.UseAuthorization()`.

## Step 5: Execute the Query

Open your graphql tool of choice, point it at `http://localhost:5000/graphql` and execute the query:

```javascript
query {
    person(id: 18) {
        id
        firstName
        lastName
        forceUser
    }
}
```

Here we used Altair to generate the result.

![Altair Results](assets/quick-start-5-altair-results.png)

That's all there is. We've even pulled down the introspected documentation on the right.

#### Try a few other things:

-   Alter your query to include `favoriteSong` and notice how the data package now includes that field without any C# changes.
-   Misspell a field name. Not only does the tooling pick up the error client side but if you submit the query the JSON response from the server will indicate where the error occurred.
-   Change the return type to `Task<Person>`, GraphQL automatically adjusts to execute asynchronously.
-   If you are running the app on the console, make some adjustments to the default logging settings and add an entry for `"GraphQL.AspNet" : "Trace"` to see the log events write their output to the console window as your query executes.
