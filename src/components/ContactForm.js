import React from 'react';
import { classNames, Link } from '../utils';
import queryString from 'query-string';
import { track } from '../services/analytics-service';

import Button from './Button';

export class SectionContact extends React.Component {
    state = {
        form: {},
        params: {},
        error: '',
        success: false,
        didTrack: false,
        validation: {}
    };

    componentDidMount() {
        let params = queryString.parse(window.location.search);
        this.setState({
            params: {
                ...params
            }
        });
    }

    encode(data) {
        return Object.keys(data)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
    }

    handleChange = (e) => {
        if (!this.state.didTrack) {
            track('New Homepage - early access form interacted', { formName: this.props.formName || 'earlyAccess' });
        }
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            },
            didTrack: true
        });
    };

    validate() {
        const form = this.state.form;
        let validation = {};
        if (!form.name) {
            validation.name = 'This field cannot be empty';
        }
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailTest = re.test(form.email);
        if (!emailTest) {
            validation.email = 'Email must be valid';
        }
        if (!form.size) {
            validation.size = 'This field cannot be empty';
        }
        if (!form.message) {
            validation.message = 'Surely you have a few words for us?';
        }
        return validation;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ validation: {} });
        let validation = this.validate();
        if (Object.keys(validation).length) {
            track('New Homepage - early access form valdation failed', {
                ...this.state.form,
                validation: validation,
                formName: this.props.formName || 'earlyAccess'
            });
            this.setState({ validation });
            return;
        }
        track('New Homepage - early access form submitted', {
            email: this.state.form.email,
            orgSize: this.state.form.size,
            submitterName: this.state.form.name,
            label: this.state.form.email,
            formName: this.props.formName || 'earlyAccess'
        });
        const formData = this.encode({
            'form-name': this.props.formName || 'earlyAccess',
            params: JSON.stringify(this.state.params),
            ...this.state.form
        });
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData
        })
            .then(() => {
                this.setState({
                    success: true
                });
            })
            .catch((error) => alert(error));
    };

    render() {
        let { class_name } = this.props;
        const { validation } = this.state;
        const formName = this.props.formName || 'earlyAccess';
        // Any data sent by handleSubmit must also be included as hidden fields for Netlify forms to work.
        // These fields MUST be pre-rendered in the HTML for Netlify to accept them.
        return (
            <div className={classNames('section-contact', class_name)}>
                {this.state.success ? (
                    <div className="thankyou">
                        <h3>Thank you for reaching out</h3>
                        <p>We'll get back to you shortly.</p>
                        <p>
                            In the meantime you can{' '}
                            <Link to="https://app.stackbit.com/try">try Stackbit with a sample website project</Link> to experience its
                            features.
                        </p>
                    </div>
                ) : (
                    <form
                        name={formName}
                        method="POST"
                        className="contact-form"
                        data-netlify="true"
                        data-netlify-honeypot="bot-field"
                        onSubmit={this.handleSubmit}
                    >
                        <input type="hidden" name="form-name" value={formName} />
                        <input type="hidden" name="params" value="" />
                        <p hidden>
                            <label>
                                Don’t fill this out: <input name="bot-field" onChange={this.state.handleChange} />
                            </label>
                        </p>
                        <div className="form-group">
                            <div className="form-row">
                                <label className="form-label">Your name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    placeholder="Your Name"
                                    onChange={this.handleChange}
                                />
                                {validation.name && <span className="field-error">{validation.name}</span>}
                            </div>
                            <div className="form-row">
                                <label className="form-label">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="name@example.com"
                                    onChange={this.handleChange}
                                />
                                {validation.email && <span className="field-error">{validation.email}</span>}
                            </div>
                            <div className="form-row">
                                <label className="form-label">How big is your organization?</label>
                                <div className="contact-select-wrapper">
                                    <select name="size" onChange={this.handleChange}>
                                        <option value="">Please select</option>
                                        <option value="1">1</option>
                                        <option value="2-10">2-10</option>
                                        <option value="11-100">11-100</option>
                                        <option value="101-1000">101-1000</option>
                                        <option value="1000+">1000+</option>
                                    </select>
                                </div>
                                {validation.size && <span className="field-error">{validation.size}</span>}
                            </div>
                        </div>
                        <div className="form-row">
                            <label className="form-label">
                                What questions do you have? Please add context if possible, like stack, setup, workflows, etc.
                            </label>
                            <textarea name="message" className="form-textarea" rows="7" onChange={this.handleChange} />
                            {validation.message && <span className="field-error">{validation.message}</span>}
                        </div>
                        <p className="form-row form-note">* All fields are required</p>

                        <p className="form-row form-submit">
                            <Button type="submit">{this.props.CTAText || 'Request Early Access'}</Button>
                        </p>
                    </form>
                )}
            </div>
        );
    }
}
