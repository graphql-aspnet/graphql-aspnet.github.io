---
id: what-is-graphql
title: What is GraphQL?
sidebar_label: What is GraphQL?
sidebar_position: 0
---

[GraphQL](https://graphql.org) is a query language originally created by [Facebook](https://facebook.com) in 2012 for their own internal use. It was eventually open-sourced and moved to its own foundation, the [GraphQL Foundation](https://foundation.graphql.org/), and hosted by the [Linux Foundation](https://www.linuxfoundation.org/). The query language provides an alternative to traditional REST queries that we all know and love in giving the requestor more control over what data to return.

With REST someone may requst data by querying against a URL with the `GET` HTTP verb. It's up to the server to decide what fields to return.

```javascript title="Sample REST  Query"
//REST Request:
GET https://www.the-rebel-alliance.site/directory/persons/1

// Response
{
    "id": 1,
    "name": "Luke Skywalker",
    "department": "Tatooine",
    "favoriteSong": "Papa Was a Rollin' Stone",
}
```

But with GraphQL a user _describes_ the data they want in their request to the GraphQL server.

```graphql title="Sample GraphQL Query"
query {
    person(id: 1){
        name
        department
        favoriteSong
    }
}

// Response
{
    "data": {
        "person": {
            "name": "Luke Skywalker",
            "department": "Tatooine",
            "favoriteSong": "Papa Was a Rollin' Stone",
        }
    }
}
```

## Is it Better than REST?

Nope! As with any choice in technology there are pros and cons. It comes down to what trade offs you're willing to accept. Using `GraphQL` or `REST` or `gRPC` or `Carrier Pigeon` for communicating between clients is never a cut and dry decision. Your team's needs are going to be different than others. To claim that GraphQL should replace REST would be short sighted.

One of the primary benefits of GraphQL is the requestor only gets the data they need. In the REST example above no choice was given for the JSON object that was generated All 4 fields were (and always will be) returned. In the second example notice that we specified only to return `name`, `department` and `favoriteSong`. We already know the `id` in this instance and returning isn't necessary. For two characters of data that's not a big deal, but if the the REST response included a detailed biography of the person, returning that amount of data when its not needed (such as on a search page) could hamper performance. The issue compounds itself when we start dealing with parent-child relationships and hundreds of rows of data. Being able to ignore a field could mean the difference between a 50KB result and a 50MB result.

## GraphQL is not a .NET Technology

GraphQL is a [specification](https://graphql.github.io/graphql-spec/) , a contract, describing a syntax and rule set for how to process requests for data. There are many implementations of GraphQL for various tech stacks from JavaScript, to Java, to Ruby and even other .NET implementations to choose from.

#### Other Popular GraphQL Implementations

| Library Name                                                    | Language   |
| --------------------------------------------------------------- | ---------- |
| [Apollo Server](https://github.com/apollographql/apollo-server) | JavaScript |
| [GraphQL Ruby](https://graphql-ruby.org/)                       | Ruby       |
| [GraphQL Java](https://www.graphql-java.com/)                   | Java       |
| [GraphQL .NET](https://github.com/graphql-dotnet/graphql-dotnet)                                                | .NET       |
| [Hot Chocolate](https://github.com/ChilliCream/hotchocolate)    | .NET       |

## Why Choose GraphQL?

_`"Can we add one more thing?"`_

Have you ever heard that in a stand-up meeting? Lets say your team is building a website to show a list of all the members of the rebel alliance. The original specs of a REST end point calls for the return of an object in the above example. Then, for the 2nd time this week, the product owner decided to make a change. "Hey, lets add everybody's direct manager's name to their employee card!", Karen said. The project manager sighs audibly, Dave rolls his eyes and now you have to make a code change to return the new field from the endpoint.

With GraphQL the **requestor**, that is the client application, adds the new field to their query and the data is automatically returned. Since they have to update the UI they are going to be impacted anyways so no additional harm done. From the back-end though, using GraphQL means there is no need for a server update; no change request, additional QA, no PR approvals and most importantly no new deployment. Server-side code tends to be scrutinized a lot more than client-side code and for good reason. The fewer changes we have to make to a production server the better! This is, of course, dependent on how you design your object graph but with a little forward thinking you can greatly minimize the required server changes once you setup your schema.
