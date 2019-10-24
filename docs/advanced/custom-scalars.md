---
id: custom-scalars
title: Custom Scalars
sidebar_label: Custom Scalars
---

Scalars are the most basic, fundamental unit of content in GraphQL. It is one of two leaf types (the other being [ENUMS](../types/enums)). When a query is resolved the returned data will be a set of nested key/value pairs where every key is a string and every value is either another set of key/value pairs, an enum or a scalar.

Enums, being a type of their own, are very straight forward in .NET. Scalars, however; can be anything. For instance, the `Uri` scalar is represented in GraphQL by a string. On the server though, we convert it into a `System.Uri` object, with all the extra features that go along with it.

This can be done for any value that can be represented as a simple string of characters. When you create a scalar you declare its .NET type, provide a resolver that accepts raw data from a query (a `ReadOnlySpan<char>`) and returns the completed scalar value.

Lets say we wanted to build a scalar called `Money` that can handle both an amount and currency symbol. We might accept it in a query like this:

<div class="sideBySideCode hljs">
<div>

```csharp
// C# Controller
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
    public Money(char symbol, decimal price)
    {
        this.Symbol = symbol;
        this.Price = price;
    }

    public char Symbol { get; }
    public decimal Price { get; }
}
```

</div>
<div>

```javascript
query {
    search(minPrice: "$18.45"){
        id
        name
    }
}
```

</div>
</div>
<br/>

The query supplies the data as a quoted string, `"$18.45"`, but our action method receives a `Money` object. Internally, GraphQL senses that the value should be `Money` from the schema definition and invokes the correct graph type to resolve the value and generate the .NET object that can be passed to our action method.

## Implement IScalarGraphType

To create a scalar graph type we need to implement `IScalarGraphType` and register it with GraphQL. The methods and properties of `IScalarGraphType` are as follows:

```csharp
{
    public interface IScalarGraphType
    {
        string Name { get; }
        string InternalName { get; }
        string Description { get; }
        TypeKind Kind { get; }
        bool Publish { get; }
        ScalarValueType ValueType { get; }
        Type ObjectType { get; }
        TypeCollection OtherKnownTypes { get; }
        IScalarValueResolver SourceResolver { get; }
        IScalarValueSerializer Serializer { get; }

        bool ValidateObject(object item);
    }

    public interface IScalarValueResolver
    {
        object Resolve(ReadOnlySpan<char> data);
    }

    public interface IScalarValueSerializer
    {
        object Serialize(object item);
    }
}
```

### IScalarGraphType Members

-   `Name`: The name of this scalar in GraphQL. This is the name that will be displayed in introspection queries.
-   `InternalName`: An alternative name representing the scalar in server side code. This name is commonly used in logging messages and exceptions to identify the scalar in terms of the server. Its common to use the fully qualified name, i.e. `System.String`.
-   `Description`: The phrase that will be displayed describing the scalar in introspection queries.
-   `Kind`: Scalars must always be declared as `TypeKind.SCALAR`.
-   `Publish`: Indicates if the scalar should be published for introspection queries. Unless there is a very strong reason not to, scalars should always be published. Set this value to `true`.
-   `ValueType`: A set of flags indicating what type of source data, read from a query, this scalar is capable of processing (string, number or boolean). GraphQL will do a preemptive check and if the query document does not supply the data in the correct format it will not attempt to resolve the scalar. Most custom scalars will use `ScalarValueType.String`.
-   `ObjectType`: The primary, internal type representing the scalar in .NET. In our example above we would set this to `typeof(Money)`.
-   `OtherKnownTypes`: A collection of other potential types that could be used to represent the scalar in a controller class. For instance, integers can be expressed as `int` or `int?`. Most scalars will provide an empty list (e.g. `TypeCollection.Empty`).
-   `SourceResolver`: An object that implements `IScalarValueResolver` that converts raw input data into the scalar's primary `ObjectType`.
-   `Serializer`: An object that implements `IScalarValueSerializer` that converts the internal representation of the scalar (a class or struct) to a valid graphql scalar (a number, string or boolean).
-   `ValidateObject(object)`: A method used when validating data returned from a a field resolver. GraphQL will call this method and provide the value from the resolver to determine if its acceptable and should continue resolving child fields.

> `ValidateObject(object)` should not attempt to enforce nullability rules. In general, all scalars should return `true` if the provided object is `null`.

### IScalarValueResolver Members

-   `Resolve(ReadOnlySpan<char>)`: A resolver function capable of converting an array of characters into the internal representation of the type.

#### Dealing with Escaped Strings

The span provided to `IScalarValueResolver.Resolve` will be the raw data read from the query document. If the data represents a string, it will be provided in its delimited format. This means being surrounded by quotes as well as containing escaped characters (including unicode characters):

Example string data:

-   `"quoted string"`
-   `"""triple quoted string"""`
-   `"With \"\u03A3scaped ch\u03B1racters\""`;

The `StringScalarType` provides a handy static method for converting the data if you don't need to do anything special with it, `StringScalarType.UnescapeAndTrimDelimiters`.

