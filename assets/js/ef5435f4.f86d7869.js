"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6035],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),u=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(p.Provider,{value:t},e.children)},s="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),s=u(r),g=a,m=s["".concat(p,".").concat(g)]||s[g]||d[g]||i;return r?n.createElement(m,l(l({ref:t},c),{},{components:r})):n.createElement(m,l({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,l=new Array(i);l[0]=g;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[s]="string"==typeof e?e:a,l[1]=o;for(var u=2;u<i;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},7900:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>s,frontMatter:()=>i,metadata:()=>o,toc:()=>u});var n=r(7462),a=(r(7294),r(3905));const i={id:"create-app",title:"Building Your First App",sidebar_label:"Your First App",sidebar_position:1,description:"Step by Step instructions for creating a sample application"},l=void 0,o={unversionedId:"quick/create-app",id:"quick/create-app",title:"Building Your First App",description:"Step by Step instructions for creating a sample application",source:"@site/docs/quick/create-app.md",sourceDirName:"quick",slug:"/quick/create-app",permalink:"/docs/quick/create-app",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"create-app",title:"Building Your First App",sidebar_label:"Your First App",sidebar_position:1,description:"Step by Step instructions for creating a sample application"},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/docs/quick/overview"},next:{title:"Code Examples",permalink:"/docs/quick/code-examples"}},p={},u=[{value:"Create a New Web API Project",id:"create-a-new-web-api-project",level:2},{value:"Add the Package From Nuget",id:"add-the-package-from-nuget",level:2},{value:"Create a Controller",id:"create-a-controller",level:2},{value:"Configure Startup",id:"configure-startup",level:2},{value:"Execute a Query",id:"execute-a-query",level:2},{value:"Results:",id:"results",level:3}],c={toc:u};function s(e){let{components:t,...i}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This document will help walk you through creating a new Web API project, installing the GraphQL ASP.NET library and writing your first controller."),(0,a.kt)("h2",{id:"create-a-new-web-api-project"},"Create a New Web API Project"),(0,a.kt)("p",null,"\ud83d\udcbb Setup a new ",(0,a.kt)("inlineCode",{parentName:"p"},"ASP.NET Core Web API")," project:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"web api project",src:r(890).Z,title:"Select ASP.NET Core Web API",width:"1518",height:"1012"})),(0,a.kt)("h2",{id:"add-the-package-from-nuget"},"Add the Package From Nuget"),(0,a.kt)("p",null,"\ud83d\udcbb Add the ",(0,a.kt)("inlineCode",{parentName:"p"},"GraphQL.AspNet")," nuget package:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-powershell"},"# Using the dotnet CLI\n> dotnet add package GraphQL.AspNet\n")),(0,a.kt)("h2",{id:"create-a-controller"},"Create a Controller"),(0,a.kt)("p",null,"\ud83d\udcbb Create your first Graph Controller:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="BakeryController.cs"',title:'"BakeryController.cs"'},'using GraphQL.AspNet.Attributes;\nusing GraphQL.AspNet.Controllers;\n\npublic class BakeryController : GraphController\n{\n    [QueryRoot("donut")]\n    public Donut RetrieveDonut()\n    {\n        return new Donut()\n        {\n            Id = 3,\n            Name = "Snowy Dream",\n            Flavor = "Vanilla"\n        };\n    }\n}\n\npublic class Donut\n{\n    public int Id { get; set; }\n    public string Name { get; set; }\n    public string Flavor { get; set; }\n}\n')),(0,a.kt)("h2",{id:"configure-startup"},"Configure Startup"),(0,a.kt)("p",null,"\ud83d\udcbb Register GraphQL with your services collection and your application pipeline:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Program.cs"',title:'"Program.cs"'},"using GraphQL.AspNet.Configuration;\n\nvar builder = WebApplication.CreateBuilder(args);\n\n// Add graphql services to the DI container.\n// highlight-next-line\nbuilder.Services.AddGraphQL();\n\nvar app = builder.Build();\n\n// Configure the HTTP request pipeline.\n// highlight-next-line\napp.UseGraphQL();\napp.Run();\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("em",{parentName:"p"},"The configuration steps may vary slightly when using a Startup.cs file; typical for .NET 5 or earlier "))),(0,a.kt)("h2",{id:"execute-a-query"},"Execute a Query"),(0,a.kt)("p",null,"\ud83d\udcbb Start the application and using your favorite tool, execute a query:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Sample Query"',title:'"Sample','Query"':!0},"query {\n    donut {\n        id\n        name\n        flavor\n    }\n}\n")),(0,a.kt)("h3",{id:"results"},"Results:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"query results",src:r(9138).Z,title:"Results using GraphQL Playground",width:"1137",height:"888"})),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("em",{parentName:"p"},"The port number on your app may be different than that shown in the image"))))}s.isMDXComponent=!0},890:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/create-new-web-api-project-f0bb6eebc200da5078430ce828d8bc60.png"},9138:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/overview-sample-query-results-1425298ea533b77850b7c923c8d97983.png"}}]);