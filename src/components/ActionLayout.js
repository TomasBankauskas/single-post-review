import React from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import ScriptTag from 'react-script-tag';

import { safePrefix } from '../utils';

export default class Body extends React.Component {
    render() {
        let title_temp = _.get(this.props, 'pageContext.frontmatter.title')
            ? _.get(this.props, 'pageContext.frontmatter.title') + ' | '
            : '';
        let title = title_temp + _.get(this.props, 'pageContext.site.siteMetadata.title');
        let description =
            _.get(this.props, 'pageContext.frontmatter.excerpt') || _.get(this.props, 'pageContext.site.siteMetadata.meta_desc');
        let image_url =
            _.get(this.props, 'pageContext.frontmatter.content_img_path') || _.get(this.props, 'pageContext.site.siteMetadata.meta_img');
        let is_abs_image_url = image_url.startsWith('http');
        let image_rel_url = safePrefix(image_url);
        let image_abs_url = _.get(this.props, 'pageContext.site.siteMetadata.siteUrl') + image_rel_url;
        let image_meta_url = is_abs_image_url ? image_url : image_abs_url;
        return (
            <React.Fragment>
                <Helmet>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
                <div id="modal-portal"></div>
                <div className="site">
                    <div className="page action-page background-navy">{this.props.children}</div>
                </div>
                {_.map(_.get(this.props, 'pageContext.frontmatter.scripts'), (script, script_idx) => (
                    <ScriptTag key={script_idx} src={safePrefix(script)} />
                ))}
            </React.Fragment>
        );
    }
}
