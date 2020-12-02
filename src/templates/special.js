import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { safePrefix, markdownify } from '../utils';
import Button from '../components/Button';

export default class Special extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
                <div className="outer inner">
                    {_.get(this.props, 'pageContext.frontmatter.content_img_path') && (
                        <div className="page-img">
                            <img
                                src={safePrefix(_.get(this.props, 'pageContext.frontmatter.content_img_path'))}
                                alt={_.get(this.props, 'pageContext.frontmatter.title')}
                            />
                        </div>
                    )}
                    <h1 className="page-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                    <div className="page-description">{markdownify(_.get(this.props, 'pageContext.frontmatter.subtitle'))}</div>
                    {_.get(this.props, 'pageContext.frontmatter.actions') && (
                        <p className="page-actions">
                            {_.map(_.get(this.props, 'pageContext.frontmatter.actions'), (action, action_idx) => (
                                <Button
                                    className={_.get(action, 'class_name')}
                                    key={action_idx}
                                    href={
                                        _.get(action, 'url').startsWith('#') ? _.get(action, 'url') : safePrefix(_.get(action, 'url'))
                                    }
                                    hollow={_.get(action, 'is_hollow')}
                                    ctaArrow={_.get(action, 'has_arrow')}
                                    openInNewWindow={_.get(action, 'new_window')}
                                    theme="white"
                                >
                                    {_.get(action, 'label')}
                                </Button>
                            ))}
                        </p>
                    )}
                </div>
            </Layout>
        );
    }
}
