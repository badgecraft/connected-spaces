import React from 'react';
import { mapProps } from 'recompose';
import Input from './Input';
import Field from './FormField';

export default mapProps(({ meta: { error }, input, label, help, required, ...props }) => ({
    children: <Input error={error} {...props} {...input} />,
    error,
    help,
    label,
    required,
}))(Field);
