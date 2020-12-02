import React from 'react';
import _ from 'lodash';

export default class TextareaField extends React.Component {
    render() {
        return (
            <p className="form-row">
                <label className="form-label">{_.get(this.props, 'field.label')}</label>
                <textarea name={_.get(this.props, 'field.name')} className="form-textarea" rows="7" />
            </p>
        );
    }
}
