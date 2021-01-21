---
id: graph-action-results
title: Action Results
sidebar_label: Action Results
---

Controllers work like they do with ASP.NET MVC.

In ASP.NET MVC you may do things like this:

```csharp
// If you wanted to indicate a status 200 (OK) you may write:
public class BakeryController : Controller
{
    [HttpGet("donuts/{id}")]
    public IActionResult RetrieveDonut(int id)
    {
        Donut donut = null;
        // ...

        // return the donut and indicate success
        return this.Ok(donut);
    }
}

// Or Return the object directly:
public class BakeryController : Controller
{
    [HttpGet("donuts/{id}")]
    public Donut RetrieveDonut(int id)
    {
        Donut donut = null;
        // ...

        // return the donut directly!
        return donut;
    }
}
```

You can either return the data itself or some alternate `IActionResult` to tell MVC how to render a response.

Common Action Results for MVC:

-   `this.Ok()` : Everything worked fine, return status 200.
-   `this.NotFound()` : The item doesn't exist, return status 404.
-   `this.File()`: Return status 200 and stream the file to the client.
-   `this.View()`: Render a razor view and send the HTML to the client.

This works the same way in GraphQL ASP.NET. The available actions are slightly different (GraphQL won't stream files) but the usage is the same. You can even write your own action results.

## Common Graph Action Results

Instead of `IActionResult` we use `IGraphActionResult` from a controller action method. Both [directives](../directives) and controller [action methods](../controllers/actions) can return action results.

Built in Controller Action Methods:

-   `this.Ok(fieldValue)` : Return _fieldValue_ as the resolved value of the field and indicate to the runtime that everything completed successfully.
-   `this.Error(message)`: Indicates a problem. Child fields are not processed and an error message with the given text and error code is added to the response payload.
-   `this.StartBatch()` : Initiates the start a of a new batch. Call `.Complete()` to finish the batch and generate a result for a batch type extension.
-   `this.Unauthorized()`: Indicate the user is not authorized to request the field. A message telling them as such will be added to the result and no child fields will be processed. The field will be returned a `null` value automatically. This is sometimes necessary for data-level validation that can't be readily determined from a validation attribute.
-   `this.BadRequest()`: Commonly used in conjunction with `this.ModelState`. This result indicates the data supplied to the method is not valid for the operation. If given the model state collection an error for each validation error is rendered.
-   `this.InternalServerError()`: Indicates an unintended error, such as an exception occurred. The supplied message will be added to the response and no child fields will be resolved.

[Directives](../directives) have one Additional Action Result:

-   `this.Cancel()`: When returned as part of a method that executes before field resolution, will cancel the pipeline. No error is returned, but the field is dropped from the request.

## Custom Graph Action Results

You can add your own custom action results. This can be particularly useful on larger teams where you want a uniform field response or error message contents for a given situation.

To create a custom result, implement `IGraphActionResult`, which defines a single method:

```csharp
public interface IGraphActionResult
{
    Task Complete(ResolutionContext context);
}
```

`ResolutionContext` is the data context used to resolve the field or directive. For controller actions this can be cast to `FieldResolutionContext` to obtain access to the `Result` property. Setting this property sets the resolved value for the field.

> `FieldResolutionContext` contains a `Result` property, the final resolved value for the field.

Looking at the `UnauthorizedGraphActionResult` is a great example of how to implement your own:

```csharp
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

        public Task Complete(ResolutionContext context)
        {
            context.Messages.Critical(
                   _errorMessage,
                   _errorCode,
                   context.Request.Origin);

            context.Cancel();
            return Task.CompletedTask;
        }
    }
```

The result takes in an optional error message and code, providing defaults if not supplied. Then on `Complete` it adds the message to the context and cancels its execution.
