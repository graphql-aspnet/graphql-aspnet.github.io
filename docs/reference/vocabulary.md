This documentation uses a number of terms to refer to the various pieces of the library:

### Schema
This is the set of data types, their fields, input arguments etc. that are exposed on an object graph. When you write a graphql query to return data the fields you request, their arguments and their children must all be defined on a schema that graphql will validate your query against.  

> In GraphQL ASP.NET the schema is generated at runtime directly from your C# controllers; there is no additional boilerplate code necessary to define a schema.

Your schema is "generated" at runtime by analyzing your model classes, controllers and action methods then populating a `GraphSchema` container with the appropriate graph types to map graphql requests to your controllers. 

### Fields & Resolvers
In GraphQL terms, a field is any requested piece of data (such as an id or  name).  A resolver fulfills the request for data from a schema field. It takes in a set of input arguments and produces a piece of data that is returned to the client. In GraphQL ASP.NET your controller methods act as resolvers for top level fields in any query.

### Graph Type

A graph type is an entity on your object graph; a droid, a donut, a string, a number etc.  In GraphQL ASP.NET your model classes, interfaces, enums, controllers etc. are compiled into the various graph types required by the runtime.

#### Root Graph Types
There are three root graph types in GraphQL: Query, Mutation, Subscription. Whenever you make a graphql request, you always specify which query root you are targeting. This documentation will usually refer to all operations as "queries" but this includes mutations and subscriptions as well.

### Query Document
This is the raw query string submitted by a client. When GraphQL accepts a query it is converted from a string to an internal document format that is parsed and used to fulfill the request.  

> Queries, Mutations and Subscriptions are all types of query documents.

