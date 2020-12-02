import React from 'react';
import _ from 'lodash';

import { classNames, safePrefix, Link, markdownify } from '../utils';
import Icon from './Icon';

export default class Reviews extends React.Component {
    render() {
        return (
            <section
                id={_.get(this.props, 'section.section_id')}
                className={classNames(
                    'section',
                    'section-reviews',
                    `bg-${_.get(this.props, 'section.bg_color')}`,
                    _.get(this.props, 'next_bg') && _.get(this.props, 'next_bg') !== 'none' && ' next-' + _.get(this.props, 'next_bg')
                )}
            >
                <div className="outer inner">
                    <div className="section-content">
                        {_.get(this.props, 'section.title') && <h2 className="section-title">{_.get(this.props, 'section.title')}</h2>}
                        {_.get(this.props, 'section.tweets') && (
                            <div className="reviews">
                                <div className="reviews-inside">
                                    {_.map(_.get(this.props, 'section.tweets'), (tweet, tweet_idx) => (
                                        <div key={tweet_idx} className="review">
                                            <blockquote className="twitter-card">
                                                <cite>
                                                    {_.get(tweet, 'avatar') && (
                                                        <img className="avatar" src={safePrefix(_.get(tweet, 'avatar'))} alt="" />
                                                    )}
                                                    <Link to={_.get(tweet, 'url')} target="_blank" rel="nofollow noopener">
                                                        {_.get(tweet, 'name')}
                                                        <small>{_.get(tweet, 'username')}</small>
                                                    </Link>
                                                </cite>
                                                {markdownify(_.get(tweet, 'text'))}
                                                <Icon symbol="twitter" />
                                            </blockquote>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}
