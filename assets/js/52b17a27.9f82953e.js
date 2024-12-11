"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2980],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>m});var n=r(6540);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(r),h=i,m=d["".concat(c,".").concat(h)]||d[h]||u[h]||a;return r?n.createElement(m,o(o({ref:t},p),{},{components:r})):n.createElement(m,o({ref:t},p))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=h;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[d]="string"==typeof e?e:i,o[1]=l;for(var s=2;s<a;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},6096:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var n=r(8168),i=(r(6540),r(5680));const a={id:"graph-directive",title:"Graph Directive",sidebar_label:"GraphDirective",sidebar_position:5},o=void 0,l={unversionedId:"reference/graph-directive",id:"reference/graph-directive",title:"Graph Directive",description:"\u2705 See the section on Directives for a detailed explination on how directive action methods work and how to declare them.",source:"@site/docs/reference/graph-directive.md",sourceDirName:"reference",slug:"/reference/graph-directive",permalink:"/docs/reference/graph-directive",draft:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{id:"graph-directive",title:"Graph Directive",sidebar_label:"GraphDirective",sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"GraphController",permalink:"/docs/reference/graph-controller"},next:{title:"HTTP Processor",permalink:"/docs/reference/http-processor"}},c={},s=[{value:"ModelState",id:"modelstate",level:2},{value:"Request",id:"request",level:2},{value:"Notable Items on the Request",id:"notable-items-on-the-request",level:3},{value:"User",id:"user",level:2},{value:"Schema",id:"schema",level:2}],p={toc:s};function d(e){let{components:t,...r}=e;return(0,i.yg)("wrapper",(0,n.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,"\u2705 See the section on ",(0,i.yg)("a",{parentName:"p",href:"/docs/advanced/directives"},"Directives")," for a detailed explination on how directive action methods work and how to declare them."),(0,i.yg)("p",null,"The ",(0,i.yg)("inlineCode",{parentName:"p"},"GraphDirective"),", from which all of your directives inherit, is a core object used throughout graphql. This page details some lesser known and lesser used object referenced made available to each directive."),(0,i.yg)("h2",{id:"modelstate"},"ModelState"),(0,i.yg)("p",null,"The completed model state dictionary with an entry for each validated parameter ",(0,i.yg)("strong",{parentName:"p"},"of the directive"),". The model state for the field being resolved is not accessible by the directive."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-csharp"},"public class AllowDirective : GraphDirective\n{\n    public IGraphActionResult BeforeResolution(FilterModel model)\n    {\n        if(!this.ModelState.IsValid)\n            return this.BadRequest(this.ModelState);\n\n        //...\n    }\n}\n")),(0,i.yg)("h2",{id:"request"},"Request"),(0,i.yg)("p",null,"The individual directive request spawned from the field pipeline."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-csharp"},"public class AllowDirective : GraphDirective\n{\n    public IGraphActionResult BeforeResolution(FilterModel model)\n    {\n        if(this.Request.SourceData is Human human)\n        {\n            // ...\n        }\n    }\n}\n")),(0,i.yg)("h3",{id:"notable-items-on-the-request"},"Notable Items on the Request"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"Request.Directive"),": Useful metadata related to the directive type being resolved."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"Request.LifeCycle"),": The enumeration value indicating which life cycle point is being executed."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"Request.DirectiveLocation"),": Indicates location in the query text this directive instance is currently being executed."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"Request.DataSource"),": The source data item being supplied to the field to be resolved."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"Request.Items"),": A collection of key/value pairs accessible to all fields and directives in this individual request pipeline.")),(0,i.yg)("h2",{id:"user"},"User"),(0,i.yg)("p",null,"The ",(0,i.yg)("inlineCode",{parentName:"p"},"ClaimsPrincipal")," created by ASP.NET when this request was authorized."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-csharp"},'public class MyCustomDirective : GraphDirective\n{\n    public IGraphActionResult BeforeResolution(FilterModel model)\n    {\n        if(this.User.Identity.Name == "DebbieEast")\n        {\n            // ...\n        }\n    }\n}\n')),(0,i.yg)("h2",{id:"schema"},"Schema"),(0,i.yg)("p",null,"The ",(0,i.yg)("inlineCode",{parentName:"p"},"Schema")," property contains a reference to the singleton instance of the schema the current controller is resolving a field for. This object is considered read-only and should not be modified."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-csharp"},"public class AllowDirective : GraphDirective\n{\n    public IGraphActionResult BeforeResolution(FilterModel model)\n    {\n        // highlight-next-line\n        IObjectGraphType droidType = this.Schema.KnownTypes.FindGraphType(typeof(Droid), TypeKind.OBJECT);\n        // ...\n    }\n}\n")),(0,i.yg)("admonition",{type:"caution"},(0,i.yg)("p",{parentName:"admonition"}," For type system directives, executed as part of schema construction, the schema object available may be incomplete or null. Avoid using and do not rely on the data in ",(0,i.yg)("inlineCode",{parentName:"p"},"this.Schema")," for type system directives.")))}d.isMDXComponent=!0}}]);