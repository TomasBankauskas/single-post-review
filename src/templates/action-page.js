import React from 'react';
import _ from 'lodash';

import Layout from '../components/Layout';
import EnterpriseContactForm from '../components/EnterpriseContactForm';
import SectionHero from '../components/SectionHero';
import StackableSection from '../components/StackableSection';

export default class ActionPage extends React.Component {
    render() {
        const menu = [
            {
                id: 'menu-header-sign-in',
                identifier: 'header-sign-in',
                title: 'Sign In',
                weight: 1,
                url: 'https://app.stackbit.com',
                items: []
            }
        ];

        return (
            <Layout {...this.props}>
                <article className="post page post-full">
                    <StackableSection isFirst orientation="right" theme="accent">
                        <SectionHero title="Stackbit For Enterprise" />
                    </StackableSection>
                    <EnterpriseContactForm />
                </article>
            </Layout>
        );
    }
}
