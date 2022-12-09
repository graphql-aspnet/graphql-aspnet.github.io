"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7394],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var a=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,o=function(e,t){if(null==e)return{};var r,a,o={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=a.createContext({}),u=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,o=e.mdxType,n=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(r),d=o,m=c["".concat(l,".").concat(d)]||c[d]||h[d]||n;return r?a.createElement(m,i(i({ref:t},p),{},{components:r})):a.createElement(m,i({ref:t},p))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var n=r.length,i=new Array(n);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:o,i[1]=s;for(var u=2;u<n;u++)i[u]=r[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},2592:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>n,metadata:()=>s,toc:()=>u});var a=r(7462),o=(r(7294),r(3905));const n={id:"overview",title:"Overview",sidebar_label:"Overview",sidebar_position:0,description:"A quick overview of this documentation and how to use it.",hide_title:!0},i=void 0,s={unversionedId:"quick/overview",id:"quick/overview",title:"Overview",description:"A quick overview of this documentation and how to use it.",source:"@site/docs/quick/overview.md",sourceDirName:"quick",slug:"/quick/overview",permalink:"/docs/quick/overview",draft:!1,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"overview",title:"Overview",sidebar_label:"Overview",sidebar_position:0,description:"A quick overview of this documentation and how to use it.",hide_title:!0},sidebar:"tutorialSidebar",next:{title:"Quick Start",permalink:"/docs/quick/quick-start"}},l={},u=[{value:"How To Use This Documentation",id:"how-to-use-this-documentation",level:2},{value:"Target Audience",id:"target-audience",level:4},{value:"Key Terms",id:"key-terms",level:2},{value:"Schema",id:"schema",level:3},{value:"Fields &amp; Resolvers",id:"fields--resolvers",level:3},{value:"Graph Type",id:"graph-type",level:3},{value:"Root Graph Types",id:"root-graph-types",level:4},{value:"Query Document",id:"query-document",level:3}],p={toc:u};function c(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("admonition",{title:"This  project is currently in open beta",type:"info"},(0,o.kt)("p",{parentName:"admonition"}," Some features of the library may change prior to a final release.")),(0,o.kt)("h2",{id:"how-to-use-this-documentation"},"How To Use This Documentation"),(0,o.kt)("p",null,"This documentation is best used as a reference guide for the various features of GraphQL ASP.NET but it helps to read through a few sections to get an understanding of the core concepts."),(0,o.kt)("p",null,"\u2705 ",(0,o.kt)("a",{parentName:"p",href:"../controllers/actions"},"Controllers")," -\nAn overview on how to build a controller and define an action method."),(0,o.kt)("p",null,"\u2705 ",(0,o.kt)("a",{parentName:"p",href:"../reference/attributes"},"Attributes")," - A reference to all the attributes supported by GraphQL ASP.NET. Attributes are used extensively to annotate and configure your controllers and model classes."),(0,o.kt)("p",null,"\u2705 ",(0,o.kt)("a",{parentName:"p",href:"../reference/schema-configuration"},"Schema Configuration")," - A reference to the various configuration options for your schema and how they affect the runtime."),(0,o.kt)("h4",{id:"target-audience"},"Target Audience"),(0,o.kt)("p",null,"This documentation serves as part reference and part tutorial for GraphQL ASP.NET. You should have a familiarity with GraphQL and ASP.NET MVC. We won't spend a lot of time covering core concepts such as how ASP.NET controllers operate or the ends and outs of authorization. Many implementation details are shown in terms of code examples as well and without a familiarity with MVC, things may not always be so clear."),(0,o.kt)("p",null,"Here are some good starting points for learning more about GraphQL or ASP.NET MVC before diving in to GraphQL ASP.NET."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://graphql.org/learn/"},(0,o.kt)("strong",{parentName:"a"},"Learn GraphQL"))," - A walk through on the query language by the GraphQL team"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://blog.apollographql.com/graphql-vs-rest-5d425123e34b"},(0,o.kt)("strong",{parentName:"a"},"Comparing GraphQL and REST"))," - A helpful comparison by the Apollo Team"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-5.0&tabs=visual-studio"},(0,o.kt)("strong",{parentName:"a"},"Getting started with ASP.NET Core MVC"))," - Scaffolding a .NET ASP.NET Core MVC app from the ground up."),(0,o.kt)("h2",{id:"key-terms"},"Key Terms"),(0,o.kt)("p",null,"This documentation uses a number of terms to refer to the various pieces of the library:"),(0,o.kt)("h3",{id:"schema"},"Schema"),(0,o.kt)("p",null,"This is the set of data types, their fields, input arguments etc. that are exposed on an object graph. When you write a graphql query to return data the fields you request, their arguments and their children must all be defined on a schema that graphql will validate your query against.  "),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"In GraphQL ASP.NET the schema is generated at runtime directly from your C# controllers; there is no additional boilerplate code necessary to define a schema.")),(0,o.kt)("p",null,'Your schema is "generated" at runtime by analyzing your model classes, controllers and action methods then populating a ',(0,o.kt)("inlineCode",{parentName:"p"},"GraphSchema")," container with the appropriate graph types to map graphql requests to your controllers. "),(0,o.kt)("h3",{id:"fields--resolvers"},"Fields & Resolvers"),(0,o.kt)("p",null,"In GraphQL terms, a field is any requested piece of data (such as an id or  name).  A resolver fulfills the request for data from a schema field. It takes in a set of input arguments and produces a piece of data that is returned to the client. In GraphQL ASP.NET your controller methods act as resolvers for top level fields in any query."),(0,o.kt)("h3",{id:"graph-type"},"Graph Type"),(0,o.kt)("p",null,"A graph type is an entity on your object graph; a droid, a donut, a string, a number etc.  In GraphQL ASP.NET your model classes, interfaces, enums, controllers etc. are compiled into the various graph types required by the runtime."),(0,o.kt)("h4",{id:"root-graph-types"},"Root Graph Types"),(0,o.kt)("p",null,'There are three root graph types in GraphQL: Query, Mutation, Subscription. Whenever you make a graphql request, you always specify which query root you are targeting. This documentation will usually refer to all operations as "queries" but this includes mutations and subscriptions as well.'),(0,o.kt)("h3",{id:"query-document"},"Query Document"),(0,o.kt)("p",null,"This is the raw query string submitted by a client. When GraphQL accepts a query it is converted from a string to an internal document format that is parsed and used to fulfill the request.  "),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Queries, Mutations and Subscriptions are all types of query documents.")))}c.isMDXComponent=!0}}]);