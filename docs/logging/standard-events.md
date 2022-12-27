---
id: standard-events
title: Standard Logging Events
sidebar_label: Standard Events
sidebar_position: 1
---

GraphQL ASP.NET tracks many standard events. Most of these are recorded during the execution of a query. Some, such as those around field resolution, can be recorded many times in the course of a single request.

_**Common Event Properties**_

All events share a common set of properties inherited from `GraphLogEntry`.

| Property      | Description                                              |
| ------------- | -------------------------------------------------------- |
| _EventId_     | The numeric constant assigned to the event.              |
| _EventName_   | The human-friendly name of the event.                    |
| _DateTimeUTC_ | A date and time, in UTC-0, when the event was _created_. |

_Constants for event names and ids can be found at_ `GraphQL.AspNet.Logging.LogEventIds`

_Constants for all log entry properties can be found at_ `GraphQL.AspNet.Logging.LogPropertyNames`

## Schema Level Events

### Schema Route Registered

This event is recorded when GraphQL successfully registers an entry in the ASP.NET route table to accept requests for a target schema. This event is recorded once per application instance.

**Important Properties**

| Property         | Description                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| _SchemaTypeName_ | The full name of your your schema type. For most single schema applications this will be `GraphQL.AspNet.Schemas.GraphSchema`. |
| _RoutePath_      | The relative URL that was registered for the schema type, e.g. `'/graphql`                                                     |

### Schema Instance Created

This event is recorded each time an instance of your schema is created. By default, schema's are stored as singleton instances so this event should be recorded once per application instance.

**Important Properties**

| Property                  | Description                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| _SchemaTypeName_          | The full name of your your schema type. For most single schema applications this will be `GraphQL.AspNet.Schemas.GraphSchema`.       |
| _SupportedOperationTypes_ | A comma separated list of the operations the schema is tracking (e.g. query, mutation and/or subscription)                           |
| _GraphTypes_              | A collection of objects containing each registered graph type's name, type kind, .NET type association and number of fields (if any) |

### Schema Pipeline Registered

This event is recorded each time an instance of a schema pipeline is created by your DI container. Like schemas, field middleware pipelines are stored as singleton instances so this event should be recorded once per pipleline per application instance.

**Important Properties**

| Property               | Description                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _PipelineName_         | The human friendly name of the pipeline that was created                                                                                               |
| _MiddlewareComponents_ | An array of the registered names of the components in your schema's field pipeline. The names are ordered according to their position in the pipeline. |

## Request Level Events

### Request Received

This is event is recorded when the query execution pipeline first receives a new query to process.

**Important Properties**

| Property             | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| _Username_           | the value of `this.User.Identity.Name` or null                 |
| _QueryRequestId_     | A unique id identifying the overall request that was received. |
| _QueryText_          | The query provided by the user.                                |

### Query Plan Generated

This is event is recorded when the runtime generates a new query plan. This event may or may not be recorded on each request if you are making use of the query cache.

**Important Properties**

| Property                | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------- |
| _QueryPlanId_           | A unique id assigned to the created query plan.                           |
| _SchemaTypeName_        | the full .NET type name of the schema type this plan targets              |
| _IsValid_               | A boolean value indicating if the query document resulted in a valid plan |
| _MaxDepth\*_            | The maximum nested depth of any given field in the plan                   |
| _EstimatedComplexity\*_ | The complexity score assigned to the query plan by the runtime            |

\* See the section on dealing with [malicious queries](../execution/malicious-queries) for more details on `MaxDepth` and `EstimatedComplexity`.

### Query Cache Hit

This event is recorded when the runtime is able to pull an existing instance of a Query Plan from the query cache for the received query document. This event is only recorded if the query cache is enabled.

**Important Properties**

| Property            | Description                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| _QueryPlanHashCode_ | The unique hash key generated from the query document and used to search for an existing plan in the query cache. |
| _SchemaTypeName_    | the full .NET type name of the schema type this plan targets                                                      |

