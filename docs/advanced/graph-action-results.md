---
id: graph-action-results
title: Action Results
sidebar_label: Action Results
sidebar_position: 5
---

## What is an Action Result?

In ASP.NET you may do things like this:

```csharp title="Return an Action Result"
public class BakeryController : Controller
{
    [HttpGet("donuts/{id}")]
    public IActionResult RetrieveDonut(int id)
    {
        Donut donut = null;
        // ...

        // highlight-start
        // return the donut and indicate success
        return this.Ok(donut);        
        // highlight-end
    }
}
```

```csharp title="Return an Object"
public class BakeryController : Controller
{
    [HttpGet("donuts/{id}")]
    public Donut RetrieveDonut(int id)
    {
        Donut donut = null;
        // ...

        // highlight-start
        // return the donut directly!        
        return donut;
        // highlight-end
    }
}
```

> You can either return the data itself or some alternate `IActionResult` to tell ASP.NET how to render a response.

Some common ASP.NET action results:

-   `this.Ok()` : Everything worked fine, return status 200.
-   `this.NotFound()` : The item doesn't exist, return status 404.
-   `this.File()`: Return status 200 and stream the file to the client.
-   `this.View()`: Render a razor view and send the HTML to the client.

This works the same way in GraphQL ASP.NET. The available actions are slightly different (e.g. GraphQL won't stream files) but the usage is the same. You can even write your own action results.

## Controller Action Results

Instead of `IActionResult` we use `IGraphActionResult` from a controller action method. Both [directives](./directives) and controller [action methods](../controllers/actions) can return action results.

Built in Controller Action Methods:

-   `this.Ok(fieldValue)` : Return _fieldValue_ as the resolved value of the field and indicate to the runtime that everything completed successfully.
-   `this.Error(message)`: Indicates a problem. The field will resolve to a `null` value automatically. Child fields are not processed and an error message with the given text and error code is added to the response payload.
-   `this.StartBatch()` : Initiates the start a of a new batch. See [batch operations](../controllers/batch-operations.md) for details.
-   `this.Unauthorized()`: Indicate the user is not authorized to request the field. A message telling them as such will be added to the result and no child fields will be processed. The field will resolve to a `null` value automatically. This is sometimes necessary for data-level validation that can't be readily determined from an `[Authorize]` attribute or query level validation.
-   `this.BadRequest()`: Commonly used in conjunction with `this.ModelState`. This result indicates the data supplied to the method is not valid for the operation. If given a model state collection, an error for each validation error is rendered.
-   `this.InternalServerError()`: Indicates an unintended error, such as an exception occurred. The supplied message will be added to the response and no child fields will be resolved.

### Directive Action Results
[Directives](./directives) have two built in Action Results:

-   `this.Ok()`: Indicates that the directive completed its expected operation successfully and processing can continue.
-   `this.Cancel()`: Indicates that the directive did NOT complete its operation successfully. 
    - If this is a type system directive, the schema will fail to complete and the server will not start.
    - If this is an execution directive, the query will be abandoned and the user will receive an error message.

## Using an IGraphActionResult

Using a graph action result is straight forward. Use it like you would a regular action result with a REST query:

```csharp
public class BakeryController : GraphController
{
    [Query("donut", typeof(Donut))]
    public IGraphActionResult RetrieveDonut(int id)
    {
        if(id < 0)
            // highlight-next-line
            return this.Error("Invalid Id");

        Donut donut = new Donut(id);
        // highlight-next-line
        return this.Ok(donut);
    }
}
```

Notice, however; that we had to declare the return type of the donut field in the `[Query]` attribute. This is because the actual return type is hidden by the use of `IGraphActionResult`.  This is the trade off to the extra functionality provided by action results. Since GraphQL is a statically typed language all field return types must be known at startup. 

:::info
Using a graph action result requires you to declare the return type of your action method elsewhere, usually in the `[Query]` or `[Mutation]` attribute.
:::


## Custom Graph Action Results

You can add your own custom action results. This can be particularly useful on larger teams where you want a uniform field response or error message contents for a given situation.

To create a custom result, implement `IGraphActionResult`, which defines a single method:

```csharp title="IGraphActionResult.cs"
public interface IGraphActionResult
{
    Task CompleteAsync(ResolutionContext context);
}
```

`ResolutionContext` is the data context used to resolve the field or directive. For controller actions this can be cast to `FieldResolutionContext` to obtain access to the `Result` property. Setting this property sets the resolved value for the field.

:::info
`FieldResolutionContext` contains a `Result` property which indicates the final resolved value for the field.
:::

Looking at the `UnauthorizedGraphActionResult` is a great example of how to implement your own:

```csharp title="UnauthorizedGraphActionResult.cs"
    public class UnauthorizedGraphActionResult : IGraphActionResult
    {
        private readonly string _errorCode;
        private readonly string _errorMessage;

        public UnauthorizedGraphActionResult(
            string errorMessage = "",
            string errorCode = Constants.ErrorCodes.ACCESS_DENIED)
        {
            _errorMessage = errorMessage ?? "Unauthorized Access";
            _errorCode = errorCode ?? Constants.ErrorCodes.ACCESS_DENIED;
        }

        public Task CompleteAsync(ResolutionContext context)
        {
            // add an error message to the response
            context.Messages.Critical(
                   _errorMessage,
                   _errorCode,
                   context.Request.Origin);

            // instruct graphql to stop processing this field 
            // and its children
            context.Cancel();
            return Task.CompletedTask;
        }
    }
```

The result takes in an optional error message and code, providing defaults if not supplied. Then on `CompleteAsync` it adds the message to the context and cancels its execution.
