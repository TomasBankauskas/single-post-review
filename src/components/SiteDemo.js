import React from 'react';
import _ from 'lodash';

import { track } from '../services/analytics-service';
import { classNames, safePrefix } from '../utils';

import './SiteDemo.scss';

export default class SiteDemo extends React.Component {
    handleSiteClick(id, site, event) {
        event.preventDefault();

        const url = event.currentTarget.getAttribute('href');

        track('Website Image Click', { location: id, anchorText: `${site} Demo` }).then(() => {
            window.location = url;
        });

        return false;
    }

    render() {
        const section = _.get(this.props, 'section', null);
        const section_id = _.get(section, 'section_id');
        const body = _.get(section, 'body');
        const title = _.get(section, 'title');
        const theme = _.get(section, 'theme');
        const classes = classNames('site-demo', `site-demo-theme-${theme}`);

        return (
            <section className={classes}>
                {title && <h2 className="feature-highlight-title">{title}</h2>}
                {body && <p className="feature-highlight-subtitle">{body}</p>}

                <div className="site-demo-items">
                    {_.map(_.get(section, 'items', null), (item, item_idx) => (
                        <div className="site-demo-item" key={item_idx}>
                            <a className="site-demo-item-wrapper"
                                href={item.url}
                                onClick={this.handleSiteClick.bind(this, section_id, item.title)}
                            >
                                <img alt={(item.title) + " preview"} className="site-demo-item-image" src={safePrefix(item.img_url)} />
                            </a>
                            { item.title && <p className="site-demo-item-title">{item.title}</p>}
                        </div>
                    ))}
                </div>
            </section >
        );
    }
}
