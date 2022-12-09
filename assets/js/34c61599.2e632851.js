"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9150],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=o.createContext({}),u=function(e){var t=o.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=u(e.components);return o.createElement(s.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(r),h=n,m=d["".concat(s,".").concat(h)]||d[h]||p[h]||a;return r?o.createElement(m,i(i({ref:t},c),{},{components:r})):o.createElement(m,i({ref:t},c))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:n,i[1]=l;for(var u=2;u<a;u++)i[u]=r[u];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}h.displayName="MDXCreateElement"},7932:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>u});var o=r(7462),n=(r(7294),r(3905));const a={id:"authorization",title:"Authorization",sidebar_label:"Authorization",sidebar_position:3},i=void 0,l={unversionedId:"controllers/authorization",id:"controllers/authorization",title:"Authorization",description:"Quick Examples",source:"@site/docs/controllers/authorization.md",sourceDirName:"controllers",slug:"/controllers/authorization",permalink:"/docs/controllers/authorization",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{id:"authorization",title:"Authorization",sidebar_label:"Authorization",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Field Paths",permalink:"/docs/controllers/field-paths"},next:{title:"Type Extensions",permalink:"/docs/controllers/type-extensions"}},s={},u=[{value:"Quick Examples",id:"quick-examples",level:2},{value:"Use of IAuthorizationService",id:"use-of-iauthorizationservice",level:2},{value:"When does Authorization Occur?",id:"when-does-authorization-occur",level:2},{value:"Field Authorizations",id:"field-authorizations",level:2},{value:"Field Authorization Failures are Obfuscated",id:"field-authorization-failures-are-obfuscated",level:3},{value:"Execution Directives Authorizations",id:"execution-directives-authorizations",level:2},{value:"Authorization Methods",id:"authorization-methods",level:2}],c={toc:u};function d(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,o.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"quick-examples"},"Quick Examples"),(0,n.kt)("p",null,"If you've wired up ASP.NET authorization before, you'll likely familiar with the ",(0,n.kt)("inlineCode",{parentName:"p"},"[Authorize]")," attribute and how its used to enforce security. GraphQL ASP.NET works the same way."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="General Authorization Check"',title:'"General',Authorization:!0,'Check"':!0},'public class BakeryController : GraphController\n{\n    [Authorize]\n    [MutationRoot("orderDonuts", typeof(CompletedDonutOrder))]\n    public async Task<IGraphActionResult> OrderDonuts(DonutOrderModel order)\n    {/*...*/}\n}\n')),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Restrict by Policy"',title:'"Restrict',by:!0,'Policy"':!0},'public class BakeryController : GraphController\n{\n    [Authorize(Policy = "CustomerLoyaltyProgram")]\n    [MutationRoot("orderDonuts", typeof(CompletedDonutOrder))]\n    public async Task<IGraphActionResult> OrderDonuts(DonutOrderModel order)\n    {/*...*/}\n}\n')),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Restrict by Role"',title:'"Restrict',by:!0,'Role"':!0},'public class BakeryController : GraphController\n{\n    [Authorize(Roles = "Admin, Employee")]\n    [MutationRoot("purchaseDough")]\n    public async Task<bool> PurchaseDough(int kilosOfDough)\n    {/*...*/}\n}\n')),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Multiple Authorization Requirements"',title:'"Multiple',Authorization:!0,'Requirements"':!0},'// The library supports nested policy and role checks at Controller and Action levels.\n[Authorize(Policy = "CurrentCustomer")]\npublic class BakeryController : GraphController\n{\n    [Authorize(Policy = "LoyaltyProgram")]\n    [MutationRoot("orderDonuts", typeof(CompletedDonutOrder))]\n    public async Task<IGraphActionResult> OrderDonuts(DonutOrderModel order)\n    {/*...*/}\n}\n')),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Use of [AllowAnonymous]"',title:'"Use',of:!0,'[AllowAnonymous]"':!0},'[Authorize]\npublic class BakeryController : GraphController\n{\n    [Authorize(Policy = "CustomerLoyaltyProgram")]\n    [MutationRoot("orderDonuts", typeof(CompletedDonutOrder))]\n    public async Task<IGraphActionResult> OrderDonuts(DonutOrderModel order)\n    {/*...*/}\n\n    // No Authorization checks on RetrieveDonutList\n    [AllowAnonymous]\n    [Mutation("donutList")]\n    public async Task<IEnumerable<Donut>> RetrieveDonutList()\n    {/*...*/}\n}\n')),(0,n.kt)("h2",{id:"use-of-iauthorizationservice"},"Use of IAuthorizationService"),(0,n.kt)("p",null,"Under the hood, GraphQL taps into your ",(0,n.kt)("inlineCode",{parentName:"p"},"IServiceProvider")," to obtain a reference to the ",(0,n.kt)("inlineCode",{parentName:"p"},"IAuthorizationService")," that gets created when you configure ",(0,n.kt)("inlineCode",{parentName:"p"},".AddAuthorization()")," for policy enforcement rules. Take a look at the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/graphql-aspnet/graphql-aspnet/tree/master/src/graphql-aspnet/Middleware/SchemaItemSecurity"},"Schema Item Authorization Pipeline")," for the full picture."),(0,n.kt)("h2",{id:"when-does-authorization-occur"},"When does Authorization Occur?"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Authorization Flow",src:r(9648).Z,width:"1164",height:"252"})),(0,n.kt)("p",null,(0,n.kt)("em",{parentName:"p"},'The Default "per field" Authorization workflow')),(0,n.kt)("hr",null),(0,n.kt)("p",null,"In the diagram above we can see that user authorization in GraphQL ASP.NET makes use of the result from ",(0,n.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/aspnet/core/security/authorization/introduction"},"ASP.NET's security pipeline"),". Whether you use Kerberos tokens, oauth2, username/password, API tokens or if you support 2-factor authentication or one-time-use passwords, GraphQL doesn't care. The entirety of your authentication and authorization scheme is executed by GraphQL, no special arrangements or configuration is needed."),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"GraphQL ASP.NET draws from your configured authentication/authorization solution.")),(0,n.kt)("p",null,"Execution directives and field resolutions are passed through a ",(0,n.kt)("a",{parentName:"p",href:"../reference/how-it-works#middleware-pipelines"},"pipeline")," where authorization is enforced as a series of middleware components before the respective handlers are invoked. Should a requestor not be authorized for a given schema item an action is taken:"),(0,n.kt)("h2",{id:"field-authorizations"},"Field Authorizations"),(0,n.kt)("p",null,"If a requestor is not authorized to a requested field a value of ",(0,n.kt)("inlineCode",{parentName:"p"},"null")," is used as the resolved value and an error message is recorded to the query results. "),(0,n.kt)("p",null,'Null propagation rules still apply to unauthorized fields meaning if the field cannot accept a null value, its propagated up the field chain potentially nulling out a parent or "parent of a parent" depending on your schema.'),(0,n.kt)("p",null,"By default, a single unauthorized field result does not necessarily kill an entire query, it depends on the structure of your object graph and the query being executed. When a field request is terminated any down-stream child fields are discarded immediately but sibling fields or unrelated ancestors continue to execute as normal."),(0,n.kt)("p",null,'Since this authorization occurs "per field" and not "per controller action" its possible to define the same security chain for POCO properties. This allows you to effectively deny access, by policy, to a single property of an instantiated object. Performing security checks for every field of data (especially in parent/child scenarios) has a performance cost though, especially for larger data sets. For most scenarios enforcing security at the controller level is sufficient.'),(0,n.kt)("h3",{id:"field-authorization-failures-are-obfuscated"},"Field Authorization Failures are Obfuscated"),(0,n.kt)("p",null,"When GraphQL denies a requestor access to a field a message naming the field path is added to the response. This message is generic on purpose: ",(0,n.kt)("inlineCode",{parentName:"p"},"\"Access denied to field '[query]/bakery/donuts'\""),". To view more targeted reasons, such as specific policy failures, you'll need to expose exceptions on the request or turn on ",(0,n.kt)("a",{parentName:"p",href:"../logging/structured-logging"},"logging"),". GraphQL automatically raises the ",(0,n.kt)("inlineCode",{parentName:"p"},"SchemaItemAuthorizationCompleted")," log event at a ",(0,n.kt)("inlineCode",{parentName:"p"},"Warning")," level when a security check fails."),(0,n.kt)("h2",{id:"execution-directives-authorizations"},"Execution Directives Authorizations"),(0,n.kt)("p",null,"Execution directives are applied to the ",(0,n.kt)("em",{parentName:"p"},"query document")," before a query plan is created, but it is the query plan that determines what field resolvers should be called. As a result, execution directives have the potential to alter the document structure and change how a query might be resolved. Because of this, not executing a query directive has the potential to change (or not change) the expected query to be different than what the requestor intended to ask for. "),(0,n.kt)("p",null,"Therefore, if an execution directive fails authorization the query is rejected and not executed.  The caller will receive an error message as part of the response indicating the unauthorized directive. Like field authorization failures, the message is obfuscated and contains only a generic message. You'll need to expose exception on the request or turn on logging to see additional details."),(0,n.kt)("h2",{id:"authorization-methods"},"Authorization Methods"),(0,n.kt)("p",null,"GraphQL ASP.NET supports two methods of applying the authorization rules out of the box."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"PerField"),": Each field is authorized individually. If a query references some fields the user can access and some they cannot, those fields the user can access are resolved as expected. A ",(0,n.kt)("inlineCode",{parentName:"p"},"null")," value is assigned to the fields the user cannot access.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"PerRequest"),": All fields that require authorization are authorized at once. If the user is unauthorized on 1 or more fields the entire request is denied and not executed."))),(0,n.kt)("p",null,"Configure the authorization method at startup:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Startup"',title:'"Startup"'},"services.AddGraphQL(schemaOptions =>\n{\n    schemaOptions.AuthorizationOptions.Method = AuthorizationMethod.PerRequest;\n});\n")),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},"Regardless of the authorization method chosen, ",(0,n.kt)("strong",{parentName:"p"},"execution directives"),' are ALWAYS evaluated with a "per request" method. If a single execution directive fails, the whole query is failed and no data will be resolved.')))}d.isMDXComponent=!0},9648:(e,t,r)=>{r.d(t,{Z:()=>o});const o=r.p+"assets/images/authorization-flow-e30f317af5054808ddf68257c7805b56.png"}}]);