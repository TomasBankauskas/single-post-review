import React from 'react';
import _ from 'lodash';

export default class InputField extends React.Component {
    render() {
        return (
            <p className="form-row">
                <label className="form-label">{_.get(this.props, 'field.label')}</label>
                <input type={_.get(this.props, 'field.input_type')} name={_.get(this.props, 'field.name')} className="form-input" />
            </p>
        );
    }
}
