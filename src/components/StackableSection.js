import React from 'react';
import _ from 'lodash';

import { classNames } from '../utils';
import './StackableSection.scss';

export default class StackableSection extends React.Component {
    render() {
        const { children, isFirst, isLast, orientation = 'left', theme } = this.props;
        const mainClasses = classNames(
            'stackable-section',
            !isFirst && `stackable-section-effect-top`,
            !isLast && `stackable-section-effect-bottom`,
            `stackable-section-orientation-${orientation}`,
            theme && `stackable-section-theme-${theme}`
        );

        return (
            <section className={mainClasses}>
                <div className="stackable-section-inner">
                    <div className="stackable-section-content inner">{children}</div>
                </div>
            </section>
        );
    }
}
