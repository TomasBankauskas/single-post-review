import React from 'react';
import _ from 'lodash';

import { safePrefix, markdownify, Link, classNames } from '../utils';
import Button from './Button';

export default class TextImage extends React.Component {
    render() {
        return (
            <section
                id={_.get(this.props, 'section.section_id')}
                className={classNames(
                    'section',
                    'section-textmedia',
                    `bg-${_.get(this.props, 'section.bg_color')}`,
                    _.get(this.props, 'next_bg') && _.get(this.props, 'next_bg') !== 'none' && ' next-' + _.get(this.props, 'next_bg'),
                    ' align-' + _.get(this.props, 'section.img_position')
                )}
            >
                <div className="outer inner">
                    <div className="section-inside">
                        {_.get(this.props, 'section.image') ? (
                            <div className="section-media">
                                <img src={safePrefix(_.get(this.props, 'section.image'))} alt={_.get(this.props, 'section.title')} />
                            </div>
                        ) : (
                            _.get(this.props, 'section.video_embed') && (
                                <div className="section-media">{markdownify(_.get(this.props, 'section.video_embed'))}</div>
                            )
                        )}
                        <div className="section-content">
                            {_.get(this.props, 'section.title') && <h2 className="section-title">{_.get(this.props, 'section.title')}</h2>}
                            <div className="section-copy">{markdownify(_.get(this.props, 'section.content'))}</div>
                            {_.get(this.props, 'section.actions') && (
                                <div className="section-actions">
                                    {_.map(_.get(this.props, 'section.actions'), (action, action_idx) => (
                                        <Button
                                            key={action_idx}
                                            href={
                                                _.get(action, 'url').startsWith('#')
                                                    ? _.get(action, 'url')
                                                    : safePrefix(_.get(action, 'url'))
                                            }
                                            openInNewWindow={_.get(action, 'new_window')}
                                            theme={_.get(this.props, 'section.bg_color') === 'blue' ? 'white' : 'accent'}
                                        >
                                            {_.get(action, 'label')}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
