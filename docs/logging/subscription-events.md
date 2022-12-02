---
id: subscription-events
title: Subscription Logging Events
sidebar_label: Subscription Events
---

GraphQL ASP.NET tracks some special events related to the management of subscriptions. They are outlined below.

_**Common Event Properties**_

The [common event properties](./standard-events.md) outlined on the standard events page apply to all subscription events.

## Server Level Events

### Subscription Event Dispatch Queue Alert
This event is recorded when the server's schema-agnostic, internal dispatch queue reaches a given threshold. The internal dispatch queue is where all subscription events destined for connected clients are staged before being processed. The thresholds at which this alert is recorded can be [customized](../advanced/subscriptions.md#dispatch-queue-monitoring).

| Property                    | Description                                                          |
| ----------------            | ---------------------------------------------------------------------|
| _ThresholdLevelReached_     | The declared threshold level that was reached causing this entry to be recorded. (Expressed in # of queued events) |
| _EventQueueCount_           | The actual number of events currently queued.  |
| _CustomMessage_             | An optional, staticly declared message registered with the threshold level. |

## Schema Level Events

### Subscription Route Registered

This event is recorded when GraphQL successfully registers an entry in the ASP.NET MVC's route table to accept requests for a target schema as well as 
register the middleware component necessary to receive websocket requests.

**Important Properties**

| Property         | Description                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| _SchemaTypeName_ | The full name of your your schema type. For most single schema applications this will be `GraphQL.AspNet.Schemas.GraphSchema`. |
| _SchemaSubscriptionRoutePath_      | The relative URL that was registered for the schema type, e.g. `'/graphql`                                                     |


## Client Connection Events

 ### Client Registered

This event is recorded when GraphQL successfully accepts a client and has assigned a client proxy to manage the connection. This event is recorded just prior to the connection is "started" and messaging begins.

**Important Properties**

| Property         | Description                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| _ClientId_       | A unique id asigned to the client when it first connected.                                                                     |
| _SchemaTypeName_ | The full name of your your schema type. For most single schema applications this will be `GraphQL.AspNet.Schemas.GraphSchema`. |
| _ClientTypeName_ | The full name of the assigned client proxy type. In general, a different type is used per messaging protocol.                  |
| _ClientProtocol_ | The protocol negotiated by the client and server that will be used for the duration of the connection.                         |

 ### Client Dropped

This event is recorded when GraphQL is releasing a client. The connection has been "stopped" and no additional messagings are being broadcast. This event occurs just before the HTTP connection is closed.

**Important Properties**

| Property         | Description                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| _ClientId_       | A unique id asigned to the client when it first connected.                                                                     |
| _ClientTypeName_ | The full name of the assigned client proxy type. In general, a different type is used per messaging protocol.                  |
| _ClientProtocol_ | The protocol negotiated by the client and server that will be used for the duration of the connection.                         |


 ### Unsupported Client Protocol

This event is recorded when GraphQL attempts to create an appropriate proxy class for the connection but no such proxy could be deteremined from the details providied in the initial request. In general, this means the provided websocket sub protocols did not match a supported protocol for this server and schema combination.

| Property         | Description                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| _SchemaTypeName_ | The full name of your your schema type. For most single schema applications this will be `GraphQL.AspNet.Schemas.GraphSchema`. |
| _ClientProtocol_ | The protocol(s) requested by the client connection that were not accepted                                                      |

**Important Properties**

| Property         | Description                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| _ClientId_       | A unique id asigned to the client when it first connected.                                                                     |
| _ClientTypeName_ | The full name of the assigned client proxy type. In general, a different type is used per messaging protocol.                  |


## Client Messaging Events

### Subscription Event Received

This event is recorded by a client proxy when it received an event from the router and has determined that it should be handled.

**Important Properties**

| Property               | Description                                                                                        |
| ----------------       | ---------------------------------------------------------------------                              |
| _ClientId_             | A unique id asigned to the client when it first connected.                                         |
| _SchemaTypeName_       | The full name of your your schema type. For most single schema applications this will be `GraphQL.AspNet.Schemas.GraphSchema`. |                                                             |
| _SubscriptionPath_      | The path to the target top-level subscription field in the schema                                 |
| _SubscriptionCount_     | The number of registered subscriptions, for this client, that will receive this event.            |
| _SubscriptionIds_       | A comma seperated list of id values representing the subscriptions that will receive this event.  |
| _MachineName_           | The `Environment.MachineName` of the current server.                                              |

### Subscription Registered

This event is recorded by a client proxy when it starts a new subscription on behalf of its connected client.

**Important Properties**

| Property               | Description                                                                                        |
| ----------------       | ---------------------------------------------------------------------                              |
| _ClientId_             | A unique id asigned to the client when it first connected.                                         |
| _SubscriptionPath_      | The path to the target top-level subscription field in the schema                                 |
| _SubscriptionId_        | The subscription id requested by the client.                                                      |


### Subscription Registered

This event is recorded by a client proxy when it unregistered and abandons an existing subscription. This may be due to the server ending the subscription or the client requesting it be stopped.

**Important Properties**

| Property               | Description                                                                                        |
| ----------------       | ---------------------------------------------------------------------                              |
| _ClientId_             | A unique id asigned to the client when it first connected.                                         |
| _SubscriptionPath_      | The path to the target top-level subscription field in the schema                                 |
| _SubscriptionId_        | The subscription id requested by the client.                                                      |


### Client Message Received

This event is recorded by a client proxy when it successfully receives and deserializes a message from its connected client. Not all client proxies may record this event. The messages a client proxy defines must implement `ILoggableClientProxyMessage` in order to use this event.

**Important Properties**

| Property               | Description                                                                                        |
| ----------------       | ---------------------------------------------------------------------                              |
| _ClientId_             | A unique id asigned to the client when it first connected.                                         |
| _MessageType_          | A string value representing the type of the message that was received                              |
| _MessageId_            | The globally unique message id that was assigned to the incoming message.                          |

### Client Message Sent

This event is recorded by a client proxy when it successfully serializes and transmits a message to its connected client. Not all client proxies may record this event. The messages a client proxy defines must implement `ILoggableClientProxyMessage` in order to use this event.

**Important Properties**

| Property               | Description                                                                                        |
| ----------------       | ---------------------------------------------------------------------                              |
| _ClientId_             | A unique id asigned to the client when it first connected.                                         |
| _MessageType_          | A string value representing the type of the message that was received                              |
| _MessageId_            | The globally unique message id that was assigned to the incoming message.                          |

## Subscription Events

Subscription events refer to the events that are raised from mutations and processed by client proxies with registered subscriptions against those events.

 ### Subscription Event Published

 This event is recorded just after an event is handed off to a `ISubscriptionEventPublisher` for publishing to a storage medium.  Custom publishers do not need to record this event manually.

 
**Important Properties**

| Property         | Description                                                          |
| ---------------- | ---------------------------------------------------------------------|
| _SchemaType_     | The schema type name as it was published. This will likely include additional information not recorded in standard schema level events.                                                                                   |
| _DataType_              | The data type name of the data object that was published.     |
| _SubscriptionEventId_   | The globally unique id of the subscription event.             |
| _SubscriptionEventName_ | The name of the event as its defined in the schema.           |
| _MachineName_           | The `Environment.MachineName` of the current server.          |

 ### Subscription Event Received

 This event is recorded by the event router just after it receives an event. The router will then proceed to forward the event to the correct client instances for processing.
 
**Important Properties**

| Property         | Description                                                          |
| ---------------- | ---------------------------------------------------------------------|
| _SchemaType_     | The schema type name as it was recevied. This will likely include additional information not recorded in standard schema level events.                                                                                   |
| _DataType_              | The data type name of the data object that was received.      |
| _SubscriptionEventId_   | The globally unique id of the subscription event.             |
| _SubscriptionEventName_ | The name of the event as its defined in the schema.           |
| _MachineName_           | The `Environment.MachineName` of the current server.          |
