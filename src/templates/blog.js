import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { getData, markdownify, getPages, Link, safePrefix } from '../utils';
import StackableSection from '../components/StackableSection';
import SectionHero from '../components/SectionHero';

export default class Blog extends React.Component {
    render() {
        let display_posts = _.orderBy(
            _.filter(getPages(this.props.pageContext.pages, '/blog'), (item) => _.get(item, 'base') !== 'index.md'),
            'frontmatter.date',
            'desc'
        );
        return (
            <Layout {...this.props}>
                <StackableSection isFirst orientation="right" theme="accent">
                    <SectionHero
                        title={_.get(this.props, 'pageContext.frontmatter.title')}
                        subtitle={_.get(this.props, 'pageContext.frontmatter.subtitle')}
                    />
                </StackableSection>
                <div className="post-feed outer">
                    <div className="inner">
                        <div className="post-feed-inside">
                            {_.map(display_posts, (post, post_idx) => {
                                const author = getData(this.props.pageContext.site, _.get(post, 'frontmatter.author', null));

                                return (
                                    <article key={post_idx} className="post post-card">
                                        {_.get(post, 'frontmatter.thumb_img_path') && (
                                            <Link className="post-thumbnail" to={safePrefix(_.get(post, 'url'))}>
                                                <img
                                                    className="thumbnail"
                                                    src={safePrefix(_.get(post, 'frontmatter.thumb_img_path'))}
                                                    alt={_.get(post, 'frontmatter.title')}
                                                />
                                            </Link>
                                        )}
                                        <div className="post-inside">
                                            <header className="post-header">
                                                <h2 className="post-title">
                                                    <Link to={safePrefix(_.get(post, 'url'))} rel="bookmark">
                                                        {_.get(post, 'frontmatter.title')}
                                                    </Link>
                                                </h2>
                                            </header>
                                            {_.get(post, 'frontmatter.excerpt') && (
                                                <div className="post-excerpt">{markdownify(_.get(post, 'frontmatter.excerpt'))}</div>
                                            )}
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
                                                            dateTime={moment(_.get(post, 'frontmatter.date')).strftime('%Y-%m-%d %H:%M')}
                                                        >
                                                            {moment(_.get(post, 'frontmatter.date')).strftime('%B %d, %Y')}
                                                        </time>
                                                    </div>
                                                </div>
                                            </footer>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}
