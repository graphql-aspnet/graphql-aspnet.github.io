"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8581],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),c=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(r),h=n,d=u["".concat(l,".").concat(h)]||u[h]||m[h]||i;return r?a.createElement(d,o(o({ref:t},p),{},{components:r})):a.createElement(d,o({ref:t},p))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:n,o[1]=s;for(var c=2;c<i;c++)o[c]=r[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}h.displayName="MDXCreateElement"},8476:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var a=r(7462),n=(r(7294),r(3905));const i={id:"multi-schema-support",title:"Multi-Schema Support",sidebar_label:"Multi-Schema Support",sidebar_position:5},o=void 0,s={unversionedId:"advanced/multi-schema-support",id:"advanced/multi-schema-support",title:"Multi-Schema Support",description:"GraphQL ASP.NET supports multiple schemas on the same server out of the box. Each schema is recognized by the runtime by its concrete type. To register multiple schemas you'll need to create your own type that implements ISchema",source:"@site/docs/advanced/multiple-schema.md",sourceDirName:"advanced",slug:"/advanced/multi-schema-support",permalink:"/docs/advanced/multi-schema-support",draft:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{id:"multi-schema-support",title:"Multi-Schema Support",sidebar_label:"Multi-Schema Support",sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Action Results",permalink:"/docs/advanced/graph-action-results"},next:{title:"Structured Logging",permalink:"/docs/logging/structured-logging"}},l={},c=[{value:"Implement ISchema",id:"implement-ischema",level:2},{value:"Register Each Schema",id:"register-each-schema",level:2},{value:"Give Each Schema its Own HTTP Route",id:"give-each-schema-its-own-http-route",level:3},{value:"Disable Local Graph Entity Registration",id:"disable-local-graph-entity-registration",level:2}],p={toc:c};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"GraphQL ASP.NET supports multiple schemas on the same server out of the box. Each schema is recognized by the runtime by its concrete type. To register multiple schemas you'll need to create your own type that implements ",(0,n.kt)("inlineCode",{parentName:"p"},"ISchema")),(0,n.kt)("h2",{id:"implement-ischema"},"Implement ISchema"),(0,n.kt)("p",null,"While it is possible to implement ",(0,n.kt)("inlineCode",{parentName:"p"},"ISchema")," directly, if you don't require any extra functionality in your schema its easier to just subclass the default schema."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Declaring Custom Schemas"',title:'"Declaring',Custom:!0,'Schemas"':!0},'public class EmployeeSchema : GraphSchema\n{\n    public override string Name => "Employee Schema";\n}\n\npublic class CustomerSchema : GraphSchema\n{\n    public override string Name => "Customer Schema";\n}\n')),(0,n.kt)("h2",{id:"register-each-schema"},"Register Each Schema"),(0,n.kt)("p",null,"Each schema can be registered using an overload of ",(0,n.kt)("inlineCode",{parentName:"p"},".AddGraphQL()")," during startup."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Adding A Custom Schema"',title:'"Adding',A:!0,Custom:!0,'Schema"':!0},"services.AddGraphQL<SchemaType>();\n")),(0,n.kt)("h3",{id:"give-each-schema-its-own-http-route"},"Give Each Schema its Own HTTP Route"),(0,n.kt)("p",null,"The query handler will attempt to register a schema to ",(0,n.kt)("inlineCode",{parentName:"p"},"/graphql")," as its URL by default; you'll want to ensure that each schema has its own endpoint by updating the individual routes."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Adding Multiple Schemas"',title:'"Adding',Multiple:!0,'Schemas"':!0},'services.AddGraphQL<EmployeeSchema>((options) =>\n    {\n        options.QueryHandler.Route = "/graphql_employees";\n        // add assembly or graph type references here\n    });\n\nservices.AddGraphQL<CustomerSchema>((options) =>\n    {\n        options.QueryHandler.Route = "/graphql_customers";\n        // add assembly or graph type references here\n    });\n')),(0,n.kt)("h2",{id:"disable-local-graph-entity-registration"},"Disable Local Graph Entity Registration"),(0,n.kt)("p",null,"You may want to disable the registering of local graph entities (the entities in the startup assembly) on one or both schemas lest you want each schema to contain the same controllers and graph types."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Startup Code"',title:'"Startup','Code"':!0},"// Optionally Disable Local Entity Registration\nservices.AddGraphQL<EmployeeSchema>(o => \n{\n    o.AutoRegisterLocalEntities = false;\n});\n")))}u.isMDXComponent=!0}}]);