import React from 'react';
import { mapProps } from 'recompose';
import Field from './FormField';
import Select from './Select';

// eslint-disable-next-line max-len
export default mapProps(({ input: { onChange, value, ...input }, meta: { error }, options = [], label, help, required, fixedErrorContainer, fieldVariant, ...props }) => ({
    label,
    help,
    error,
    required,
    fixedErrorContainer,
    variant:  fieldVariant,
    children: (<Select
        {...props}
        {...input}
        value={options.find(item => item.value && value && `${item.value}` === `${value}`)}
        options={options}
        onChange={(opt, type) => onChange(opt.value, type)}
        error={error}
    />)
}))(Field);
