import React from 'react';
import _ from 'lodash';

import { SectionContact } from './ContactForm';

import './EnterpriseContactForm.scss';

export default class EnterpriseContactForm extends React.Component {
    render() {
        return (
            <div className="inner enterprise-contact-form">
                <p>
                    It is our experience that enterprises and bigger organizations have more complex website project setups, custom
                    workflows, or just questions that might not be covered on our website. We're happy to address any of those, so please
                    reach out.
                </p>
                <SectionContact buttonStyle="clear" CTAText={'SUBMIT'} formName={'earlyAccessEnroll'} />
                <div className="separator"></div>
                <a className="section-footer" href="https://app.stackbit.com/create">
                    Try Stackbit with a sample website project
                </a>
            </div>
        );
    }
}
