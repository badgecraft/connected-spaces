import React from 'react';
import { mapProps } from 'recompose';
import CheckBox from './Checkbox';
import Field from './FormField';

export default mapProps(({ meta: { error }, input, label, help, required, fieldLabel, ...props }) => ({
    children: <CheckBox label={label} error={error} {...props} {...input} checked={!!input.value} />,
    error,
    help,
    required,
    label:    fieldLabel,
}))(Field);

