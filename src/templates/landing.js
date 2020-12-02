import React from 'react';
import _ from 'lodash';

import components, { Layout } from '../components/index';
import { markdownify, Link, safePrefix, classNames } from '../utils';
import WaveHeader from '../components/WaveHeader';

export default class Landing extends React.Component {
    render() {
        let first = _.get(this.props, 'pageContext.frontmatter.sections[0]');
        let first_bg = _.get(first, 'bg_color');
        let section_list = _.get(this.props, 'pageContext.frontmatter.sections');
        let section_len = _.size(section_list);
        return (
            <Layout {...this.props}>
                <section className={'hero landing-bg-blue' + (first_bg && first_bg !== 'none' ? ' next-' + first_bg : '')}>
                    <div className="outer inner">
                        <div className="hero-inside">
                            <h1 className="hero-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                            {_.get(this.props, 'pageContext.frontmatter.subtitle') && (
                                <div className="hero-subtitle">{markdownify(_.get(this.props, 'pageContext.frontmatter.subtitle'))}</div>
                            )}
                            {_.get(this.props, 'pageContext.frontmatter.actions') && (
                                <p className="hero-actions">
                                    {_.map(_.get(this.props, 'pageContext.frontmatter.actions'), (action, action_idx) => (
                                        <Link
                                            key={action_idx}
                                            to={
                                                _.get(action, 'url').startsWith('#')
                                                    ? _.get(action, 'url')
                                                    : safePrefix(_.get(action, 'url'))
                                            }
                                            className={classNames(
                                                'button',
                                                { 'has-arrow': _.get(action, 'has_arrow') },
                                                _.get(action, 'class_name')
                                            )}
                                            {...(_.get(action, 'new_window') ? { target: '_blank', rel: 'noopener' } : null)}
                                        >
                                            {_.get(action, 'label')}
                                        </Link>
                                    ))}
                                </p>
                            )}
                        </div>
                    </div>
                    <WaveHeader {...this.props} />
                </section>
                {_.map(_.get(this.props, 'pageContext.frontmatter.sections'), (section, section_idx) => {
                    let i = section_idx + 1;
                    let is_last = section_idx === section_len - 1;
                    let next = _.get(this.props, ['pageContext', 'frontmatter', 'sections', i]);
                    let next_bg = next ? _.get(next, 'bg_color') : 'none';
                    let GetSectionComponent = components[_.get(section, 'component')];
                    return (
                        <React.Fragment key={section_idx}>
                            <GetSectionComponent
                                key={section_idx}
                                {...this.props}
                                section={section}
                                site={this.props.pageContext.site}
                                last={is_last}
                                next_bg={next_bg}
                            />
                        </React.Fragment>
                    );
                })}
            </Layout>
        );
    }
}
