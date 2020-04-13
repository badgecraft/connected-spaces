import React from 'react';
import { mapProps } from 'recompose';
import Field from './FormField';
import Select from './OrganisationSelect';

export default mapProps(({ input: { onChange, value, ...input }, meta: { error }, label, help, required, fixedErrorContainer, ...props }) => ({
    label,
    help,
    error,
    required,
    fixedErrorContainer,
    children: (<Select
        {...props}
        {...input}
        organisationId={value || ""}
        onChange={(opt, type) => onChange(opt.value, type)}
        error={error}
    />)
}))(Field);
