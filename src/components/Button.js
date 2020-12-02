import React from 'react';
import _ from 'lodash';

import { Link, safePrefix, classNames } from '../utils';
import CtaArrow from './CtaArrow';

import './Button.scss';

export default class Button extends React.Component {
    render() {
        const {
            children,
            className,
            ctaArrow,
            disabled,
            hollow,
            href,
            onClick,
            openInNewWindow,
            size,
            theme = 'accent',
            trackLabel,
            trackParameters,
            type = 'button'
        } = this.props;
        const classes = classNames([
            className,
            'button-component',
            `button-component-theme-${theme}`,
            ctaArrow && 'button-component-with-arrow',
            hollow && 'button-component-hollow',
            size && `button-component-size-${size}`,
            disabled && `button-component-disabled`
        ]);

        if (href) {
            return (
                <Link
                    to={href}
                    className={classes}
                    trackLabel={trackLabel}
                    trackParameters={trackParameters}
                    {...(openInNewWindow ? { target: '_blank', rel: 'noopener' } : null)}
                >
                    <span>{children}</span>

                    {ctaArrow && <CtaArrow className="button-component-cta-arrow" />}
                </Link>
            );
        }

        return (
            <button className={classes} disabled={disabled} onClick={onClick} type={type}>
                <span>{children}</span>

                {ctaArrow && <CtaArrow className="button-component-cta-arrow" />}
            </button>
        );
    }
}
