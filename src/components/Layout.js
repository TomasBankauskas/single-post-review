import React from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import ScriptTag from 'react-script-tag';

import { safePrefix } from '../utils';
import { Static as Header } from './HeaderHome';
import Cta from './Cta';
import Footer from './FooterHome';

import '../sass/main.scss';

export default class Layout extends React.Component {
    render() {
        let title =
            _.get(this.props, 'pageContext.frontmatter.meta_title') ||
            _.get(this.props, 'pageContext.frontmatter.title') ||
            _.get(this.props, 'pageContext.site.siteMetadata.title');
        let description =
            _.get(this.props, 'pageContext.frontmatter.meta_description') ||
            _.get(this.props, 'pageContext.frontmatter.excerpt') ||
            _.get(this.props, 'pageContext.site.siteMetadata.meta_desc');
        let image_url =
            _.get(this.props, 'pageContext.frontmatter.content_img_path') || _.get(this.props, 'pageContext.site.siteMetadata.meta_img');
        let is_abs_image_url = image_url.startsWith('http');
        let image_rel_url = safePrefix(image_url);
        let image_abs_url = _.get(this.props, 'pageContext.site.siteMetadata.siteUrl') + image_rel_url;
        let image_meta_url = is_abs_image_url ? image_url : image_abs_url;
        let show_cta =
            _.get(this.props, 'pageContext.frontmatter.template') === 'blog' ||
            _.get(this.props, 'pageContext.frontmatter.template') === 'post' ||
            _.get(this.props, 'pageContext.frontmatter.template') === 'page' ||
            _.get(this.props, 'pageContext.frontmatter.show_footer_cta');
        let section = {
            section_id: 'footer-cta',
            title: _.get(this.props, 'pageContext.site.data.footer.cta_title'),
            actions: _.get(this.props, 'pageContext.site.data.footer.cta_actions'),
            bg_color: 'none'
        };
        return (
            <React.Fragment>
                <Helmet>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="apple-mobile-web-app-title" content={_.get(this.props, 'pageContext.site.siteMetadata.title')} />
                    <meta name="application-name" content={_.get(this.props, 'pageContext.site.siteMetadata.title')} />
                    <meta name="msapplication-config" content={safePrefix('images/favicon/browserconfig.xml')} />
                    <meta name="theme-color" content="#ffffff" />
                    <meta name="description" content={description} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@stackbithq" />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={description} />
                    <meta name="twitter:creator" content="@stackbithq" />
                    <meta name="twitter:image" content={image_meta_url} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content={image_meta_url} />
                    <meta property="og:image:secure_url" content={image_meta_url} />
                    <meta property="og:site_name" content={_.get(this.props, 'pageContext.site.siteMetadata.title')} />
                    <link rel="apple-touch-icon" sizes="120x120" href={safePrefix('images/favicon/apple-touch-icon.png')} />
                    <link rel="icon" type="image/png" sizes="32x32" href={safePrefix('images/favicon/favicon-32x32.png')} />
                    <link rel="icon" type="image/png" sizes="16x16" href={safePrefix('images/favicon/favicon-16x16.png')} />
                    <link rel="mask-icon" href={safePrefix('images/favicon/safari-pinned-tab.svg')} color="#3eb2fd" />
                    <link rel="shortcut icon" href={safePrefix('images/favicon/favicon.ico')} />
                    <body className={'template-' + _.get(this.props, 'pageContext.frontmatter.template')} />
                </Helmet>
                <div id="page" className="site">
                    {_.get(this.props, 'pageContext.frontmatter.template') !== 'special' && <Header showMobileLogo {...this.props} />}
                    <main id="content" className="site-content">
                        {this.props.children}
                        {show_cta && (
                            <Cta {...this.props} section={section} site={this.props.pageContext.site} last={true} next_bg={'none'} />
                        )}
                    </main>
                    {_.get(this.props, 'pageContext.frontmatter.template') !== 'special' && (
                        <Footer {...this.props} section={section} site={this.props.pageContext.site} last={true} next_bg={'none'} />
                    )}
                    {_.map(_.get(this.props, 'pageContext.frontmatter.scripts'), (script, script_idx) => (
                        <ScriptTag key={script_idx} type="text/javascript" src={safePrefix(script)} />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}
