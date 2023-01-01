---
id: custom-scalars
title: Custom Scalars
sidebar_label: Custom Scalars
sidebar_position: 3
---

Scalars are the most basic, fundamental unit of content in GraphQL. It is one of two leaf types (the other being [ENUMS](../types/enums)). When a query is resolved the returned data will be a set of nested key/value pairs where every key is a string and every value is either another set of key/value pairs, an enum or a scalar.

Enums, being a type of their own, are very straight forward in .NET. Scalars, however; can be anything. For instance, the `Uri` scalar is represented in GraphQL by a string. On the server though, we convert it into a `System.Uri` object, with all the extra features that go along with it.

This can be done for any value that can be represented as a simple set of characters. When you create a scalar you declare its .NET type, provide a value resolver that accepts raw data from a query (a `ReadOnlySpan<char>`) and returns the completed scalar value.

Lets say we wanted to build a scalar called `Money` that can handle both an amount and currency symbol. We might accept it in a query like this:

```csharp title="Declaring a Money Scalar"
public class InventoryController : GraphController
{
    [QueryRoot("search")]
    // highlight-next-line
    public IEnumerable<Product> Search(Money minPrice)
    {
        return _service.RetrieveProducts(
            minPrice.Symbol,
            minPrice.Price);

    }
}

public class Money
{
    public Money(char symbol, decimal price)
    {
        this.Symbol = symbol;
        this.Price = price;
    }

    public char Symbol { get; }
    public decimal Price { get; }
}
```

```graphql title="Using the Money Scalar"
query {
    # highlight-next-line
    search(minPrice: "$18.45"){
        id
        name
    }
}
```


The query supplies the data as a quoted string, `"$18.45"`, but our action method receives a `Money` object. Internally, GraphQL senses that the supplied string value should be `Money` from the schema definition and invokes the correct resolver to parse the value and generate the .NET object that can be passed to our action method.

## Implement IScalarGraphType

To create a scalar we need to implement `IScalarGraphType` and register it with GraphQL. The methods and properties of `IScalarGraphType` are as follows:

```csharp title="IScalarGraphType.cs"
public interface IScalarGraphType
{
    string Name { get; }
    string InternalName { get; }
    string Description { get; }
    string SpecifiedByUrl { get; }
    TypeKind Kind { get; }
    bool Publish { get; }
    ScalarValueType ValueType { get; }
    Type ObjectType { get; }
    TypeCollection OtherKnownTypes { get; }
    ILeafValueResolver SourceResolver { get; }

    object Serialize(object item);
    string SerializeToQueryLanguage(object item);
    bool ValidateObject(object item);
}

public interface ILeafValueResolver
{
    object Resolve(ReadOnlySpan<char> data);
}
```

### IScalarGraphType Members

-   `Name`: The name of this scalar in GraphQL. This is the name that will be displayed in introspection queries.
-   `InternalName`: An alternative name representing the scalar in server side code. This name is commonly used in logging messages and exceptions to identify the scalar in terms of the server. Its common to use the fully qualified name, i.e. `"MyNameSpace.Money"`.
-   `Description`: The phrase that will used to describe the scalar in introspection queries.
-   `Kind`: Scalars must always be declared as `TypeKind.SCALAR`.
-   `Publish`: Indicates if the scalar should be published for introspection queries. Unless there is a very strong reason not to, scalars should always be published. Set this value to `true`.
-   `ValueType`: A set of flags indicating what type of source data, read from a query, this scalar is capable of processing (string, number or boolean). GraphQL will do a preemptive check and if the query document does not supply the data in the correct format it will not attempt to resolve the scalar. Most custom scalars will use `ScalarValueType.String`.
-   `SpecifiedByUrl`: A url, formatted as a string, pointing to information or the specification that defines this scalar. (optional, can be null)
-   `ObjectType`: The primary, internal type representing the scalar in .NET. In our example above we would set this to `typeof(Money)`.
-   `OtherKnownTypes`: A collection of other potential types that could be used to represent the scalar in a controller class. For instance, integers can be expressed as `int` or `int?`. Most scalars will provide an empty list (e.g. `TypeCollection.Empty`).
-   `SourceResolver`: An object that implements `ILeafValueResolver` which can convert raw input data into the scalar's primary `ObjectType`.
-   `Serialize(object)`: A method that converts an instance of your scalar to a leaf value that is serializable in a query response
    -   This method must return a `number`, `string`, `bool` or `null`.
    -   When converting to a number this can be any C# number value type (int, float, decimal etc.).
