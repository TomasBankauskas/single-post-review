import React from 'react';
import _ from 'lodash';

import { safePrefix, classNames } from '../utils';
import Button from './Button';

import './ThemeHero.scss';

export default class ThemeHero extends React.Component {
    render() {
        const description = _.get(this.props, 'section.description');
        const image = _.get(this.props, 'section.img_url');
        const imageAlt = _.get(this.props, 'section.img_alt');
        const ssgIcons = _.get(this.props, 'site.data.compatible-ssg.productIcons', []);
        const cmsIcons = _.get(this.props, 'site.data.compatible-cms.productIcons', []);
        const title = _.get(this.props, 'section.title');
        const themeHeroClasses = classNames('product-hero');

        return (
            <section className={themeHeroClasses}>
                {image && (
                    <div className="theme-hero-media-wrapper">
                        <img className="theme-hero-media" src={image} alt={imageAlt} />
                    </div>
                )}
                <div className="theme-hero-content">
                    <h1 className="theme-hero-title">{title}</h1>
                    {description && <p className="theme-hero-tagline">{description}</p>}
                    <span className="theme-hero-services-title">Works with:</span>
                    <div className="theme-hero-services">
                        {ssgIcons.map((imagePath) => (
                            <img className="theme-hero-service" key={imagePath} src={imagePath} alt="" />
                        ))}
                    </div>
                    <div className="theme-hero-services">
                        {cmsIcons.map((imagePath) => (
                            <img className="theme-hero-service" key={imagePath} src={imagePath} alt="" />
                        ))}
                    </div>
                    {_.get(this.props, 'section.actions') && (
                        <div className="theme-hero-actions">
                            {_.map(_.get(this.props, 'section.actions'), (action, action_idx) => (
                                <Button
                                    className={_.get(action, 'class_name')}
                                    key={action_idx}
                                    href={
                                        _.get(action, 'url').startsWith('#') ? _.get(action, 'url') : safePrefix(_.get(action, 'url'))
                                    }
                                    hollow={_.get(action, 'is_hollow')}
                                    ctaArrow={_.get(action, 'has_arrow')}
                                    openInNewWindow={_.get(action, 'new_window')}
                                    theme="accent"
                                    trackLabel={`Website Button Click`}
                                    trackParameters={{ location: _.get(this.props, 'section.section_id'), anchorText: _.get(action, 'label') }}
                                >
                                    {_.get(action, 'label')}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    }
}
