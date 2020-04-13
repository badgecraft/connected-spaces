import React from 'react';
import { mapProps } from 'recompose';
import Field from './FormField';
import Input from './Material';

export default mapProps(({ meta: { error, ...meta }, label, help, required, ...props }) => ({
    children: <Input error={error} meta={{ ...meta, error }} {...props} />,
    error,
    help,
    label,
    required,
}))(Field);
