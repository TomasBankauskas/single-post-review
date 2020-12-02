import React from 'react';
import _ from 'lodash';

import components, { Layout } from '../components/index';
import { htmlToReact, markdownify, safePrefix } from '../utils';
import FileImport from '../components/FileImport';
import StackableSection from '../components/StackableSection';

export default class Medium extends React.Component {
    constructor(props) {
        super(props);

        this.launchIntercom = this.launchIntercom.bind(this);
    }

    launchIntercom() {
        if (window.Intercom === undefined) {
            return;
        }

        window.Intercom('showNewMessage');
    }

    render() {
        let first = _.get(this.props, 'pageContext.frontmatter.sections[0]');
        let first_bg = _.get(first, 'bg_color');
        let section_list = _.get(this.props, 'pageContext.frontmatter.sections');
        let section_len = _.size(section_list);

        return (
            <Layout {...this.props}>
                <StackableSection isFirst orientation="right" theme="accent">
                    <section className={'hero bg-blue' + (first_bg && first_bg !== 'none' ? ' next-' + first_bg : '')}>
                        <div className="outer inner">
                            <div className="hero-inside">
                                <div className="hero-content hero-left">
                                    {_.get(this.props, 'pageContext.frontmatter.subtitle') && (
                                        <h1 className="hero-title">{htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle'))}</h1>
                                    )}
                                    {_.get(this.props, 'pageContext.frontmatter.description') && (
                                        <div className="hero-subtitle">
                                            {markdownify(_.get(this.props, 'pageContext.frontmatter.description'))}
                                        </div>
                                    )}
                                    {_.get(this.props, 'pageContext.frontmatter.features') && (
                                        <div className="hero-text">
                                            {markdownify(_.get(this.props, 'pageContext.frontmatter.features'))}
                                        </div>
                                    )}
                                    {_.get(this.props, 'pageContext.frontmatter.contact.cta_text') && (
                                        <div className="hero-footer">
                                            {_.get(this.props, 'pageContext.frontmatter.contact.avatar') && (
                                                <div className="hero-footer-img">
                                                    <img
                                                        className="avatar"
                                                        src={safePrefix(_.get(this.props, 'pageContext.frontmatter.contact.avatar'))}
                                                        alt=""
                                                    />
                                                    <div className="status active" />
                                                </div>
                                            )}
                                            <div className="hero-footer-text">
                                                {markdownify(_.get(this.props, 'pageContext.frontmatter.contact.content'))}

                                                <p>
                                                    <a href="#" onClick={this.launchIntercom}>
                                                        {_.get(this.props, 'pageContext.frontmatter.contact.cta_text')}
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {_.get(this.props, 'pageContext.frontmatter.header_import_section') && (
                                    <div className="hero-import hero-right">
                                        <FileImport
                                            {...this.props}
                                            import_section={_.get(this.props, 'pageContext.frontmatter.header_import_section')}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </StackableSection>

                {_.map(_.get(this.props, 'pageContext.frontmatter.sections'), (section, section_idx) => {
                    let i = section_idx + 1;
                    let is_last = section_idx === section_len - 1;
                    let next = _.get(this.props, ['pageContext', 'frontmatter', 'sections', i]);
                    let next_bg = next ? _.get(next, 'bg_color') : 'none';
                    let GetSectionComponent = components[_.get(section, 'component')];
                    let theme;

                    if (section.bg_color === 'blue') {
                        theme = 'accent';
                    } else if (section.bg_color === 'light') {
                        theme = 'light';
                    }

                    return (
                        <StackableSection orientation={i % 2 === 0 ? 'right' : 'left'} theme={theme}>
                            <GetSectionComponent
                                key={section_idx}
                                {...this.props}
                                section={section}
                                site={this.props.pageContext.site}
                                last={is_last}
                                next_bg={next_bg}
                            />
                        </StackableSection>
                    );
                })}
                {_.get(this.props, 'pageContext.frontmatter.footer_import_section') && (
                    <StackableSection isLast>
                        <section className="section section-import bg-none">
                            <div className="outer inner">
                                <div className="section-inside">
                                    <div className="section-content">
                                        <FileImport
                                            {...this.props}
                                            import_section={_.get(this.props, 'pageContext.frontmatter.footer_import_section')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </StackableSection>
                )}
            </Layout>
        );
    }
}
