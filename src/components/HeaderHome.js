import React from 'react';
import _ from 'lodash';

import { Link, safePrefix, classNames } from '../utils';
import ComponentWithScrollPosition from '../utils/ComponentWithScrollPosition';
import Button from './Button';

import './HeaderHome.scss';

class HeaderHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuExpanded: false
        };

        this.handleMenuToggle = this.handleMenuToggle.bind(this);
    }

    handleMenuToggle() {
        const { isMenuExpanded } = this.state;

        this.setState({
            isMenuExpanded: !isMenuExpanded
        });
    }

    render() {
        const menus = _.get(this.props, 'pageContext.site.data.menus.main');
        const { isMenuExpanded } = this.state;
        // const hasScrolledPastMenu = this.props.scrollTop > 70;
        const hasScrolledPastMenu = true; // Todo: temporary override because some menu items are white text on white background.
        const mainClasses = classNames('home-header', `home-header-${this.props.static ? 'static' : 'fixed'}`);
        const insideClasses = classNames(
            'home-header-inside',
            isMenuExpanded && 'home-header-inside-expanded',
            hasScrolledPastMenu && 'home-header-inside-sticky',
            `home-header-inside-${this.props.static ? 'static' : 'fixed'}`
        );
        const outsideClasses = classNames('home-header-outside', this.props.showMobileLogo && 'home-header-outside-mobile-logo');

        return (
            <header id="masthead" className={outsideClasses}>
                <div className={mainClasses}>
                    <div className={insideClasses}>
                        <div className="home-header-controls">
                            <Link className="home-header-logo-wrapper" to="/"
                                  trackLabel={"Website Button Click"} trackParameters={{location: 'header-logo', identifier: 'logo', anchorText: 'logo', url: '/'}}>
                                <img className="home-header-logo" src="/images/logo_mono.svg" />
                            </Link>

                            <button className="home-header-menu-toggle" onClick={this.handleMenuToggle} type="button">
                                <img className="home-header-menu-icon-expanded" src="/images/icons/icon-cross.svg" />
                                <img className="home-header-menu-icon-collapsed" src="/images/icons/icon-burger.svg" />
                            </button>
                        </div>

                        {menus && (
                            <nav className="home-header-navigation" aria-label="Main Navigation">
                                <ul className="home-header-menu">
                                    {_.map(menus, (item, item_idx) => (
                                        <li
                                            key={item_idx}
                                            className={classNames('home-header-menu-item', {
                                                current: _.get(this.props, 'pageContext.url') === _.get(item, 'url'),

                                                // This is ugly. Ideally, we'd add a `hide_on_mobile` property to the menu
                                                // item, but @stackbit/gatsby-plugin-menus/ doesn't allow us to add custom
                                                // properties to menu items, so here we are.
                                                'hide-on-mobile': ['try-stackbit', 'site-builder'].includes(_.get(item, 'identifier'))
                                            })}
                                        >
                                            <Link className="home-header-menu-item-link" to={_.get(item, 'url')} trackLabel={"Website Text Click"} trackParameters={{location: 'header', identifier: _.get(item, 'identifier'), anchorText: _.get(item, 'title'), url: _.get(item, 'url')}}>
                                                {_.get(item, 'title')}
                                            </Link>
                                        </li>
                                    ))}

                                    {_.get(this.props, 'pageContext.site.data.header.actions') &&
                                        _.map(_.get(this.props, 'pageContext.site.data.header.actions'), (action, action_idx) => (
                                            <li key={action_idx} className="home-header-menu-item menu-button">
                                                <Button
                                                    key={action_idx}
                                                    hollow
                                                    href={
                                                        _.get(action, 'url').startsWith('#')
                                                            ? _.get(action, 'url')
                                                            : safePrefix(_.get(action, 'url'))
                                                    }
                                                    openInNewWindow={_.get(action, 'new_window')}
                                                    theme="white"
                                                    trackLabel={"Website Button Click"} trackParameters={{location: 'header', identifier: _.get(action, 'label'), anchorText: _.get(action, 'label'), url: _.get(action, 'url')}}
                                                >
                                                    {_.get(action, 'label')}
                                                </Button>
                                            </li>
                                        ))}
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            </header>
        );
    }
}

const Static = (props) => <HeaderHome static={true} {...props} />;
const Sticky = ComponentWithScrollPosition(HeaderHome);

export { Static, Sticky };
