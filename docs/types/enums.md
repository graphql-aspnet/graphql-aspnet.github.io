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
  FILLED
}
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

    [GraphSkip]
    SugarCoated,
}
```

```graphql  title="DonutType Type Definition"
enum DonutType {
  GLAZED
  CAKE
  CUSTARD
  JELLY
}
```

## Custom Type Name

Like with other graph types use the `[GraphType]` attribute to indicate a custom name for the enumeration in the object graph.


```csharp title="DonutType.cs"
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
enum Donut_Type {
  GLAZED
  CAKE
  CUSTARD
  JELLY
  SUGARCOATED
}
```

## Custom Value Names

Use `[GraphEnumValue]` to declare a custom name for the enum value and GraphQL will automatically handle the name translation when parsing a query document. A target schema's naming format rules will be applied and enforced on the name provided.

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
