---
id: demo-projects
title: Demo Projects
sidebar_label: Demo Projects
sidebar_position: 9
---

### General

📌 [Custom Directives](https://github.com/graphql-aspnet/demo-projects/tree/master/Custom-Directives)  <br/> 
Demostrates creating and applying a type system directive and a custom execution directive.

📌  [Logging Provider](https://github.com/graphql-aspnet/demo-projects/tree/master/LoggingProvider)  <br/>
Demonstrates the creation of a custom `ILogProvider` to intercept logging events and writing them to a json file.

📌  [Custom Http Processor](https://github.com/graphql-aspnet/demo-projects/tree/master/Custom-HttpProcessor)<br/>
Demonstrates overriding the default HTTP Processor to conditionally process entire queries at the ASP.NET level.

### Authentication & Authorization

📌  [Field Authorization](https://github.com/graphql-aspnet/demo-projects/tree/master/Authorization)<br/>
Demonstrates fields with authorization requirements and how access denied messages are returned to the client in the various authorization modes.

📌  [Firebase Authentication](https://github.com/graphql-aspnet/demo-projects/tree/master/Firebase-Authentication)<br/>
Demonstrates how to setup a [Firebase](https://firebase.google.com/) project and link a GraphQL ASP.NET project to it.

### Subscriptions

📌  [Subscriptions w/ Azure Service Bus](https://github.com/graphql-aspnet/demo-projects/tree/master/Subscriptions-AzureServiceBus)<br/>
Demonstrates the use of an external subscription event publisher and a consumer to deserialize and route events. 
>Use of this demo project requires your own [Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview) namespace.

📌  [Subscriptions w/ React & Apollo Client](https://github.com/graphql-aspnet/demo-projects/tree/master/Subscriptions-ReactApolloClient)<br/>
A sample react application that makes use of the [apollo client](https://www.apollographql.com/docs/react/) to connect to a GraphQL ASP.NET server.
