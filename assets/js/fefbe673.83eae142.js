"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8883],{3905:(t,e,a)=>{a.d(e,{Zo:()=>s,kt:()=>k});var n=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function p(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var o=n.createContext({}),m=function(t){var e=n.useContext(o),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},s=function(t){var e=m(t.components);return n.createElement(o.Provider,{value:e},t.children)},u="mdxType",d={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},c=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,l=t.originalType,o=t.parentName,s=p(t,["components","mdxType","originalType","parentName"]),u=m(a),c=r,k=u["".concat(o,".").concat(c)]||u[c]||d[c]||l;return a?n.createElement(k,i(i({ref:e},s),{},{components:a})):n.createElement(k,i({ref:e},s))}));function k(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=a.length,i=new Array(l);i[0]=c;var p={};for(var o in e)hasOwnProperty.call(e,o)&&(p[o]=e[o]);p.originalType=t,p[u]="string"==typeof t?t:r,i[1]=p;for(var m=2;m<l;m++)i[m]=a[m];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},2787:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>o,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>p,toc:()=>m});var n=a(7462),r=(a(7294),a(3905));const l={id:"scalars",title:"Scalars",sidebar_label:"Scalars",sidebar_position:5},i=void 0,p={unversionedId:"types/scalars",id:"types/scalars",title:"Scalars",description:"Scalars are the most basic, fundamental unit of content in GraphQL. It is one of two leaf types (the other being enums). You can extend GraphQL with your own custom scalars when needed.",source:"@site/docs/types/scalars.md",sourceDirName:"types",slug:"/types/scalars",permalink:"/docs/types/scalars",draft:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{id:"scalars",title:"Scalars",sidebar_label:"Scalars",sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Enums",permalink:"/docs/types/enums"},next:{title:"List & Non-Null",permalink:"/docs/types/list-non-null"}},o={},m=[{value:"Input Value Resolution",id:"input-value-resolution",level:2},{value:"Scalar Names Are Fixed",id:"scalar-names-are-fixed",level:2},{value:"Nullable&lt;T&gt;",id:"nullablet",level:4},{value:"GraphId",id:"graphid",level:2}],s={toc:m};function u(t){let{components:e,...a}=t;return(0,r.kt)("wrapper",(0,n.Z)({},s,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Scalars are the most basic, fundamental unit of content in GraphQL. It is one of two leaf types (the other being ",(0,r.kt)("a",{parentName:"p",href:"./enums"},"enums"),"). You can extend GraphQL with your own ",(0,r.kt)("a",{parentName:"p",href:"../advanced/custom-scalars"},"custom scalars")," when needed."),(0,r.kt)("p",null,"GraphQL ASP.NET has 20 built in scalar types."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Scalar Name"),(0,r.kt)("th",{parentName:"tr",align:null},".NET Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Allowed Input Value"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"System.Boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"Boolean")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Byte"),(0,r.kt)("td",{parentName:"tr",align:null},"System.Byte"),(0,r.kt)("td",{parentName:"tr",align:null},"Number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"DateOnly"),(0,r.kt)("td",{parentName:"tr",align:null},"System.DateOnly"),(0,r.kt)("td",{parentName:"tr",align:null},"String or Number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"DateTime"),(0,r.kt)("td",{parentName:"tr",align:null},"System.DateTime"),(0,r.kt)("td",{parentName:"tr",align:null},"String or Number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"DateTimeOffset"),(0,r.kt)("td",{parentName:"tr",align:null},"System.DateTimeOffset"),(0,r.kt)("td",{parentName:"tr",align:null},"String or Number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Decimal"),(0,r.kt)("td",{parentName:"tr",align:null},"System.Decimal"),(0,r.kt)("td",{parentName:"tr",align:null},"Number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Double"),(0,r.kt)("td",{parentName:"tr",align:null},"System.Double"),(0,r.kt)("td",{parentName:"tr",align:null},"Number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Float"),(0,r.kt)("td",{parentName:"tr",align:null},"System.Single"),(0,r.kt)("td",{parentName:"tr",align:null},"Number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Guid"),(0,r.kt)("td",{parentName:"tr",align:null},"System.Guid"),(0,r.kt)("td",{parentName:"tr",align:null},"String")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"ID"),(0,r.kt)("td",{parentName:"tr",align:null},"GraphQL.AspNet.GraphId"),(0,r.kt)("td",{parentName:"tr",align:null},"String")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Int"),(0,r.kt)("td",{parentName:"tr",align:null},"System.Int32"),(0,r.kt)("td",{parentName:"tr",align:null},"Number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Long"),(0,r.kt)("td",{parentName:"tr",align:null},"System.Int64"),(0,r.kt)("td",{parentName:"tr",align:null},"Number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Short"),(0,r.kt)("td",{parentName:"tr",align:null},"System.Int16"),(0,r.kt)("td",{parentName:"tr",align:null},"Number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"System.String"),(0,r.kt)("td",{parentName:"tr",align:null},"String")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SignedByte"),(0,r.kt)("td",{parentName:"tr",align:null},"System.SByte"),(0,r.kt)("td",{parentName:"tr",align:null},"Number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"TimeOnly"),(0,r.kt)("td",{parentName:"tr",align:null},"System.TimeOnly"),(0,r.kt)("td",{parentName:"tr",align:null},"String")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"UInt"),(0,r.kt)("td",{parentName:"tr",align:null},"System.UInt32"),(0,r.kt)("td",{parentName:"tr",align:null},"Number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"ULong"),(0,r.kt)("td",{parentName:"tr",align:null},"System.UInt64"),(0,r.kt)("td",{parentName:"tr",align:null},"Number")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Uri"),(0,r.kt)("td",{parentName:"tr",align:null},"System.Uri"),(0,r.kt)("td",{parentName:"tr",align:null},"String")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"UShort"),(0,r.kt)("td",{parentName:"tr",align:null},"System.UInt16"),(0,r.kt)("td",{parentName:"tr",align:null},"Number")))),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"}," You must target .NET 6.0 or later to use ",(0,r.kt)("inlineCode",{parentName:"p"},"DateOnly")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"TimeOnly"))),(0,r.kt)("h2",{id:"input-value-resolution"},"Input Value Resolution"),(0,r.kt)("p",null,"When a value is resolved, it's read from the query document (or variable collection) in one of three ways:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"String")," : A string of characters, delimited by ",(0,r.kt)("inlineCode",{parentName:"li"},'"quotes"')),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Boolean")," The value ",(0,r.kt)("inlineCode",{parentName:"li"},"true")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"false")," with no quotes"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Number")," A sequence of numbers with an optional decimal point, negative sign or the letter ",(0,r.kt)("inlineCode",{parentName:"li"},"e"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"example: ",(0,r.kt)("inlineCode",{parentName:"li"},"-123.456e78")),(0,r.kt)("li",{parentName:"ul"},"GraphQL numbers must conform to the ",(0,r.kt)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/IEEE_754"},"IEEE 754")," standard [Spec \xa7 ",(0,r.kt)("a",{parentName:"li",href:"https://graphql.github.io/graphql-spec/October2021/#sec-Float"},"3.5.2"),"]")))),(0,r.kt)("p",null,"Scalars used as input arguments require that any supplied value match at least one supported input format before they will attempt to convert the value into the related .NET type. If the value read from the document doesn't match an approved format it is rejected before conversion is attempted. "),(0,r.kt)("p",null,"For example, the library will accept dates as numbers or strings (e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"1670466552"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"\"2022-12-8'T'02:29:10\""),"). If you try to supply a boolean value, ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),", the query is rejected outright and no parsing attempt is made. This can come in handy for custom scalar types that may have multiple serialization options."),(0,r.kt)("p",null,"See the table above for the list of allowed formats per scalar type."),(0,r.kt)("h2",{id:"scalar-names-are-fixed"},"Scalar Names Are Fixed"),(0,r.kt)("p",null,"Unlike other graph types, scalar names are fixed across all schemas. The name defined above (including casing), is how they appear in your schema's introspection queries. These names conform to the accepted standard for graphql type names. This is true for any custom scalars you may build as well."),(0,r.kt)("h4",{id:"nullablet"},"Nullable","<","T",">"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"int?"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"float?")," etc."),(0,r.kt)("p",null,"For the value types listed above, GraphQL will automatically coerce values into the appropriate ",(0,r.kt)("inlineCode",{parentName:"p"},"Nullable<T>")," as required by an argument's type expression."),(0,r.kt)("h2",{id:"graphid"},"GraphId"),(0,r.kt)("p",null,"GraphQL defines a special scalar value value called ",(0,r.kt)("inlineCode",{parentName:"p"},"ID")," which is defined as:"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("em",{parentName:"p"},"a unique identifier, often used to refetch an object or as the key for a cache"),'" [Spec \xa7 ',(0,r.kt)("a",{parentName:"p",href:"https://graphql.github.io/graphql-spec/October2021/#sec-ID"},"3.5.5"),"].")),(0,r.kt)("p",null,"GraphQL ASP.NET maintains a struct, ",(0,r.kt)("inlineCode",{parentName:"p"},"GraphQL.AspNet.GraphId")," to hold this value and serializes and deserializes it as a string. You can perform an implicit and explicit conversion between ",(0,r.kt)("inlineCode",{parentName:"p"},"GraphId")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"System.String")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Converting GraphId"',title:'"Converting','GraphId"':!0},'GraphId id = new GraphId("abc");\nstring str = id;\n// str == "abc"\n\nstring str = "abc";\nGraphId id = (GraphId)str;\n// id.Value == "abc"\n')))}u.isMDXComponent=!0}}]);