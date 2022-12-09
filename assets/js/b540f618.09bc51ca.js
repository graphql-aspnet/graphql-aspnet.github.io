"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5782],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>b});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(n),g=i,b=d["".concat(s,".").concat(g)]||d[g]||p[g]||o;return n?r.createElement(b,a(a({ref:t},c),{},{components:n})):r.createElement(b,a({ref:t},c))}));function b(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=g;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:i,a[1]=l;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},3162:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var r=n(7462),i=(n(7294),n(3905));const o={id:"debugging",title:"Debugging Your Schema",sidebar_label:"Debugging",sidebar_position:0},a=void 0,l={unversionedId:"development/debugging",id:"development/debugging",title:"Debugging Your Schema",description:"Disable Field Asynchronousity",source:"@site/docs/development/debugging.md",sourceDirName:"development",slug:"/development/debugging",permalink:"/docs/development/debugging",draft:!1,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"debugging",title:"Debugging Your Schema",sidebar_label:"Debugging",sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"Malicious Queries",permalink:"/docs/execution/malicious-queries"},next:{title:"Unit Testing",permalink:"/docs/development/unit-testing"}},s={},u=[{value:"Disable Field Asynchronousity",id:"disable-field-asynchronousity",level:2}],c={toc:u};function d(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"disable-field-asynchronousity"},"Disable Field Asynchronousity"),(0,i.kt)("p",null,"GraphQL will execute sibling fields asynchronously during normal operation. This includes multiple top level controller action calls. However, during a debugging session, having multiple fields trying to resolve themselves can play havoc with your debug cursor. If you've ever encountered a situation where the yellow line in Visual Studio seemly jumps around to random lines of code then you've experienced this issue."),(0,i.kt)("p",null,"At startup it can help to disable asynchronous field resolution and instead force each field to execute in sequential order awaiting its completion before beginning the next one. Don't forget to disable this in production though as awaiting fields individually will significantly impact performance."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Configure Debug Mode"',title:'"Configure',Debug:!0,'Mode"':!0},"services.AddGraphQL(options =>\n{\n    // Enable debug mode for the schema\n    options.ExecutionOptions.DebugMode = true;\n});\n")))}d.isMDXComponent=!0}}]);