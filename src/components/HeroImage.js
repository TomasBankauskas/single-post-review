import React from 'react';
import _ from 'lodash';

import { safePrefix } from '../utils';
import './HeroImage.scss';

export default class HeroImage extends React.Component {
    render() {
        const alt = _.get(this.props, 'section.alt');
        const imageUrl = _.get(this.props, 'section.url');
        const maxWidth = _.get(this.props, 'section.max_width');

        return (
            <div className="hero-image-container" style={{ maxWidth: maxWidth || null }}>
                <img alt={alt} className="hero-image" src={safePrefix(imageUrl)} />;
            </div>
        );
    }
}
