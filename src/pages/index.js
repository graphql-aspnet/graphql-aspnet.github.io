import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';


import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons} >
          <div className={clsx("row", styles["main-buttons"])}>
            <div>
              <Link
                className="button button--primary button--lg"
                to="/docs/quick/overview">
                Documentation
              </Link>
            </div>
            <div>
              <a className="button button--primary button--lg" target="_blank" href="https://github.com/graphql-aspnet/graphql-aspnet">
                Github Repo
              </a>
            </div>
          </div>
        </div>
      </div>
    </header >
  );
}

function WriteAController() {
  return (
    <>
      <h2 style={{ fontSize: "2em" }}>Write a Controller</h2>
      <CodeBlock className="language-csharp" >
        {"// C# Controller \n" +
          "[GraphRoute(\"groceryStore/bakery\")]\n" +
          "public class BakeryController : GraphController \n" +
          "{ \n" +
          "  [Query(\"pastries/search\")]\n" +
          "  public IEnumerable<IPastry> SearchPastries(string text)\n" +
          "  { /* ... */ }\n" +
          "\n" +
          "  [Query(\"pastries/recipe\")]\n" +
          "  public async Task<Recipe> RetrieveRecipe(int id)\n" +
          "  { /* ... */ }\n" +
          "\n" +
          "  [Query(\"breadCounter/orders\")]\n" +
          "  public IEnumerable<BreadOrder> FindOrders(int id)\n" +
          "  { /* ... */ }\n" +
          "}"
        }
      </CodeBlock>
    </>
  );
}

function ExecuteAQuery() {
  return (
    <>
      <h2 style={{ fontSize: "2em" }}>Execute a Query</h2>
      <CodeBlock className="language-graphql">
        {
          "# GraphQL Query \n" +
          "query SearchGroceryStore($pastryName: String!) { \n" +
          " groceryStore {\n" +
          "  bakery {\n" +
          "    pastries {\n" +
          "      search(text: $pastryName) {\n" +
          "         name\n" +
          "         type\n" +
          "      }\n" +
          "      recipe(id: 15) {\n" +
          "        name\n" +
          "        ingredients {\n" +
          "            name\n" +
          "        }\n" +
          "      } \n" +
          "    } \n" +
          "  } \n" +
          "  breadCounter {\n" +
          "   orders(id:36) {\n" +
          "     id \n" +
          "     items { \n" +
          "       id  \n" +
          "       quantity  \n" +
          "     } \n" +
          "   } \n" +
          "  } \n" +
          " } \n" +
          "}"

        }
      </CodeBlock>
    </>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title=""
      description="A GraphQL library for ASP.NET developers.">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row" style={{ justifyContent: "space-evenly" }}>
              <div>
                <WriteAController />
              </div>
              <div>
                <ExecuteAQuery />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
