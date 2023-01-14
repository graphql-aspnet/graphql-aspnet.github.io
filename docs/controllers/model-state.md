---
id: model-state
title: Model State
sidebar_label: Model State
sidebar_position: 1
---

GraphQL, as a language, can easily enforce query level requirements like :

✅   The data must a collection.<br/>
✅   The data value cannot be null.<br/>
✅   The argument 'zipCode' must be supplied as a string.

<br />

But it fails to enforce the individual business requirements of application:

🧨   The employee's last name must be less than 70 characters.<br/>
🧨   A customer's phone number should be 7 or 10 digits.<br/>
🧨   A customer must order at least 1 donut.

## Using Model Validation

When your controller action is invoked the runtime will analyze the input parameters and will execute the validation attributes attached to each object to determine its validations tate. This works just the same was as with a Web API controller.

In this example we use the `[Range]` attribute to limit the quantity of donuts that can be ordered to three dozen.

```csharp title="DonutOrderModel.cs"
public class DonutOrderModel
{
    // highlight-next-line
    [Range(1, 36)]
    public int Quantity { get; set; }
    public string Type { get; set; }
}
```

```csharp title="BakeryController.cs"
public class BakeryController : GraphController
{
    //constructor with service injection omitted for brevity...

    [MutationRoot("orderDonuts", typeof(CompletedDonutOrder))]
    public async Task<IGraphActionResult> OrderDonuts(DonutOrderModel order)
    {
        // highlight-start
        if (!this.ModelState.IsValid)
            return this.BadRequest(this.ModelState);
        // highlight-end

        var result = await _service.PlaceDonutOrder(order);
        return this.Ok(result);
    }
}
```


```graphql title="Sample Query"
# A valid query
# that breaks a required business rule
mutation {
    orderDonuts(order: {quantity: 60, type: "glazed"}) {
        id
        name
    }
}
```

Just like with ASP.NET, `this.ModelState` contains an entry for each "validatiable" object passed to the method and its current validation state (valid, invalid, skipped etc.) along with all the rules that did not pass. Also, just like with ASP.NET you can define custom attributes that inherit from `ValidationAttriubte` and GraphQL will execute them as well.

In the example, we returned a IGraphActionResult to make use of `this.BadRequest()` which will add the friendly error messages to the outgoing response automatically. But we could have easily just returned null, thrown an exception or generated a generic custom error message. However you choose to deal with `ModelState` is up to you. 

:::tip
GraphQL will validate the data but it doesn't take action when model validation fails. That's up to you. If a valid query is provided your action method will be invoked.
:::

<br />

⚠️ **Implementation Note**

GraphQL makes use of the same `System.ComponentModel.DataAnnotations.Validator` that ASP.NET does to validate its input objects. [All the applicable rules](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation?view=aspnetcore-7.0) that apply to Web API model validation also apply to GraphQL.

However, where Web API will validate model binding rules and represent binding errors it its ModelState object (such as invalid or missing property names)  GraphQL will not. GraphQL binding issues such as type expressions and nullability are taken care of at the query level, long before a query plan is finalized and the action method is invoked. The model state of GraphQL ASP.NET is a close approximation of Web API's model state object, but it is not an exact match.