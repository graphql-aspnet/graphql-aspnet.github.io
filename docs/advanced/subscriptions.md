---
id: subscriptions
title: Subscriptions
sidebar_label: Subscriptions
---

Subscriptions and hardening the primary library is our current focus. Once both are complete we'll be ready to move from Beta to v1.0.

~~The first preview of subscriptions will be available in mid November around Thanksgiving.~~

**Update (Feb 2020):** Unfortunately subscriptions have been delayed. Our original thoughts for subscriptions didn't pass muster when it came to stability and scalability for larger installations and daily life (the 9-5 job) got in the way around the first of the year.  It is still our active area of development. We hope to be ready to begin beta testing soon.

In short we are:

-   Conforming to the [GraphQL over WebSocket](https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md) protocol defined by Apollo.
-   Provide a set of interfaces to plug in your own messaging implementation as needed.
