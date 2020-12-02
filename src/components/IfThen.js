import React from 'react';
import _ from 'lodash';

import { classNames, markdownify } from '../utils';

import './IfThen.scss';

export default class IfThen extends React.Component {
    render() {
        const theme = _.get(this.props, 'section.theme');
        const classes = classNames('ifthen', `ifthen-theme-${theme}`);

        return (
            <section className={classes}>
                <h2 className="ifthen-title">{_.get(this.props, 'section.title')}</h2>
                <div className="ifthen-body">{markdownify(_.get(this.props, 'section.body'))}</div>

                <ul className="ifthen-items">
                    {_.get(this.props, 'section.items', []).map((item) => (
                        <li className="ifthen-item" key={item.title}>
                            <div className="ifthen-item-problem-solution">
                                <div className="ifthen-item-problem">
                                    <span className="ifthen-item-subtitle">{item.subtitle}</span>
                                    <h3 className="ifthen-item-title">{item.title}</h3>
                                </div>
                                <div className="ifthen-item-solution">
                                    <div className="ifthen-item-body">{markdownify(item.body)}</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}
