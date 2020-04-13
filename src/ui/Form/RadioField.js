import React from 'react';
import { mapProps } from 'recompose';
import Field from './FormField';
import Radio from './Radio';

export default mapProps(({ input, meta: { error }, label, help, ...props }) => ({
    label,
    help,
    error,
    children: (<Radio {...props} {...input} error={error} />),
}))(Field);
