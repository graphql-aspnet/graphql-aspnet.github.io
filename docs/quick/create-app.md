---
id: create-app
title: Building Your First App
sidebar_label: Your First App
sidebar_position: 1
description: Step by Step instructions for creating a sample application
---

This document will help walk you through creating a new Web API project, installing the GraphQL ASP.NET library and writing your first controller.

## Create a New Web API Project
💻 Setup a new `ASP.NET Core Web API` project:

![web api project](../assets/create-new-web-api-project.png "Select ASP.NET Core Web API")

## Add the Package From Nuget
💻 Add the `GraphQL.AspNet` nuget package:

```powershell
# Using the dotnet CLI
> dotnet add package GraphQL.AspNet
```

## Create a Controller

💻 Create your first Graph Controller:

```csharp  title="BakeryController.cs"
using GraphQL.AspNet.Attributes;
using GraphQL.AspNet.Controllers;

public class BakeryController : GraphController
{
    [QueryRoot("donut")]
    public Donut RetrieveDonut()
    {
        return new Donut()
        {
            Id = 3,
            Name = "Snowy Dream",
            Flavor = "Vanilla"
        };
    }
}

public class Donut
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Flavor { get; set; }
}
```


## Configure Startup

💻 Register GraphQL with your services collection and your application pipeline:

```csharp title="Program.cs"
using GraphQL.AspNet.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add graphql services to the DI container.
// highlight-next-line
builder.Services.AddGraphQL();

var app = builder.Build();

// Configure the HTTP request pipeline.
// highlight-next-line
app.UseGraphQL();
app.Run();
```
> _The configuration steps may vary slightly when using a Startup.cs file; typical for .NET 5 or earlier _

## Execute a Query

💻 Start the application and using your favorite tool, execute a query:

```graphql title="Sample Query"
query {
    donut {
        id
        name
        flavor
    }
}
```

### Results:

![query results](../assets/overview-sample-query-results.png "Results using GraphQL Playground")
> _The port number on your app may be different than that shown in the image_