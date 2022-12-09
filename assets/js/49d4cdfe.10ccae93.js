"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7490],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),o=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=o(e.components);return a.createElement(p.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),m=o(n),c=r,h=m["".concat(p,".").concat(c)]||m[c]||u[c]||i;return n?a.createElement(h,l(l({ref:t},d),{},{components:n})):a.createElement(h,l({ref:t},d))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=c;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[m]="string"==typeof e?e:r,l[1]=s;for(var o=2;o<i;o++)l[o]=n[o];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},714:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>o});var a=n(7462),r=(n(7294),n(3905));const i={id:"subscription-events",title:"Subscription Logging Events",sidebar_label:"Subscription Events",sidebar_position:2},l=void 0,s={unversionedId:"logging/subscription-events",id:"logging/subscription-events",title:"Subscription Logging Events",description:"GraphQL ASP.NET tracks some special events related to the management of subscriptions. They are outlined below.",source:"@site/docs/logging/subscription-events.md",sourceDirName:"logging",slug:"/logging/subscription-events",permalink:"/docs/logging/subscription-events",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"subscription-events",title:"Subscription Logging Events",sidebar_label:"Subscription Events",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Standard Events",permalink:"/docs/logging/standard-events"},next:{title:"Query Profiling",permalink:"/docs/execution/metrics"}},p={},o=[{value:"Server Level Events",id:"server-level-events",level:2},{value:"Subscription Event Dispatch Queue Alert",id:"subscription-event-dispatch-queue-alert",level:3},{value:"Schema Level Events",id:"schema-level-events",level:2},{value:"Subscription Route Registered",id:"subscription-route-registered",level:3},{value:"Client Connection Events",id:"client-connection-events",level:2},{value:"Client Registered",id:"client-registered",level:3},{value:"Client Dropped",id:"client-dropped",level:3},{value:"Unsupported Client Protocol",id:"unsupported-client-protocol",level:3},{value:"Client Messaging Events",id:"client-messaging-events",level:2},{value:"Subscription Event Received",id:"subscription-event-received",level:3},{value:"Subscription Registered",id:"subscription-registered",level:3},{value:"Subscription Registered",id:"subscription-registered-1",level:3},{value:"Client Message Received",id:"client-message-received",level:3},{value:"Client Message Sent",id:"client-message-sent",level:3},{value:"Subscription Events",id:"subscription-events",level:2},{value:"Subscription Event Published",id:"subscription-event-published",level:3},{value:"Subscription Event Received",id:"subscription-event-received-1",level:3}],d={toc:o};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"GraphQL ASP.NET tracks some special events related to the management of subscriptions. They are outlined below."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},(0,r.kt)("strong",{parentName:"em"},"Common Event Properties"))),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{parentName:"p",href:"/docs/logging/standard-events"},"common event properties")," outlined on the standard events page apply to all subscription events."),(0,r.kt)("h2",{id:"server-level-events"},"Server Level Events"),(0,r.kt)("h3",{id:"subscription-event-dispatch-queue-alert"},"Subscription Event Dispatch Queue Alert"),(0,r.kt)("p",null,"This event is recorded when the server's schema-agnostic, internal dispatch queue reaches a given threshold. The internal dispatch queue is where all subscription events destined for connected clients are staged before being processed. The thresholds at which this alert is recorded can be ",(0,r.kt)("a",{parentName:"p",href:"/docs/advanced/subscriptions#dispatch-queue-monitoring"},"customized"),"."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ThresholdLevelReached")),(0,r.kt)("td",{parentName:"tr",align:null},"The declared threshold level that was reached causing this entry to be recorded. (Expressed in # of queued events)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"EventQueueCount")),(0,r.kt)("td",{parentName:"tr",align:null},"The actual number of events currently queued.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"CustomMessage")),(0,r.kt)("td",{parentName:"tr",align:null},"An optional, staticly declared message registered with the threshold level.")))),(0,r.kt)("h2",{id:"schema-level-events"},"Schema Level Events"),(0,r.kt)("h3",{id:"subscription-route-registered"},"Subscription Route Registered"),(0,r.kt)("p",null,"This event is recorded when GraphQL successfully registers an entry in the ASP.NET MVC's route table to accept requests for a target schema as well as\nregister the middleware component necessary to receive websocket requests."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Important Properties")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SchemaTypeName")),(0,r.kt)("td",{parentName:"tr",align:null},"The full name of your your schema type. For most single schema applications this will be ",(0,r.kt)("inlineCode",{parentName:"td"},"GraphQL.AspNet.Schemas.GraphSchema"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SchemaSubscriptionRoutePath")),(0,r.kt)("td",{parentName:"tr",align:null},"The relative URL that was registered for the schema type, e.g. ",(0,r.kt)("inlineCode",{parentName:"td"},"'/graphql"))))),(0,r.kt)("h2",{id:"client-connection-events"},"Client Connection Events"),(0,r.kt)("h3",{id:"client-registered"},"Client Registered"),(0,r.kt)("p",null,'This event is recorded when GraphQL successfully accepts a client and has assigned a client proxy to manage the connection. This event is recorded just prior to the connection is "started" and messaging begins.'),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Important Properties")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientId")),(0,r.kt)("td",{parentName:"tr",align:null},"A unique id asigned to the client when it first connected.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SchemaTypeName")),(0,r.kt)("td",{parentName:"tr",align:null},"The full name of your your schema type. For most single schema applications this will be ",(0,r.kt)("inlineCode",{parentName:"td"},"GraphQL.AspNet.Schemas.GraphSchema"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientTypeName")),(0,r.kt)("td",{parentName:"tr",align:null},"The full name of the assigned client proxy type. In general, a different type is used per messaging protocol.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientProtocol")),(0,r.kt)("td",{parentName:"tr",align:null},"The protocol negotiated by the client and server that will be used for the duration of the connection.")))),(0,r.kt)("h3",{id:"client-dropped"},"Client Dropped"),(0,r.kt)("p",null,'This event is recorded when GraphQL is releasing a client. The connection has been "stopped" and no additional messagings are being broadcast. This event occurs just before the HTTP connection is closed.'),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Important Properties")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientId")),(0,r.kt)("td",{parentName:"tr",align:null},"A unique id asigned to the client when it first connected.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientTypeName")),(0,r.kt)("td",{parentName:"tr",align:null},"The full name of the assigned client proxy type. In general, a different type is used per messaging protocol.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientProtocol")),(0,r.kt)("td",{parentName:"tr",align:null},"The protocol negotiated by the client and server that will be used for the duration of the connection.")))),(0,r.kt)("h3",{id:"unsupported-client-protocol"},"Unsupported Client Protocol"),(0,r.kt)("p",null,"This event is recorded when GraphQL attempts to create an appropriate proxy class for the connection but no such proxy could be deteremined from the details providied in the initial request. In general, this means the provided websocket sub protocols did not match a supported protocol for this server and schema combination."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SchemaTypeName")),(0,r.kt)("td",{parentName:"tr",align:null},"The full name of your your schema type. For most single schema applications this will be ",(0,r.kt)("inlineCode",{parentName:"td"},"GraphQL.AspNet.Schemas.GraphSchema"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientProtocol")),(0,r.kt)("td",{parentName:"tr",align:null},"The protocol(s) requested by the client connection that were not accepted")))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Important Properties")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientId")),(0,r.kt)("td",{parentName:"tr",align:null},"A unique id asigned to the client when it first connected.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientTypeName")),(0,r.kt)("td",{parentName:"tr",align:null},"The full name of the assigned client proxy type. In general, a different type is used per messaging protocol.")))),(0,r.kt)("h2",{id:"client-messaging-events"},"Client Messaging Events"),(0,r.kt)("h3",{id:"subscription-event-received"},"Subscription Event Received"),(0,r.kt)("p",null,"This event is recorded by a client proxy when it received an event from the router and has determined that it should be handled."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Important Properties")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientId")),(0,r.kt)("td",{parentName:"tr",align:null},"A unique id asigned to the client when it first connected.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SchemaTypeName")),(0,r.kt)("td",{parentName:"tr",align:null},"The full name of your your schema type. For most single schema applications this will be ",(0,r.kt)("inlineCode",{parentName:"td"},"GraphQL.AspNet.Schemas.GraphSchema"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SubscriptionPath")),(0,r.kt)("td",{parentName:"tr",align:null},"The path to the target top-level subscription field in the schema")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SubscriptionCount")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of registered subscriptions, for this client, that will receive this event.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SubscriptionIds")),(0,r.kt)("td",{parentName:"tr",align:null},"A comma seperated list of id values representing the subscriptions that will receive this event.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"MachineName")),(0,r.kt)("td",{parentName:"tr",align:null},"The ",(0,r.kt)("inlineCode",{parentName:"td"},"Environment.MachineName")," of the current server.")))),(0,r.kt)("h3",{id:"subscription-registered"},"Subscription Registered"),(0,r.kt)("p",null,"This event is recorded by a client proxy when it starts a new subscription on behalf of its connected client."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Important Properties")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientId")),(0,r.kt)("td",{parentName:"tr",align:null},"A unique id asigned to the client when it first connected.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SubscriptionPath")),(0,r.kt)("td",{parentName:"tr",align:null},"The path to the target top-level subscription field in the schema")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SubscriptionId")),(0,r.kt)("td",{parentName:"tr",align:null},"The subscription id requested by the client.")))),(0,r.kt)("h3",{id:"subscription-registered-1"},"Subscription Registered"),(0,r.kt)("p",null,"This event is recorded by a client proxy when it unregistered and abandons an existing subscription. This may be due to the server ending the subscription or the client requesting it be stopped."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Important Properties")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientId")),(0,r.kt)("td",{parentName:"tr",align:null},"A unique id asigned to the client when it first connected.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SubscriptionPath")),(0,r.kt)("td",{parentName:"tr",align:null},"The path to the target top-level subscription field in the schema")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SubscriptionId")),(0,r.kt)("td",{parentName:"tr",align:null},"The subscription id requested by the client.")))),(0,r.kt)("h3",{id:"client-message-received"},"Client Message Received"),(0,r.kt)("p",null,"This event is recorded by a client proxy when it successfully receives and deserializes a message from its connected client. Not all client proxies may record this event. The messages a client proxy defines must implement ",(0,r.kt)("inlineCode",{parentName:"p"},"ILoggableClientProxyMessage")," in order to use this event."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Important Properties")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientId")),(0,r.kt)("td",{parentName:"tr",align:null},"A unique id asigned to the client when it first connected.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"MessageType")),(0,r.kt)("td",{parentName:"tr",align:null},"A string value representing the type of the message that was received")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"MessageId")),(0,r.kt)("td",{parentName:"tr",align:null},"The globally unique message id that was assigned to the incoming message.")))),(0,r.kt)("h3",{id:"client-message-sent"},"Client Message Sent"),(0,r.kt)("p",null,"This event is recorded by a client proxy when it successfully serializes and transmits a message to its connected client. Not all client proxies may record this event. The messages a client proxy defines must implement ",(0,r.kt)("inlineCode",{parentName:"p"},"ILoggableClientProxyMessage")," in order to use this event."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Important Properties")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"ClientId")),(0,r.kt)("td",{parentName:"tr",align:null},"A unique id asigned to the client when it first connected.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"MessageType")),(0,r.kt)("td",{parentName:"tr",align:null},"A string value representing the type of the message that was received")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"MessageId")),(0,r.kt)("td",{parentName:"tr",align:null},"The globally unique message id that was assigned to the incoming message.")))),(0,r.kt)("h2",{id:"subscription-events"},"Subscription Events"),(0,r.kt)("p",null,"Subscription events refer to the events that are raised from mutations and processed by client proxies with registered subscriptions against those events."),(0,r.kt)("h3",{id:"subscription-event-published"},"Subscription Event Published"),(0,r.kt)("p",null," This event is recorded just after an event is handed off to a ",(0,r.kt)("inlineCode",{parentName:"p"},"ISubscriptionEventPublisher")," for publishing to a storage medium.  Custom publishers do not need to record this event manually."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Important Properties")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SchemaType")),(0,r.kt)("td",{parentName:"tr",align:null},"The schema type name as it was published. This will likely include additional information not recorded in standard schema level events.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"DataType")),(0,r.kt)("td",{parentName:"tr",align:null},"The data type name of the data object that was published.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SubscriptionEventId")),(0,r.kt)("td",{parentName:"tr",align:null},"The globally unique id of the subscription event.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SubscriptionEventName")),(0,r.kt)("td",{parentName:"tr",align:null},"The name of the event as its defined in the schema.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"MachineName")),(0,r.kt)("td",{parentName:"tr",align:null},"The ",(0,r.kt)("inlineCode",{parentName:"td"},"Environment.MachineName")," of the current server.")))),(0,r.kt)("h3",{id:"subscription-event-received-1"},"Subscription Event Received"),(0,r.kt)("p",null," This event is recorded by the event router just after it receives an event. The router will then proceed to forward the event to the correct client instances for processing."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Important Properties")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SchemaType")),(0,r.kt)("td",{parentName:"tr",align:null},"The schema type name as it was recevied. This will likely include additional information not recorded in standard schema level events.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"DataType")),(0,r.kt)("td",{parentName:"tr",align:null},"The data type name of the data object that was received.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SubscriptionEventId")),(0,r.kt)("td",{parentName:"tr",align:null},"The globally unique id of the subscription event.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"SubscriptionEventName")),(0,r.kt)("td",{parentName:"tr",align:null},"The name of the event as its defined in the schema.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"MachineName")),(0,r.kt)("td",{parentName:"tr",align:null},"The ",(0,r.kt)("inlineCode",{parentName:"td"},"Environment.MachineName")," of the current server.")))))}m.isMDXComponent=!0}}]);