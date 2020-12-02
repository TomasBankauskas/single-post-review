import React from 'react';
import _ from 'lodash';

import { Link, safePrefix, classNames } from '../utils';

export default class Header extends React.Component {
    render() {
        return (
            <header id="masthead" className="site-header outer">
                <div className="inner">
                    <div className="site-header-inside">
                        <div className="site-branding">
                            {_.get(this.props, 'pageContext.site.data.header.logo_img') && (
                                <p className="site-logo">
                                    <Link to={safePrefix(_.get(this.props, 'pageContext.site.data.header.url') || '/')}>
                                        <img src={safePrefix(_.get(this.props, 'pageContext.site.data.header.logo_img'))} alt="Logo" />
                                    </Link>
                                </p>
                            )}
                            <p className="site-title">
                                <Link to={safePrefix(_.get(this.props, 'pageContext.site.data.header.url') || '/')}>
                                    {_.get(this.props, 'pageContext.site.data.header.title')}
                                </Link>
                            </p>
                        </div>
                        {!_.get(this.props, 'pageContext.frontmatter.hide_nav_bar') &&
                            (_.get(this.props, 'pageContext.site.data.menus.main') ||
                                _.get(this.props, 'pageContext.site.data.header.actions')) && (
                                <React.Fragment>
                                    <nav className="site-navigation" aria-label="Main Navigation">
                                        <div className="site-nav-inside">
                                            <button id="menu-close" className="menu-toggle">
                                                <span className="screen-reader-text">Open Menu</span>
                                                <span className="icon-close" aria-hidden="true" />
                                            </button>
                                            <ul className="menu">
                                                {_.get(this.props, 'pageContext.site.data.menus.main') &&
                                                    _.map(_.get(this.props, 'pageContext.site.data.menus.main'), (item, item_idx) => (
                                                        <li
                                                            key={item_idx}
                                                            className={classNames('menu-item', {
                                                                current: _.get(this.props, 'pageContext.url') === _.get(item, 'url')
                                                            })}
                                                        >
                                                            <Link
                                                                to={
                                                                    _.get(item, 'url').startsWith('#')
                                                                        ? _.get(item, 'url')
                                                                        : safePrefix(_.get(item, 'url'))
                                                                }
                                                            >
                                                                {_.get(item, 'title')}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                {_.get(this.props, 'pageContext.site.data.header.actions') &&
                                                    _.map(
                                                        _.get(this.props, 'pageContext.site.data.header.actions'),
                                                        (action, action_idx) => (
                                                            <li key={action_idx} className="menu-item menu-button">
                                                                <Link
                                                                    to={
                                                                        _.get(action, 'url').startsWith('#')
                                                                            ? _.get(action, 'url')
                                                                            : safePrefix(_.get(action, 'url'))
                                                                    }
                                                                    className={classNames(
                                                                        'button',
                                                                        'secondary',
                                                                        { 'has-arrow': _.get(action, 'has_arrow') },
                                                                        _.get(action, 'class_name')
                                                                    )}
                                                                    {...(_.get(action, 'new_window')
                                                                        ? { target: '_blank', rel: 'noopener' }
                                                                        : null)}
                                                                >
                                                                    {_.get(action, 'label')}
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                            </ul>
                                        </div>
                                    </nav>
                                    <button id="menu-open" className="button menu-toggle">
                                        Menu
                                    </button>
                                </React.Fragment>
                            )}
                    </div>
                </div>
            </header>
        );
    }
}
