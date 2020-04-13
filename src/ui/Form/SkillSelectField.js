import React from 'react';
import { mapProps } from 'recompose';
import { t } from 'ttag';
import Field from './FormField';
import Select from './SkillSelect';

export default mapProps(({ input, meta: { error }, label, help, required, fixedErrorContainer, ...props }) => ({
    label,
    help,
    error,
    required,
    fixedErrorContainer,
    children: (<Select
        placeholder={t`Skill (for example: CSS)`}
        {...props}
        {...input}
        error={error}
    />)
}))(Field);
