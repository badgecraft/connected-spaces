import React from 'react';
import { mapProps } from 'recompose';
import Field from '../Form/FormField';
import Input from './UserSelect';

export default mapProps(({ input, meta: { error, ...meta }, label, help, required, ...props }) => ({
    children: <Input error={error} meta={{ ...meta, error }} {...props} {...input} />,
    error,
    help,
    label,
    required,
}))(Field);
