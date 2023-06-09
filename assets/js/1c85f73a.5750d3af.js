"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2529],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>c});var n=a(7294);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,l=function(e,t){if(null==e)return{};var a,n,l={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,l=e.mdxType,i=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=p(a),h=l,c=d["".concat(s,".").concat(h)]||d[h]||m[h]||i;return a?n.createElement(c,r(r({ref:t},u),{},{components:a})):n.createElement(c,r({ref:t},u))}));function c(e,t){var a=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var i=a.length,r=new Array(i);r[0]=h;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[d]="string"==typeof e?e:l,r[1]=o;for(var p=2;p<i;p++)r[p]=a[p];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},3710:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var n=a(7462),l=(a(7294),a(3905));const i={id:"multipart-requests",title:"Multipart Form Request Extension",sidebar_label:"File Uploads & Batching",sidebar_position:0},r=void 0,o={unversionedId:"server-extensions/multipart-requests",id:"server-extensions/multipart-requests",title:"Multipart Form Request Extension",description:".NET 6+",source:"@site/docs/server-extensions/multipart-requests.md",sourceDirName:"server-extensions",slug:"/server-extensions/multipart-requests",permalink:"/docs/server-extensions/multipart-requests",draft:!1,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"multipart-requests",title:"Multipart Form Request Extension",sidebar_label:"File Uploads & Batching",sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"Entity Framework",permalink:"/docs/development/entity-framework"},next:{title:"How it Works",permalink:"/docs/reference/how-it-works"}},s={},p=[{value:"Multipart Request Specification",id:"multipart-request-specification",level:2},{value:"Enable The Extension",id:"enable-the-extension",level:2},{value:"File Uploads",id:"file-uploads",level:2},{value:"A Basic Controller",id:"a-basic-controller",level:3},{value:"Handling Arrays of Files",id:"handling-arrays-of-files",level:3},{value:"Handling an Unknown Number of Files",id:"handling-an-unknown-number-of-files",level:3},{value:"Skipping Array Indexes",id:"skipping-array-indexes",level:3},{value:"File Uploads on Batched Queries",id:"file-uploads-on-batched-queries",level:3},{value:"FileUpload Scalar",id:"fileupload-scalar",level:3},{value:"Opening a File Stream",id:"opening-a-file-stream",level:3},{value:"Custom File Handling",id:"custom-file-handling",level:3},{value:"Timeouts and File Uploads",id:"timeouts-and-file-uploads",level:3},{value:"Batch Queries",id:"batch-queries",level:2},{value:"Processing a Batch of Queries",id:"processing-a-batch-of-queries",level:3},{value:"Processing a Single Query",id:"processing-a-single-query",level:3},{value:"Batch Execution Order is Never Guaranteed",id:"batch-execution-order-is-never-guaranteed",level:3},{value:"Configuration",id:"configuration",level:2},{value:"MapMode",id:"mapmode",level:3},{value:"RequestMode",id:"requestmode",level:3},{value:"MaxFileCount",id:"maxfilecount",level:3},{value:"MaxBlobCount",id:"maxblobcount",level:3},{value:"RegisterMultipartRequestHttpProcessor",id:"registermultipartrequesthttpprocessor",level:3},{value:"RequireMultipartRequestHttpProcessor",id:"requiremultipartrequesthttpprocessor",level:3},{value:"Demo Project",id:"demo-project",level:2}],u={toc:p};function d(e){let{components:t,...a}=e;return(0,l.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("span",{className:"pill"},".NET 6+"),(0,l.kt)("h2",{id:"multipart-request-specification"},"Multipart Request Specification"),(0,l.kt)("p",null,"GraphQL ASP.NET provides built in support for batch query processing and file uploads via an implementation of the ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/jaydenseric/graphql-multipart-request-spec"},"GraphQL Multipart Request Specification"),"."),(0,l.kt)("p",null,"This extension requires a minimum version of ",(0,l.kt)("inlineCode",{parentName:"p"},"v1.2.0")," of the main library and you must target .NET 6 or later. This extension will not work with the .NET standard implementation."),(0,l.kt)("admonition",{type:"info"},(0,l.kt)("p",{parentName:"admonition"},"This document covers how to submit a batch query and upload files that conform to the above specification. It provides sample curl requests that would be accepted for the given sample code but does not explain in detail the various form fields required to complete a request. It is highly recommended to use a ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/jaydenseric/graphql-multipart-request-spec#client"},"supported client")," when enabling this server extension.")),(0,l.kt)("h2",{id:"enable-the-extension"},"Enable The Extension"),(0,l.kt)("p",null,"While the multipart form extension is shipped as part of the main library it is disabled by default and must be explicitly enabled on each schema. "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"title='Register the Server Extension'",title:"'Register",the:!0,Server:!0,"Extension'":!0},"// Startup Code\n// other code omitted for brevity\nservices.AddGraphQL(options => {\n    options.AddMultipartRequestSupport();\n});\n")),(0,l.kt)("h2",{id:"file-uploads"},"File Uploads"),(0,l.kt)("p",null,"Files submitted on a post request are automatically routed to your controllers as a custom scalar. Out of the box, any .NET ",(0,l.kt)("inlineCode",{parentName:"p"},"IFormFile")," and any form field not explicitly declared by the specification will be converted into a file scalar and can be mapped into your query's variables collection. "),(0,l.kt)("h3",{id:"a-basic-controller"},"A Basic Controller"),(0,l.kt)("p",null,"Files are received as a special C# class named ",(0,l.kt)("inlineCode",{parentName:"p"},"FileUpload"),". Use it in your action methods like you would any other scalar (e.g. int, string etc.). Note that even though it is a class, as opposed to a primitative, GraphQL still handles it as a scalar; much in the same way ",(0,l.kt)("inlineCode",{parentName:"p"},"Uri")," is also considered a scalar."),(0,l.kt)("span",{style:{color:"red"}},"Warning: Be sure to dispose of the file stream when you are finished with it."),(0,l.kt)("br",null),(0,l.kt)("br",null),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"title=ExampleFile Upload Controller",title:"ExampleFile",Upload:!0,Controller:!0},'public class FileUploadController : GraphController\n{\n    [MutationRoot("singleFileUpload")]\n    // highlight-next-line\n    public async Task<int> UploadFile(FileUpload fileRef)\n    {\n        using var stream = await fileRef.OpenFileAsync();\n        // do something with the file stream\n\n        return 0;\n    }\n}\n')),(0,l.kt)("p",null,"The scalar in your schema is named ",(0,l.kt)("inlineCode",{parentName:"p"},"Upload")," per the specification. Be sure to declare your graphql variables as an ",(0,l.kt)("inlineCode",{parentName:"p"},"Upload")," type to indicate an uploaded file."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Use the Upload graph type for variables"',title:'"Use',the:!0,Upload:!0,graph:!0,type:!0,for:!0,'variables"':!0},"mutation ($file: Upload) { \n    singleFileUpload(file: $file) \n}\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="Sample curl Query"',title:'"Sample',curl:!0,'Query"':!0},'curl localhost:3000/graphql \\\n  # highlight-next-line\n  -F operations=\'{ "query": "mutation ($file: Upload) { singleFileUpload(file: $file) }", "variables": { "file": null } }\' \\\n  -F map=\'{ "0": ["variables.file"] }\' \\\n  -F 0=@a.txt\n')),(0,l.kt)("h3",{id:"handling-arrays-of-files"},"Handling Arrays of Files"),(0,l.kt)("p",null,"Arrays of files work just like any other list in GraphQL. When declaring the map variable for the multi-part request, be sure\nto indicate which index you are mapping the file to. The extension will not magically append files to an array. Each mapped file must explicitly declare the element index in an array where it is being placed."),(0,l.kt)("span",{style:{color:"red"}},"Warning: Be sure to dispose of each file stream when you are finished with it."),(0,l.kt)("br",null),(0,l.kt)("br",null),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Example File Upload Controller"',title:'"Example',File:!0,Upload:!0,'Controller"':!0},'using GraphQL.AspNet.ServerExtensions.MultipartRequests;\n\npublic class FileUploadController : GraphController\n{\n    [MutationRoot("multiFileUpload")]\n    // highlight-next-line\n    public async Task<int> UploadFile(IEnumerable<FileUpload> files)\n    {\n        foreach(var file in files)\n        {\n           using var stream = await fileRef.OpenFileAsync();\n           // do something with each file stream\n        }\n\n        return 0;\n    }\n}\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="Declaring a list of files on a graphql query"',title:'"Declaring',a:!0,list:!0,of:!0,files:!0,on:!0,graphql:!0,'query"':!0},"# highlight-next-line\nmutation ($files: [Upload]) { \n    multiFileUpload(file: $files) \n}\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="Sample Curl"',title:'"Sample','Curl"':!0},'curl localhost:3000/graphql \\\n# highlight-next-line\n  -F operations=\'{ "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }", "variables": { "files": [null, null] } }\' \\  \n  -F map=\'{ "firstFile": ["variables", "files", 0], "secondFile": ["variables", "files", 1] }\' \\\n  -F firstFile=@a.txt\n  -F secondFile=@b.txt\n')),(0,l.kt)("h3",{id:"handling-an-unknown-number-of-files"},"Handling an Unknown Number of Files"),(0,l.kt)("p",null,"There are scenarios where you may ask your users to select a few files to upload without knowing how many they might choose. As long each declaration in your ",(0,l.kt)("inlineCode",{parentName:"p"},"map")," field points to a position that ",(0,l.kt)("em",{parentName:"p"},"could be")," a valid index, the target array will be resized accordingly. "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="Adding Two Files"',title:'"Adding',Two:!0,'Files"':!0},'curl localhost:3000/graphql \\\n  -F operations=\'{ \n                   "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }",  \n                   # highlight-next-line\n                   "variables": { "files": [] } }\' \\\n  -F map=\'{ "firstFile": ["variables", "files", 0], "secondFile": ["variables", "files", 1] }\' \\\n  -F firstFile=@a.txt\n  -F secondFile=@b.txt\n')),(0,l.kt)("p",null,"In the above example, the ",(0,l.kt)("inlineCode",{parentName:"p"},"files")," array will be automatically expanded to include indexes 0 and 1 as requested by the ",(0,l.kt)("inlineCode",{parentName:"p"},"map"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Resultant Operations Object"',title:'"Resultant',Operations:!0,'Object"':!0},'{\n    "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }",  \n    "variables": { "files": [<firstFile>, <secondFile>] }\n}\n')),(0,l.kt)("h3",{id:"skipping-array-indexes"},"Skipping Array Indexes"),(0,l.kt)("p",null,"If you skip any indexes in your ",(0,l.kt)("inlineCode",{parentName:"p"},"map")," declaration, the target array will be expanded to to include the out of sequence index. This can produce null values in your array and result in an error if your variable declaration does not allow nulls."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="Adding One File To Index 5"',title:'"Adding',One:!0,File:!0,To:!0,Index:!0,'5"':!0},'# Only one file is supplied but its mapped to index 5\n# the final array at \'variables.files` will be 6 elements long with 5 null elements.\ncurl localhost:3000/graphql \\\n  -F operations=\'{ \n                   "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }",  \n                   # highlight-next-line\n                   "variables": { "files": [] } }\' \\\n  # highlight-next-line\n  -F map=\'{ "firstFile": ["variables", "files", 5] }\' \\\n  -F firstFile=@a.txt\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Resultant Operations Object"',title:'"Resultant',Operations:!0,'Object"':!0},'{\n    "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }",  \n    // highlight-next-line\n    "variables": { "files": [null, null, null, null, null, <firstFile>] }\n}\n')),(0,l.kt)("h3",{id:"file-uploads-on-batched-queries"},"File Uploads on Batched Queries"),(0,l.kt)("p",null,"File uploads work in conjunction with batched queries. When processing a multi-part request as a batch, prefix each of the mapped object-path references with an index of the batch you want the file to apply to. As you might guess this is usually handled by a supported client automatically."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="Sample Query"',title:'"Sample','Query"':!0},'curl localhost:3000/graphql \\\n  -F operations=\'[\n         { "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }", "variables": { "files": [] } },\n         { "query": "mutation ($files: [Upload]) { multiFileUpload(files: $files) }", "variables": { "files": [] } },\n       ]\' \\\n   # highlight-next-line\n  -F map=\'{ "firstFile": [0, "variables", "files", 0], "secondFile": [1, "variables", "files", 0] }\' \\\n  -F firstFile=@a.txt\n  -F secondFile=@b.txt\n')),(0,l.kt)("h3",{id:"fileupload-scalar"},"FileUpload Scalar"),(0,l.kt)("p",null,"The following properties on the ",(0,l.kt)("inlineCode",{parentName:"p"},"FileUpload")," C# class can be useful:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"FileName")," - The name of the file that was uploaded. This property will be null if a non-file form field is referenced."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"MapKey")," - The key value used to place this file within a variable collection. This is usually the form field name on the multi-part request."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"ContentType")," -  The supplied ",(0,l.kt)("inlineCode",{parentName:"li"},"content-type")," value sent with the file. This value will be null for non-file fields."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"Headers")," -  A collection of all the headers provided with the uploaded file. This value will be null for non-file fields.")),(0,l.kt)("h3",{id:"opening-a-file-stream"},"Opening a File Stream"),(0,l.kt)("p",null,"When opening a file stream you need to await a call ",(0,l.kt)("inlineCode",{parentName:"p"},"FileUpload.OpenFileAsync()"),". This method is an abstraction on top of an internal wrapper that standardizes file streams across all implementions (see below for implementing your own file processor).  When working with the standard ",(0,l.kt)("inlineCode",{parentName:"p"},"IFormFile")," interface provided by ASP.NET this call is a simple wrapper for ",(0,l.kt)("inlineCode",{parentName:"p"},"IFormFile.OpenReadStream()"),". "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"title=ExampleFile Upload Controller",title:"ExampleFile",Upload:!0,Controller:!0},'using GraphQL.AspNet.ServerExtensions.MultipartRequests;\n\npublic class FileUploadController : GraphController\n{\n    [MutationRoot("singleFileUpload")]\n    public async Task<int> UploadFile(FileUpload fileRef)\n    {\n        // do something with the file stream\n        // it is your responsibility to close and dispose of it\n        // highlight-next-line\n        using var stream = await fileRef.OpenFileStreamAsync();        \n\n        return 0;\n    }\n}\n')),(0,l.kt)("h3",{id:"custom-file-handling"},"Custom File Handling"),(0,l.kt)("p",null,"By default, this extension splits the POST request on an ",(0,l.kt)("inlineCode",{parentName:"p"},"HttpContext")," and presents the different parts to the query engine in a manner it expects. This means that any uploaded files are consumed under the hood as ASP.NET's built in ",(0,l.kt)("inlineCode",{parentName:"p"},"IFormFile")," interface. While this is fine for most users, it can be troublesome with regard to timeouts and large file requests. Also, there may be scenarios where you want to save off files prior to executing a query or perhaps you'll need to process the file stream multiple times. "),(0,l.kt)("p",null,"You can implement and register your own ",(0,l.kt)("inlineCode",{parentName:"p"},"IFileUploadScalarValueMaker")," to add custom processing logic for each file or blob BEFORE graphql gets ahold of it. For instance, some users may want to write incoming files to local disk or cloud storage and present GraphQL with a stream that points to that local reference, rather than the file reference on the http request."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"}," public interface IFileUploadScalarValueMaker\n{\n    // This overload is used when processing traditional files received as part of a \n    // multi-part form through ASP.NET's HttpContext\n    Task<FileUpload> CreateFileScalar(IFormFile aspNetFile);\n\n    // This overload is used when processing data received on a \n    // multi-part form field rather than as a formal file upload.\n    Task<FileUpload> CreateFileScalar(string mapKey, byte[] blobData);\n}\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Register Your Custom Value Maker"',title:'"Register',Your:!0,Custom:!0,Value:!0,'Maker"':!0},"// other startup code omitted\n\n// register your scalar value maker BEFORE calling .AddGraphQL\nservices.AddSingleton<IFileUploadScalarValueMaker, MyFileUploadScalarValueMaker>();\n\nservices.AddGraphQL(options => {\n    options.AddMultipartRequestSupport();\n});\n")),(0,l.kt)("admonition",{type:"tip"},(0,l.kt)("p",{parentName:"admonition"},"You can inherit from ",(0,l.kt)("inlineCode",{parentName:"p"},"FileUpload")," and extend it as needed on your custom maker. However, be sure to declare your method parameters as ",(0,l.kt)("inlineCode",{parentName:"p"},"FileUpload")," in your controllers so that GraphQL knows what scalar you are requesting.")),(0,l.kt)("p",null,"Take a look at the ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/graphql-aspnet/graphql-aspnet/blob/master/src/graphql-aspnet/ServerExtensions/MultipartRequests/Engine/TypeMakers/DefaultFileUploadScalarValueMaker.cs"},"default upload scalar value maker")," for some helpful details when trying to implement your own."),(0,l.kt)("h3",{id:"timeouts-and-file-uploads"},"Timeouts and File Uploads"),(0,l.kt)("p",null,"Be mindful of any query timeouts you have set for your schemas. ASP.NET may start processing your query before all the file contents are made available to the server as long as it has the initial POST request. This also means that your graphql queries may start executing before the file contents arrive."),(0,l.kt)("p",null,"While this asysncronicty usually works to your advantage, allowing your queries to begin processing before all the files are uploaded to the server; you may find that your queries pause on ",(0,l.kt)("inlineCode",{parentName:"p"},".OpenFileStreamAsync()")," waiting for the file stream to become available if there is a network delay or a large file being uploaded. If you have a ",(0,l.kt)("a",{parentName:"p",href:"/docs/reference/schema-configuration#querytimeout"},"custom timeout")," configured for a schema, it may trigger while waiting for the file. Be sure to set your timeouts to a long enough period of time to avoid this scenario."),(0,l.kt)("h2",{id:"batch-queries"},"Batch Queries"),(0,l.kt)("h3",{id:"processing-a-batch-of-queries"},"Processing a Batch of Queries"),(0,l.kt)("p",null,'Provide an "operations" form field that represents an array of graphql requests, the engine will automatically detect the array and return an array of responses in the same order as they were received. Each query is processed asyncronously and independently. '),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="Example Batch Query"',title:'"Example',Batch:!0,'Query"':!0},'curl localhost:3000/graphql \\\n  #highlight-start\n  -F operations=\'[\n         { "query": "query { findUser(lastName: \\"Smith\\") {firstName lastName} }" },\n         { "query": "query { findUser(lastName: \\"Jones\\") {firstName lastName} }" },\n       ]\' \\\n   # highlight-end\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Example Json Serialized Response"',title:'"Example',Json:!0,Serialized:!0,'Response"':!0},'[\n   {\n        "data": {\n            "findUser": {\n                "firstName": "Baily",\n                "lastName": "Smith"\n            }\n        }\n   },\n   {\n        "data": {\n            "findUser": {\n                "firstName": "Caleb",\n                "lastName": "Jones"\n            }\n        }\n   }\n]\n')),(0,l.kt)("h3",{id:"processing-a-single-query"},"Processing a Single Query"),(0,l.kt)("p",null,'Provide an "operations" form field that represents a single query and the engine will automatically detect and return a normal graphql response.'),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="Example Batch Query"',title:'"Example',Batch:!0,'Query"':!0},'curl localhost:3000/graphql \\\n  #highlight-next-line\n  -F operations=\'{ "query": "query { findUser(lastName: \\"Smith\\") {firstName lastName} }" }\' \\\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Example Json Serialized Response"',title:'"Example',Json:!0,Serialized:!0,'Response"':!0},'{\n    "data": {\n        "findUser": {\n            "firstName": "Baily",\n            "lastName": "Smith"\n        }\n    }\n}\n')),(0,l.kt)("admonition",{type:"info"},(0,l.kt)("p",{parentName:"admonition"},"The extension is backwards compatible with standard graphql http request processing. If a request is recieved that is not a multi-part form POST request, normal graphql processing will occur.")),(0,l.kt)("h3",{id:"batch-execution-order-is-never-guaranteed"},"Batch Execution Order is Never Guaranteed"),(0,l.kt)("p",null,"While the order of the results is guaranteed to be the same order in which the queries were received, there is no guarantee that the queries are executed in any specific order. This means if you submit a batch of 5 requests, each requests may complete in a randomized order. If the same batch is submitted 3 times, its possible that the execution order will be different each time. "),(0,l.kt)("p",null,"For queries this is usally not an issue, but if you are batching mutations, make sure you don't have any unexpected dependencies or side effects between queries. If your controllers perform business logic against an existing object and that object is modified by more than of your mutations its highly possible that the state of the object may be unexpectedly modified in some executions but not in others. "),(0,l.kt)("p",null,"Take this controller and query:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="Example Controller"',title:'"Example','Controller"':!0},'public class FileUploadController : GraphController\n{\n    [MutationRoot("addMoney")]\n    // highlight-next-line\n    public async Task<Item> AddMoney(int itemId, int dollarsToAdd)\n    {\n        var item =await _service.RetrieveItem(itemId);\n        item.CurrentTotal += dollarsToAdd;\n\n        await _service.UpdateItem(item);\n        return item;\n    }\n}\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="Example Batch Query"',title:'"Example',Batch:!0,'Query"':!0},'curl localhost:3000/graphql \\\n  #highlight-start\n  -F operations=\'[\n         { "query": "mutation { addMoney(itemId: 34, dollarsToAdd: 5) {id currentTotal} }" },\n         { "query": "mutation { addThreeDollars(itemId: 34, , dollarsToAdd: 3) {id currentTotal} }" },\n       ]\' \\\n   # highlight-end\n')),(0,l.kt)("p",null,"Assuming that the initial value of ",(0,l.kt)("inlineCode",{parentName:"p"},"currentTotal")," was 0, all three of these responses are equally likely to occur depending on the order in which the execution engine decides to process the queries."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json",metastring:"title=Sample Json Results",title:"Sample",Json:!0,Results:!0},'// When the queries are executed in declared order\n[\n    {\n        "data": {\n            "addMoney": {\n                "id": 34,\n                "currentTotal": 5\n            }\n        }\n    },\n    {\n        "data": {\n            "addMoney": {\n                "id": 34,\n                "currentTotal": 8\n            }\n        }\n    },\n]\n\n// When the queries are executed in reverse order\n[\n    {\n        "data": {\n            "addMoney": {\n                "id": 34,\n                "currentTotal": 8\n            }\n        }\n    },\n    {\n        "data": {\n            "addMoney": {\n                "id": 34,\n                "currentTotal": 3\n            }\n        }\n    },\n]\n\n// When the queries are executed simultaniously\n// The final result updated to the datastore is unknown\n[\n    {\n        "data": {\n            "addMoney": {\n                "id": 34,\n                "currentTotal": 5\n            }\n        }\n    },\n    {\n        "data": {\n            "addMoney": {\n                "id": 34,\n                "currentTotal": 3\n            }\n        }\n    },\n]\n')),(0,l.kt)("p",null,"Under the hood, the batch process will parse and submit all queries to the engine simultaniously and wait for them to finish before structuring a result object. "),(0,l.kt)("admonition",{type:"caution"},(0,l.kt)("p",{parentName:"admonition"},"Ensure there are no dependencies between queries in a batch. An expected order of execution is never guaranteed.")),(0,l.kt)("h2",{id:"configuration"},"Configuration"),(0,l.kt)("p",null,"There are several configuration settings specific to extension. They can all be toggled when the extension is registered. Each configuration is specific\nto the targeted schema."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp",metastring:"title='Configuring the Server Extension'",title:"'Configuring",the:!0,Server:!0,"Extension'":!0},"// Startup Code\n// other code omitted for brevity\nservices.AddGraphQL(options => {\n    // highlight-start\n    options.AddMultipartRequestSupport(mpOptions => {\n        // set mpOptions here\n    });\n    // highlight-end\n});\n")),(0,l.kt)("h3",{id:"mapmode"},"MapMode"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},"// usage example\nmpOptions.MapMode = MultipartRequestMapHandlingMode.Default;\n")),(0,l.kt)("p",null,"A bitwise flag enumeration allowing the inclusion of different types of values for the ",(0,l.kt)("inlineCode",{parentName:"p"},"map")," field dictated by the specification. Both options are enabled by default."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Option"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"AllowStringPaths")),(0,l.kt)("td",{parentName:"tr",align:null},"When enabled, the short-hand syntax for ",(0,l.kt)("inlineCode",{parentName:"td"},"object-path"),", which uses a dot-delimited string instead of an array to indicate a json path, is acceptable for a map value.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"SplitDotDelimitedSingleElementArrays")),(0,l.kt)("td",{parentName:"tr",align:null},"When enabled, the extension will examine single element arrays and, if that element is a string, treat it as a string, allowing it to be split as a dot-delimited string if the option is enabled. When not enabled, single element arrays are treated as a single path value.")))),(0,l.kt)("h3",{id:"requestmode"},"RequestMode"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},"// usage example\nmpOptions.RequestMode = MultipartRequestMode.Default;\n")),(0,l.kt)("p",null,"A bitwise flag enumeration that controls which actions the multi-part request extension. By default, both batch queries and file uploads are enabled."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Option"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"FileUploads")),(0,l.kt)("td",{parentName:"tr",align:null},"When enabled, the server extension will process file uploads. When disabled, any included files or form fields treated as files will cause the request to be rejected.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"BatchQueries")),(0,l.kt)("td",{parentName:"tr",align:null},"When enabled, the extension will attempt to process properly formatted batch queries. When disabled, any attempt to submit a batch query will cause the request to be rejected.")))),(0,l.kt)("h3",{id:"maxfilecount"},"MaxFileCount"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},"// usage example\nmpOptions.MaxFileCount = 15;\n")),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,l.kt)("th",{parentName:"tr",align:null},"Acceptable Values"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"null")),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"null"),", number")))),(0,l.kt)("p",null,"When set, the extension will process, at most, the indicated amount of files. If more files appear on the request than the value indicated the request is automatically rejected. By default this value is set to ",(0,l.kt)("inlineCode",{parentName:"p"},"null")," or no limit."),(0,l.kt)("h3",{id:"maxblobcount"},"MaxBlobCount"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},"// usage example\nmpOptions.MaxBlobCount = 15;\n")),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,l.kt)("th",{parentName:"tr",align:null},"Acceptable Values"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"null")),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"null"),", number")))),(0,l.kt)("p",null,"When set, the extension will process, at most, the indicated amount of additional, non-spec form fields (e.g. additional text blobs). If more blobs appear on the request than the value indicated the request is automatically rejected. By default this value is set to ",(0,l.kt)("inlineCode",{parentName:"p"},"null")," or no limit."),(0,l.kt)("h3",{id:"registermultipartrequesthttpprocessor"},"RegisterMultipartRequestHttpProcessor"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},"// usage example\nmpOptions.RegisterMultipartRequestHttpProcessor = true;\n")),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,l.kt)("th",{parentName:"tr",align:null},"Acceptable Values"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"true")),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"true"),", ",(0,l.kt)("inlineCode",{parentName:"td"},"false"))))),(0,l.kt)("p",null,"Determines if, when registering the extension, the default multipart http processor is registered. When set to true, the extension will attempt to replace any other registered http processor(i.e. the object that is handed an HttpContext via a route). When false, no processor is registered. You are expected to provide your own handling for multipart requests. The extension will always register its other required objects (the form parser, the custom scalar etc.)."),(0,l.kt)("h3",{id:"requiremultipartrequesthttpprocessor"},"RequireMultipartRequestHttpProcessor"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-csharp"},"// usage example\nmpOptions.RequireMultipartRequestHttpProcessor = true;\n")),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,l.kt)("th",{parentName:"tr",align:null},"Acceptable Values"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"true")),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"true"),", ",(0,l.kt)("inlineCode",{parentName:"td"},"false"))))),(0,l.kt)("p",null,"Determines if, when starting up the application, the extension will check that the required http processor is registered. When set to true, if the required processor is not registered and configuration exception will be thrown and the server will fail to start.  This can be helpful when registering multiple extensions to ensure that a valid processor is registered such that multipart form requests will be handled correctly."),(0,l.kt)("h2",{id:"demo-project"},"Demo Project"),(0,l.kt)("p",null,"See the ",(0,l.kt)("a",{parentName:"p",href:"/docs/reference/demo-projects"},"demo projects")," for a sample project utilizing ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/jaydenseric/apollo-upload-client"},"jaydenseric's apollo-upload-client")," as a front end for performing file uploads against this  extension."))}d.isMDXComponent=!0}}]);