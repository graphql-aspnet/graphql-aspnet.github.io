---
id: enums
title: Enums
sidebar_label: Enums
sidebar_position: 4
---

The `ENUM` graph type is represented by an `enum` type in .NET. The naming and exclusion rules used with [object types](./objects) apply in the same manner to enums.

By Default:

-   An `ENUM` graph type will have the same name as its `enum` type in your code.
-   All declared enum values are included, including compound values.

```csharp title="DonutType.cs"
public enum DonutType
{
    Glazed,
    Cake,
    Custard,
    Jelly,
    SugarCoated,
}
```

```graphql  title="DonutType Type Definition"
enum DonutType {
  GLAZED
  CAKE
  CUSTARD
  JELLY
  SUGARCOATED
}
```

Compound Values are represented as their own enum value option.


```csharp title="DonutType.cs"
public enum DonutType
{
    Glazed,
    Cake,
    Custard,
    Jelly,
    SugarCoated,
    // highlight-next-line
    Filled = Custard | Jelly
}
```

```graphql  title="DonutType Type Definition"
enum DonutType {
  GLAZED
  CAKE
  CUSTARD
  JELLY
  SUGARCOATED
  // highlight-next-line
  FILLED
}
```

## Including an Enum in Your Schema

An enum graph type is automatically created from a .NET enum if it is:

*  Used as a parameter to an action method
*  Used as a return value of an action method
*  Used as a parameter or return type of any property or method of any included class or struct.

```csharp title="DonutController.cs"
public class DonutController : GraphController 
{
  [QueryRoot]
  // highlight-next-line
  public int RetrieveDonutCount(DonutType donutType)
  {
    /* ... */
  }
}
```

You can also explicitly add an enum at start up:

```csharp title="Startup code"
services.AddGraphQL(options => 
{
   options.AddGraphType<DonutType>();
});
```

## Excluding an Enum Value

Use the `[GraphSkip]` attribute to omit a value from the schema. A query will be rejected if it attempts to submit an omitted enum value.


```csharp title="DonutType.cs"
public enum DonutType
{
    Glazed,
    Cake,
    Custard,
    Jelly,

    // highlight-next-line
    [GraphSkip]
    SugarCoated,
}
```

```graphql  title="DonutType Type Definition"
# Sugar Coated is not part of the enum type
enum DonutType {
  GLAZED
  CAKE
  CUSTARD
  JELLY
}
```

:::caution 
An excluded enum value is not just hidden, its NOT part of the schema. Any attempt to use it as a value in a query, a variable or as a result from a field resolution will cause a validation error.
:::

## Custom Type Name

Like with other graph types, use the `[GraphType]` attribute to indicate a custom name for the enum in the schema.


```csharp title="DonutType.cs"
// highlight-next-line
[GraphType("Donut_Type")]
public enum DonutType
{
    Glazed,
    Cake,
    Custard,
    Jelly,
    SugarCoated,
}
```

```graphql  title="DonutType Type Definition"
// highlight-next-line
enum Donut_Type {
  GLAZED
  CAKE
  CUSTARD
  JELLY
  SUGARCOATED
}
```

## Custom Value Names

Use `[GraphEnumValue]` to declare a custom name for the enum value and GraphQL will automatically handle the name translation when parsing a query document. A target schema's naming format rules will be applied and enforced on the value provided.

```csharp title="DonutType.cs"
public enum DonutType
{
    Glazed,
    Cake,
    Custard,
    Jelly,

    [GraphEnumValue("Sugar_Coated")]
    SugarCoated,
}
```


```graphql  title="DonutType Type Definition"
enum DonutType {
  GLAZED
  CAKE
  CUSTARD
  JELLY
  SUGAR_COATED
}
```

## Value Name Formatting

By default, enum values are rendered in all CAPITAL LETTERS. This is the standard convention for GraphQL. If, however; you'd prefer something different you can override the defaults by creating a new `GraphNameFormatter` on your [schema configuration](../reference/schema-configuration.md#graphnamingformatter).

```csharp title="Startup Code"
services.AddGraphQL(o => {
  // highlight-start
  var customFormatter = new GraphNameFormatter(enumValueStrategy: GraphNameFormatStrategy.ProperCase);
  o.DeclarationOptions.GraphNamingFormatter = customFormatter;
  // highlight-end
})
```

```graphql title="Sample Formatting"
enum DonutType {
  Glazed
  Cake
  Custard
  Jelly
}
```
:::tip
If you need something even more exotic, inherit from `GraphNameFormatter` and override the various methods as you see fit.
:::