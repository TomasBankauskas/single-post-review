import React from 'react';
import _ from 'lodash';

import { classNames, markdownify, safePrefix } from '../utils';
import Button from './Button';

import './FeatureHighlightItem.scss';

export default class FeatureHighlightItem extends React.Component {
    render() {
        const section = _.get(this.props, 'section', null);
        const item = _.get(this.props, 'item', null);
        const title = _.get(item, 'title', '');
        const body = _.get(item, 'body');
        const imageUrl = _.get(item, 'img_url');
        const imageAlt = _.get(item, 'img_alt');
        const imagePosition = _.get(item, 'img_position', 'right');
        const hasImage = Boolean(imageUrl);
        const classes = classNames(
            'feature-highlight-item',
            `feature-highlight-item-image-${imagePosition}`,
            hasImage && 'feature-highlight-item-with-image'
        );
        const titleLines = title.split('|').reduce((lines, line, index) => {
            if (index !== 0) {
                lines.push(<br key={index} />);
            }

            lines.push(<span key={line}>{line}</span>);

            return lines;
        }, []);

        return (
            <div className={classes}>
                {hasImage && (
                    <div className="feature-highlight-item-image-wrapper">
                        <img className="feature-highlight-item-image" src={imageUrl} alt={imageAlt} />
                    </div>
                )}

                <div className="feature-highlight-item-content">
                    {_.get(section, 'title', null) ? (
                        <h3 className="feature-highlight-item-title">{titleLines}</h3>
                    ) : (
                            <h2 className="feature-highlight-item-title">{titleLines}</h2>
                        )}
                    <div className="feature-highlight-item-body">
                        {markdownify(body)}
                    </div>
                    {_.get(item, 'actions', null) && (
                        <div className="feature-highlight-item-actions">
                            {_.map(_.get(item, 'actions'), (action, action_idx) => (
                                <Button
                                    className={_.get(action, 'class_name')}
                                    key={action_idx}
                                    href={
                                        _.get(action, 'url').startsWith('#') ? _.get(action, 'url') : safePrefix(_.get(action, 'url'))
                                    }
                                    hollow={_.get(action, 'is_hollow')}
                                    ctaArrow={_.get(action, 'has_arrow')}
                                    openInNewWindow={_.get(action, 'new_window')}
                                    theme={_.get(section, 'theme') === 'accent' ? 'white' : 'accent'}
                                    trackLabel={`Website Button Click`}
                                    trackParameters={{ location: _.get(item, 'item_id'), anchorText: _.get(action, 'label') }}
                                >
                                    {_.get(action, 'label')}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
