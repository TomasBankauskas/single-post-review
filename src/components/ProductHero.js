import React from 'react';
import _ from 'lodash';

import { classNames, Link } from '../utils';

import './ProductHero.scss';

export default class ProductHero extends React.Component {
    render() {
        const description = _.get(this.props, 'section.description');
        const logo = _.get(this.props, 'section.logo');
        const productIcons = _.get(this.props, 'site.data.compatible-services.productIcons', []);
        const strapline = _.get(this.props, 'section.strapline');
        const videoFallback = _.get(this.props, 'section.video_fallback');
        const videoUrl = _.get(this.props, 'section.video_url');
        const productHeroClasses = classNames('product-hero', { 'product-hero-with-logo': Boolean(logo) });

        return (
            <section className={productHeroClasses}>
                <div className="product-hero-content">
                    {logo && (
                        <Link className="product-hero-logo" to="/">
                            <img className="product-hero-logo-image" src={logo} alt="Logo" />
                        </Link>
                    )}

                    <p className="screen-reader-text">Stackbit</p>
                    <h1 className="product-hero-title">{strapline}</h1>
                    <p className="product-hero-tagline">{description}</p>
                    <span className="product-hero-services-title">Works with:</span>

                    <div className="product-hero-services">
                        {productIcons.map((imagePath) => (
                            <img className="product-hero-service" key={imagePath} src={imagePath} alt="" />
                        ))}

                        <span className="product-hero-services-etc">and many more</span>
                    </div>
                </div>
                <div className="product-hero-media-wrapper">
                    <img className="product-hero-media" src={videoFallback} />
                    <video
                        className="product-hero-media product-hero-media-secondary"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={videoFallback}
                        width={640}
                        height={486}
                    >
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                </div>
            </section>
        );
    }
}
