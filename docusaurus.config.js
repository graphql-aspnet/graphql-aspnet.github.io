// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/palenight');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'GraphQL ASP.NET',
  tagline: 'v1.0.0-rc4',
  url: 'https://graphql-aspnet.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',


  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'graphql-aspnet', // Usually your GitHub org/user name.
  projectName: 'graphql-aspnet.github.io', // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  scripts: [
    {
      src: 'https://buttons.github.io/buttons.js',
      async: true,
      type: "text/javascript",
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: false
        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true
      },
      navbar: {
        title: 'GraphQL ASP.NET',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo-128.png',
        },
        items: [],
      },
      footer: {
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Made for ASP.NET developers',
                to: '/docs/introduction/made-for-aspnet-developers',
              },
              {
                label: 'Code Examples',
                to: '/docs/quick/code-examples',
              },
            ],
          },
          {
            title: ' ',
            items: [],
          },
          {
            title: 'More',
            items: [
              {
                html: `
                <a 
                  class="github-button" 
                  href="https://github.com/graphql-aspnet/graphql-aspnet" 
                  data-size="large" 
                  data-show-count="true" 
                  aria-label="Star graphql-aspnet/graphql-aspnet on GitHub">
                    Star on Github
                </a>
                `
              },
              {
                html: `
                <a 
                  class="footer__link-item"
                  href="https://graphql.org" 
                  target="_blank" 
                  rel="noreferrer noopener" 
                  aria-label="GraphQl Org">
                  GraphQL.org
                </a>
              `
              },
              {
                html: `
                      <a 
                        class="footer__link-item"
                        href="https://dotnet.microsoft.com/en-us/learn/aspnet" 
                        target="_blank" 
                        rel="noreferrer noopener" 
                        aria-label="Learn ASP.NET">
                        Learn ASP.NET
                      </a>
                    `
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} GraphQL ASP.NET`,
      },
      prism: {
        darkTheme: darkCodeTheme,
        theme: lightCodeTheme,
        additionalLanguages: ['csharp', 'powershell'],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: false
        }
      },
    }),
};

module.exports = config;
