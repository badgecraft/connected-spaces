import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { t } from 'ttag';
import prop from 'lodash/fp/prop';
import _get from 'lodash/get';
import { mapProps } from 'recompose';
import Input from './Input';
import FormField from './FormField';

const valueProp = prop("value");

const ContactInput = mapProps(({ meta: { error }, input: { value, onChange, onBlur, ...input }, label, help, required, ...props }) => ({
    children: (<Input
        error={error}
        {...props}
        {...input}
        value={valueProp(value)}
        onChange={evt => onChange({ ...value, value: _get(evt, 'target.value') })}
        onBlur={evt => onBlur({ ...value, value: _get(evt, 'target.value') })}
    />),
    error:    valueProp(error),
    help,
    label,
    required,
}))(FormField);

const toLabel = ({ name }) => {
    switch (name) {
        case 'facebook':
            return t`Facebook contact`;
        case 'twitter':
            return t`Twitter contact`;
        case 'google':
            return t`Google contact`;
        case 'email':
            return t`Email contact`;
        case 'phone':
            return t`Phone contact`;
        default:
            return null;
    }
};

const ContactsArray = ({ fields }) => (
    <div>
        {fields.map((member, index, allFields) => (
            <Field
                key={index} // eslint-disable-line react/no-array-index-key
                name={member}
                component={ContactInput}
                label={toLabel(allFields.get(index))}
                disabled={false}
            />
        ))}
    </div>
);

ContactsArray.propTypes = {
    fields: PropTypes.shape().isRequired,
};

export default ContactsArray;
