import React from 'react';
import { mapProps } from 'recompose';
import Field from '../FormField';
import Mandatory from './ActivityMandatory';

export default mapProps(({ input, meta: { error }, label, help, required, fixedErrorContainer, ...props }) => ({
    label,
    help,
    error,
    required,
    fixedErrorContainer,
    children: (<Mandatory
        {...props}
        {...input}
        error={error}
    />)
}))(Field);