### Query Cache Miss

This event is recorded when the runtime is unable to pull an existing instance of a Query Plan from the query cache for the received query document. This event is only recorded if the query cache is enabled.

**Important Properties**

| Property            | Description                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| _QueryPlanHashCode_ | The unique hash key generated from the query document and used to search for an existing plan in the query cache. |
| _SchemaTypeName_    | the full .NET type name of the schema type this plan targets                                                      |

### Query Cache Add

This is event is recorded when the runtime successfully stores an instance of a Query Plan into the query cache. This event is only recorded if the query cache is enabled.

**Important Properties**

| Property            | Description                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| _QueryPlanHashCode_ | The unique hash key generated from the query document and used to search for an existing plan in the query cache.                                     |
| _SchemaTypeName_    | the full .NET type name of the schema type this plan targets                                                                                          |
| _QueryPlanId_       | The unique query plan Id created when it was generated. Can be used to cross link this event to the `Query Plan Generated` event for further details. |

### Request Completed

This is event is recorded when the final result for the request is generated and is returned from the runtime to be serialized. No actual data values are recorded to the logs to prevent leaks of potentially sensitive information.

**Important Properties**

| Property             | Description                                                                           |
| -------------------- | ------------------------------------------------------------------------------------- |
| _QueryRequestId_     | A unique id identifying the overall request.                                          |
| _HasData_            | `true` or `false` indicating if at least one data value was included in the result    |
| _HasErrors_          | `true` or `false` indicating if at least one error message was included in the result |
| _TotalExecutionMs_   | A numerical value indicating the total runtime of the request, in milliseconds.       |

### Request Cancelled

This is event is recorded when the a request is explicitly cancelled, usually by the underlying HTTP connection.

**Important Properties**

| Property             | Description                                                                           |
| -------------------- | ------------------------------------------------------------------------------------- |
| _QueryRequestId_     | A unique id identifying the overall request.                                          |
| _TotalExecutionMs_   | A numerical value indicating the total runtime of the request, in milliseconds.       |


### Request Timeout

This is event is recorded when the a request is is cancelled due to reaching a maximum timeout limit defined by the schema.

**Important Properties**

| Property             | Description                                                                           |
| -------------------- | ------------------------------------------------------------------------------------- |
| _QueryRequestId_     | A unique id identifying the overall request.                                          |
| _TotalExecutionMs_   | A numerical value indicating the total runtime of the request, in milliseconds.       |


## Directive Level Events

### Execution Directive Applied

This event is recorded when an execution directive is successfully executed against an `IDocumentPart` on an incoming query.

This is event is recorded when the final result for the request is generated and is returned from the runtime to be serialized. No actual data values are recorded to the logs to prevent leaks of potentially sensitive information.

**Important Properties**

| Property                | Description                                                                           |
| --------------------    | ------------------------------------------------------------------------------------- |
| _SchemaTypeName_        | The full .NET type name of the schema type this plan targets                          |
| _DirectiveName_         | The name of the directive as it exists in the target schema                           |
| _DirectiveInternalName_ | The .NET class name of the  directive                                                 |
| _DirectiveLocation_     | The target location in the query document (e.g. FIELD, FRAGMENT_SPREAD etc.)          |

### Type System Directive Applied

This event is recorded when a schema is first generated and all known type system directives are applied to the schema items
to which they are attached. An entry is recorded for each directive applied.

**Important Properties**

| Property                | Description                                                                           |
| --------------------    | ------------------------------------------------------------------------------------- |
| _SchemaTypeName_        | The full .NET type name of the schema type this plan targets                          |
| _SchemaItemPath_        | The path of the item being resolved, e.g. `[type]/Donut/id`                           |
| _DirectiveName_         | The name of the directive as it exists in the target schema                           |
| _DirectiveInternalName_ | The .NET class name of the  directive                                                 |
| _DirectiveLocation_     | The target location in the query document (e.g. FIELD, FRAGMENT_SPREAD etc.)          |


