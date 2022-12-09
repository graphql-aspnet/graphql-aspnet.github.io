"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2786],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>m});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),p=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=p(e.components);return a.createElement(s.Provider,{value:n},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},h=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(t),h=r,m=d["".concat(s,".").concat(h)]||d[h]||c[h]||o;return t?a.createElement(m,i(i({ref:n},u),{},{components:t})):a.createElement(m,i({ref:n},u))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=h;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[d]="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=t[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}h.displayName="MDXCreateElement"},3430:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=t(7462),r=(t(7294),t(3905));const o={id:"unions",title:"Unions",sidebar_label:"Unions",sidebar_position:3},i=void 0,l={unversionedId:"types/unions",id:"types/unions",title:"Unions",description:"Unions are an aggregate graph type representing multiple, different OBJECT types with no guaranteed fields or interfaces in common; for instance, Salad or Bread. Because of this, unions define no fields themselves but provide a common way to query the fields of the union members when one is encountered.",source:"@site/docs/types/unions.md",sourceDirName:"types",slug:"/types/unions",permalink:"/docs/types/unions",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{id:"unions",title:"Unions",sidebar_label:"Unions",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Interfaces",permalink:"/docs/types/interfaces"},next:{title:"Enums",permalink:"/docs/types/enums"}},s={},p=[{value:"Declaring a Union",id:"declaring-a-union",level:2},{value:"What to Return for a Union",id:"what-to-return-for-a-union",level:3},{value:"Union Proxies",id:"union-proxies",level:2},{value:"Union Name Uniqueness",id:"union-name-uniqueness",level:2},{value:"Liskov Substitutions",id:"liskov-substitutions",level:2},{value:"IGraphUnionProxy.MapType",id:"igraphunionproxymaptype",level:4}],u={toc:p};function d(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Unions are an aggregate graph type representing multiple, different ",(0,r.kt)("inlineCode",{parentName:"p"},"OBJECT")," types with no guaranteed fields or interfaces in common; for instance, ",(0,r.kt)("inlineCode",{parentName:"p"},"Salad")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"Bread"),". Because of this, unions define no fields themselves but provide a common way to query the fields of the union members when one is encountered."),(0,r.kt)("p",null,"Unlike other graph types there is no concrete representation of unions. Where a ",(0,r.kt)("inlineCode",{parentName:"p"},"class")," is an object graph type or a .NET ",(0,r.kt)("inlineCode",{parentName:"p"},"enum")," is an enum graph type there is no analog for unions. Instead unions are semi-virtual types that are created from proxy classes that represent them at design time."),(0,r.kt)("h2",{id:"declaring-a-union"},"Declaring a Union"),(0,r.kt)("p",null,"You can declare a union in your action method using one of the many overloads to the query and mutation attributes:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Declaring a Union on an Action Method"',title:'"Declaring',a:!0,Union:!0,on:!0,an:!0,Action:!0,'Method"':!0},'public class KitchenController : GraphController\n{\n    [QueryRoot("searchFood", "SaladOrBread", typeof(Salad), typeof(Bread))]\n    public ????? RetrieveFood(string name)\n    {/* ... */}\n}\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Example Query"',title:'"Example','Query"':!0},'query {\n    searchFood(name: "caesar*") {\n        ...on Salad {\n            name\n            hasCroutons\n        }\n\n        ...on Bread {\n            name\n            hasGarlic\n        }\n    }\n}\n')),(0,r.kt)("p",null,"In this example we :"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Declared an action method named ",(0,r.kt)("inlineCode",{parentName:"li"},"RetrieveFood")," with a graph field name of ",(0,r.kt)("inlineCode",{parentName:"li"},"searchFood")),(0,r.kt)("li",{parentName:"ul"},"Declared a union type on our graph named ",(0,r.kt)("inlineCode",{parentName:"li"},"SaladOrBread")),(0,r.kt)("li",{parentName:"ul"},"Included two object types in the union: ",(0,r.kt)("inlineCode",{parentName:"li"},"Salad")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"Bread"))),(0,r.kt)("p",null,"Unlike with ",(0,r.kt)("a",{parentName:"p",href:"./interfaces"},"interfaces")," where the possible types returned from an action method can be declared else where, you MUST provide the types to include in the union in the declaration."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Union member types must be declared as part of the union.")),(0,r.kt)("h3",{id:"what-to-return-for-a-union"},"What to Return for a Union"),(0,r.kt)("p",null,"Notice we have a big question mark on what the action method returns in the above example. From a C# perspective, in this example, there is no ",(0,r.kt)("inlineCode",{parentName:"p"},"IFood")," interface shared between ",(0,r.kt)("inlineCode",{parentName:"p"},"Salad")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"Bread"),". This represents a problem for static-typed languages like C#. Since unions are virtual types there exists no common type that you can return for generated data. ",(0,r.kt)("inlineCode",{parentName:"p"},"System.Object")," might work but it tends to be too general and the runtime will reject it as a safe guard."),(0,r.kt)("p",null,"So what do you do? Return an ",(0,r.kt)("inlineCode",{parentName:"p"},"IGraphActionResult")," instead and let the runtime handle the details."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Return IGraphActionResult When Working With Unions"',title:'"Return',IGraphActionResult:!0,When:!0,Working:!0,With:!0,'Unions"':!0},'public class KitchenController : GraphController\n{\n    // service injection omitted for brevity\n\n    [QueryRoot("searchFood", "SaladOrBread", typeof(Salad), typeof(Bread))]\n    public async Task<IGraphActionResult> SearchFood(string name)\n    {\n        if(name.Contains("green"))\n        {\n            Salad salad = await _saladService.FindSalad(name);\n            return this.Ok(salad);\n        }\n        else\n        {\n            Bread bread = await _breadService.FindBread(name);\n            return this.Ok(bread);\n        }\n    }\n}\n')),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Any controller action that declares a union MUST return an ",(0,r.kt)("inlineCode",{parentName:"p"},"IGraphActionResult"))),(0,r.kt)("h2",{id:"union-proxies"},"Union Proxies"),(0,r.kt)("p",null,"In the example above we declare the union inline. But what if we wanted to reuse the ",(0,r.kt)("inlineCode",{parentName:"p"},"SaladOrBread")," union in multiple places. You could declare the union exactly the same on each method or use a union proxy. Create a class that implements ",(0,r.kt)("inlineCode",{parentName:"p"},"IGraphUnionProxy")," or inherits from ",(0,r.kt)("inlineCode",{parentName:"p"},"GraphUnionProxy")," to encapsulate the details, then add that as a reference in your controller methods instead of the individual types. This can also be handy for uncluttering your code if you have a lot of possible types for the union. The return type of your method will still need to be ",(0,r.kt)("inlineCode",{parentName:"p"},"IGraphActionResult"),". You cannot return a ",(0,r.kt)("inlineCode",{parentName:"p"},"IGraphUnionProxy")," as a value."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Example Using IGraphUnionProxy"',title:'"Example',Using:!0,'IGraphUnionProxy"':!0},'public class KitchenController : GraphController\n{\n    [QueryRoot("searchFood", typeof(SaladOrBread))]\n    public async Task<IGraphActionResult> SearchFood(string name)\n    {/* ... */}\n}\n\n// SaladOrBread.cs\npublic class SaladOrBread : GraphUnionProxy\n{\n     public SaladOrBread()\n        : base()\n    {\n        this.Name = "SaladOrBread";\n        this.AddType(typeof(Salad));\n        this.AddType(typeof(Bread));\n    }\n}\n')),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"If you don't supply a  name, graphql will automatically use the class name of the proxy as the name of the union.")),(0,r.kt)("h2",{id:"union-name-uniqueness"},"Union Name Uniqueness"),(0,r.kt)("p",null,"Union names must be unique in a schema. If you do declare a union in multiple action methods without a proxy, GraphQL will attempt to merge the references by name and included types. As long as all declarations are the same, that is the name and the set of included types, then graphql will accept the union. Otherwise, a ",(0,r.kt)("inlineCode",{parentName:"p"},"GraphTypeDeclarationException")," will be thrown at startup."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="An Invalid Union Declaration"',title:'"An',Invalid:!0,Union:!0,'Declaration"':!0},'public class KitchenController : GraphController\n{\n    [QueryRoot("searchFood", "SaladOrBread", typeof(Salad), typeof(Bread))]\n    public async Task<IGraphActionResult> SearchFood(string name)\n    {/* ... */}\n\n    // ERROR: Union members for \'SaladAreBread\' are different\n    // -----------------\n    [QueryRoot("food", "SaladOrBread", typeof(Salad), typeof(Bread), typeof(DinnerRoll))]\n    public async Task<IGraphActionResult> RetrieveSingleFood(int id)\n    {/* ... */}\n}\n')),(0,r.kt)("h2",{id:"liskov-substitutions"},"Liskov Substitutions"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Liskov_substitution_principle"},"Liskov substitutions")," (the L in ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/SOLID"},"SOLID"),") are an important part of object oriented programming. To be able to have one class masquerade as another allows us to easily extend our code's capabilities without any rework."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Liskov Substitution Example"',title:'"Liskov',Substitution:!0,'Example"':!0},"public class Bread\n{}\n\npublic class Roll : Bread\n{}\n\npublic class Bagel : Roll\n{}\n\npublic class Oven \n{\n    public void Bake(Bread bread)\n    {\n        // We can pass in Bread, Roll or Bagel to the oven.\n    }\n}\n")),(0,r.kt)("br",null),(0,r.kt)("p",null,"However, this presents a problem when when dealing with UNIONs and GraphQL."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="BakeryController.cs"',title:'"BakeryController.cs"'},'public class BakeryController : GraphController\n{\n    [QueryRoot("searchFood", "RollOrBread",  typeof(Roll), typeof(Bread))]\n    public IGraphActionResult SearchFood(string name)\n    {\n        // Bagle is not a declared member of the union\n        // but can be used as a Roll and Bread\n        // which one do we choose?\n        return this.Ok(new Bagel());\n    }\n}\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Sample Query"',title:'"Sample','Query"':!0},'query {\n    searchFood(name: "Everything"){\n        ... on Bread { \n                name, \n                type \n        }\n        ... on Roll { \n                name, \n                hardness \n        }\n    }\n}\n')),(0,r.kt)("p",null,"Most of the time, graphql can correctly interpret the correct union type of a returned data object and continue processing the query. However, in the above example, we declare a union, ",(0,r.kt)("inlineCode",{parentName:"p"},"RollOrBread"),", that is of types ",(0,r.kt)("inlineCode",{parentName:"p"},"Roll")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"Bread"),"  yet we return a ",(0,r.kt)("inlineCode",{parentName:"p"},"Bagel")," from the action method. "),(0,r.kt)("p",null,"Since ",(0,r.kt)("inlineCode",{parentName:"p"},"Bagel")," is both a ",(0,r.kt)("inlineCode",{parentName:"p"},"Roll")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"Bread")," which type should graphql match against to continue executing the query? Since it could be either, graphql will be unable to determine which type to use and can't advance the query to select the appropriate fields. The query result is said to be indeterminate. "),(0,r.kt)("h4",{id:"igraphunionproxymaptype"},"IGraphUnionProxy.MapType"),(0,r.kt)("p",null,"GraphQL ASP.NET offers a way to allow you to take control of your unions and make the determination on your own. The ",(0,r.kt)("inlineCode",{parentName:"p"},"MapType")," method implemented by ",(0,r.kt)("inlineCode",{parentName:"p"},"IGraphUnionProxy")," will be called whenever a query result is indeterminate, allowing you to choose which of your union's allowed types should be used. "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'// RollOrBread.cs\npublic class RollOrBread : GraphUnionProxy\n{\n    public RollOrBread()\n        : base(typeof(Roll), typeof(Bread))\n    {}\n\n    public override Type MapType(Type runtimeObjectType)\n    {\n        if (runtimeObjectType == typeof(Bagel))\n            return typeof(Roll);\n        else\n            return typeof(Bread);\n    }\n}\n\n// BakeryController.cs\npublic class BakeryController : GraphController\n{\n    [QueryRoot("searchFood", typeof(RollOrBread))]\n    public IGraphActionResult SearchFood(string name)\n    {\n        return this.Ok(new Bagel());\n    }\n}\n')),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"  ",(0,r.kt)("inlineCode",{parentName:"p"},"MapType")," is not based on the resolved field value, but only on the ",(0,r.kt)("inlineCode",{parentName:"p"},"System.Type"),". This is by design to guarantee consistency in query execution. "),(0,r.kt)("p",{parentName:"admonition"},"   If your returned type causes the query to remain indeterminate a validation error (rule ",(0,r.kt)("a",{parentName:"p",href:"https://spec.graphql.org/October2021/#sec-Value-Completion"},"6.4.3"),") will be applied to the query.")),(0,r.kt)("p",null,"The query will now interpret all ",(0,r.kt)("inlineCode",{parentName:"p"},"Bagels")," as ",(0,r.kt)("inlineCode",{parentName:"p"},"Rolls")," and be able to process the query correctly."),(0,r.kt)("p",null,"If, via your logic you are unable to determine which of your Union's types to return then return null and GraphQL will supply the caller with an appropriate error message stating the query was indeterminate. Also, returning any type other than one that was formally declared as part of your Union will result in the same indeterminate state."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Most of the time GraphQL ASP.NET will never call ",(0,r.kt)("inlineCode",{parentName:"p"},"MapType")," on your UNION. If your union types do not share an inheritance chain, for instance, the method will never be called. If your types do share an inheritance chain, such as in the example above, considering using an interface graph type along with specific fragments instead of a UNION, to avoid the issue altogether.")))}d.isMDXComponent=!0}}]);