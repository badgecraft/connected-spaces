import React from 'react';
import { mapProps } from 'recompose';
import Uploader from './Uploader';
import Field from '../FormField';

export default mapProps(({ meta: { error }, input, label, help, required, ...props }) => ({
    children: <Uploader error={error} {...props} {...input} />,
    error,
    help,
    label,
    required,
}))(Field);
