"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3669],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=i.createContext({}),u=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=u(e.components);return i.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},h=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(n),h=r,m=p["".concat(l,".").concat(h)]||p[h]||d[h]||o;return n?i.createElement(m,a(a({ref:t},c),{},{components:n})):i.createElement(m,a({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:r,a[1]=s;for(var u=2;u<o;u++)a[u]=n[u];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}h.displayName="MDXCreateElement"},2801:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var i=n(7462),r=(n(7294),n(3905));const o={id:"subscriptions",title:"Subscriptions",sidebar_label:"Subscriptions",sidebar_position:0},a=void 0,s={unversionedId:"advanced/subscriptions",id:"advanced/subscriptions",title:"Subscriptions",description:"Initial Setup",source:"@site/docs/advanced/subscriptions.md",sourceDirName:"advanced",slug:"/advanced/subscriptions",permalink:"/docs/advanced/subscriptions",draft:!1,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"subscriptions",title:"Subscriptions",sidebar_label:"Subscriptions",sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"List & Non-Null",permalink:"/docs/types/list-non-null"},next:{title:"Type Expressions",permalink:"/docs/advanced/type-expressions"}},l={},u=[{value:"Initial Setup",id:"initial-setup",level:2},{value:"Install the Subscriptions Package",id:"install-the-subscriptions-package",level:3},{value:"Configure the Server Instance",id:"configure-the-server-instance",level:3},{value:"Create a Subscription",id:"create-a-subscription",level:3},{value:"Publish a Subscription Event",id:"publish-a-subscription-event",level:3},{value:"Subscription Event Data Source",id:"subscription-event-data-source",level:3},{value:"Summary",id:"summary",level:3},{value:"Apollo Client Example",id:"apollo-client-example",level:3},{value:"Subscription Action Results",id:"subscription-action-results",level:2},{value:"Scaling Subscription Servers",id:"scaling-subscription-servers",level:2},{value:"Custom Event Publishing",id:"custom-event-publishing",level:3},{value:"Implement <code>ISubscriptionEventPublisher</code>",id:"implement-isubscriptioneventpublisher",level:4},{value:"Consuming Published Events",id:"consuming-published-events",level:3},{value:"Azure Service Bus Example",id:"azure-service-bus-example",level:3},{value:"Subscription Server Configuration",id:"subscription-server-configuration",level:2},{value:"Security &amp; Query Authorization",id:"security--query-authorization",level:2},{value:"Query Timeouts",id:"query-timeouts",level:2},{value:"Websocket Protocols",id:"websocket-protocols",level:2},{value:"Supported Protocols",id:"supported-protocols",level:3},{value:"Creating Custom Protocols",id:"creating-custom-protocols",level:3},{value:"Other Communication Options",id:"other-communication-options",level:2},{value:"Performance Considerations",id:"performance-considerations",level:2},{value:"Event Multiplication",id:"event-multiplication",level:3},{value:"Dispatch Queue Monitoring",id:"dispatch-queue-monitoring",level:3},{value:"Default Event Alert Threshold",id:"default-event-alert-threshold",level:4},{value:"Custom Event Alert Thresholds",id:"custom-event-alert-thresholds",level:4}],c={toc:u};function p(e){let{components:t,...o}=e;return(0,r.kt)("wrapper",(0,i.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"initial-setup"},"Initial Setup"),(0,r.kt)("p",null,"Successfully handling subscriptions in your GraphQL server can be straight forward for single server environments or very complicated for multi-server and scalable solutions. First we'll look at adding subscriptions for a single server."),(0,r.kt)("h3",{id:"install-the-subscriptions-package"},"Install the Subscriptions Package"),(0,r.kt)("p",null,"The first step to using subscriptions is to install the subscription server package."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-powershell"}," PS> Install-Package GraphQL.AspNet.Subscriptions -AllowPrereleaseVersions\n")),(0,r.kt)("p",null,"This adds the necessary components to create a subscription server for a given schema such as communicating with web sockets, parsing subscription queries and responding to events."),(0,r.kt)("h3",{id:"configure-the-server-instance"},"Configure the Server Instance"),(0,r.kt)("p",null,"You must configure web socket support for your Asp.Net server instance separately. The ways in which you perform this configuration will vary widely depending on your CORS requirements, keep-alive support and other needs."),(0,r.kt)("p",null,"After web sockets are added to your server, add subscription support to the graphql registration."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Add Subscription Support"',title:'"Add',Subscription:!0,'Support"':!0},"\n// configuring services\nservices.AddWebSockets(/*...*/);\n\nservices.AddGraphQL()\n        .AddSubscriptions();\n\n// building the application pipeline\napp.UseWebSockets();\n\napp.UseGraphQL();    \n")),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"}," Don't forget to call ",(0,r.kt)("inlineCode",{parentName:"p"},".UseWebsockets()")," before calling ",(0,r.kt)("inlineCode",{parentName:"p"},".UseGraphQL()"))),(0,r.kt)("h3",{id:"create-a-subscription"},"Create a Subscription"),(0,r.kt)("p",null,"Declaring a subscription is the same as declaring a query or mutation on a controller but with ",(0,r.kt)("inlineCode",{parentName:"p"},"[Subscription]")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"[SubscriptionRoot]")," attributes. Feel free to mix subscriptions with your queries and mutations. They do not need to be kept seperate."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="SubscriptionController.cs"',title:'"SubscriptionController.cs"'},'public class SubscriptionController : GraphController\n{\n    // other code not shown for brevity\n\n    [SubscriptionRoot("onWidgetChanged", typeof(Widget), EventName = "WIDGET_CHANGED")]\n    public IGraphActionResult  OnWidgetChanged(Widget eventData, string filter){\n        if(eventData.Name.StartsWith(filter))\n        {\n            // send the data down to the listening client\n            return this.Ok(eventData);\n        }\n        else\n        {\n            // use SkipSubscriptionEvent() to disregard the data\n            // and not communicate anything to the listening client \n            return this.SkipSubscriptionEvent();\n        }\n    }\n}\n')),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Subscriptions can be asyncronous and return a ",(0,r.kt)("inlineCode",{parentName:"p"},"Task<IGraphActionResult>")," as well.")),(0,r.kt)("p",null,"Here we've declared a new subscription, one that takes in a ",(0,r.kt)("inlineCode",{parentName:"p"},"filter")," parameter to restrict the data that any subscribers receive."),(0,r.kt)("p",null,"A query to invoke this subscription may look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Sample Subscription Query"',title:'"Sample',Subscription:!0,'Query"':!0},'subscription {\n    onWidgetChanged(filter: "Big"){\n        id\n        name\n        description\n    }\n}\n')),(0,r.kt)("p",null,'Any updated widgets that start with the phrase "Big" will then be sent to the requestor as they are changed on the server. Any other changed widgets will be skipped/dropped and no data will be sent to the client.'),(0,r.kt)("h3",{id:"publish-a-subscription-event"},"Publish a Subscription Event"),(0,r.kt)("p",null,"In order for the subscription server to send data to any subscribers it has to be notified when its time to do so. It does this via named Subscription Events. These are internal, schema-unique keys that identify when something happened, usually via a mutation. Once the mutation publishes an event, the subscription server will execute the appropriate action method for any subscribers, using the supplied data, and deliver the results to the client."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="MutationController.cs"',title:'"MutationController.cs"'},'public class MutationController : GraphController\n{\n    // other code not shown for brevity\n\n    [MutationRoot("updateWidget", typeof(Widget))]\n    public async Task<IGraphActionResult> OnWidgetChanged(int id, string name){\n        var widget = _service.RetrieveWidget(id);\n        widget.Name = name;\n\n        await _service.UpdateWidget(widget);\n\n        // publish a new event to let any subscribers know\n        // something changed\n        this.PublishSubscriptionEvent("WIDGET_CHANGED", widget);\n        return this.Ok(widget);\n    }\n}\n')),(0,r.kt)("admonition",{title:"Event Names Must Match",type:"info"},(0,r.kt)("p",{parentName:"admonition"}," Notice that the event name used in ",(0,r.kt)("inlineCode",{parentName:"p"},"PublishSubscriptionEvent()")," is the same as the ",(0,r.kt)("inlineCode",{parentName:"p"},"EventName")," property on the ",(0,r.kt)("inlineCode",{parentName:"p"},"[SubscriptionRoot]")," attribute above. The subscription server will use the published event name to match which registered subscriptions need to receive the data being published.")),(0,r.kt)("h3",{id:"subscription-event-data-source"},"Subscription Event Data Source"),(0,r.kt)("p",null,"In the example above, the data sent with ",(0,r.kt)("inlineCode",{parentName:"p"},"PublishSubscriptionEvent()")," is the same as the first input parameter, called ",(0,r.kt)("inlineCode",{parentName:"p"},"eventData"),", on the subscription field, which is the same as the field return type of the subscription controller method. By default, GraphQL will look for a parameter with the same data type as its own return type and use that as the event data source. It will automatically populate this field with the data from ",(0,r.kt)("inlineCode",{parentName:"p"},"PublishSubscriptionEvent()"),"; this argument is not exposed in the object graph."),(0,r.kt)("p",null,"You can explicitly flag a different parameter, or a parameter of a different data type to be the expected event source with the ",(0,r.kt)("inlineCode",{parentName:"p"},"[SubscriptionSource]")," attribute."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Custom Event Data Source"',title:'"Custom',Event:!0,Data:!0,'Source"':!0},'public class SubscriptionController : GraphController\n{\n    [SubscriptionRoot("onWidgetChanged", typeof(Widget), EventName = "WIDGET_CHANGED")]\n    public IGraphActionResult  OnWidgetChanged(\n        [SubscriptionSource] WidgetInternal eventData,\n        string filter)\n    {\n        if(eventData.Name.StartsWith(filter))\n            return this.Ok(eventData.ToWidget());\n        return this.SkipSubscriptionEvent();\n    }\n}\n')),(0,r.kt)("p",null,"Here the subscription expects that an event is published using a ",(0,r.kt)("inlineCode",{parentName:"p"},"WidgetInternal")," data type that it will internally convert to a ",(0,r.kt)("inlineCode",{parentName:"p"},"Widget")," and send to any subscribers. This can be useful if you wish to share internal objects between your mutations and subscriptions that you don't want publicly exposed."),(0,r.kt)("admonition",{title:"Event Data Objects Must Match",type:"info"},(0,r.kt)("p",{parentName:"admonition"}," The data object published with ",(0,r.kt)("inlineCode",{parentName:"p"},"PublishSubscriptionEvent()")," must have the same type as the ",(0,r.kt)("inlineCode",{parentName:"p"},"[SubscriptionSource]")," on the subscription field.")),(0,r.kt)("h3",{id:"summary"},"Summary"),(0,r.kt)("p",null,"That's all there is for a basic subscription server setup."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Add the package reference and update startup.cs"),(0,r.kt)("li",{parentName:"ol"},"Declare a new subscription using ",(0,r.kt)("inlineCode",{parentName:"li"},"[Subscription]")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"[SubscriptionRoot]")),(0,r.kt)("li",{parentName:"ol"},"Publish an event from a mutation")),(0,r.kt)("h3",{id:"apollo-client-example"},"Apollo Client Example"),(0,r.kt)("p",null,"A complete example of single instance subscription server including a react app that utilizes the Apollo Client is available in the ",(0,r.kt)("a",{parentName:"p",href:"../reference/demo-projects"},"demo projects")," section."),(0,r.kt)("h2",{id:"subscription-action-results"},"Subscription Action Results"),(0,r.kt)("p",null,"You saw above the special action result ",(0,r.kt)("inlineCode",{parentName:"p"},"SkipSubscriptionEvent()")," used to instruct graphql to skip the received event and not tell the client about it; this can be very useful in scenarios where the subscription supplies filter data to only receive some very specific data and not all items published via a specific event."),(0,r.kt)("p",null,'Here is a complete list of the various "subscription specific" action results:'),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"SkipSubscriptionEvent()")," - Instructs the server to skip the raised event, the client will not receive any data."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"OkAndComplete(data)")," - Works just like ",(0,r.kt)("inlineCode",{parentName:"li"},"this.Ok()")," but ends the subscription after the event is completed.  The client is informed that no additional data will be sent and that the server is closing the subscription permanently. This, however; does not close the underlying websocket connection.")),(0,r.kt)("admonition",{title:"Be Careful With Sensitive Data",type:"danger"},(0,r.kt)("p",{parentName:"admonition"},"Data published via ",(0,r.kt)("inlineCode",{parentName:"p"},"PublishSubscriptionEvent()")," is sent, automatically, to all active subscriptions on the server. "),(0,r.kt)("p",{parentName:"admonition"},"If there are some scenarios where an event payload should not be shared with some connected users, be sure to enforce that business logic in your subscription method and use ",(0,r.kt)("inlineCode",{parentName:"p"},"SkipSubscriptionEvent()")," as necessary for a given data package.")),(0,r.kt)("h2",{id:"scaling-subscription-servers"},"Scaling Subscription Servers"),(0,r.kt)("p",null,"Using web sockets has a natural limitation in that any single server instance has a maximum number of socket connections that it can realistically handle before being overloaded. Additionally, all cloud providers impose an artifical limit for many of their pricing tiers. Once that limit is reached no additional clients can connect, even if the server has capacity."),(0,r.kt)("p",null,"Ok no problem, just scale horizontally, spin up additional server instances, add a load balancer and have the new requests open a web socket connection to these additional server instances, right? Not so fast."),(0,r.kt)("p",null,"With the examples above, events published by any mutation using ",(0,r.kt)("inlineCode",{parentName:"p"},"PublishSubscriptionEvent()")," are routed internally, directly to the local subscription server meaning only those clients connected to the server where the event was raised will receive it. Clients connected to other server instances will never know the event occured. This represents a big problem for large scale websites, so what do we do?"),(0,r.kt)("p",null,(0,r.kt)("a",{target:"_blank",href:n(9941).Z},"This diagram")," shows a high level differences between the default, single server configuration and a custom scalable solution."),(0,r.kt)("h3",{id:"custom-event-publishing"},"Custom Event Publishing"),(0,r.kt)("p",null,"Instead of publishing events internally, within the server instance, we need to publish our events to some intermediate source such that any server can be notified of the change. There are a variety of technologies to handle this scenario; be it a common database or messaging technologies like RabbitMQ, Azure Service Bus etc."),(0,r.kt)("h4",{id:"implement-isubscriptioneventpublisher"},"Implement ",(0,r.kt)("inlineCode",{parentName:"h4"},"ISubscriptionEventPublisher")),(0,r.kt)("p",null,"Whatever your technology of choice the first step is to create and register a custom publisher that implements ",(0,r.kt)("inlineCode",{parentName:"p"},"ISubscriptionEventPublisher"),". How your publisher class functions will vary widely depending on your implementation."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="ISubscriptionEventPublisher.cs"',title:'"ISubscriptionEventPublisher.cs"'},"public interface ISubscriptionEventPublisher\n{\n    Task PublishEvent(SubscriptionEvent eventData);\n}\n")),(0,r.kt)("p",null,"Register your publisher with the DI container BEFORE calling ",(0,r.kt)("inlineCode",{parentName:"p"},".AddGraphQL()")," and  GraphQL ASP.NET will use your registered publisher instead of its default, internal publisher."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Register Your Event Publisher"',title:'"Register',Your:!0,Event:!0,'Publisher"':!0},"services.AddSingleton<ISubscriptionEventPublisher, MyEventPublisher>();\n\nservices.AddGraphQL()\n        .AddSubscriptions();\n")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Publishing Subscription Events externally is not trivial. You'll have to deal with concerns like data serialization, package size etc. All of which are specific to your application and environment.")),(0,r.kt)("h3",{id:"consuming-published-events"},"Consuming Published Events"),(0,r.kt)("p",null,"At this point, we've successfully published our events to some external data source. Now we need to consume them. How that occurs is, again, implementation specific. Perhaps you run a background hosted service to watch for messages on an Azure Service Bus topic or perhaps you periodically pole a database table to look for new events. The ways in which data may be shared is endless."),(0,r.kt)("p",null,"Once you rematerialize a ",(0,r.kt)("inlineCode",{parentName:"p"},"SubscriptionEvent")," you need to let GraphQL know that it occurred. this is done using the ",(0,r.kt)("inlineCode",{parentName:"p"},"ISubscriptionEventRouter"),". In general, you won't need to implement your own router, just inject it into your listener then call ",(0,r.kt)("inlineCode",{parentName:"p"},"RaisePublishedEvent")," and GraphQL will take it from there."),(0,r.kt)("p",null,"The router will take care of the details in figuring out which schema the event is destined for, which clients have active subscriptions etc. and forward it accordingly."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Cusomer Event Listener Service"',title:'"Cusomer',Event:!0,Listener:!0,'Service"':!0}," public class MyListenerService : BackgroundService\n    {\n        private readonly ISubscriptionEventRouter _router;\n        private bool _notStopped = true;\n\n        public MyListenerService(ISubscriptionEventRouter router)\n        {\n            _router = router;\n        }\n\n       protected override async Task ExecuteAsync(CancellationToken t)\n        {\n            while (_notStopped)\n            {\n                SubscriptionEvent eventData = /* Fetch Next Event*/;\n                _router.RaisePublishedEvent(eventData);\n            }\n        }\n    }\n")),(0,r.kt)("h3",{id:"azure-service-bus-example"},"Azure Service Bus Example"),(0,r.kt)("p",null,"A complete example of a bare bones example, including serialization and deserialization using the Azure Service Bus is available in the ",(0,r.kt)("a",{parentName:"p",href:"../reference/demo-projects"},"demo projects")," section."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"The demo project represents a functional starting point and lacks a lot of the error handling and resilency needs of a production environment.")),(0,r.kt)("h2",{id:"subscription-server-configuration"},"Subscription Server Configuration"),(0,r.kt)("p",null,"When using the ",(0,r.kt)("inlineCode",{parentName:"p"},".AddSubscriptions()")," extension method two seperate operations occur:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"The subscription server components are registered to the DI container, the graphql execution pipeline is modified to support registering subscriptions and a middleware component is appended to the ASP.NET pipeline to intercept and communicate the correct web socket connections.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"A middleware component is appended to the end of the graphql execution pipeline to formally publish any events staged via ",(0,r.kt)("inlineCode",{parentName:"p"},"PublishSubscriptionEvent()")," "))),(0,r.kt)("p",null,"Some applications may wish to split these operations in different server instances for handling load or just splitting different types of traffic. For example, having one set of servers dedicated to query/mutation operations (stateless requests) and others dedicated to handling subscriptions and websockets (stateful requests)."),(0,r.kt)("p",null,"The following granular configuration options may be useful:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},".AddSubscriptionServer()")," :: Only configures the ASP.NET pipeline to intercept websockets and adds the subscription server components to the DI container.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},".AddSubscriptionPublishing()")," :: Only configures the graphql execution pipeline to publish events. Subscription creation and websocket support is ",(0,r.kt)("strong",{parentName:"p"},"NOT")," enabled."))),(0,r.kt)("h2",{id:"security--query-authorization"},"Security & Query Authorization"),(0,r.kt)("p",null,"Because subscriptions are long running and registered before any data is processed, the subscription server requires a ",(0,r.kt)("a",{parentName:"p",href:"../reference/schema-configuration#authorization-options"},"query authorization method")," of ",(0,r.kt)("inlineCode",{parentName:"p"},"PerRequest"),". This allows the subscription query to be fully validated before its registered with the server. This authorization method is set globally at startup and will apply to queries and mutations as well."),(0,r.kt)("p",null,"This is different than the default behavior when subscriptions are not enabled. Queries and mutations, by default, will follow a ",(0,r.kt)("inlineCode",{parentName:"p"},"PerField")," method allowing for partial query resolutions."),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"}," Adding Subscriptions to your server will force the use of ",(0,r.kt)("inlineCode",{parentName:"p"},"PerRequest")," Authorization")),(0,r.kt)("h2",{id:"query-timeouts"},"Query Timeouts"),(0,r.kt)("p",null,"By default GraphQL does not define a timeout for an executed query. The query will run as long as the underlying HTTP connection is open. This is true for subscriptions as well. Given that the websocket connection is never closed while the end user is connected, any query executed through the websocket will be allowed to run for an infinite amount of time which can have some unintended side effects and consume resources unecessarily."),(0,r.kt)("p",null,"Optionally, you can define a query timeout for a given schema, which the subscription server will obey:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Adding a Query Timeout"',title:'"Adding',a:!0,Query:!0,'Timeout"':!0},"// startup code\nservices.AddGraphQL(o =>\n{\n    // define a 2 minute timeout per query or subscription event executed.\n    o.ExecutionOptions.QueryTimeout = TimeSpan.FromMinutes(2);\n})\n")),(0,r.kt)("h2",{id:"websocket-protocols"},"Websocket Protocols"),(0,r.kt)("p",null,"Out of the box, the library supports subscriptions over websockets using ",(0,r.kt)("inlineCode",{parentName:"p"},"graphql-transport-ws"),", the modern protocol used by many client libraries. It also provides support for the legacy protocol ",(0,r.kt)("inlineCode",{parentName:"p"},"graphql-ws")," (originally maintained by Apollo). A client requesting either protocol over a websocket will work with no additional configuration."),(0,r.kt)("h3",{id:"supported-protocols"},"Supported Protocols"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md"},"graphql-transport-ws")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md"},"graphql-ws")," (",(0,r.kt)("em",{parentName:"li"},"legacy"),")")),(0,r.kt)("h3",{id:"creating-custom-protocols"},"Creating Custom Protocols"),(0,r.kt)("p",null,"If you wish to add support for your own websocket messaging protocol you need to implement two interfaces:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"ISubscriptionClientProxy")," wraps a client connection and performs all the necessary communications."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"ISubscriptionClientProxyFactory")," which is used create client proxy instances for your protocol.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="ISubscriptionClientProxyFactory.cs"',title:'"ISubscriptionClientProxyFactory.cs"'},"public interface ISubscriptionClientProxyFactory\n{\n    // Create client proxy instances that\n    // act as an intermediary to communicate server-side events\n    // to the client connection\n    Task<ISubscriptionClientProxy<TSchema>> CreateClient<TSchema>(IClientConnection connection)\n        where TSchema : class, ISchema;\n\n    // The unique name of your sub-protocol. A client connection requesting your\n    // protocol, by name, will be handed to this\n    // factory to create the appropriate client proxy.\n    string Protocol { get; }\n}\n")),(0,r.kt)("p",null,"Inject it into your DI container before calling AddGraphQL:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Register Your Protocol Client Factory"',title:'"Register',Your:!0,Protocol:!0,Client:!0,'Factory"':!0},"// startup\nservices.AddSingleton<ISubscriptionClientProxyFactory, MyClientProxyFactory>();\n\nservices.AddGraphQL()\n        .AddSubscriptions();\n")),(0,r.kt)("admonition",{title:"Create a Singleton Factory",type:"caution"},(0,r.kt)("p",{parentName:"admonition"}," ",(0,r.kt)("inlineCode",{parentName:"p"},"ISubscriptionClientProxyFactory")," is expected to be a singleton; it is only instantiated once when the server first comes online. The ",(0,r.kt)("inlineCode",{parentName:"p"},"ISubscriptionClientProxy<TSchema>"),"instances it creates should be unique per ",(0,r.kt)("inlineCode",{parentName:"p"},"IClientConnection")," instance.")),(0,r.kt)("p",null,"The server will listen for subscription registrations from your client proxy and send back published events when new data is available. It is up to your proxy to interprete these events, generate an appropriate result (including executing queries against the runtime), serialize the data and send it to the connected client on the other end."),(0,r.kt)("admonition",{title:"Custom Protocols are Difficult",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"The complete details of implementing a custom graphql client proxy are beyond the scope of this documentation. Take a peek at the subscription library source code for some clues on how to get started.")),(0,r.kt)("h2",{id:"other-communication-options"},"Other Communication Options"),(0,r.kt)("p",null,"While websockets is the primary medium for persistant connections its not the only option. Internally, the library supplies an ",(0,r.kt)("inlineCode",{parentName:"p"},"IClientConnection")," interface which encapsulates a raw websocket received from .NET. This interface is internally implemented as a ",(0,r.kt)("inlineCode",{parentName:"p"},"WebSocktClientConnection")," which is responsible for reading and writing raw bytes to the socket. Its not a stretch of the imagination to implement your own custom client connection, invent a way to capture said connections and basically rewrite the entire communications layer of the subscriptions module."),(0,r.kt)("p",null,"Please do a deep dive into the subscription code base to learn about all the intricacies of building your own communications layer and how you might go about registering it with the runtime. If you do try to tackle this very large effort don't hesitate to reach out. We're happy to partner with you and meet you half way on a solution if it makes sense for the rest of the community."),(0,r.kt)("h2",{id:"performance-considerations"},"Performance Considerations"),(0,r.kt)("p",null,"In a production app, its very possible that you may have lots of subscription events fired and communicated to a lot of connected clients in short succession. Its important to understand how the receiving servers will process those events and plan accordingly. "),(0,r.kt)("p",null,"When the router receives an event it looks to see which clients are subscribed to that event and queues up a work item for each one. Internally, this work is processed, concurrently if necessary, up to a server-configured maximum. Once this maximum is reached, new work will only begin as other work finishes up."),(0,r.kt)("p",null,"Each work item is, for the most part, a standard query execution. But with lots of events being delivered on a server saturated with clients, each potentially having multiple subscriptions, along with regular queries and mutations executing as well...limits must be imposed otherwise CPU utilization could unreasonably spike...and it may spike regardless in some use cases. "),(0,r.kt)("p",null,"By default, the max number of work items the router will deliver simultaniously is ",(0,r.kt)("inlineCode",{parentName:"p"},"500"),".  This is a global, server-wide pool, shared amongst all registered schemas. You can manually adjust this value by changing it prior to calling ",(0,r.kt)("inlineCode",{parentName:"p"},".AddGraphQL()"),".   This value defaults to a low number on purpose, use it as a starting point to dial up the max concurrency to a level you feel comfortable with in terms of performance and cost. The only limit here is server resources and other environment limitations outside the control of graphql. "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Set A Receiver Throttle"',title:'"Set',A:!0,Receiver:!0,'Throttle"':!0},"// Startup \n\n// Adjust the max concurrent communications value\n// BEFORE calling .AddGraphQL()\nSubscriptionServerSettings.MaxConcurrentReceiverCount = 500;\n\nservices.AddGraphQL()\n        .AddSubscriptions();\n")),(0,r.kt)("h3",{id:"event-multiplication"},"Event Multiplication"),(0,r.kt)("p",null,"Think carefully about your production scenarios when you introduce subscriptions into your application.  For each subscription event raised, each open subscription monitoring that event must execute a standard graphql query, with the supplied event data, to generate a result and send it to its connected client. "),(0,r.kt)("p",null,"If, for instance, you have ",(0,r.kt)("inlineCode",{parentName:"p"},"200 clients")," connected to a single server, each with ",(0,r.kt)("inlineCode",{parentName:"p"},"3 subscriptions")," open against ONE event, thats ",(0,r.kt)("inlineCode",{parentName:"p"},"600 individual queries")," that must be executed to process the event completely. Even if you call ",(0,r.kt)("inlineCode",{parentName:"p"},"SkipSubscriptionEvent")," to drop the event and no send data to a client, the query still must be executed to determine the subscriber is not interested in the data.  Suppose your server receives 5 mutations in rapid succession, all of which raise the event, thats a spike of ",(0,r.kt)("inlineCode",{parentName:"p"},"3,000 queries"),", instantaneously, that the server must process.  "),(0,r.kt)("p",null,"Balancing the load can be difficult. Luckily there are some ",(0,r.kt)("a",{parentName:"p",href:"/docs/reference/global-configuration#subscriptions"},"throttling levers")," you can adjust."),(0,r.kt)("admonition",{title:"Know Your User Traffic",type:"info"},(0,r.kt)("p",{parentName:"admonition"}," Raising subscription events can exponentially increase the load on each of your servers. Think carefully when you deploy subscriptions to your application.")),(0,r.kt)("h3",{id:"dispatch-queue-monitoring"},"Dispatch Queue Monitoring"),(0,r.kt)("p",null,"Internally, whenever a subscription server instance receives an event, the router checks to see which of the currently connected clients need to process that event. The client/event combination is then put into a dispatch queue that is continually processed via a background service according to the throttling limits you've specified. If events are received faster than they can be dispatched they are queued, in memory, until resources are freed up. "),(0,r.kt)("p",null,"There is built in monitoring of this queue that will automatically ",(0,r.kt)("a",{parentName:"p",href:"/docs/logging/subscription-events#subscription-event-dispatch-queue-alert"},"record a log event")," when a given threshold is reached. "),(0,r.kt)("h4",{id:"default-event-alert-threshold"},"Default Event Alert Threshold"),(0,r.kt)("p",null,"This event is recorded at a ",(0,r.kt)("inlineCode",{parentName:"p"},"Critical")," level when the queue reaches ",(0,r.kt)("inlineCode",{parentName:"p"},"10,000 events"),". This alert is then re-recorded once every 5 minutes if the\nqueue remains above 10,000 events."),(0,r.kt)("h4",{id:"custom-event-alert-thresholds"},"Custom Event Alert Thresholds"),(0,r.kt)("p",null,"In some high volume scenarios, its not uncommon or unexpected for the dispatch queue to spike beyond the default monitoring levels from time to time.  If you need more granular control of the notifications, register an instance of ",(0,r.kt)("inlineCode",{parentName:"p"},"ISubscriptionClientDispatchQueueAlertSettings")," to your DI container before adding GraphQL and your settings will be used instead."),(0,r.kt)("p",null,"In the example below, if the queue reaches 1,000 events, the debug level alert will be recorded. If 30 seconds pass and the queue is still above 1000 events, the debug level alert will be recorded again. However, if the queue crosses 10,000 events then the warning level alert will be recorded (the debug alert is then ignored).  If the queue reaches 100k events then a critical level alert will be recorded every 15 seconds until it drops below 100k."),(0,r.kt)("p",null," Lower level thresholds (as determined by number of queued events) will not be triggered if a higher level is on active cool down."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Custom Dispatch Queue Monitoring"',title:'"Custom',Dispatch:!0,Queue:!0,'Monitoring"':!0},"// startup configuration\n\nvar thresholds = new SubscriptionClientDispatchQueueAlertSettings();\nthresholds.AddThreshold(\n    LogLevel.Debug,\n    1000,\n    TimeSpan.FromSeconds(30));\n\nthresholds.AddThreshold(\n    LogLevel.Warning,\n    10000,\n    TimeSpan.FromSeconds(120));\n\nthresholds.AddThreshold(\n    LogLevel.Critical,\n    100000,\n    TimeSpan.FromSeconds(15));\n    \n// register the interface as a singleton\nservices.AddSingleton<ISubscriptionClientDispatchQueueAlertSettings>(alerts);\n\n// normal graphql configuration\nservices.AddGraphQL();\n\n\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Consider using the built in ",(0,r.kt)("inlineCode",{parentName:"p"},"SubscriptionClientDispatchQueueAlertSettings")," object for a standard implementation of the required interface.")))}p.isMDXComponent=!0},9941:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/files/2022-10-subscription-server-726ef5e3dd9d22eec4bc75d69aa31cab.pdf"}}]);