"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8700],{5680:(e,t,a)=>{a.d(t,{xA:()=>d,yg:()=>h});var n=a(6540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},y="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),y=p(a),c=r,h=y["".concat(s,".").concat(c)]||y[c]||u[c]||i;return a?n.createElement(h,o(o({ref:t},d),{},{components:a})):n.createElement(h,o({ref:t},d))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[y]="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},1577:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>y,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=a(8168),r=(a(6540),a(5680));const i={id:"type-extensions",title:"Type Extensions",sidebar_label:"Type Extensions",sidebar_position:4},o=void 0,l={unversionedId:"controllers/type-extensions",id:"controllers/type-extensions",title:"Type Extensions",description:"Working with Child Data",source:"@site/docs/controllers/type-extensions.md",sourceDirName:"controllers",slug:"/controllers/type-extensions",permalink:"/docs/controllers/type-extensions",draft:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{id:"type-extensions",title:"Type Extensions",sidebar_label:"Type Extensions",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Authorization",permalink:"/docs/controllers/authorization"},next:{title:"Batch Operations",permalink:"/docs/controllers/batch-operations"}},s={},p=[{value:"Working with Child Data",id:"working-with-child-data",level:2},{value:"The TypeExtension Attribute",id:"the-typeextension-attribute",level:2},{value:"\u2753 But what about the Bakery parameter?",id:"-but-what-about-the-bakery-parameter",level:4},{value:"Can Every Field be a Type Extension?",id:"can-every-field-be-a-type-extension",level:2}],d={toc:p};function y(e){let{components:t,...a}=e;return(0,r.yg)("wrapper",(0,n.A)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"working-with-child-data"},"Working with Child Data"),(0,r.yg)("p",null,(0,r.yg)("em",{parentName:"p"},"The Motiviation for using Type Extensions")),(0,r.yg)("p",null,"Before we dive into type extensions we have to talk about parent-child relationships. So far, the examples we've seen have used well defined fields in an object graph. Be that an action method on a controller or a property on an object. But when we think about real world data, there are scenarios where that poses a problem. Lets suppose for a moment we have a chain of bakery stores that let customers place orders for cakes at an individual store and customize the writing on the cake."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Sample Bakery Model"',title:'"Sample',Bakery:!0,'Model"':!0},"public class Bakery\n{\n    public int Id { get; set; }\n    // highlight-next-line\n    public List<CakeOrder> Orders { get; set; }\n}\n\npublic class CakeOrder\n{\n    public Customer Customer { get; set; }\n    public string  WrittenPhrase { get; set; }\n    // highlight-next-line\n    public Bakery Bakery { get; set; }\n}\n\n// ...Customer class excluded for brevity\n")),(0,r.yg)("p",null,"But consider the following scenarios:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"What happens when we retrieve a single ",(0,r.yg)("inlineCode",{parentName:"li"},"CakeOrder")," via a controller?"),(0,r.yg)("li",{parentName:"ul"},"Do we automatically have to populate the entire ",(0,r.yg)("inlineCode",{parentName:"li"},"Bakery")," and ",(0,r.yg)("inlineCode",{parentName:"li"},"Customer")," objects?",(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},"Even if a caller didn't request any of that data?"))),(0,r.yg)("li",{parentName:"ul"},"What happens when retrieving a bakery that may have 1000s of cake orders?")),(0,r.yg)("p",null,"Our application is going to slow to a crawl very quickly doing all this extra data loading. In the case of a single Bakery, a timeout may occur trying to fetch many years of cake orders to populate the bakery instance from a database query only to discard them when a graphql query doesn't ask for it. If we're using something like Entity Framework how do we know when to use an Include statement to populate the child data? (Hint: you don't)"),(0,r.yg)("p",null,"One solution could be to use lazy loading on our model."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Lazy Loading Child Data (Terrible!)"',title:'"Lazy',Loading:!0,Child:!0,Data:!0,'(Terrible!)"':!0},"public class Bakery\n{\n\n    private ICakeService _service;\n    private Lazy<List<CakeOrder>> _orders;\n\n    public Bakery(int id, ICakeService service)\n    {\n        this.Id = id;\n        _service = service;\n        _orders = new Lazy<List<CakeOrder>>(this.RetrieveCakeOrders);\n    }\n\n    private List<CakeOrder> RetrieveCakeOrders()\n    {\n        return _service.RetrieveCakeOrders(this.Id);\n    }\n\n    public int Id { get; }\n    public List<CakeOrder> Orders => _orders.Value;\n}\n")),(0,r.yg)("p",null,"Well that's just plain awful. We've over complicated our bakery model and made it dependent on a service instance to exist. If this was a real world example, you'd need some sort of error handling in there too."),(0,r.yg)("h2",{id:"the-typeextension-attribute"},"The ","[TypeExtension]"," Attribute"),(0,r.yg)("p",null,"We've talked before about GraphQL maintaining a 1:1 mapping between a field in the graph and a method to retrieve data for it (i.e. its assigned resolver). What prevents us from creating a method to fetch a list of Cake Orders and saying, \"Hey, GraphQL! When someone asks for a set of bakery orders call a custom method instead of a property getter on the ",(0,r.yg)("inlineCode",{parentName:"p"},"Bakery"),' class." As it turns out, that is exactly what a ',(0,r.yg)("inlineCode",{parentName:"p"},"Type Extension")," does."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Using a Type Extension"',title:'"Using',a:!0,Type:!0,'Extension"':!0},'public class Bakery\n{\n    public int Id { get; set; }\n    public string Name { get; set; }\n}\n\npublic class BakedGoodsCompanyController : GraphController\n{\n    [QueryRoot("bakery")]\n    public Bakery RetrieveBakery(int id){/*...*/}\n\n    // declare a extension to the Bakery object\n    // highlight-next-line\n    [TypeExtension(typeof(Bakery), "orders")]\n    public async Task<List<CakeOrder>> RetrieveCakeOrders(Bakery bakery, int limitTo = 15)\n    {\n        return await _service.RetrieveCakeOrders(bakery.Id, limitTo);\n    }\n}\n')),(0,r.yg)("p",null,"Much Cleaner!!"),(0,r.yg)("p",null,"There is a lot to unpack here, so lets step through it:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"We've declared the ",(0,r.yg)("inlineCode",{parentName:"li"},"RetrieveBakery")," method as a root field named ",(0,r.yg)("inlineCode",{parentName:"li"},"bakery")," that allows us to fetch a single bakery."),(0,r.yg)("li",{parentName:"ul"},"We've added a method named ",(0,r.yg)("inlineCode",{parentName:"li"},"RetrieveCakeOrders"),", declared it as an ",(0,r.yg)("em",{parentName:"li"},"extension")," to the ",(0,r.yg)("inlineCode",{parentName:"li"},"Bakery")," object and gave it a field name of ",(0,r.yg)("inlineCode",{parentName:"li"},"orders"),"."),(0,r.yg)("li",{parentName:"ul"},"The extension returns ",(0,r.yg)("inlineCode",{parentName:"li"},"List<CakeOrder>")," as the type of data it generates."),(0,r.yg)("li",{parentName:"ul"},"The method takes in a ",(0,r.yg)("inlineCode",{parentName:"li"},"Bakery")," instance (more on that in a second) as well as an integer, with a default value of ",(0,r.yg)("inlineCode",{parentName:"li"},"15"),", to limit the number of orders to retrieve.")),(0,r.yg)("p",null,"Now we can query the ",(0,r.yg)("inlineCode",{parentName:"p"},"orders")," field from anywhere a bakery is returned in the object graph and GraphQL will invoke our method:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Sample Query"',title:'"Sample','Query"':!0},"query {\n    bakery(id: 5){\n        name\n        orders(limitTo: 50) {\n            id\n            writtenPhrase\n        }\n    }\n}\n")),(0,r.yg)("admonition",{type:"tip"},(0,r.yg)("p",{parentName:"admonition"},"Type Extensions allow you to attach new fields to a graph type without altering the original ",(0,r.yg)("inlineCode",{parentName:"p"},"System.Type"),".")),(0,r.yg)("h4",{id:"-but-what-about-the-bakery-parameter"},"\u2753 But what about the Bakery parameter?"),(0,r.yg)("p",null,"When we return a value from a property, an instance of an object must exist in order to supply that value. That is to say if you want the ",(0,r.yg)("inlineCode",{parentName:"p"},"Name")," property of a bakery, you need a bakery instance to retrieve it from.  The same is true for a ",(0,r.yg)("inlineCode",{parentName:"p"},"type extension")," except that instead of calling a property getter on the instance, graphql hands the entire object to your method and lets you figure out what needs to happen to resolve the field."),(0,r.yg)("p",null,"GraphQL inspects the type being extended and finds a parameter on the method to match it. It captures that parameter, hides it from the object graph, and fills it with the result of the parent field, in this case the resolution of field ",(0,r.yg)("inlineCode",{parentName:"p"},"bakery(id: 5)"),"."),(0,r.yg)("p",null,"This is immensely scalable:"),(0,r.yg)("p",null,"\u2705 There are no wasted cycles fetching ",(0,r.yg)("inlineCode",{parentName:"p"},"CakeOrders")," unless the requestor specifically asks for them.",(0,r.yg)("br",null),"\n\u2705 We have full access to ",(0,r.yg)("a",{parentName:"p",href:"../advanced/type-expressions"},"type expression validation")," and ",(0,r.yg)("a",{parentName:"p",href:"./model-state"},"model validation")," for our other method parameters.",(0,r.yg)("br",null),"\n\u2705Since its a controller action we have full access to graph action results and can return ",(0,r.yg)("inlineCode",{parentName:"p"},"this.Ok()"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"this.Error()")," etc. to give a rich experience.",(0,r.yg)("br",null),"\n\u2705",(0,r.yg)("a",{parentName:"p",href:"./authorization"},"Field Security")," and use of the ",(0,r.yg)("inlineCode",{parentName:"p"},"[Authorize]")," attribute is also wired up for us. ",(0,r.yg)("br",null),"\n\u2705The bakery model is greatly simplified."),(0,r.yg)("h2",{id:"can-every-field-be-a-type-extension"},"Can Every Field be a Type Extension?"),(0,r.yg)("p",null,"Theoretically, yes. But take a moment and think about performance. For basic objects with few dozen properties which is faster:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("em",{parentName:"li"},"Option 1:")," One database query to retrieve 24 columns of a single record then only use six in a data result"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("em",{parentName:"li"},"Option 2:")," Six separate database queries, one for each column requested.")),(0,r.yg)("p",null,"Type extensions shine in parent-child relationships when preloading lots of data is a concern. But be careful not to isolate every graph field just to avoid retrieving extra data at all. Fetching a few extra bytes from a database is negligible compared to querying a database 20 individual times. Your REST APIs were already querying extra data and they were likely transmitting that data to the client."),(0,r.yg)("p",null,"It comes down to your use case. There are times when it makes sense to seperate things using type extensions and times when preloading whole objects is better. For many applications, once you've deployed to production, the queries being executed are finite. Design your model objects and extensions to be performant in the ways your data is being requested, not in the ways it ",(0,r.yg)("em",{parentName:"p"},"could be")," requested."))}y.isMDXComponent=!0}}]);