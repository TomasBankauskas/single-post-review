import React from 'react';
import _ from 'lodash';

import { classNames, Link, safePrefix, htmlToReact } from '../utils';
import Icon from './Icon';
import './FooterHome.scss';

export default class FooterHome extends React.Component {
    render() {
        const footer = _.get(this.props, 'pageContext.site.data.menus.footer');
        const footerLegal = _.get(this.props, 'pageContext.site.data.menus.footer_legal');
        return (
            <React.Fragment>
                <footer id="colophon" className="home-footer outer">
                    <img
                        className="home-footer-logo"
                        src={safePrefix(_.get(this.props, 'pageContext.site.data.footer.logo_img'))}
                        alt="Logo"
                    />

                    <div className="home-footer-content">
                        {footer && !this.props.hideNav && (
                            <nav className="footer-nav">
                                <ul className="menu">
                                    {_.map(footer, (item, item_idx) => (
                                        <li key={item_idx} className={classNames('menu-item')}>
                                            <Link
                                                to={
                                                    _.get(item, 'url').startsWith('#') ? _.get(item, 'url') : safePrefix(_.get(item, 'url'))
                                                }
                                                trackLabel={"Website Text Click"} trackParameters={{ location: 'footer', identifier: _.get(item, 'identifier'), anchorText: _.get(item, 'title'), url: _.get(item, 'url') }}
                                            >
                                                {_.get(item, 'title')}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                        <div className="site-info">
                            <p className="copyright">{htmlToReact(_.get(this.props, 'pageContext.site.data.footer.copyright'))}</p>
                            {footerLegal && (
                                <p className="footer-links">
                                    {_.map(footerLegal, (item, item_idx) => (
                                        <Link
                                            key={item_idx}
                                            to={_.get(item, 'url').startsWith('#') ? _.get(item, 'url') : safePrefix(_.get(item, 'url'))}
                                            trackLabel={"Website Text Click"} trackParameters={{ location: 'footer-legal', identifier: _.get(item, 'identifier'), anchorText: _.get(item, 'title'), url: _.get(item, 'url') }}
                                        >
                                            {_.get(item, 'title')}
                                        </Link>
                                    ))}
                                </p>
                            )}
                            {_.get(this.props, 'pageContext.site.data.footer.social_links') && (
                                <div>
                                    {_.map(_.get(this.props, 'pageContext.site.data.footer.social_links'), (link, link_idx) => (
                                        <Link
                                            className="home-footer-social-link"
                                            key={link_idx}
                                            to={_.get(link, 'url')}
                                            target="_blank"
                                            rel="noopener"
                                            trackLabel={"Website Button Click"} trackParameters={{ location: 'footer-social', identifier: _.get(link, 'title'), anchorText: _.get(link, 'title'), url: _.get(link, 'url') }}
                                        >
                                            <span className="screen-reader-text">{_.get(link, 'title')}</span>
                                            <Icon symbol={_.get(link, 'icon')} />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}
