import React from 'react';
import _ from 'lodash';

import WaveTop from './WaveTop';
import { markdownify, Link, safePrefix, classNames } from '../utils';
import WaveBottom from './WaveBottom';

export default class Grid extends React.Component {
    render() {
        return (
            <section
                id={_.get(this.props, 'section.section_id')}
                className={
                    'section section-grid bg-' +
                    _.get(this.props, 'section.bg_color') +
                    (_.get(this.props, 'section.bg_pattern') && _.get(this.props, 'section.bg_pattern') !== 'none'
                        ? ' pattern-' + _.get(this.props, 'section.bg_pattern')
                        : '') +
                    (_.get(this.props, 'next_bg') && _.get(this.props, 'next_bg') !== 'none' ? ' next-' + _.get(this.props, 'next_bg') : '')
                }
            >
                <div className="outer inner">
                    <div className="section-content">
                        {_.get(this.props, 'section.title') && <h2 className="section-title">{_.get(this.props, 'section.title')}</h2>}
                        <div className="section-copy">{markdownify(_.get(this.props, 'section.content'))}</div>
                        {_.get(this.props, 'section.items') && (
                            <div className={'grid col-' + _.get(this.props, 'section.col_number')}>
                                {_.map(_.get(this.props, 'section.items'), (item, item_idx) => (
                                    <div key={item_idx} className="grid-item">
                                        {_.get(item, 'title') && <h3 className="item-title">{_.get(item, 'title')}</h3>}
                                        <div className="item-content">{markdownify(_.get(item, 'content'))}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {_.get(this.props, 'section.actions') && (
                            <div className="section-actions">
                                {_.map(_.get(this.props, 'section.actions'), (action, action_idx) => (
                                    <Link
                                        key={action_idx}
                                        to={_.get(action, 'url').startsWith('#') ? _.get(action, 'url') : safePrefix(_.get(action, 'url'))}
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
            </section>
        );
    }
}
