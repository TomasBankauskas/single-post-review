import React from 'react';
import _ from 'lodash';

import { markdownify } from '../utils';

export default class Faq extends React.Component {
    render() {
        return (
            <section
                id={_.get(this.props, 'section.section_id')}
                className={
                    'section section-faq bg-' +
                    _.get(this.props, 'section.bg_color') +
                    (_.get(this.props, 'next_bg') && _.get(this.props, 'next_bg') !== 'none' ? ' next-' + _.get(this.props, 'next_bg') : '')
                }
            >
                <div className="outer inner">
                    <div className="section-content">
                        {_.get(this.props, 'section.title') && <h2 className="section-title">{_.get(this.props, 'section.title')}</h2>}
                        {_.get(this.props, 'section.content_above') && (
                            <div className="section-copy">{markdownify(_.get(this.props, 'section.content_above'))}</div>
                        )}
                        {_.get(this.props, 'section.faq_items') && (
                            <dl className="faq-accordion">
                                {_.map(_.get(this.props, 'section.faq_items'), (item, item_idx) => (
                                    <React.Fragment key={item_idx}>
                                        <dt key={item_idx} className="accordion-header">
                                            <button className="accordion-trigger">
                                                <span className="accordion-title">{_.get(item, 'question')}</span>
                                                <span className="accordion-icon icon-plus" />
                                            </button>
                                        </dt>
                                        <dd key={item_idx} className="accordion-panel">
                                            <div className="accordion-content">{markdownify(_.get(item, 'answer'))}</div>
                                        </dd>
                                    </React.Fragment>
                                ))}
                            </dl>
                        )}
                        {_.get(this.props, 'section.content_below') && (
                            <div className="section-copy">{markdownify(_.get(this.props, 'section.content_below'))}</div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}
