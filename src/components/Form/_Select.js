import React from 'react';
import PropTypes from 'prop-types';
import { mapProps } from 'recompose';
import ReactSelect from 'react-select';
import { Colors } from '../Constants';
import Field from './FormField';

export const customStyle = error => ({
    control:            (base) => ({
        ...base,
        borderColor:     error ? Colors.error : Colors.inputBorder,
        backgroundColor: Colors.inputBg,
        fontSize:        16,
        fontWeight:      'normal',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
});

export const RawSelect = ({ onBlur, error, ...props }) => (
    <ReactSelect styles={(props.customStyle || customStyle)(error)} {...props} onBlur={() => onBlur && onBlur()} />
);

RawSelect.propTypes = {
    onBlur:      PropTypes.func,
    customStyle: PropTypes.func,
    error:       PropTypes.string,
};

RawSelect.defaultProps = {
    onBlur:      () => null,
    error:       null,
    customStyle: null,
};

export default mapProps(({ input: { onChange, value, ...input }, meta: { error }, options = [], label, help, required, ...props }) => ({
    label,
    help,
    error,
    required,
    children: (<RawSelect
        {...props}
        {...input}
        value={options.find(item => item.value && value && `${item.value}` === `${value}`)}
        options={options}
        onChange={(opt, type) => onChange(opt.value, type)}
        error={error}
    />)
}))(Field);