-   `SerializeToQueryLanguage(object)`: A method that converts an instance of your scalar to a string representing it if it were declared as part of a schema language type definition. 
    - This method is used when generated default values for field arguments and input object fields via introspection queries.
    - This method must return a value exactly as it would appear in a schema type definition For example, strings must be surrounded by quotes.
    
-   `ValidateObject(object)`: A method used when validating data returned from a a field resolver. GraphQL will call this method and provide an object instance to determine if its acceptable and can be used in a query result.

:::note
 `ValidateObject(object)` should not attempt to enforce nullability rules. In general, all scalars "could be null" depending on their usage in a schema. All scalars should return `true` for a validation result if the provided object is `null`.
:::

### ILeafValueResolver

ILeafValueResolver contains a single method:

-   `Resolve(ReadOnlySpan<char>)`: A resolver function used for converting an array of characters into the internal representation of the scalar.

#### Dealing with Escaped Strings

The span provided to `ILeafValueResolver.Resolve` will be the raw data read from the query document. If the data represents a string, it will be provided in its delimited format. This means being surrounded by quotes as well as containing escaped characters (including escaped unicode characters):

Example data:

-   `"quoted string"`
-   `"""triple quoted string"""`
-   `"With \"\u03A3scaped ch\u03B1racters\""`;

The static method `GraphQLStrings.UnescapeAndTrimDelimiters` provides a handy way for unescaping the data if you don't need to do anything special with it.

Calling `GraphQLStrings.UnescapeAndTrimDelimiters` with the previous examples produces:

-   `quoted string`
-   `triple quoted string`
-   `With "Σscaped chαracters"`

#### Indicating an Error

When resolving incoming values with `Resolve()`, if the provided value is not usable and must be rejected then the entire query document must be rejected. For instance, if a document contained the value `"$15.R0"` for our money scalar it would need to be rejected because `15.R0` cannot be converted to a decimal. 

Throw an exception when this happens and GraphQL will automatically generate an appropriate response with the correct origin information indicating the line and column in the query document where the error occurred. However, like with any other encounterd exception, the library will obfuscate it to a generic message and only expose your exception details if allowed by the [schema configuration](../reference/schema-configuration).

:::tip Pro Tip!
If you throw the special `UnresolvedValueException` your error message will be delivered verbatim to the requestor as part of the response message instead of being obfuscated. 
:::

### Example: Money Scalar
The completed Money custom scalar type

```csharp

    public class MoneyScalarType : IScalarGraphType
    {
        public string Name => "Money";

        public string InternalName => typeof(Money).FullName;

        public string Description => string.Empty;

        public TypeKind Kind => TypeKind.SCALAR;

        public bool Publish => true;

        public ScalarValueType ValueType => ScalarValueType.String;

        public Type ObjectType => typeof(Money);

        public TypeCollection OtherKnownTypes => TypeCollection.Empty;

        public ILeafValueResolver SourceResolver { get; } = new MoneyValueResolver();
        
        public object Serialize(object item)
        {
            if (item == null)
                return item;

            var money = (Money)item;
            return $"{money.Symbol}{money.Price}";
        }
        
        public string SerializeToQueryLanguage(object item)
        {
            // convert to a string first
            var serialized = this.Serialize(item);
            if (serialized == null)
                return "null";

            // return value as quoted
            return $"\"{serialized}\"";
        }

        public bool ValidateObject(object item)
        {
            if (item == null)
                return true;

            return item.GetType() == typeof(Money);
        }
    }

    public class MoneyValueResolver : ILeafValueResolver
    {
        public object Resolve(ReadOnlySpan<char> data)
        {
            // example only, more validation code is needed to fully validate 
            // the data
            var sanitizedMoney = GraphQLStrings.UnescapeAndTrimDelimiters(data);
            if(sanitizedMoney == null || sanitizedMoney.Length < 2)
                throw new UnresolvedValueException("Money must be at least 2 characters");

            return new Money(sanitizedMoney[0], Decimal.Parse(sanitizedMoney.Substring(1)));
        }
    }
```

