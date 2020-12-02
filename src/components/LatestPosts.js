import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { getPages, Link, safePrefix, classNames } from '../utils';
import WaveBottom from './WaveBottom';

export default class LatestPosts extends React.Component {
    render() {
        let display_posts = _.orderBy(
            _.filter(getPages(this.props.pageContext.pages, '/blog'), (item) => _.get(item, 'base') !== 'index.md'),
            'frontmatter.date',
            'desc'
        );
        let latest_posts = display_posts.slice(0, 2);
        return (
            <section
                id={_.get(this.props, 'section.section_id')}
                className={
                    'section section-posts bg-' +
                    _.get(this.props, 'section.bg_color') +
                    (_.get(this.props, 'next_bg') && _.get(this.props, 'next_bg') !== 'none' ? ' next-' + _.get(this.props, 'next_bg') : '')
                }
            >
                <div className="outer inner">
                    <div className="section-inside">
                        <div className="section-content">
                            {_.get(this.props, 'section.title') && <h2 className="section-title">{_.get(this.props, 'section.title')}</h2>}
                            <div className="post-feed">
                                <div className="post-feed-inside">
                                    {_.map(latest_posts, (post, post_idx) => {
                                        let authors = _.filter(_.get(this.props, 'pageContext.site.data.authors.authors'), [
                                            'name',
                                            _.get(post, 'frontmatter.author')
                                        ]);
                                        let author_length = _.size(authors);
                                        let author = _.head(authors);
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
                                                    <footer className="post-footer">
                                                        <div className="post-meta">
                                                            {_.get(post, 'frontmatter.author') && author_length > 0 && (
                                                                <React.Fragment>
                                                                    {_.get(author, 'avatar') && (
                                                                        <div className="author-avatar">
                                                                            <img
                                                                                className="avatar"
                                                                                src={safePrefix(_.get(author, 'avatar'))}
                                                                                alt={_.get(author, 'full_name') + "'s avatar"}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    <div className="post-author">{_.get(author, 'full_name')}</div>
                                                                </React.Fragment>
                                                            )}
                                                            <div className="post-date">
                                                                <time
                                                                    className="published"
                                                                    dateTime={moment(_.get(post, 'frontmatter.date')).strftime(
                                                                        '%Y-%m-%d %H:%M'
                                                                    )}
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
                            {_.get(this.props, 'section.actions') && (
                                <div className="section-actions">
                                    {_.map(_.get(this.props, 'section.actions'), (action, action_idx) => (
                                        <Link
                                            key={action_idx}
                                            to={
                                                _.get(action, 'url').startsWith('#')
                                                    ? _.get(action, 'url')
                                                    : safePrefix(_.get(action, 'url'))
                                            }
                                            className={classNames(
                                                'button',
                                                { 'has-arrow': _.get(action, 'has_arrow') },
                                                _.get(action, 'class_name')
                                            )}
                                            {...(_.get(action, 'new_window') ? { target: '_blank', rel: 'noopener' } : null)}
                                        >
                                            {_.get(action, 'label')}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {_.get(this.props, 'next_bg') !== 'blue' &&
                    _.get(this.props, 'next_bg') !== 'purple' &&
                    !(_.get(this.props, 'section.bg_color') === 'none' && _.get(this.props, 'last')) && <WaveBottom {...this.props} />}
            </section>
        );
    }
}
