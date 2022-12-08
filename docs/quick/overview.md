---
id: overview
title: Overview
sidebar_label: Overview
sidebar_position: 0
description: A quick overview of this documentation and how to use it.
hide_title: true
---

:::info This  project is currently in open beta
 Some features of the library may change prior to a final release.
:::

## How To Use This Documentation

This documentation is best used as a reference guide for the various features of GraphQL ASP.NET but it helps to read through a few sections to get an understanding of the core concepts.

✅ [Controllers](../controllers/actions) -
An overview on how to build a controller and define an action method.

✅ [Attributes](../reference/attributes) - A reference to all the attributes supported by GraphQL ASP.NET. Attributes are used extensively to annotate and configure your controllers and model classes.

✅ [Schema Configuration](../reference/schema-configuration) - A reference to the various configuration options for your schema and how they affect the runtime.

#### Target Audience

This documentation serves as part reference and part tutorial for GraphQL ASP.NET. You should have a familiarity with GraphQL and ASP.NET MVC. We won't spend a lot of time covering core concepts such as how ASP.NET controllers operate or the ends and outs of authorization. Many implementation details are shown in terms of code examples as well and without a familiarity with MVC, things may not always be so clear.

Here are some good starting points for learning more about GraphQL or ASP.NET MVC before diving in to GraphQL ASP.NET.

[**Learn GraphQL**](https://graphql.org/learn/) - A walk through on the query language by the GraphQL team

[**Comparing GraphQL and REST**](https://blog.apollographql.com/graphql-vs-rest-5d425123e34b) - A helpful comparison by the Apollo Team

[**Getting started with ASP.NET Core MVC**](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-5.0&tabs=visual-studio) - Scaffolding a .NET ASP.NET Core MVC app from the ground up.

## Key Terms

This documentation uses a number of terms to refer to the various pieces of the library:

### Schema
This is the set of data types, their fields, input arguments etc. that are exposed on an object graph. When you write a graphql query to return data the fields you request, their arguments and their children must all be defined on a schema that graphql will validate your query against.  

> In GraphQL ASP.NET the schema is generated at runtime directly from your C# controllers; there is no additional boilerplate code necessary to define a schema.

Your schema is "generated" at runtime by analyzing your model classes, controllers and action methods then populating a `GraphSchema` container with the appropriate graph types to map graphql requests to your controllers. 

### Fields & Resolvers
In GraphQL terms, a field is any requested piece of data (such as an id or  name).  A resolver fulfills the request for data from a schema field. It takes in a set of input arguments and produces a piece of data that is returned to the client. In GraphQL ASP.NET your controller methods act as resolvers for top level fields in any query.

### Graph Type

A graph type is an entity on your object graph; a droid, a donut, a string, a number etc.  In GraphQL ASP.NET your model classes, interfaces, enums, controllers etc. are compiled into the various graph types required by the runtime.

#### Root Graph Types
There are three root graph types in GraphQL: Query, Mutation, Subscription. Whenever you make a graphql request, you always specify which query root you are targeting. This documentation will usually refer to all operations as "queries" but this includes mutations and subscriptions as well.

### Query Document
This is the raw query string submitted by a client. When GraphQL accepts a query it is converted from a string to an internal document format that is parsed and used to fulfill the request.  

> Queries, Mutations and Subscriptions are all types of query documents.

