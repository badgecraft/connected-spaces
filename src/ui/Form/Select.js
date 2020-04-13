import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { withTheme } from 'emotion-theming';
import _get from 'lodash/get';
import { font16A1 } from '../uiFonts';

export const customStyle = ({ error, theme, placeholderColor, inputOpacityFix }) => {
    const borderColor = error ? _get(theme, 'colors.form.error') : _get(theme, 'colors.form.inputBorder', '#EFEFEF');
    return {
        control:            (base, { isFocused }) => ({
            ...base,
            ...font16A1,
            borderColor:     isFocused ? _get(theme, 'colors.form.outline', '#c4c4c4') : borderColor,
            backgroundColor: _get(theme, 'colors.form.inputBg', '#FCFCFC'),
            fontSize:        16,
            fontWeight:      'normal',
            borderRadius:    10,
            boxShadow:       'none',
            '&:hover':       {},

            ...(inputOpacityFix && { input: { opacity: '1 !important' } }),
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        placeholder:        (base) => ({
            ...base,
            ...font16A1,
            color: placeholderColor || '#C4C0D4',
        }),
        option:             (styles, { isSelected, isFocused, isDisabled }) => ({
            ...styles,
            ...font16A1,
            color:  '#3E3564',
            cursor: 'pointer',
            ...(isFocused && {
                backgroundColor: [_get(theme, 'colors.primary'), _get(theme, 'colors.primaryHover')],
            }),
            ...(isSelected && {
                backgroundColor: [_get(theme, 'colors.primary'), _get(theme, 'colors.primarySelected')]
            }),

            ...(isDisabled ? {
                color:     '#C4C0D4',
                cursor:    'default',
                ':active': {
                    backgroundColor: 'transparent',
                },
            } : {
                ':active': {
                    backgroundColor: [_get(theme, 'colors.primary'), _get(theme, 'colors.primarySelected')],
                },
            }),
        }),
    };
};

export const RawSelect = ({ onBlur, error, theme, disabled, ...props }) => (
    <ReactSelect
        styles={(props.customStyle || customStyle)({ error, theme })}
        isDisabled={disabled}
        isOptionDisabled={option => !!option.disabled}
        {...props}
        onBlur={() => onBlur && onBlur()}
    />
);

RawSelect.propTypes = {
    onBlur:      PropTypes.func,
    customStyle: PropTypes.func,
    error:       PropTypes.string,
    theme:       PropTypes.shape().isRequired,
    disabled:    PropTypes.bool,
};

RawSelect.defaultProps = {
    onBlur:      () => null,
    error:       null,
    customStyle: null,
    disabled:    false,
};

export default withTheme(RawSelect);
