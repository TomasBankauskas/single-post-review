import React from 'react';
import _ from 'lodash';

import components, { Layout } from '../components/index';
import { htmlToReact } from '../utils';
import Button from '../components/Button';
import StackableSection from '../components/StackableSection';
import SectionHero from '../components/SectionHero';

export default class Contact extends React.Component {
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
                            <div className="post-content">
                                {htmlToReact(_.get(this.props, 'pageContext.html'))}
                                {_.get(this.props, 'pageContext.frontmatter.form_enabled') && (
                                    <form
                                        name="contactForm"
                                        action="/success.html"
                                        method="POST"
                                        netlifyHoneypot="bot-field"
                                        data-netlify="true"
                                        id="contact-form"
                                        className="contact-form"
                                    >
                                        <p className="screen-reader-text">
                                            <label>
                                                Don't fill this out if you're human: <input name="bot-field" />
                                            </label>
                                        </p>
                                        {_.map(_.get(this.props, 'pageContext.frontmatter.form_fields'), (field, field_idx) => {
                                            let GetFieldComponent = components[_.get(field, 'component')];
                                            return <GetFieldComponent key={field_idx} {...this.props} field={field} />;
                                        })}
                                        <input type="hidden" name="form-name" value="contactForm" />
                                        <p className="form-row form-row-centered form-submit">
                                            <Button type="submit">
                                                {_.get(this.props, 'pageContext.frontmatter.form_submit_text') || 'Send'}
                                            </Button>
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </article>
            </Layout>
        );
    }
}
