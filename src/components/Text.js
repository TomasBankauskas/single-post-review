import React from 'react';
import _ from 'lodash';

import { markdownify, Link, safePrefix, classNames } from '../utils';
import Button from './Button';

export default class Text extends React.Component {
    render() {
        return (
            <section
                id={_.get(this.props, 'section.section_id')}
                className={classNames(
                    'section',
                    'section-text',
                    `bg-${_.get(this.props, 'section.bg_color')}`,
                    _.get(this.props, 'next_bg') && _.get(this.props, 'next_bg') !== 'none' && ' next-' + _.get(this.props, 'next_bg')
                )}
            >
                <div className="outer inner">
                    {_.get(this.props, 'section.title') && <h2 className="section-title">{_.get(this.props, 'section.title')}</h2>}
                    <div className="section-copy-wrap">
                        <div className="section-copy">{markdownify(_.get(this.props, 'section.content'))}</div>
                        {_.get(this.props, 'section.actions') && (
                            <div className="section-actions">
                                {_.map(_.get(this.props, 'section.actions'), (action, action_idx) => (
                                    <Button
                                        key={action_idx}
                                        href={
                                            _.get(action, 'url').startsWith('#') ? _.get(action, 'url') : safePrefix(_.get(action, 'url'))
                                        }
                                        openInNewWindow={_.get(action, 'new_window')}
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
