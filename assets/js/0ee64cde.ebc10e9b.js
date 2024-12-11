"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4209],{5680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>m});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},g="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),g=s(n),d=a,m=g["".concat(c,".").concat(d)]||g[d]||p[d]||i;return n?r.createElement(m,l(l({ref:t},u),{},{components:n})):r.createElement(m,l({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=d;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[g]="string"==typeof e?e:a,l[1]=o;for(var s=2;s<i;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},546:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>g,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var r=n(8168),a=(n(6540),n(5680));const i={id:"global-configuration",title:"Global Configuration",sidebar_label:"Global Configuration",sidebar_position:2},l=void 0,o={unversionedId:"reference/global-configuration",id:"reference/global-configuration",title:"Global Configuration",description:"Global configuration settings affect the entire server instance, they are not restricted to a single schema registration. All global settings are optional and define resonable default values. Use these to fine tune your server environment. You should change any global settings BEFORE calling .AddGraphQL().",source:"@site/docs/reference/global-configuration.md",sourceDirName:"reference",slug:"/reference/global-configuration",permalink:"/docs/reference/global-configuration",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"global-configuration",title:"Global Configuration",sidebar_label:"Global Configuration",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Schema Configuration",permalink:"/docs/reference/schema-configuration"},next:{title:"Attributes",permalink:"/docs/reference/attributes"}},c={},s=[{value:"General",id:"general",level:2},{value:"ControllerServiceLifetime",id:"controllerservicelifetime",level:3},{value:"Subscriptions",id:"subscriptions",level:2},{value:"MaxConcurrentReceiverCount",id:"maxconcurrentreceivercount",level:3},{value:"MaxConnectedClientCount",id:"maxconnectedclientcount",level:3}],u={toc:s};function g(e){let{components:t,...n}=e;return(0,a.yg)("wrapper",(0,r.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,"Global configuration settings affect the entire server instance, they are not restricted to a single schema registration. All global settings are optional and define resonable default values. Use these to fine tune your server environment. You should change any global settings BEFORE calling ",(0,a.yg)("inlineCode",{parentName:"p"},".AddGraphQL()"),"."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Adding Schema Configuration Options"',title:'"Adding',Schema:!0,Configuration:!0,'Options"':!0},"// -------------------\n// Configure Global Options before calling AddGraphQL\n// -------------------\n\nservices.AddGraphQL();\n")),(0,a.yg)("h2",{id:"general"},"General"),(0,a.yg)("h3",{id:"controllerservicelifetime"},"ControllerServiceLifetime"),(0,a.yg)("p",null,"The configured service lifetime that all discovered controllers and directives will be registered as within the DI container during any schema's setup\nprocess."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-csharp"},"GraphQLServerSettings.ControllerServiceLifetime = ServiceLifetime.Transient;\n")),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Default Value"),(0,a.yg)("th",{parentName:"tr",align:null},"Acceptable Values"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"Transient ")),(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"Transient"),", ",(0,a.yg)("inlineCode",{parentName:"td"},"Scoped"),", ",(0,a.yg)("inlineCode",{parentName:"td"},"Singleton"))))),(0,a.yg)("admonition",{type:"danger"},(0,a.yg)("p",{parentName:"admonition"}," Registering GraphControllers as anything other than transient can cause unexpected behavior and result in unexplained crashes, data loss, data exposure and security issues in some scenarios. Consider restructuring your application before changing this setting. Adjusting this value should be a last resort, not a first option.")),(0,a.yg)("h2",{id:"subscriptions"},"Subscriptions"),(0,a.yg)("h3",{id:"maxconcurrentreceivercount"},"MaxConcurrentReceiverCount"),(0,a.yg)("p",null,"Indicates the maximum number of entities (i.e. client connections) that will receive a raised subscription event on this server instance. If there are more receivers than this configured limit the others are queued and will recieve the event in turn once as others finish processing it."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-csharp"},"GraphQLSubscriptionServerSettings.MaxConcurrentReceiverCount = 500;\n")),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Default Value"),(0,a.yg)("th",{parentName:"tr",align:null},"Acceptable Values"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"500")),(0,a.yg)("td",{parentName:"tr",align:null},"> 0")))),(0,a.yg)("h3",{id:"maxconnectedclientcount"},"MaxConnectedClientCount"),(0,a.yg)("p",null,"Indicates the maximum number of client connections this server instance will accept, combined, across all schemas. If this limit is reached a new connection will be automatically rejected even if ASP.NET was willing to accept it."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-csharp"},"GraphQLSubscriptionServerSettings.MaxConnectedClientCount = null;\n")),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Default Value"),(0,a.yg)("th",{parentName:"tr",align:null},"Acceptable Values"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("em",{parentName:"td"},"-not set-")),(0,a.yg)("td",{parentName:"tr",align:null},"null OR > 0")))),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"Note: By default this value is not set, indicating there is no limit. GraphQL will accept any connection passed by the ASP.NET runtime.")))}g.isMDXComponent=!0}}]);