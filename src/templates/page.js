import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { htmlToReact } from '../utils';
import StackableSection from '../components/StackableSection';
import SectionHero from '../components/SectionHero';

export default class Page extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
                <article className="post page post-full">
                    <StackableSection isFirst orientation="right" theme="accent">
                        <SectionHero
                            title={_.get(this.props, 'pageContext.frontmatter.title')}
                            subtitle={_.get(this.props, 'pageContext.frontmatter.subtitle')}
                        />
                    </StackableSection>
                    <div className="outer">
                        <div className="inner">
                            <div className="post-content">{htmlToReact(_.get(this.props, 'pageContext.html'))}</div>
                        </div>
                    </div>
                </article>
            </Layout>
        );
    }
}
