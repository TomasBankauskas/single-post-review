import React from 'react';
import _ from 'lodash';

import { classNames, markdownify } from '../utils';
import './SectionHero.scss';

export default class SectionHero extends React.Component {
    render() {
        const { isFirst, isLast, orientation = 'left', title, subtitle } = this.props;
        const mainClasses = classNames(
            'section-hero',
            !isFirst && `section-hero-effect-${orientation === 'left' ? 'top' : 'bottom'}`,
            !isLast && `section-hero-effect-${orientation === 'left' ? 'bottom' : 'top'}`,
            `section-hero-orientation-${orientation}`
        );

        return (
            <div className="section-hero">
                <h1 className="section-hero-title">{title}</h1>
                <div className="section-hero-subtitle">{markdownify(subtitle)}</div>
            </div>
        );
    }
}
