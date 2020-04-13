import React from 'react';
import { mapProps } from 'recompose';
import SelectCheck from './SelectCheck';
import Field from './FormField';

export default mapProps(({ meta: { error }, input, label, help, required, ...props }) => ({
    children: <SelectCheck error={error} {...props} {...input} />,
    error,
    help,
    label,
    required,
}))(Field);
