import React from 'react';
import _ from 'lodash';

import { classNames, markdownify, safePrefix } from '../utils';
import Button from './Button';

import './FeatureHighlightCombo.scss';

export default class FeatureHighlightCombo extends React.Component {
    render() {
        const section_id = _.get(this.props, 'section.section_id');
        const theme = _.get(this.props, 'section.theme');
        const classes = classNames('feature-highlight-combo', `feature-highlight-combo-theme-${theme}`);

        return (
            <section className={classes}>
                <h2 className="feature-highlight-combo-title">{_.get(this.props, 'section.title')}</h2>
                <div className="feature-highlight-combo-body">{markdownify(_.get(this.props, 'section.body'))}</div>

                <ul className="feature-highlight-combo-items">
                    {_.get(this.props, 'section.items', []).map((item) => (
                        <li className="feature-highlight-combo-item" key={item.description}>
                            <img alt={item.description} className="feature-highlight-combo-item-image" src={safePrefix(item.img_url)} />
                            <p className="feature-highlight-combo-item-description">{item.description}</p>
                        </li>
                    ))}
                </ul>

                <Button
                    className="feature-highlight-combo-cta"
                    href={_.get(this.props, 'section.ctaLink')}
                    theme={theme === 'accent' ? 'white' : 'accent'}
                    trackLabel={`Website Button Click`}
                    trackParameters={{ location: `${section_id}`,  anchorText: _.get(this.props, 'section.ctaText')}}
                >
                    {_.get(this.props, 'section.ctaText')}
                </Button>
            </section>
        );
    }
}
