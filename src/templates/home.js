import React from 'react';
import _ from 'lodash';

import components, { HomeLayout } from '../components/index';
import { track } from '../services/analytics-service';

export default class Home extends React.Component {
    componentDidMount() {
        track('New Homepage - Page Visited', { nonInteraction: 1 });
    }

    render() {
        const sections = _.get(this.props, 'pageContext.frontmatter.sections', []);

        return (
            <HomeLayout {...this.props}>
                <div className="inner">
                    {sections.map((section, index) => {
                        const SectionComponent = components[_.get(section, 'component')];

                        if (!SectionComponent) {
                            return null;
                        }

                        return <SectionComponent {...this.props} section={section} site={this.props.pageContext.site} />;
                    })}
                </div>
            </HomeLayout>
        );
    }
}