Calling `UnescapeAndTrimDelimiters` with the previous examples produces:

-   `quoted string`
-   `triple quoted string`
-   `With "Σscaped chαracters"`

#### Indicating an Error

When resolving input values with `Resolve()`, if the provided value is not usable and must be rejected then the entire query document must be rejected. For instance, if a document contained the value `"$15.R0"` for our money scalar. Throw an exception and GraphQL will automatically generate a response error with the correct origin information indicating the line and column in the query document where the error occurred.

If you throw `UnresolvedValueException` your error message will be delivered verbatim to the requestor as a normal error message. GraphQL will obfuscate any other exception type to a generic message and only expose your exception details if allowed by the [schema configuration](../reference/schema-configuration).

### IScalarValueSerializer Members

-   `Serialize(object)`: A serializer that converts the internal representation of the scalar to a [graphql compliant scalar value](https://graphql.github.io/graphql-spec/June2018/#sec-Scalars); a `number`, `string`, `bool` or `null`.
    -   When converting to a number this can be any number value type (int, float, decimal etc.).

> An `IScalarValueSerializer` must return a valid graphql scalar type.

Taking a look at the at the serializer for the `Guid` scalar type we can see that while internally the `System.Guid` struct represents the value we convert it to a string when serializing it. Most scalar implementations will serialize to a string.

```csharp
public class GuidScalarSerializer : IScalarValueSerializer
{
    public override object Serialize(object item)
    {
        if (item == null)
            return item;

        return ((Guid)item).ToString();
    }
}
```

---

The Completed Money Scalar:

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

        public IScalarValueResolver SourceResolver { get; } = new MoneyScalarTypeResolver();

        public IScalarValueSerializer Serializer { get; } = new MoneyScalarTypeSerializer()

        public bool ValidateObject(object item)
        {
            if (item == null)
                return true;

            return item.GetType() == typeof(Money);
        }
    }

    public class MoneyScalarTypeResolver : IScalarValueResolver
    {
        public object Resolve(ReadOnlySpan<char> data)
        {
            // example only, more validation code is needed
            var sanitizedMoney = StringScalarType.UnescapeAndTrimDelimiters(data);
            if(sanitizedMoney == null || sanitizedMoney.Length < 2)
                throw new UnresolvedValueException("Money must be at least 2 characters");

            return new Money(sanitizedMoney[0], Decimal.Parse(sanitizedMoney.Substring(1)));
        }
    }
    public class MoneyScalarTypeSerializer : IScalarValueSerializer
    {
        public override object Serialize(object item)
        {
            if (item == null)
                return item;

            var money = (Money)item;
            return $"{money.Symbol}{money.Price}";
        }
    }
```

## Registering A Scalar

The last step in declaring a scalar is to register it with the runtime. Scalars are schema agnostic. They sit outside of any dependency injection context and must be registered directly with GraphQL.

```csharp
// Startup.cs (other code)
public void ConfigureServices(IServiceCollection services)
{
    // register the scalar to the global provider
    // BEFORE a call to .AddGraphQL()
    GraphQLProviders.ScalarProvider.RegisterCustomScalar(new MoneyScalarType());

    services.AddMvc()
            .AddGraphQL();
}
```

Since our scalar is, internally, represented by a class, if we don't pre-register it GraphQL will attempt to parse the `Money` class as an object graph type. Once registered as a scalar, any attempt to use `Money` as an object graph type will cause an exception.

## When Developing a Scalar

A few points about designing your scalar:

-   Scalar types must be thread safe.
-   Scalar types should work in isolation.
    -   The `ReadOnlySpan<char>` provided to the `Resolve()` method should be all the data needed to generate a value. If you find yourself fetching data or doing key lookups, chances are that logic belongs in your controller methods or your scalar is too complex.
-   Scalar types should be simple.
    -   If you have a lot of logic to unpack a string to create your scalar consider using a regular object graph type instead.
-   A scalar type is a singleton instance.
    -   Scalar types exist for the lifetime of the server instance.
    -   Scalar types should not track any state or depend on any stateful objects.
-   `IScalarValueResolver.Resolve` must be fast! Since your resolver is used to construct a query plan, it'll be called much more often than any controller action method.

## Aim for Fewer Scalars

Avoid the urge to start declaring a lot of custom scalars. In fact, chances are that you'll never need to create one. In our example we could have represented our money scalar as an object graph type:

<div class="sideBySideCode hljs">
<div>

```csharp
// C# Controller
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
    public string Symbol { get; }
    public decimal Price { get; }
}
```

</div>
<div>

```javascript
query {
    search(minPrice: {
            symbol: "$"
            price: 18.45}){
        id
        name
    }
}
```

</div>
</div>
<br/>

This is a lot more flexible. We can add more properties to `Money` when needed and not break existing queries. Whereas with a scalar if we change the acceptable format of the string data any existing query text will now be invalid. It is almost always better to represent your data as an object or input object rather than a scalar.

> Creating a custom scalar should be a last resort, not a first option.
