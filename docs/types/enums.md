---
id: enums
title: Enums
sidebar_label: Enums
---

The `ENUM` graph type is represented by an `enum` type in .NET. The naming and exclusion rules used with [object types](./objects) apply in the same manner to enums.

By Default:

-   An `ENUM` graph type will have the same name as its `enum` type in your code.
-   All declared enum values are included, including compound values.

<div class="sideBySideCode hljs">
<div>

```csharp
// DonutType.cs
public enum DonutType
{
    Glazed,
    Cake,
    Custard,
    Jelly,
    SugarCoated,
}
```

</div>
<div>

```
# GraphQL Type Definition
enum DonutType {
  GLAZED
  CAKE
  CUSTARD
  JELLY
  SUGARCOATED
}
```

</div>
</div>
<br/>

Compound Values are represented as their own enum value option.

<div class="sideBySideCode hljs">
<div>

```csharp
// DonutType.cs
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

</div>
<div>

```
# GraphQL Type Definition
enum DonutType {
  GLAZED
  CAKE
  CUSTARD
  JELLY
  SUGARCOATED
  FILLED
}
```

</div>
</div>

## Excluding an Enum Value

Use the `[GraphSkip]` attribute to omit a value from the graph. A query will be rejected if it attempts to submit a valid, yet omitted, enum value.

<div class="sideBySideCode hljs">
<div>

```csharp
// DonutType.cs
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

</div>
<div>

```
# GraphQL Type Definition
enum DonutType {
  GLAZED
  CAKE
  CUSTARD
  JELLY
}
```

</div>
</div>
<br/>

## Custom Type Name

Like with other graph types use the `[GraphType]` attribute to indicate a custom name for the enumeration in the object graph.

<div class="sideBySideCode hljs">
<div>

````csharp
```csharp
[GraphType("Donut_Type")]
public enum DonutType
{
    Glazed,
    Cake,
    Custard,
    Jelly,
    SugarCoated,
}
````

</div>
<div>

```
# GraphQL Type Definition
enum Donut_Type {
  GLAZED
  CAKE
  CUSTARD
  JELLY
  SUGARCOATED
}
```

</div>
</div>

## Custom Value Names

Use `[GraphEnumValue]` to declare a custom name for the enum value and GraphQL will automatically handle the name translation when parsing a query document. A target schema's naming format rules will be applied and enforced on the name provided.

<div class="sideBySideCode hljs">
<div>

```csharp
// DonutType.cs
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

</div>
<div>

```
# GraphQL Type Definition
enum DonutType {
  GLAZED
  CAKE
  CUSTARD
  JELLY
  SUGAR_COATED
}
```

</div>
</div>
<br/>
