import React from 'react';
import _ from 'lodash';

import { safePrefix, Link, classNames } from '../utils';

export default class Team extends React.Component {
    render() {
        let section = _.get(this.props, 'section');
        return (
            <section
                id={_.get(this.props, 'section.section_id')}
                className={classNames(
                    'section',
                    'section-team',
                    `bg-${_.get(this.props, 'section.bg_color')}`,
                    _.get(this.props, 'next_bg') && _.get(this.props, 'next_bg') !== 'none' && ' next-' + _.get(this.props, 'next_bg')
                )}
            >
                <div className="outer inner">
                    <div className="section-content">
                        {_.get(this.props, 'section.title') && <h2 className="section-title">{_.get(this.props, 'section.title')}</h2>}
                        {_.get(this.props, 'section.members') && (
                            <div className="team">
                                <div className="members">
                                    {_.map(_.get(this.props, 'section.members'), (member, member_idx) => (
                                        <div key={member_idx} className="member">
                                            {_.get(member, 'avatar') && (
                                                <div className="member-avatar">
                                                    <img
                                                        className="avatar"
                                                        src={safePrefix(_.get(member, 'avatar'))}
                                                        alt={_.get(member, 'name') + "'s avatar"}
                                                    />
                                                </div>
                                            )}
                                            <div className="member-info">
                                                <strong>{_.get(member, 'name')}</strong>
                                                <span>{_.get(member, 'position')}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {_.get(this.props, 'section.new_member_enabled') && (
                                        <Link
                                            className="member new"
                                            to={safePrefix(_.get(section, 'new_member_url'))}
                                            {...(_.get(section, 'new_member_new_window') ? { target: '_blank', rel: 'noopener' } : null)}
                                        >
                                            <div className="member-avatar">
                                                <img
                                                    className="avatar"
                                                    src={safePrefix(_.get(section, 'new_member_avatar'))}
                                                    alt="Default Avatar"
                                                />
                                            </div>
                                            <div className="member-info">
                                                <strong>{_.get(section, 'new_member_name')}</strong>
                                                <span>{_.get(section, 'new_member_position')}</span>
                                            </div>
                                        </Link>
                                    )}
                                </div>
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
