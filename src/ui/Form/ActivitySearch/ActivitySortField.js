import React from 'react';
import { mapProps } from 'recompose';
import Field from '../FormField';
import Sort from './ActivitySort';

export default mapProps(({ input, meta: { error }, label, help, required, fixedErrorContainer, ...props }) => ({
    label,
    help,
    error,
    required,
    fixedErrorContainer,
    children: (<Sort
        {...props}
        {...input}
        error={error}
    />)
}))(Field);
