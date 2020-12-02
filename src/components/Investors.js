import React from 'react';
import _ from 'lodash';

import WaveTop from './WaveTop';
import { classNames, Link, safePrefix } from '../utils';
import WaveBottom from './WaveBottom';

export default class Investors extends React.Component {
    render() {
        return (
            <section
                id={_.get(this.props, 'section.section_id')}
                className={classNames(
                    'section',
                    'section-investors',
                    `bg-${_.get(this.props, 'section.bg_color')}`,
                    _.get(this.props, 'next_bg') && _.get(this.props, 'next_bg') !== 'none' && ' next-' + _.get(this.props, 'next_bg')
                )}
            >
                <div className="outer inner">
                    <div className="section-content">
                        {_.get(this.props, 'section.title') && <h2 className="section-title">{_.get(this.props, 'section.title')}</h2>}
                        <div className="investors">
                            {_.get(this.props, 'section.vc_investors') && (
                                <div className="vc-investors">
                                    {_.map(_.get(this.props, 'section.vc_investors'), (investor, investor_idx) =>
                                        _.get(investor, 'url') ? (
                                            <Link key={investor_idx} className="vc-investor" to={safePrefix(_.get(investor, 'url'))}>
                                                <img src={safePrefix(_.get(investor, 'logo_img'))} alt={_.get(investor, 'title')} />
                                            </Link>
                                        ) : (
                                            <div key={investor_idx} className="vc-investor">
                                                <img src={safePrefix(_.get(investor, 'logo_img'))} alt={_.get(investor, 'title')} />
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                            {_.get(this.props, 'section.angel_investors') && (
                                <React.Fragment>
                                    {_.get(this.props, 'section.angels_title') && (
                                        <h3 className="angels-title">{_.get(this.props, 'section.angels_title')}</h3>
                                    )}
                                    <div className="angels">
                                        {_.map(_.get(this.props, 'section.angel_investors'), (investor, investor_idx) =>
                                            _.get(investor, 'url') ? (
                                                <Link key={investor_idx} className="angel" to={safePrefix(_.get(investor, 'url'))}>
                                                    {_.get(investor, 'avatar') && (
                                                        <div className="angel-avatar">
                                                            <img
                                                                className="avatar"
                                                                src={safePrefix(_.get(investor, 'avatar'))}
                                                                alt={_.get(investor, 'title')}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="angel-info">
                                                        {_.get(investor, 'title') && <strong>{_.get(investor, 'title')}</strong>}
                                                        {_.get(investor, 'subtitle') && <span>{_.get(investor, 'subtitle')}</span>}
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div key={investor_idx} className="angel">
                                                    {_.get(investor, 'avatar') && (
                                                        <div className="angel-avatar">
                                                            <img
                                                                className="avatar"
                                                                src={safePrefix(_.get(investor, 'avatar'))}
                                                                alt={_.get(investor, 'title')}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="angel-info">
                                                        {_.get(investor, 'title') && <strong>{_.get(investor, 'title')}</strong>}
                                                        {_.get(investor, 'subtitle') && <span>{_.get(investor, 'subtitle')}</span>}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
