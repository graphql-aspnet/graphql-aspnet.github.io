"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5930],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>b});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=p(n),m=i,b=c["".concat(s,".").concat(m)]||c[m]||d[m]||r;return n?a.createElement(b,l(l({ref:t},u),{},{components:n})):a.createElement(b,l({ref:t},u))}));function b(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[c]="string"==typeof e?e:i,l[1]=o;for(var p=2;p<r;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4775:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));const r={id:"input-objects",title:"Input Objects",sidebar_label:"Input Objects",sidebar_position:1},l=void 0,o={unversionedId:"types/input-objects",id:"types/input-objects",title:"Input Objects",description:"INPUTOBJECT graph types (a.k.a. input objects) represent complex data supplied to arguments on fields or directives. Anytime you want to pass more data than a single string or a number, perhaps an Address or a new Employee record, you use an INPUTOBJECT to represent that entity in GraphQL.  When the system scans your controllers, if it comes across a class or struct used as a parameter to a method it will attempt to generate the appropriate input type definition to represent that class.",source:"@site/docs/types/input-objects.md",sourceDirName:"types",slug:"/types/input-objects",permalink:"/docs/types/input-objects",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"input-objects",title:"Input Objects",sidebar_label:"Input Objects",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Objects",permalink:"/docs/types/objects"},next:{title:"Interfaces",permalink:"/docs/types/interfaces"}},s={},p=[{value:"Customized Type Names",id:"customized-type-names",level:2},{value:"Use an Empty Constructor",id:"use-an-empty-constructor",level:2},{value:"Properties Must Have a Public Setter",id:"properties-must-have-a-public-setter",level:2},{value:"Methods are Ignored",id:"methods-are-ignored",level:2},{value:"Required Fields And Default Values",id:"required-fields-and-default-values",level:2},{value:"Non-Nullability",id:"non-nullability",level:2},{value:"Combine Non-Null and Required",id:"combine-non-null-and-required",level:4},{value:"Default Values Must be Coercible",id:"default-values-must-be-coercible",level:2},{value:"Enum Values",id:"enum-values",level:3}],u={toc:p};function c(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"INPUT_OBJECT")," graph types (a.k.a. input objects) represent complex data supplied to arguments on fields or directives. Anytime you want to pass more data than a single string or a number, perhaps an Address or a new Employee record, you use an INPUT_OBJECT to represent that entity in GraphQL.  When the system scans your controllers, if it comes across a class or struct used as a parameter to a method it will attempt to generate the appropriate input type definition to represent that class."),(0,i.kt)("p",null,"The rules surrounding naming, field declarations, exclusions, use of ",(0,i.kt)("inlineCode",{parentName:"p"},"[GraphSkip]")," etc. apply to input objects but with a few key differences:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Unless overridden, an input object is named the same as its class name, prefixed with ",(0,i.kt)("inlineCode",{parentName:"li"},"Input_")," (e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"Input_Address"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"Input_Employee"),")"),(0,i.kt)("li",{parentName:"ul"},"Only public properties with a ",(0,i.kt)("inlineCode",{parentName:"li"},"get")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"set")," will be included.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Property return types cannot be ",(0,i.kt)("inlineCode",{parentName:"li"},"Task<T>"),", an ",(0,i.kt)("inlineCode",{parentName:"li"},"interface")," and cannot implement ",(0,i.kt)("inlineCode",{parentName:"li"},"IGraphUnionProxy")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"IGraphActionResult"),". Such properties are always skipped."))),(0,i.kt)("li",{parentName:"ul"},"Methods are always skipped.")),(0,i.kt)("h2",{id:"customized-type-names"},"Customized Type Names"),(0,i.kt)("p",null,"Input objects can be given customized names, just like with object types, using the ",(0,i.kt)("inlineCode",{parentName:"p"},"[GraphType]")," attribute. "),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Customized Input Object Type Name"',title:'"Customized',Input:!0,Object:!0,Type:!0,'Name"':!0},'[GraphType(InputName = "NewDonutModel")]\npublic class Donut\n{\n    public int Id { get; set; }\n    public string Name { get; set; }\n    public DonutType Type { get; set; }\n    public decimal Price { get; set; }\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Donut Type Definition"',title:'"Donut',Type:!0,'Definition"':!0},"input NewDonutModel {\n  id: Int! = 0\n  name: String = null\n  type: DonutType! = FROSTED\n  price: Decimal! = 0\n}\n")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Note the specific callout to ",(0,i.kt)("inlineCode",{parentName:"p"},"InputName")," in the attribution.")),(0,i.kt)("h2",{id:"use-an-empty-constructor"},"Use an Empty Constructor"),(0,i.kt)("p",null,"When GraphQL executes a query it will attempt to create an instance of your input object then assign the key/value pairs received on the query to the properties. In order to do the initial instantiation it requires a public parameterless constructor to do so."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Input Objects MUST have a Public, Parameterless Constructor',title:'"Input',Objects:!0,MUST:!0,have:!0,a:!0,"Public,":!0,Parameterless:!0,Constructor:!0},'public class BakeryController : GraphController\n{\n    [Mutation("createDonut")]\n    public bool CreateNewDonut(DonutModel donut)\n    {/*....*/}\n}\n\n// DonutModel.cs\npublic class DonutModel\n{\n    //Use a public parameterless constructor\n    public DonutModel()\n    {\n    }\n\n    public int Id { get; set; }\n    public string Name { get; set; }\n}\n')),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},'Because of this consturctor restriction it can be helpful to separate your classes between "input" and "output" types much is the same way we do with ',(0,i.kt)("inlineCode",{parentName:"p"},"ViewModel")," vs. ",(0,i.kt)("inlineCode",{parentName:"p"},"BindingModel")," objects with REST queries in ASP.NET. This is optional, mix and match as needed by your use case.")),(0,i.kt)("h2",{id:"properties-must-have-a-public-setter"},"Properties Must Have a Public Setter"),(0,i.kt)("p",null,"Properties without a setter are ignored. At runtime, GraphQL compiles an expression tree with the set assignments declared on the graph type, it won't attempt to sneakily reflect and invoke a private or protected setter."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Properties must Have a Public Setter"',title:'"Properties',must:!0,Have:!0,a:!0,Public:!0,'Setter"':!0},"public class Donut\n{\n    public int Id { get; }\n    public string Name { get; set; }\n    public DonutType Type { get; set; }\n    public decimal Price { get; set; }\n}\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Donut Type Definition"',title:'"Donut',Type:!0,'Definition"':!0},"// GraphQL Type Definition\n// Id field is not included on the INPUT_OBJECT\ninput Input_Donut {\n  name: String = null\n  type: DonutType! = FROSTED\n  price: Decimal! = 0\n}\n")),(0,i.kt)("h2",{id:"methods-are-ignored"},"Methods are Ignored"),(0,i.kt)("p",null,"While its possible to have methods be exposed as resolvable fields on regular ",(0,i.kt)("inlineCode",{parentName:"p"},"OBJECT")," types, they are ignored for input types regardless of the declaration rules applied to the type."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Methods Are Ignored on Input Objects"',title:'"Methods',Are:!0,Ignored:!0,on:!0,Input:!0,'Objects"':!0},'public class Donut\n{\n    [GraphField("salesTax")]\n    public decimal CalculateSalesTax(\n        decimal taxPercentage)\n    {\n        return this.Price * taxPercentage;\n    }\n\n    public int Id { get; set; }\n    public string Name { get; set; }\n    public DonutType Type { get; set; }\n    public decimal Price { get; set; }\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Donut Type Definition"',title:'"Donut',Type:!0,'Definition"':!0},"# CalculateSalesTax is not included\ninput Input_Donut {\n  id: Int! = 0\n  name: String = null\n  type: DonutType! = FROSTED\n  price: Decimal! = 0\n}\n")),(0,i.kt)("h2",{id:"required-fields-and-default-values"},"Required Fields And Default Values"),(0,i.kt)("p",null,"Add ",(0,i.kt)("inlineCode",{parentName:"p"},"[Required]")," (from System.ComponentModel) to any property to force a user to supply the field in a query document."),(0,i.kt)("p",null,"Any non-required field will automatically be assigned a default value if not supplied. This default value is equivilant to the property value of the object when its instantiated via its public, parameterless constructor."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Add the Required attribute for force a query to define a value"',title:'"Add',the:!0,Required:!0,attribute:!0,for:!0,force:!0,a:!0,query:!0,to:!0,define:!0,'value"':!0},"public class Donut\n{\n    public Donut()\n    {\n        // set custom defaults if needed\n        this.Type = DonutType.Vanilla;\n        this.Price = 2.99;\n        this.IsAvailable = true;\n    }\n\n    [Required]\n    public string Name { get; set; }\n\n    public int Id { get; set; }\n    public DonutType Type { get; set; }\n    public Bakery Bakery { get;set; }\n    public decimal Price { get; set; }    \n    public decimal IsAvailable { get; set; }\n}\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Donut Type Definition"',title:'"Donut',Type:!0,'Definition"':!0},"# No Default Value on Name\ninput Input_Donut {\n  name: String!\n  id: Int! = 0    \n  type: DonutType! = FROSTED\n  bakery: Input_Bakery = null\n  price: Decimal! = 2.99\n  isAvailable: Boolean! = true\n}\n")),(0,i.kt)("h2",{id:"non-nullability"},"Non-Nullability"),(0,i.kt)("p",null,"By default, all properties that are reference types (i.e. classes) are nullable and all value types (primatives, structs etc.) are non-nullable"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Owner can be null, it is a reference type"',title:'"Owner',can:!0,be:!0,"null,":!0,it:!0,is:!0,a:!0,reference:!0,'type"':!0},"public class Bakery\n{\n    // a reference to another object\n    public Person Owner { get; set; }\n}\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Donut Type Definition"',title:'"Donut',Type:!0,'Definition"':!0},"input Input_Bakery {\n  owner: Input_Person = null\n}\n")),(0,i.kt)("p",null,"If you want to force a value to be supplied (either on a query document or by default) you can use the ",(0,i.kt)("inlineCode",{parentName:"p"},"[GraphField]")," attribute to augment the field."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Force Owner to be non-null"',title:'"Force',Owner:!0,to:!0,be:!0,'non-null"':!0},'public class Bakery\n{\n    public Bakery()\n    {\n        this.Owner = new Person("Bob Smith");\n    }\n\n    // a reference to another object\n    [GraphField(TypeExpression = "Type!")]\n    public Person Owner { get; set; }\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Donut Type Definition"',title:'"Donut',Type:!0,'Definition"':!0},'input Input_Bakery  {\n  owner: Input_Person! = { name: "Bob Smith" }\n}\n')),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"}," Any field explicitly or implicitly declared as non-nullable, that is not required, MUST have a default value assigned to it that is not ",(0,i.kt)("inlineCode",{parentName:"p"},"null"),". A ",(0,i.kt)("inlineCode",{parentName:"p"},"GraphTypeDeclarationException")," will be thrown at startup if this is not the case.")),(0,i.kt)("h4",{id:"combine-non-null-and-required"},"Combine Non-Null and ","[Required]"),(0,i.kt)("p",null,"Combine the ","[Required]"," attribute with a custom type expression to force a user to supply a non-null value for the field on a query document."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Force Owner to be non-null And Required"',title:'"Force',Owner:!0,to:!0,be:!0,"non-null":!0,And:!0,'Required"':!0},'public class Bakery\n{\n    public Bakery()\n    {\n    }\n\n    [Required]\n    [GraphField(TypeExpression = "Type!")]\n    public Person Owner { get; set; }\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Donut Type Definition"',title:'"Donut',Type:!0,'Definition"':!0},"# No Default Value is supplied. owner must be supplied on a query\ninput Input_Bakery {\n  owner: Input_Person!\n}\n")),(0,i.kt)("h2",{id:"default-values-must-be-coercible"},"Default Values Must be Coercible"),(0,i.kt)("p",null,"Any default value declared for an input field must be coercible by its target graph type in the target schema. "),(0,i.kt)("h3",{id:"enum-values"},"Enum Values"),(0,i.kt)("p",null,"Take a look at this example of an enum and input object:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Using an Enum as a field type"',title:'"Using',an:!0,Enum:!0,as:!0,a:!0,field:!0,'type"':!0},"public class Donut \n{\n    public string Name{ get; set; }\n    public DonutFlavor Flavor { get; set; }\n}\n\npublic enum DonutFlavor\n{\n    [GraphSkip]\n    Vanilla = 0,\n    Chocolate = 1,\n\n}\n")),(0,i.kt)("p",null,"When ",(0,i.kt)("inlineCode",{parentName:"p"},"Donut")," is instantiated the value of Flavor will be ",(0,i.kt)("inlineCode",{parentName:"p"},"Vanilla")," because\nthats the default value (0) of the enum. However, the enum value ",(0,i.kt)("inlineCode",{parentName:"p"},"Vanilla")," is marked as being skipped in the schema. "),(0,i.kt)("p",null,"Because of this mismatch, a ",(0,i.kt)("inlineCode",{parentName:"p"},"GraphTypeDeclarationException")," will be thrown when the introspection data for your schema is built. As a result, the server will fail to start until the problem is corrected."),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"}," Enum values used for the default value of input object properties MUST also exist as values in the schema or an exception will be thrown.")))}c.isMDXComponent=!0}}]);