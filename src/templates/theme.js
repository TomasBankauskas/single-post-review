import React from 'react';
import _ from 'lodash';

import components, { Layout } from '../components/index';
import SectionHero from '../components/SectionHero';
import StackableSection from '../components/StackableSection';

export default class Theme extends React.Component {
    render() {
        const section_list = _.get(this.props, 'pageContext.frontmatter.sections');
        const section_len = _.size(section_list);
        const showHeader = _.get(this.props, 'pageContext.frontmatter.show_header', true);


        return (
            <Layout {...this.props}>

                {showHeader && (
                    <StackableSection isFirst orientation="right" theme="accent">
                        <SectionHero
                            title={_.get(this.props, 'pageContext.frontmatter.title')}
                            subtitle={_.get(this.props, 'pageContext.frontmatter.subtitle')}
                        />
                    </StackableSection>
                )}

                {_.map(_.get(this.props, 'pageContext.frontmatter.sections'), (section, section_idx) => {
                    const i = section_idx + 1;
                    const is_last = section_idx === section_len - 1;
                    const next = _.get(this.props, ['pageContext', 'frontmatter', 'sections', i]);
                    const next_bg = next ? _.get(next, 'bg_color') : 'none';
                    const GetSectionComponent = components[_.get(section, 'component')];

                    let theme;

                    if (section.bg_color === 'blue') {
                        theme = 'accent';
                    } else if (section.bg_color === 'light') {
                        theme = 'light';
                    }

                    return (
                        <StackableSection orientation={i % 2 === 0 ? 'right' : 'left'} theme={theme}>
                            <GetSectionComponent
                                {...this.props}
                                section={{ ...section, theme }}
                                site={this.props.pageContext.site}
                                last={is_last}
                                next_bg={next_bg}
                            />
                        </StackableSection>
                    );
                })}
            </Layout>
        );
    }
}