## Registering A Scalar

The last step in declaring a scalar is to register it with the runtime. Scalars are schema agnostic. They sit outside of any dependency injection context and must be registered directly with GraphQL.

```csharp title="Register The Money Scalar "
// register the scalar type to the global provider
// BEFORE calling .AddGraphQL()
GraphQLProviders.ScalarProvider.RegisterCustomScalar(typeof(MoneyScalarType));

services.AddGraphQL();
```

:::info 
Since our scalar is represented by a .NET class, if we don't pre-register it GraphQL will attempt to parse the `Money` class as an input object graph type. Once registered as a scalar, any attempt to use `Money` as an object graph type will cause an exception.
:::

## @specifiedBy Directive

GraphQL provides a special, built-in directive called `@specifiedBy` that allows you to supply a URL pointing to a the specification for your custom scalar. This url is used by various tools to link to additional data for you or your customers so they know how to interact with your scalar type. It is entirely optional.

The @specifiedBy directive can be applied to a scalar in all the same ways as other type system directives or by use of the special `[SpecifiedBy]` attribute.

```csharp title="Applying the @specifiedBy"
// apply the directive to a single schema at startup
services.AddGraphQL(o => {
// highlight-start
    o.ApplyDirective("@specifiedBy")
     .WithArguments("https://myurl.com")
     .ToItems(item => item.Name == "Money");
// highlight-end
});

// via the [ApplyDirective] attribute
// for all schemas
// highlight-next-line
[ApplyDirective("@specifiedBy", "https://myurl.com")]
public class MoneyScalarType : IScalarGraphType
{}

// via the special [SpecifiedBy] attribute
// for all schemas
// highlight-next-line
[SpecifiedBy("https://myurl.com")]
public class MoneyScalarType : IScalarGraphType
{}

// as part of the contructor
// for all schemas
public class MoneyScalarType : IScalarGraphType
{
    public MoneyScalarType()
    {
        // highlight-next-line
        this.SpecifiedByUrl = "https://myurl.com";
    }
}
```

## Tips When Developing a Scalar

A few points about designing your scalar:

-   Looking through the [built in scalars](https://github.com/graphql-aspnet/graphql-aspnet/tree/master/src/graphql-aspnet/Schemas/TypeSystem/Scalars) can be helpful when designing your own.
-   Scalar types are expected to be thread safe.
-   The runtime will pass a new instance of your scalar graph type to each registered schema. It must be declared with a public, parameterless constructor.
-   Scalar types should be simple and work in isolation.
-   The `ReadOnlySpan<char>` provided to `ILeafValueResolver.Resolve` should be all the data needed to generate a value, there should be no need to perform side effects or fetch additional data.
-   Scalar types should not track any state, depend on any stateful objects, or attempt to use any sort of dependency injection.
-   `ILeafValueResolver.Resolve` must be **FAST**! Since your resolver is used to construct an initial query plan from the raw query text, it'll be called many orders of magnitude more often than any other method.

### Aim for Fewer Scalars

Avoid the urge to start declaring a lot of custom scalars. In fact, chances are that you'll never need to create one. In our example we could have represented our money scalar as an INPUT_OBJECT graph type:

```csharp title="Money as an Input Object Graph Type"
public class InventoryController : GraphController
{
    [QueryRoot("search")]
    public IEnumerable<Product> Search(Money minPrice)
    {
        return _service.RetrieveProducts(
            minPrice.Symbol,
            minPrice.Price);
    }

}

public class Money
{
    public string Symbol { get; set; }
    public decimal Price { get; set; }
}
```

```graphql title="Using the Money Input Object"
query {
    search(minPrice: {symbol: "$" price: 18.45}){
        id
        name
    }
}
```


This is a lot more flexible. We can add more properties to `Money` when needed and not break existing queries. Whereas with a scalar if we change the acceptable format of the string data any existing applications using our graph may need to be updated. It is almost always better to represent your data as an input object rather than a custom scalar.

:::caution Be Careful
Creating a custom scalar should be a last resort, not a first option.
:::
