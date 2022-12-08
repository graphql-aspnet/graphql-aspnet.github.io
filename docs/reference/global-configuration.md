---
id: global-configuration
title: Global Configuration
sidebar_label: Global Configuration
sidebar_position: 2
---

Global configuration settings affect the entire server instance, they are not restricted to a single schema registration. All global settings are optional and define resonable default values. Use these to fine tune your server environment. You should change any global settings BEFORE calling `.AddGraphQL()`.

```csharp title="Adding Schema Configuration Options"
// -------------------
// Configure Global Options before calling AddGraphQL
// -------------------

services.AddGraphQL();


// Be sure to add graphql to the ASP.NET pipeline builder
appBuilder.UseGraphQL();
```

## General
### ControllerServiceLifetime

The configured service lifetime that all discovered controllers and directives will be registered as within the DI container during any schema's setup 
process.

```csharp
GraphQLProviders.GlobalConfiguration.ControllerServiceLifetime = ServiceLifetime.Transient;
```
| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `Transient `       | `Transient`, `Scoped`, `Singleton`   |

:::danger
 Registering graph controllers as anything other than transient can cause unexpected behavior and result in unexplained crashes, data loss, data exposure and security holes. Consider restructuring your application before changing this setting. Adjusting this value should be a last resort, not a first option.
:::

## Subscriptions

### MaxConcurrentReceiverCount

Indicates the maximum number of entities (i.e. client connections) that will receive a raised subscription event on this server instance. If there are more receivers than this configured limit the others are queued and will recieve the event in turn once as others finish processing it.

```csharp
SubscriptionServerSettings.MaxConcurrentReceiverCount = 500;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `500`          | > 0              |


### MaxConnectedClientCount

Indicates the maximum number of client connections this server instance will accept, combined, across all schemas. If this limit is reached a new connection will be automatically rejected even if ASP.NET was willing to accept it.


```csharp
SubscriptionServerSettings.MaxConnectedClientCount = null;
```

| Default Value | Acceptable Values |
| ------------- | ----------------- |
| `null`        | null OR > 0       |

_Note:_ `null` _indicates that no limits will be enforced._