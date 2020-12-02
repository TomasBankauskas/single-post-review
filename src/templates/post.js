import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import ScriptTag from 'react-script-tag';

import { Layout } from '../components/index';
import { getData, safePrefix, markdownify, htmlToReact, Link } from '../utils';

export default class Post extends React.Component {
    render() {
        const author = getData(this.props.pageContext.site.data, _.get(this.props, 'pageContext.frontmatter.author', null));

        return (
            <Layout {...this.props}>
                <article className="post post-full outer">
                    <div className="inner">
                        <header className="post-header">
                            <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                        </header>
                        {_.get(this.props, 'pageContext.frontmatter.content_img_path') && (
                            <div className="post-thumbnail">
                                <img
                                    className="thumbnail"
                                    src={safePrefix(_.get(this.props, 'pageContext.frontmatter.content_img_path'))}
                                    alt={_.get(this.props, 'pageContext.frontmatter.title')}
                                />
                            </div>
                        )}
                        <div className="post-content">
                            {_.get(this.props, 'pageContext.frontmatter.subtitle') && (
                                <div className="post-subtitle">{markdownify(_.get(this.props, 'pageContext.frontmatter.subtitle'))}</div>
                            )}
                            {htmlToReact(_.get(this.props, 'pageContext.html'))}
                        </div>
                        <footer className="post-footer">
                            <div className="post-meta">
                                {author && (
                                    <React.Fragment>
                                        {_.get(author, 'avatar') && (
                                            <div className="author-avatar">
                                                <img
                                                    className="avatar"
                                                    src={safePrefix(_.get(author, 'avatar'))}
                                                    alt={_.get(author, 'name') + "'s avatar"}
                                                />
                                            </div>
                                        )}
                                        <div className="post-author">{_.get(author, 'name')}</div>
                                    </React.Fragment>
                                )}
                                <div className="post-date">
                                    <time
                                        className="published"
                                        dateTime={moment(_.get(this.props, 'pageContext.frontmatter.date')).strftime('%Y-%m-%d %H:%M')}
                                    >
                                        {moment(_.get(this.props, 'pageContext.frontmatter.date')).strftime('%B %d, %Y')}
                                    </time>
                                </div>
                            </div>
                            <div className="post-share">
                                <span>Share:</span>
                                <div>
                                    <Link className="twitter-share-button" to="https://twitter.com/intent/tweet">
                                        Tweet
                                    </Link>
                                </div>
                                <ScriptTag async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
                                <div>
                                    <iframe
                                        title="Share"
                                        src={
                                            'https://www.facebook.com/plugins/share_button.php?href=' +
                                            _.get(this.props, 'pageContext.site.siteMetadata.siteUrl') +
                                            safePrefix(_.get(this.props, 'pageContext.url')) +
                                            '&layout=button&size=small&mobile_iframe=true&appId=1468854916664121&width=59&height=20'
                                        }
                                        width="70"
                                        height="20"
                                        scrolling="no"
                                        frameBorder="0"
                                        allowTransparency="true"
                                        allow="encrypted-media"
                                    />
                                </div>
                            </div>
                        </footer>
                    </div>
                </article>
            </Layout>
        );
    }
}
