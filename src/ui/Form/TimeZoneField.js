import React from 'react';
import { mapProps } from 'recompose';
import { t } from 'ttag';
import Field from './FormField';
import Select from './TimeZone';

export default mapProps(({ input, meta: { error }, label, help, required, fixedErrorContainer, ...props }) => ({
    label,
    help,
    error,
    required,
    fixedErrorContainer,
    children: (<Select
        placeholder={t`Select your timezone`}
        {...props}
        {...input}
        error={error}
    />)
}))(Field);
