---
id: model-state
title: Model State
sidebar_label: Model State
---

GraphQL, as a language, can easily enforce type level requirements like :

-   The data must a collection
-   The data cannot be null
-   The data must be an integer

But it fails to enforce the individual business requirements of our data:

-   Is the employee's new last name less than 70 characters?
-   Is the customer's phone number 7 or 10 digits?
-   Is the number of donuts ordered at least 1?

#### Model Validation to the Rescue

When your controller action is invoked the runtime will analyze the input parameters and will execute the validation attributes attached to each property to determine a validation state, just like you'd do in an MVC controller.

In this example we use the `[Range]` attribute under `System.ComponentModel.DataAnnotations` to limit the quantity of donuts that can be ordered to two dozen.

```csharp
// BakeryController.cs
public class BakeryController : GraphController
{
    //constructor with service injection omitted for brevity...

    [MutationRoot("orderDonuts", typeof(CompletedDonutOrder))]
    public async Task<IGraphActionResult> OrderDonuts(DonutOrderModel order)
    {
        if (!this.ModelState.IsValid)
            return this.BadRequest(this.ModelState);

        var result = await _service.PlaceDonutOrder(order);
        return this.Ok(result);
    }
}

// DonutOrderModel.cs
using System.ComponentModel.DataAnnotations;
public class DonutOrderModel
{
    [Range(1, 24)]
    public int Quantity { get; set; }
    public string Type { get; set; }
}
```

```js
// A valid graph query
// that breaks a required business rule
mutation {
    orderDonuts(order: {quantity: 60}) {
        id
        name
    }
}
```

Just like with ASP.NET MVC, `this.ModelState` contains an entry for each "validatiable" object passed to the method and its current validation state (valid, invalid, skipped etc.) along with all the rules that did not pass. Also, just like with ASP.NET MVC you can define custom attributes that inherit from `[ValidationAttriubte]` and graphql will execute them as well.

In the example we returned a IGraphActionResult to make use of `this.BadRequest()` which will add the friendly error messages to the outgoing response automatically. But we could have easily just returned null, thrown an exception or generated a generic custom error message. However you choose to deal with `ModelState` is up to you. GraphQL will validate the data but it doesn't take action when model validation fails. That's up to you.

#### _Implementation Note_

GraphQL makes use of the same `System.ComponentModel.DataAnnotations.Validator` that MVC does to validate its input objects. [All the applicable rules](https://docs.microsoft.com/en-us/aspnet/core/mvc/models/validation?view=aspnetcore-3.0) that apply to MVC model validation also apply to GraphQL.

However, where MVC will validate model binding rules and represent binding errors it its ModelState object, GraphQL will not. GraphQL binding concerns such as type expressions and nullability are taken care of at the query level, long before a query plan is finalized and the action method is even retrieved. As a result, the model state of GraphQL ASP.NET is a close approximation of MVC's model state object, but it is not a direct match.
