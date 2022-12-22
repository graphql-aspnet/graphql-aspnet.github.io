---
id: authorization
title: Authorization
sidebar_label: Authorization
sidebar_position: 3
---

## Quick Examples 

If you've wired up ASP.NET authorization before, you'll likely familiar with the `[Authorize]` attribute and how its used to enforce security. 

GraphQL ASP.NET works the same way.

```csharp title="General Authorization Check"
public class BakeryController : GraphController
{
    // highlight-next-line
    [Authorize]
    [MutationRoot("orderDonuts", typeof(CompletedDonutOrder))]
    public async Task<IGraphActionResult> OrderDonuts(DonutOrderModel order)
    {/*...*/}
}
```
```csharp title="Restrict by Policy"
public class BakeryController : GraphController
{
    // highlight-next-line
    [Authorize(Policy = "CustomerLoyaltyProgram")]
    [MutationRoot("orderDonuts", typeof(CompletedDonutOrder))]
    public async Task<IGraphActionResult> OrderDonuts(DonutOrderModel order)
    {/*...*/}
}
```
```csharp title="Restrict by Role"
public class BakeryController : GraphController
{
    // highlight-next-line
    [Authorize(Roles = "Admin, Employee")]
    [MutationRoot("purchaseDough")]
    public async Task<bool> PurchaseDough(int kilosOfDough)
    {/*...*/}
}
```

```csharp title="Multiple Authorization Requirements"
// The library supports nested policy and role checks at Controller and Action levels.
// highlight-next-line
[Authorize(Policy = "CurrentCustomer")]
public class BakeryController : GraphController
{
    // The user would have to pass the CurrentCustomer policy
    // and the LoyaltyProgram policy to access the `orderDonuts` field

    // highlight-next-line
    [Authorize(Policy = "LoyaltyProgram")]
    [MutationRoot("orderDonuts", typeof(CompletedDonutOrder))]
    public async Task<IGraphActionResult> OrderDonuts(DonutOrderModel order)
    {/*...*/}
}
```

```csharp title="Use of [AllowAnonymous]"
[Authorize]
public class BakeryController : GraphController
{
    [Authorize(Policy = "CustomerLoyaltyProgram")]
    [MutationRoot("orderDonuts", typeof(CompletedDonutOrder))]
    public async Task<IGraphActionResult> OrderDonuts(DonutOrderModel order)
    {/*...*/}

    // No Authorization checks on RetrieveDonutList
    // highlight-next-line
    [AllowAnonymous]
    [Mutation("donutList")]
    public async Task<IEnumerable<Donut>> RetrieveDonutList()
    {/*...*/}
}
```

## Use of IAuthorizationService

Under the hood, GraphQL taps into your `IServiceProvider` to obtain a reference to the `IAuthorizationService` that gets created when you configure `.AddAuthorization()` at startup. Take a look at the [Schema Item Authorization Pipeline](https://github.com/graphql-aspnet/graphql-aspnet/tree/master/src/graphql-aspnet/Middleware/SchemaItemSecurity) for the full picture.

## When does Authorization Occur?


GraphQL ASP.NET makes use of the result from [ASP.NET's security pipeline](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/introduction). Whether you use Kerberos tokens, oauth2, username/password, API tokens or if you support 2-factor authentication or one-time-use passwords, GraphQL doesn't care. The entirety of your authentication and authorization scheme is executed by GraphQL, no special arrangements or configuration is needed.

> GraphQL ASP.NET draws from your configured authentication/authorization solution.

Execution directives and field resolutions are passed through the libraries internal [pipeline](../reference/how-it-works#middleware-pipelines) where securty is enforced as a series of middleware components before the respective resolvers are invoked. Should a requestor not be authorized for a given schema item they are informed via an error message and denied access to the item.


## Field Authorizations

If a requestor is not authorized to a requested field a value of `null` is used as the resolved value and an error message is recorded to the query results. 

Null propagation rules still apply to unauthorized fields meaning if the field cannot accept a null value, its propagated up the field chain potentially nulling out a parent or "parent of a parent" depending on your schema.

By default, a single unauthorized field result does not necessarily kill an entire query, it depends on the structure of your object graph and the query being executed. When a field request is terminated any down-stream child fields are discarded immediately but sibling fields or unrelated ancestors continue to execute as normal.

Since this authorization occurs "per field" and not "per controller action" its possible to define the same security chain for POCO properties. This allows you to effectively deny access, by policy, to a single property of an instantiated object. Performing security checks for every field of data (especially in parent/child scenarios) has a performance cost though, especially for larger data sets. For most scenarios enforcing security at the controller level is sufficient.

### Field Authorization Failures are Obfuscated

When GraphQL denies a requestor access to a field a message naming the field path is added to the response. This message is generic on purpose. Suppose there was a query where the user requests the `allDonuts` field but is denied access:

```graphql
    {
        donut(id: 5) {
            name
        }
        allDonuts {
            name
        }

    }

```

The result might look like this:

```json title="Denied Field Access"
{
  "errors": [
    // highlight-start
    {    
      "message": "Access Denied to field [query]/allDonuts",
      "locations": [
        {
          "line": 7,
          "column": 3
        }
      ],
      "path": [
        "allDonuts"
      ],
      "extensions": {
        "code": "ACCESS_DENIED",
        "timestamp": "2022-12-22T22:22:25.017-07:00",
        "severity": "CRITICAL"
      }
    }
    // highlight-end
  ],
  "data": {
    "donut": {
      "name": "Super Mega Donut",
    },
    // highlight-next-line
    "allDonuts": null
  }
}
```

:::tip
 To view more details authorization failure reasons, such as specific policy failures, you'll need to expose exceptions on the request or turn on [logging](../logging/structured-logging). 
 
 GraphQL automatically raises the `SchemaItemAuthorizationCompleted` log event at a `Warning` level when a security check fails.
:::

## Authorization on Execution Directives

Execution directives are applied to the _query document_, before a query plan is created to fulfill the request. However, it is the query plan that determines which field resolvers should be called. As a result, execution directives have the potential to alter the document structure and change how a query plan might be structured. Because of this, not executing a query directive has the potential to cause a the expected query to be different than what the requestor intended. 

Therefore, if an execution directive fails authorization the query is rejected and not executed.  The caller will receive an error message as part of the response indicating the unauthorized directive. Like field authorization failures, the message is obfuscated and contains only a generic message. You'll need to expose exception on the request or turn on logging to see additional details.

## Authorization Methods

GraphQL ASP.NET supports two methods of applying the authorization rules out of the box.

-   `PerField`: Each field is authorized individually. If a query references some fields the user can access and some they cannot, those fields the user can access are resolved as expected. A `null` value is assigned to the fields the user cannot access.

-   `PerRequest`: All fields that require authorization are authorized at once. If the user is unauthorized on 1 or more fields the entire request is denied and not executed.

Configure the authorization method at startup:

```csharp title="Startup"
services.AddGraphQL(schemaOptions =>
{
    schemaOptions.AuthorizationOptions.Method = AuthorizationMethod.PerRequest;
});
```

## Performance Considerations

Authorization is not free. Rhere is a minor, but real, performance cost to inspecting and evaluating policies on a field. This true regardless of yor choice of `PerField` or `PerRequest` authorization. Every secure field still needs to be evaluated, whether they are done up front or as the query progresses.  In a REST query, you generally only secure your top-level controller methods, consider doing the same with your GraphQL queries.

:::tip
Centralize your authorization checks to your controller methods. There is usually no need to apply `[Authorize]`  attributes to each and every method and property across your entire schema.
:::