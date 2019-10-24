/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
    docUrl(doc, language) {
        const baseUrl = this.props.config.baseUrl;
        const docsUrl = this.props.config.docsUrl;
        const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
        const langPart = `${language ? `${language}/` : ''}`;
        return `${baseUrl}${docsPart}${langPart}${doc}`;
    }

    pageUrl(doc, language) {
        const baseUrl = this.props.config.baseUrl;
        return baseUrl + (language ? `${language}/` : '') + doc;
    }

    render() {
        return (
            <footer className="nav-footer" id="footer">
                <section className="sitemap">
                    <div>
                        <h5>Docs</h5>
                        <a
                            href={this.docUrl(
                                'introduction/made-for-aspnet-developers'
                            )}
                        >
                            Made for ASP.NET Developers
                        </a>
                        <a href={this.docUrl('quick/code-examples')}>
                            Code Examples
                        </a>
                    </div>
                    <div></div>
                    {/*<div>
                        <h5>Community</h5>
                        <a
                            href={this.pageUrl(
                                'users.html',
                                this.props.language
                            )}
                        >
                            User Showcase
                        </a>
                        <a
                            href="https://stackoverflow.com/questions/tagged/"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            Stack Overflow
                        </a>
                        <a href="https://discordapp.com/">Project Chat</a>
                        <a
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            Twitter
                        </a>
                            </div> */}
                    <div>
                        <h5>More</h5>
                        <a
                            className="github-button"
                            href="https://github.com/graphql-aspnet/graphql-aspnet"
                            data-show-count="true"
                            data-count-href="/graphql-aspnet/graphql-aspnet/stargazers"
                            data-show-count="true"
                            aria-label="Star this project on GitHub"
                        >
                            Star on GitHub
                        </a>

                        <a href="https://graphql.org">GraphQL.org</a>
                        <a href="https://dotnet.microsoft.com/learn/aspnet">
                            Learn ASP.NET
                        </a>
                        {/*this.props.config.twitterUsername && (
                            <div className="social">
                                <a
                                    href={`https://twitter.com/${this.props.config.twitterUsername}`}
                                    className="twitter-follow-button"
                                >
                                    Follow @{this.props.config.twitterUsername}
                                </a>
                            </div>
                        )*/}
                        {/*this.props.config.facebookAppId && (
                            <div className="social">
                                <div
                                    className="fb-like"
                                    data-href={this.props.config.url}
                                    data-colorscheme="dark"
                                    data-layout="standard"
                                    data-share="true"
                                    data-width="225"
                                    data-show-faces="false"
                                />
                            </div>
                        )*/}
                    </div>
                </section>
                <section className="copyright">
                    {this.props.config.copyright}
                </section>
            </footer>
        );
    }
}

module.exports = Footer;
