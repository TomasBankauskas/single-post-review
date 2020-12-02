import React from 'react';
import _ from 'lodash';

import { classNames } from '../utils';
import FeatureHighlightItem from './FeatureHighlightItem';

import './FeatureHighlight.scss';

export default class FeaturesHighlight extends React.Component {
    render() {
        const section = _.get(this.props, 'section', null);
        const body = _.get(section, 'body');
        const title = _.get(section, 'title', '');
        const theme = _.get(section, 'theme');
        const classes = classNames('feature-highlight', `feature-highlight-theme-${theme}`);

        return (
            <section className={classes}>
                {title && <h2 className="feature-highlight-title">{title}</h2>}
                {body && <p className="feature-highlight-subtitle">{body}</p>}

                {_.get(section, 'items', null) && (
                    <div className="feature-highlight-items">
                        {_.map(_.get(section, 'items', null), (item, item_idx) => (
                            <FeatureHighlightItem key={item_idx} {...this.props} section={section} item={item} />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}
