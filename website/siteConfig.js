/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
    /* {
        caption: 'User1',
        // You will need to prepend the image path with your baseUrl
        // if it is not '/', like: '/test-site/img/image.jpg'.
        image: '/img/undraw_open_source.svg',
        infoLink: 'https://www.facebook.com',
        pinned: true,
    },*/
];

const siteConfig = {
    title: 'GraphQL ASP.NET', // Title for your website.
    tagline: 'GraphQL for ASP.NET Developers',
    url: 'https://graphql-aspnet.github.io', // Your website URL
    baseUrl: '/', // Base URL for your project */
    // For github.io type URLs, you would set the url and baseUrl like:
    //   url: 'https://facebook.github.io',
    //   baseUrl: '/test-site/',

    // Used for publishing and more
    projectName: 'graphql-aspnet.github.io',
    organizationName: 'graphql-aspnet',

    // For no header links in the top nav bar -> headerLinks: [],
    headerLinks: [
        { doc: 'quick/overview', label: 'Documentation' },
        {
            href: 'https://github.com/graphql-aspnet/graphql-aspnet',
            label: 'Source Code',
        },
    ],

    // If you have users set above, you add it here:
    users,

    /* path to images for header/footer */
    headerIcon: 'img/logo-64.png',
    footerIcon: 'img/logo-64.png',
    favicon: 'img/logo-64.png',

    /* Colors for website */
    colors: {
        primaryColor: '#304369',
        secondaryColor: '#212e49',
    },

    twitterUsername: 'graphql_aspnet',

    // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
    copyright: `Copyright © ${new Date().getFullYear()} GraphQL ASP.NET`,

    gaTrackingId: 'UA-150856900-1',

    highlight: {
        // Highlight.js theme to use for syntax highlighting in code blocks.
        theme: 'hybrid', //atom-one-dark',
    },

    // Add custom scripts here that would be placed in <script> tags.
    scripts: ['https://buttons.github.io/buttons.js'],

    // On page navigation for the current documentation page.
    onPageNav: 'separate',
    // No .html extensions for paths.
    cleanUrl: true,

    // Open Graph and Twitter card images.
    ogImage: 'img/undraw_online.svg',
    twitterImage: 'img/undraw_tweetstorm.svg',

    // For sites with a sizable amount of content, set collapsible to true.
    // Expand/collapse the links and subcategories under categories.
    // docsSideNavCollapsible: true,

    // Show documentation's last contributor's name.
    // enableUpdateBy: true,

    // Show documentation's last update time.
    // enableUpdateTime: true,

    // You may provide arbitrary config keys to be used as needed by your
    // template. For example, if you need your repo's URL...
    repoUrl: 'https://github.com/graphql-aspnet/graphql-aspnet',
};

module.exports = siteConfig;
