import React from 'react';
import _ from 'lodash';

import { Link, safePrefix, classNames } from '../utils';
import Button from './Button';
import WaveBottom from './WaveBottom';

export default class Cta extends React.Component {
    render() {
        return (
            <section
                id={_.get(this.props, 'section.section_id')}
                className={classNames(
                    'section',
                    'section-cta',
                    `bg-${_.get(this.props, 'section.bg_color')}`,
                    _.get(this.props, 'next_bg') && _.get(this.props, 'next_bg') !== 'none' && ' next-' + _.get(this.props, 'next_bg')
                )}
            >
                <div className="section-inside">
                    <div className="section-content">
                        {_.get(this.props, 'section.title') && (
                            <>
                                <h2 className="section-title">{_.get(this.props, 'section.title')}</h2>
                            </>
                        )}
                        {_.get(this.props, 'section.body') && (
                            <p className="section-subtitle">{_.get(this.props, 'section.body')}</p>
                        )}
                        {_.get(this.props, 'section.actions') && (
                            <div className="section-actions">
                                {_.map(_.get(this.props, 'section.actions'), (action, action_idx) => (
                                    <Button
                                        className={_.get(action, 'class_name')}
                                        key={action_idx}
                                        href={
                                            _.get(action, 'url').startsWith('#') ? _.get(action, 'url') : safePrefix(_.get(action, 'url'))
                                        }
                                        openInNewWindow={_.get(action, 'new_window')}
                                        theme={_.get(this.props, 'section.bg_color') === 'blue' ? 'white' : 'accent'}
                                        trackLabel={`Website Button Click`}
                                        trackParameters={{ location: _.get(this.props, 'section.section_id'), anchorText: _.get(action, 'label') }}
                                    >
                                        {_.get(action, 'label')}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}
