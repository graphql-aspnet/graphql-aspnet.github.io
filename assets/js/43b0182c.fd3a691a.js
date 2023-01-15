"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2786],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>m});var a=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=a.createContext({}),p=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=p(e.components);return a.createElement(s.Provider,{value:n},e.children)},c="mdxType",h={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(t),d=o,m=c["".concat(s,".").concat(d)]||c[d]||h[d]||r;return t?a.createElement(m,i(i({ref:n},u),{},{components:t})):a.createElement(m,i({ref:n},u))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=t.length,i=new Array(r);i[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[c]="string"==typeof e?e:o,i[1]=l;for(var p=2;p<r;p++)i[p]=t[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},3430:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var a=t(7462),o=(t(7294),t(3905));const r={id:"unions",title:"Unions",sidebar_label:"Unions",sidebar_position:3},i=void 0,l={unversionedId:"types/unions",id:"types/unions",title:"Unions",description:"Unions are an aggregate graph type representing multiple, different OBJECT types with no guaranteed fields or interfaces in common; for instance, Salad or House. Because of this, unions define no fields themselves but provide a common way to query the fields of the union members when one is encountered.",source:"@site/docs/types/unions.md",sourceDirName:"types",slug:"/types/unions",permalink:"/docs/types/unions",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{id:"unions",title:"Unions",sidebar_label:"Unions",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Interfaces",permalink:"/docs/types/interfaces"},next:{title:"Enums",permalink:"/docs/types/enums"}},s={},p=[{value:"Declaring a Union",id:"declaring-a-union",level:2},{value:"What to Return for a Union",id:"what-to-return-for-a-union",level:3},{value:"Returning a List of Objects",id:"returning-a-list-of-objects",level:4},{value:"Union Proxies",id:"union-proxies",level:2},{value:"Union Name Uniqueness",id:"union-name-uniqueness",level:2},{value:"Liskov Substitutions",id:"liskov-substitutions",level:2},{value:"IGraphUnionProxy.MapType",id:"igraphunionproxymaptype",level:4}],u={toc:p};function c(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,a.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Unions are an aggregate graph type representing multiple, different ",(0,o.kt)("inlineCode",{parentName:"p"},"OBJECT")," types with no guaranteed fields or interfaces in common; for instance, ",(0,o.kt)("inlineCode",{parentName:"p"},"Salad")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"House"),". Because of this, unions define no fields themselves but provide a common way to query the fields of the union members when one is encountered."),(0,o.kt)("p",null,"Unlike other graph types there is no concrete representation of unions. Where a ",(0,o.kt)("inlineCode",{parentName:"p"},"class")," is an object graph type or a .NET ",(0,o.kt)("inlineCode",{parentName:"p"},"enum")," is an enum graph type there is no analog for unions. Instead unions are semi-virtual types that are created from proxy classes that represent them at design time."),(0,o.kt)("h2",{id:"declaring-a-union"},"Declaring a Union"),(0,o.kt)("p",null,"You can declare a union in your action method using one of the many overloads to the query and mutation attributes:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"title=\"Declaring an 'inline' Union on an Action Method\"",title:'"Declaring',an:!0,"'inline'":!0,Union:!0,on:!0,Action:!0,'Method"':!0},'public class DataController : GraphController\n{\n    // highlight-next-line\n    [QueryRoot("search", "SaladOrHouse", typeof(Salad), typeof(House))]\n    public ????? SearchData(string name)\n    {/* ... */}\n}\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Example Query"',title:'"Example','Query"':!0},'query {\n    search(name: "green*") {\n        ...on Salad {\n            name\n            hasCroutons\n        }\n\n        ...on House {\n            postalCode\n            squareFeet\n        }\n    }\n}\n')),(0,o.kt)("p",null,"In this example we :"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Declared an action method named ",(0,o.kt)("inlineCode",{parentName:"li"},"SearchData")," with a graph field name of ",(0,o.kt)("inlineCode",{parentName:"li"},"search")),(0,o.kt)("li",{parentName:"ul"},"Declared a union type on our graph named ",(0,o.kt)("inlineCode",{parentName:"li"},"SaladOrHouse")),(0,o.kt)("li",{parentName:"ul"},"Included two object types in the union: ",(0,o.kt)("inlineCode",{parentName:"li"},"Salad")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"House"))),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Unlike with ",(0,o.kt)("a",{parentName:"p",href:"./interfaces"},"interfaces")," where the possible types returned from an action method can be declared else where, you MUST provide all of the types to include in the union in the declaration.")),(0,o.kt)("h3",{id:"what-to-return-for-a-union"},"What to Return for a Union"),(0,o.kt)("p",null,"Notice we have a big question mark on what the action method returns in the above example. From a C# perspective, in this example, there is no ",(0,o.kt)("inlineCode",{parentName:"p"},"IDataItem")," interface shared between ",(0,o.kt)("inlineCode",{parentName:"p"},"Salad")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"House"),". This represents a problem for static-typed languages like C#. Since unions are virtual types there exists no common type that you can return for generated data. ",(0,o.kt)("inlineCode",{parentName:"p"},"System.Object")," might work but it tends be too general and the runtime will reject it as a safe guard."),(0,o.kt)("p",null,"So what do you do? Return an ",(0,o.kt)("inlineCode",{parentName:"p"},"IGraphActionResult")," instead and let the runtime handle the details."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Return IGraphActionResult When Working With Unions"',title:'"Return',IGraphActionResult:!0,When:!0,Working:!0,With:!0,'Unions"':!0},'public class DataController : GraphController\n{\n    // service injection omitted for brevity\n\n    [QueryRoot("search", "SaladOrHouse", typeof(Salad), typeof(House))]\n    // highlight-next-line\n    public async Task<IGraphActionResult> SearchData(string text)\n    {\n        if(name.Contains("green"))\n        {\n            Salad salad = await _saladService.FindSalad(text);\n            return this.Ok(salad);\n        }\n        else\n        {\n            House house = await _houses.FindHouse(text);\n            return this.Ok(house);\n        }\n    }\n}\n')),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Any controller action that declares a union MUST return an ",(0,o.kt)("inlineCode",{parentName:"p"},"IGraphActionResult"))),(0,o.kt)("h4",{id:"returning-a-list-of-objects"},"Returning a List of Objects"),(0,o.kt)("p",null,"Perhaps the most complex scenario when working with unions is returning a list of objects. Since there there is no way to declare a ",(0,o.kt)("inlineCode",{parentName:"p"},"List<T>")," that the library could analyze we have to explicitly declare the field to let GraphQL what is going on."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Return a List of Objects"',title:'"Return',a:!0,List:!0,of:!0,'Objects"':!0},'public class DataController : GraphController\n{\n    // service injection omitted for brevity\n    // highlight-next-line\n    [QueryRoot("search", "SaladOrHouse", typeof(Salad), typeof(House), TypeExpression = "[Type]")]\n    public async Task<IGraphActionResult> SearchData(string text)\n    {\n        Salad salad = await _saladService.FindSalad(text);\n        House house = await _houses.FindHouse(text);\n\n        var dataItems = new List<object>();\n        dataItems.Add(salad);\n        dataItems.Add(house);\n\n        return this.Ok(dataItems);\n    }\n}\n')),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Here we've added a custom type expression to tell GraphQL that this field returns a list of objects. GraphQL will then process each item on the list according to the rules of the union.")),(0,o.kt)("h2",{id:"union-proxies"},"Union Proxies"),(0,o.kt)("p",null,"In the example above, we declare the union inline on the query attribute. But what if we wanted to reuse the ",(0,o.kt)("inlineCode",{parentName:"p"},"SaladOrHouse")," union in multiple places. You could declare the union exactly the same on each method or use a union proxy. "),(0,o.kt)("p",null,"Create a class that implements ",(0,o.kt)("inlineCode",{parentName:"p"},"IGraphUnionProxy")," or inherits from ",(0,o.kt)("inlineCode",{parentName:"p"},"GraphUnionProxy")," to encapsulate the details, then add that as a reference in your controller methods instead of the individual types. This can also be handy for uncluttering your code if you have a lot of possible types for the union. The return type of your method will still need to be ",(0,o.kt)("inlineCode",{parentName:"p"},"IGraphActionResult"),". You cannot return a proxy as a value."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Example Using IGraphUnionProxy"',title:'"Example',Using:!0,'IGraphUnionProxy"':!0},'public class KitchenController : GraphController\n{\n    // highlight-next-line\n    [QueryRoot("searchFood", typeof(SaladOrHouse))]\n    public async Task<IGraphActionResult> SearchFood(string name)\n    {/* ... */}\n}\n\n// highlight-next-line\npublic class SaladOrHouse : GraphUnionProxy\n{\n     public SaladOrHouse()\n    {\n        this.Name = "SaladOrHouse";\n        this.AddType(typeof(Salad));\n        this.AddType(typeof(House));\n    }\n}\n')),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"If you don't supply a name, graphql will use the class name of the proxy as the name of the union.")),(0,o.kt)("h2",{id:"union-name-uniqueness"},"Union Name Uniqueness"),(0,o.kt)("p",null,"Union names must be unique in a schema. If you do declare a union in multiple action methods without a proxy, GraphQL will attempt to merge the references by name and included types. As long as all declarations are the same, that is the name and the set of included types, then graphql will accept the union. Otherwise, a ",(0,o.kt)("inlineCode",{parentName:"p"},"GraphTypeDeclarationException")," will be thrown at startup."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="An Invalid Union Declaration"',title:'"An',Invalid:!0,Union:!0,'Declaration"':!0},'public class KitchenController : GraphController\n{\n    // highlight-next-line\n    [QueryRoot("search", "SaladOrHouse", typeof(Salad), typeof(House))]\n    public async Task<IGraphActionResult> SearchData(string name)\n    {/* ... */}\n\n    // ERROR: Union members for \'SaladOrHouse\' are different\n    // -----------------\n    // highlight-next-line\n    [QueryRoot("fetch", "SaladOrHouse", typeof(Salad), typeof(House), typeof(GameConsole))]\n    public async Task<IGraphActionResult> RetrieveItem(int id)\n    {/* ... */}\n}\n')),(0,o.kt)("h2",{id:"liskov-substitutions"},"Liskov Substitutions"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Liskov_substitution_principle"},"Liskov substitutions")," (the L in ",(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/SOLID"},"SOLID"),") are an important part of object oriented programming. To be able to have one class masquerade as another allows us to easily extend our code's capabilities without any rework."),(0,o.kt)("p",null,"For Example, the Oven object below can bake any type of bread!"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Liskov Substitution Example"',title:'"Liskov',Substitution:!0,'Example"':!0},"public class Bread\n{}\n\npublic class Roll : Bread\n{}\n\npublic class Bagel : Roll\n{}\n\npublic class Oven \n{\n    // highlight-next-line\n    public void Bake(Bread bread)\n    {\n        // We can pass in Bread, Roll or Bagel to the oven.\n    }\n}\n")),(0,o.kt)("p",null,"However, this presents a problem when when dealing with UNIONs and GraphQL:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="BakeryController.cs"',title:'"BakeryController.cs"'},'public class BakeryController : GraphController\n{\n    // highlight-next-line\n    [QueryRoot("searchFood", "RollOrBread",  typeof(Roll), typeof(Bread))]\n    public IGraphActionResult SearchFood(string name)\n    {\n        // Should GraphQL treat a bagel \n        // as a Roll or Bread ??\n        // highlight-next-line\n        var myBagel = new Bagel();\n        return this.Ok(myBagel);\n    }\n}\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Sample Query"',title:'"Sample','Query"':!0},'query {\n    searchFood(name: "Everything"){\n        ... on Bread { \n                name, \n                type \n        }\n        ... on Roll { \n                name, \n                hardness \n        }\n    }\n}\n')),(0,o.kt)("p",null,"Most of the time, graphql can correctly interpret the correct type of a returned data object and continue processing the query. However, in the above example, we declare a union, ",(0,o.kt)("inlineCode",{parentName:"p"},"RollOrBread"),", that is of types ",(0,o.kt)("inlineCode",{parentName:"p"},"Roll")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"Bread"),"  yet we return a ",(0,o.kt)("inlineCode",{parentName:"p"},"Bagel")," from the action method. "),(0,o.kt)("p",null,"Since ",(0,o.kt)("inlineCode",{parentName:"p"},"Bagel")," is both a ",(0,o.kt)("inlineCode",{parentName:"p"},"Roll")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"Bread")," which type should graphql match against when executing the inline fragments? Since it could be either, graphql will be unable to determine which type to use and can't advance the query to select the appropriate fields. The query result is said to be indeterminate. "),(0,o.kt)("h4",{id:"igraphunionproxymaptype"},"IGraphUnionProxy.MapType"),(0,o.kt)("p",null,"Luckily there is a way to allow you to take control of your unions and make the determination on your own. The ",(0,o.kt)("inlineCode",{parentName:"p"},"MapType")," method provided by ",(0,o.kt)("inlineCode",{parentName:"p"},"IGraphUnionProxy")," will be called whenever a query result is indeterminate, allowing you to choose which of your union's allowed types should be used. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Using a Custom Type Mapper"',title:'"Using',a:!0,Custom:!0,Type:!0,'Mapper"':!0},"public class RollOrBread : GraphUnionProxy\n{\n    public RollOrBread()\n    {\n        this.AddType(typeof(Roll));\n        this.AddType(typeof(Bread));\n    }\n\n    // highlight-start\n    public override Type MapType(Type runtimeObjectType)\n    {\n        if (runtimeObjectType == typeof(Bagel))\n            return typeof(Roll);\n        else\n            return typeof(Bread);\n    }\n    // highlight-end\n}\n")),(0,o.kt)("p",null,"The query will now interpret all ",(0,o.kt)("inlineCode",{parentName:"p"},"Bagels")," as ",(0,o.kt)("inlineCode",{parentName:"p"},"Rolls")," and be able to process the query correctly."),(0,o.kt)("p",null,"If, via your logic you are unable to determine which of your Union's types to use then return ",(0,o.kt)("inlineCode",{parentName:"p"},"null")," and GraphQL will supply the caller with an appropriate error message stating the query was indeterminate. Also, returning any type other than one that was formally declared as part of your Union will result in the same indeterminate state."),(0,o.kt)("p",null,"Most of the time GraphQL ASP.NET will never call ",(0,o.kt)("inlineCode",{parentName:"p"},"MapType")," on your union proxy. If your union types do not share an inheritance chain, for instance, the method will never be called."),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"  The ",(0,o.kt)("inlineCode",{parentName:"p"},"MapType()")," function is not based on a resolved value, but only on the ",(0,o.kt)("inlineCode",{parentName:"p"},"System.Type")," that was encountered. This is by design to guarantee consistency in query execution. ")))}c.isMDXComponent=!0}}]);