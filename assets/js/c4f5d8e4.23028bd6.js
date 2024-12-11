"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2634],{1459:(e,n,t)=>{t.r(n),t.d(n,{default:()=>p});var r=t(6540),a=t(53),l=t(5489),s=t(4586),c=t(9408),i=t(7964);const o={heroBanner:"heroBanner_qdFl","main-buttons":"main-buttons_U_dc",buttons:"buttons_AeoN"};function m(){const{siteConfig:e}=(0,s.A)();return r.createElement("header",{className:(0,a.A)(o.heroBanner)},r.createElement("div",{className:"container"},r.createElement("h1",{className:"hero__title"},e.title," ",r.createElement("span",{className:"pill-header pill-small"},".NET 6+")),r.createElement("div",{className:o.buttons},r.createElement("div",{className:(0,a.A)("row",o["main-buttons"])},r.createElement("div",null,r.createElement(l.A,{className:"button button--primary button--lg",to:"/docs/quick/overview"},"Documentation"))))))}function u(){return r.createElement(r.Fragment,null,r.createElement("h2",{style:{fontSize:"2em"}},"Write a Controller"),r.createElement(i.A,{className:"language-csharp"},'// C# Controller \n[GraphRoute("groceryStore/bakery")]\npublic class BakeryController : GraphController \n{ \n  [Query("pastries/search")]\n  public IEnumerable<IPastry> SearchPastries(string text)\n  { /* ... */ }\n\n  [Query("pastries/recipe")]\n  public async Task<Recipe> RetrieveRecipe(int id)\n  { /* ... */ }\n\n  [Query("breadCounter/orders")]\n  public IEnumerable<BreadOrder> FindOrders(int id)\n  { /* ... */ }\n}'))}function d(){return r.createElement(r.Fragment,null,r.createElement("h2",{style:{fontSize:"2em"}},"Execute a Query"),r.createElement(i.A,{className:"language-graphql"},"# GraphQL Query \nquery SearchGroceryStore($pastryName: String!) { \n groceryStore {\n  bakery {\n    pastries {\n      search(text: $pastryName) {\n         name\n         type\n      }\n      recipe(id: 15) {\n        name\n        ingredients {\n            name\n        }\n      } \n    } \n  } \n  breadCounter {\n   orders(id:36) {\n     id \n     items { \n       id  \n       quantity  \n     } \n   } \n  } \n } \n}"))}function p(){const{siteConfig:e}=(0,s.A)();return r.createElement(c.A,{title:"",description:"A GraphQL library for ASP.NET developers."},r.createElement(m,null),r.createElement("main",null,r.createElement("section",{className:o.features},r.createElement("div",{className:"container"},r.createElement("div",{className:"row",style:{justifyContent:"space-evenly"}},r.createElement("div",null,r.createElement(u,null)),r.createElement("div",null,r.createElement(d,null)))))))}}}]);