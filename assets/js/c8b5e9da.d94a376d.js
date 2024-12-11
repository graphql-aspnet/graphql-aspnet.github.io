"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4206],{5680:(e,n,t)=>{t.d(n,{xA:()=>y,yg:()=>m});var a=t(6540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=a.createContext({}),s=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},y=function(e){var n=s(e.components);return a.createElement(p.Provider,{value:n},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,y=o(e,["components","mdxType","originalType","parentName"]),u=s(t),d=r,m=u["".concat(p,".").concat(d)]||u[d]||g[d]||l;return t?a.createElement(m,i(i({ref:n},y),{},{components:t})):a.createElement(m,i({ref:n},y))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,i=new Array(l);i[0]=d;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o[u]="string"==typeof e?e:r,i[1]=o;for(var s=2;s<l;s++)i[s]=t[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},1748:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var a=t(8168),r=(t(6540),t(5680));const l={id:"list-non-null",title:"List & Non-Null",sidebar_label:"List & Non-Null",sidebar_position:6},i=void 0,o={unversionedId:"types/list-non-null",id:"types/list-non-null",title:"List & Non-Null",description:"In addition to the six fundamental graph types, GraphQL contains two meta graph types: LIST and NON_NULL.",source:"@site/docs/types/list-non-null.md",sourceDirName:"types",slug:"/types/list-non-null",permalink:"/docs/types/list-non-null",draft:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{id:"list-non-null",title:"List & Non-Null",sidebar_label:"List & Non-Null",sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"Scalars",permalink:"/docs/types/scalars"},next:{title:"Subscriptions",permalink:"/docs/advanced/subscriptions"}},p={},s=[{value:"Type Expressions",id:"type-expressions",level:2},{value:"Overriding Type Expressions",id:"overriding-type-expressions",level:3}],y={toc:s};function u(e){let{components:n,...t}=e;return(0,r.yg)("wrapper",(0,a.A)({},y,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"In addition to the six fundamental graph types, GraphQL contains two meta graph types: ",(0,r.yg)("a",{parentName:"p",href:"https://graphql.org/learn/schema/#lists-and-non-null"},"LIST and NON_NULL"),"."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"NON_NULL")," : Indicates that the Graph Type its describing must not be a null value, be that as an input argument or returned from a field"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"LIST"),": Indicates that GraphQL should expect a collection of objects instead of just a single item.")),(0,r.yg)("p",null,'These meta types aren\'t anything concrete like a scalar or an enum. Instead they "wrap" another graph type (such as ',(0,r.yg)("inlineCode",{parentName:"p"},"int")," or ",(0,r.yg)("inlineCode",{parentName:"p"},"Donut"),"). They are used to describe the usage of a graph type in a field or input argument:"),(0,r.yg)("p",null,"For example, we would say:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},'"A field that returns a ',(0,r.yg)("inlineCode",{parentName:"li"},"Float"),' number."'),(0,r.yg)("li",{parentName:"ul"},'"A field that must return a ',(0,r.yg)("inlineCode",{parentName:"li"},"Person"),'."'),(0,r.yg)("li",{parentName:"ul"},'"An input argument that must be a ',(0,r.yg)("inlineCode",{parentName:"li"},"Date"),'."')),(0,r.yg)("p",null,"We can even describe complex scenarios:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},'"A field that ',(0,r.yg)("strong",{parentName:"li"},"might")," return a collection of ",(0,r.yg)("inlineCode",{parentName:"li"},"persons")," but when returned, each person ",(0,r.yg)("strong",{parentName:"li"},"must"),' be a valid reference."'),(0,r.yg)("li",{parentName:"ul"},'"An input argument that ',(0,r.yg)("strong",{parentName:"li"},"must")," be a list that contains lists of ",(0,r.yg)("inlineCode",{parentName:"li"},"integers"),'." (e.g. ',(0,r.yg)("inlineCode",{parentName:"li"},"[[1, 2], [5, 15]]"),")")),(0,r.yg)("h2",{id:"type-expressions"},"Type Expressions"),(0,r.yg)("p",null,'Together these "wrappers" make up a field\'s ',(0,r.yg)("inlineCode",{parentName:"p"},"Type Expression"),". GraphQL ASP.NET will automatically infer a type expression for every field and every input argument when generating your schema."),(0,r.yg)("p",null,"The following assumptions about your data are made when creating type expressions:"),(0,r.yg)("p",null,"\u2705  Reference types ",(0,r.yg)("strong",{parentName:"p"},"can be")," null ",(0,r.yg)("br",null),"\n\u2705  Value types ",(0,r.yg)("strong",{parentName:"p"},"cannot be")," null ",(0,r.yg)("br",null),"\n\u2705  Nullable value types (e.g. ",(0,r.yg)("inlineCode",{parentName:"p"},"int?"),") ",(0,r.yg)("strong",{parentName:"p"},"can be")," null ",(0,r.yg)("br",null),"\n\u2705  When a reference type implements ",(0,r.yg)("inlineCode",{parentName:"p"},"IEnumerable<TType>"),' it will be expressed as a "list of ',(0,r.yg)("inlineCode",{parentName:"p"},"TType"),'"'),(0,r.yg)("p",null,"Type Expressions are commonly shown in the GraphQL schema syntax for field definitions. Here are a few examples of a .NET type and its equivalent type expression in schema syntax."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},".NET Type"),(0,r.yg)("th",{parentName:"tr",align:null},"Type Expression"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"int"),(0,r.yg)("td",{parentName:"tr",align:null},"Int!")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"float?"),(0,r.yg)("td",{parentName:"tr",align:null},"Float")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"IEnumerable","<","Person",">"),(0,r.yg)("td",{parentName:"tr",align:null},"[Person]")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Person[]"),(0,r.yg)("td",{parentName:"tr",align:null},"[Person]")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"List","<","bool",">"),(0,r.yg)("td",{parentName:"tr",align:null},"[Boolean!]")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"IReadOnlyList","<","long",">"),(0,r.yg)("td",{parentName:"tr",align:null},"[Long!]")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"IReadOnlyList","<","long?",">"),(0,r.yg)("td",{parentName:"tr",align:null},"[Long]")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"IEnumerable","<","List","<","ICollection","<","Donut",">",">",">"),(0,r.yg)("td",{parentName:"tr",align:null},"[[","[Donut]","]]")))),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"The ",(0,r.yg)("inlineCode",{parentName:"p"},"!")," indicates NON_NULL and ",(0,r.yg)("inlineCode",{parentName:"p"},"[]")," for a LIST.")),(0,r.yg)("h3",{id:"overriding-type-expressions"},"Overriding Type Expressions"),(0,r.yg)("p",null,"You may need to override the default behavior from time to time. For instance, a ",(0,r.yg)("inlineCode",{parentName:"p"},"string"),", which is a reference type, is nullable by default but you may want to enforce non-nullability at the query level and declare that null is not valid for a given argument. Or, perhaps, an object implements ",(0,r.yg)("inlineCode",{parentName:"p"},"IEnumerable")," but you don't want graphql to treat it as a list."),(0,r.yg)("p",null,"You can override the default type expression of any field or argument by defining a ",(0,r.yg)("a",{parentName:"p",href:"../advanced/type-expressions"},"custom type expression")," when needed."))}u.isMDXComponent=!0}}]);