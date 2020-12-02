import React from 'react';
import _ from 'lodash';

import { classNames, markdownify } from '../utils';
import Button from './Button';

import './CtaBlock.scss';

export default class CtaBlock extends React.Component {
    render() {
        const theme = _.get(this.props, 'section.theme');
        const classes = classNames('cta-block', `cta-block-theme-${theme}`);

        return (
            <section className={classes}>
                <h2 className="cta-block-title">{_.get(this.props, 'section.title')}</h2>
                <div className="cta-block-body">{markdownify(_.get(this.props, 'section.body'))}</div>

                <ul className="cta-block-items">
                    {_.get(this.props, 'section.items', []).map((item) => (
                        <li className="cta-block-item" key={item.title}>
                            <h3 className="cta-block-item-title">{item.title}</h3>
                            <p className="cta-block-item-body">{item.body}</p>

                            {item.ctaText && (
                                <Button ctaArrow hollow href={item.ctaLink} theme={theme === 'accent' ? 'white' : 'accent'}>
                                    {item.ctaText}
                                </Button>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}
