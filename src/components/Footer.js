import React from 'react';
import _ from 'lodash';

import WaveTop from './WaveTop';
import { safePrefix, Link, htmlToReact } from '../utils';
import FooterLinks from './FooterLinks';

export default class Footer extends React.Component {
    render() {
        return (
            <footer id="colophon" className="site-footer bg-blue">
                <WaveTop {...this.props} />
                <div className="outer inner">
                    <div className="footer-cols">
                        {_.get(this.props, 'pageContext.site.data.footer.logo_img') && (
                            <p className="footer-logo">
                                <img src={safePrefix(_.get(this.props, 'pageContext.site.data.footer.logo_img'))} alt="Stackbit Logo" />
                            </p>
                        )}
                        {_.get(this.props, 'pageContext.site.data.footer.link_groups') && (
                            <nav className="footer-nav">
                                {_.map(_.get(this.props, 'pageContext.site.data.footer.link_groups'), (link_group, link_group_idx) => (
                                    <div key={link_group_idx} className="nav-col">
                                        {_.get(link_group, 'title') && <h2 className="nav-title">{_.get(link_group, 'title')}</h2>}
                                        {_.get(link_group, 'links') && (
                                            <FooterLinks {...this.props} links={_.get(link_group, 'links')} page={this.props.pageContext} />
                                        )}
                                    </div>
                                ))}
                            </nav>
                        )}
                        {_.get(this.props, 'pageContext.site.data.footer.social_links') && (
                            <p className="social-links">
                                {_.map(_.get(this.props, 'pageContext.site.data.footer.social_links'), (link, link_idx) => (
                                    <Link key={link_idx} to={_.get(link, 'url')} target="_blank" rel="noopener">
                                        <span className="screen-reader-text">{_.get(link, 'title')}</span>
                                        <span className={'fab ' + _.get(link, 'icon')} aria-hidden="true" />
                                        <span className="link-bg" aria-hidden="true" />
                                    </Link>
                                ))}
                            </p>
                        )}
                    </div>
                    <div className="site-info">{htmlToReact(_.get(this.props, 'pageContext.site.data.footer.copyright'))}</div>
                </div>
            </footer>
        );
    }
}