## Auth Events

### Item Authentication Started

This is event is record when a security context on a query is authenticated to determine an 
appropriate ClaimsPrincipal to use for authorization.

**Important Properties**

| Property            | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| _PipelineRequestId_ | A unique id identifying the individual field request.        |
| _SchemaItemPath_    | The path of the item being resolved, e.g. `[type]/Donut/id`  |


### Item Authentication Completed

This is event is recorded after a security context is authenticated and a ClaimsPrincipal was generated (if required).

**Important Properties**

| Property                      | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| _PipelineRequestId_           | A unique id identifying the individual field request.        |
| _SchemaItemPath_              | The path of the item being resolved, e.g. `[type]/Donut/id`  |
| _Username_                    | The value of the `Name` field on the active Identity  or null|
| _AuthenticationScheme_        | The key representing the chosen authentication schema (e.g. `Bearer`, `Kerberos` etc.)  |
| _AuthenticationSchemaSuccess_ | `true` if authentication against the scheme was successful   |
| _SchemaItemPath_              | The path of the item being resolved, e.g. `[type]/Donut/id`  |

### Item Authorization Started

This is event is recorded when an authenticated user is authorized against schema item (typically a Field or Directive).

**Important Properties**

| Property            | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| _PipelineRequestId_ | A unique id identifying the individual field request.        |
| _SchemaItemPath_    | The path of the item being resolved, e.g. `[type]/Donut/id`  |
| _Username_          | The value of the `Name` field on the active Identity  or null|

### Item Authorization Completed

This is event is recorded after a schema item authorization has completed.

**Important Properties**

| Property              | Description                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| _PipelineRequestId_   | A unique id identifying the individual field request.                      |
| _SchemaItemPath_      | The path of the item being resolved, e.g. `[type]/Donut/id`                |
| _Username_            | The value of the `Name` field on the active Identity  or null              |
| _AuthorizationStatus_ | `Skipped`, `Authorized` or `Unauthorized`                                  |
| _LogMessage_          | An internal message containing an explanation of why authorization failed. |


## Field Level Events

After a query plan has been created GraphQL ASP.NET begins resolving each field needed to fulfill the request. This group of events is recorded for each item of each field that is processed. Since all fields are executed asynchronously (even if the resolvers themselves are synchronous) the order in which the events are recorded can be unpredictable and overlap between fields can occur. Using the recorded date along with the `PipelineRequestId` can help to filter the noise.

### Field Resolution Started

This event is recorded when a new field is queued for resolution.

**Important Properties**

| Property             | Description                                                                             |
| -------------------- | --------------------------------------------------------------------------------------- |
| _PipelineRequestId_  | A unique id identifying the individual field request.                                   |
| _FieldExecutionMode_ | Indicates if this pipeline is being executed for a `single source item` or as a `batch` |
| _FieldPath_          | The path of the field being resolved, e.g. `[type]/Donut/id`                            |

### Field Resolution Completed

This is event is recorded when a field completes its execution pipeline and a result is generated. No actual data values are recorded to the logs to prevent leaks of potentially sensitive information.

**Important Properties**

| Property            | Description                                                                        |
| ------------------- | ---------------------------------------------------------------------------------- |
| _PipelineRequestId_ | A unique id identifying the individual field request.                              |
| _FieldPath_         | The path of the field being resolved, e.g. `[type]/Donut/id`                       |
| _HasData_           | `true` or `false` indicating if at least one data value was included in the result |

## Controller Level Events

After the security challenge has completed, but before field resolution is completed, if the pipeline executes a controller method to resolve the field these events will be recorded. If the target resolver of the field is a property or POCO method, these events are skipped.

### Action Invocation Started

This event is recorded when a controller begins processing a request to execute an action method.

**Important Properties**

