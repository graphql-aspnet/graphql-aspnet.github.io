"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[934],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=u(n),m=r,h=p["".concat(s,".").concat(m)]||p[m]||c[m]||o;return n?a.createElement(h,l(l({ref:t},d),{},{components:n})):a.createElement(h,l({ref:t},d))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[p]="string"==typeof e?e:r,l[1]=i;for(var u=2;u<o;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},433:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>u});var a=n(7462),r=(n(7294),n(3905));const o={id:"model-state",title:"Model State",sidebar_label:"Model State",sidebar_position:1},l=void 0,i={unversionedId:"controllers/model-state",id:"controllers/model-state",title:"Model State",description:"GraphQL, as a language, can easily enforce type level requirements like :",source:"@site/docs/controllers/model-state.md",sourceDirName:"controllers",slug:"/controllers/model-state",permalink:"/docs/controllers/model-state",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"model-state",title:"Model State",sidebar_label:"Model State",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Actions",permalink:"/docs/controllers/actions"},next:{title:"Field Paths",permalink:"/docs/controllers/field-paths"}},s={},u=[{value:"Model Validation to the Rescue",id:"model-validation-to-the-rescue",level:4},{value:"<em>Implementation Note</em>",id:"implementation-note",level:4}],d={toc:u};function p(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"GraphQL, as a language, can easily enforce type level requirements like :"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The data must a collection"),(0,r.kt)("li",{parentName:"ul"},"The data cannot be null"),(0,r.kt)("li",{parentName:"ul"},"The data must be an integer")),(0,r.kt)("p",null,"But it fails to enforce the individual business requirements of our data:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Is the employee's last name less than 70 characters?"),(0,r.kt)("li",{parentName:"ul"},"Is the customer's phone number 7 or 10 digits?"),(0,r.kt)("li",{parentName:"ul"},"Is the number of donuts ordered at least 1?")),(0,r.kt)("h4",{id:"model-validation-to-the-rescue"},"Model Validation to the Rescue"),(0,r.kt)("p",null,"When your controller action is invoked the runtime will analyze the input parameters and will execute the validation attributes attached to each property to determine a validation state, just like you'd do in an MVC controller."),(0,r.kt)("p",null,"In this example we use the ",(0,r.kt)("inlineCode",{parentName:"p"},"[Range]")," attribute under ",(0,r.kt)("inlineCode",{parentName:"p"},"System.ComponentModel.DataAnnotations")," to limit the quantity of donuts that can be ordered to two dozen."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="DonutOrderModel.cs"',title:'"DonutOrderModel.cs"'},"public class DonutOrderModel\n{\n    [Range(1, 24)]\n    public int Quantity { get; set; }\n    public string Type { get; set; }\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="BakeryController.cs"',title:'"BakeryController.cs"'},'public class BakeryController : GraphController\n{\n    //constructor with service injection omitted for brevity...\n\n    [MutationRoot("orderDonuts", typeof(CompletedDonutOrder))]\n    public async Task<IGraphActionResult> OrderDonuts(DonutOrderModel order)\n    {\n        if (!this.ModelState.IsValid)\n            return this.BadRequest(this.ModelState);\n\n        var result = await _service.PlaceDonutOrder(order);\n        return this.Ok(result);\n    }\n}\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Sample Query"',title:'"Sample','Query"':!0},"# A valid query\n# that breaks a required business rule\nmutation {\n    orderDonuts(order: {quantity: 60}) {\n        id\n        name\n    }\n}\n")),(0,r.kt)("p",null,"Just like with ASP.NET, ",(0,r.kt)("inlineCode",{parentName:"p"},"this.ModelState"),' contains an entry for each "validatiable" object passed to the method and its current validation state (valid, invalid, skipped etc.) along with all the rules that did not pass. Also, just like with ASP.NET you can define custom attributes that inherit from ',(0,r.kt)("inlineCode",{parentName:"p"},"ValidationAttriubte")," and GraphQL will execute them as well."),(0,r.kt)("p",null,"In the example, we returned a IGraphActionResult to make use of ",(0,r.kt)("inlineCode",{parentName:"p"},"this.BadRequest()")," which will add the friendly error messages to the outgoing response automatically. But we could have easily just returned null, thrown an exception or generated a generic custom error message. However you choose to deal with ",(0,r.kt)("inlineCode",{parentName:"p"},"ModelState")," is up to you. GraphQL will validate the data but it doesn't take action when model validation fails. That's up to you."),(0,r.kt)("h4",{id:"implementation-note"},(0,r.kt)("em",{parentName:"h4"},"Implementation Note")),(0,r.kt)("p",null,"GraphQL makes use of the same ",(0,r.kt)("inlineCode",{parentName:"p"},"System.ComponentModel.DataAnnotations.Validator")," that ASP.NET does to validate its input objects. ",(0,r.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation?view=aspnetcore-7.0"},"All the applicable rules")," that apply to MVC model validation also apply to GraphQL."),(0,r.kt)("p",null,"However, where MVC will validate model binding rules and represent binding errors it its ModelState object, GraphQL will not. GraphQL binding issues such as type expressions and nullability are taken care of at the query level, long before a query plan is finalized and the action method is invoked. As a result, the model state of GraphQL ASP.NET is a close approximation of MVC's model state object, but it is not a direct match."))}p.isMDXComponent=!0}}]);