| Property             | Description                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| _PipelineRequestId_  | A unique id identifying the individual field request.                                              |
| _ControllerTypeName_ | The full .NET type of the controller being invoked                                                 |
| _ActionName_         | The name of the method (not the field) that was being invoked when the exception occurred          |
| _FieldPath_          | The schema field path that represents the action method                                            |
| _SourceObjectType_   | The .NET type name of the input source to the action.                                              |
| _IsAsync_            | `true` or `false` indicating if the controller is going to invoke the action asynchronously or not |

### Action Model State Validated

This event occurs after the controller has processed the input objects and validated the state of the model being passed to the action method.

**Important Properties**

| Property             | Description                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| _PipelineRequestId_  | A unique id identifying the individual field request.                                                                                       |
| _ControllerTypeName_ | The full .NET type of the controller being invoked                                                                                          |
| _ActionName_         | The name of the method (not the field) that was being invoked when the exception occurred                                                   |
| _FieldPath_          | The schema field path that represents the action method                                                                                     |
| _ModelIsValid_       | `true` or `false` indicating if the all model items completed validation successfully                                                       |
| _ModelItems_         | A list of items, one for each item that was invalid, indicating the parameter name and the string messages generated indicating the errors. |

### Action Invocation Completed

This event is recorded when a controller completes the invocation of an action method and a result is created.

**Important Properties**

| Property             | Description                                                                                                                |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| _PipelineRequestId_  | A unique id identifying the individual field request.                                                                      |
| _ControllerTypeName_ | The full .NET type of the controller being invoked                                                                         |
| _ActionName_         | The name of the method (not the field) that was being invoked when the exception occurred                                  |
| _FieldPath_          | The schema field path that represents the action method                                                                    |
| _ResultTypeName_     | The .NET type name of the data returned from the action. The may be an actual field value or an `IGraphActionResult` type. |

### Action Invocation Exception

This event is recorded by the controller if it is unable to invoke the target action method. This usually indicates some sort of data corruption or failed conversion of source data to the requested parameter types of the target action method. This can happen if the query plan or variables collection is altered by a 3rd party outside of the normal pipeline. Should this event occur the field will be abandoned and a null value returned as the field result. Child fields to this instance will not be processed but the operation will continue to attempt to resolve other sibling fields and their children.

**Important Properties**

| Property             | Description                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------- |
| _PipelineRequestId_  | A unique id identifying the individual field request.                                     |
| _ControllerTypeName_ | The full .NET type of the controller being invoked                                        |
| _ActionName_         | The name of the method (not the field) that was being invoked when the exception occurred |
| _ExceptionMessage_   | The message on the exception that was thrown                                              |
| _ExceptionTypeName_  | The .NET type name of the exception that was thrown                                       |
| _StackTrace_         | The complete stack trace text of the exception                                            |

### Action Unhandled Exception

This event is recorded if an unhandled exception occurs `within the controller action method body`. Should this event occur the field will be abandoned and a null value returned as the result of the field. Child fields will not be processed but the operation will continue to attempt to resolve other sibling fields and their children.

**Important Properties**

| Property             | Description                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------- |
| _PipelineRequestId_  | A unique id identifying the individual field request.                                     |
| _ControllerTypeName_ | The full .NET type of the controller being invoked                                        |
| _ActionName_         | The name of the method (not the field) that was being invoked when the exception occurred |
| _ExceptionMessage_   | The message on the exception that was thrown                                              |
| _ExceptionTypeName_  | The .NET type name of the exception that was thrown                                       |
| _StackTrace_         | The complete stack trace text of the exception                                            |

## Other Events

### Unhandled Exception

This event is recorded if any pipeline invocation is unable to recover from an error. If this is event is recorded the request is abandoned and an error status is returned to the requestor. This event is always recorded at a `Critical` log level. This event will be immediately followed by a `Request Completed` event.

**Important Properties**

| Property            | Description                                         |
| ------------------- | --------------------------------------------------- |
| _ExceptionMessage_  | The message on the exception that was thrown        |
| _ExceptionTypeName_ | The .NET type name of the exception that was thrown |
| _StackTrace_        | The complete stack trace text of the exception      |
