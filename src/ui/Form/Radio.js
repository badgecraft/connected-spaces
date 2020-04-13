import React from 'react';
import PropTypes from 'prop-types';
import _pick from 'lodash/pick';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { themedMinWidth } from '../uiUtils';
import { font16A6, font12A6 } from '../uiFonts';

const Input = styled('input')({ display: 'none' });

const Label = styled('label')(({ theme, disabled }) => ({
    flexGrow:       1,
    textAlign:      'center',
    borderRight:    `1px solid  ${_get(theme, 'colors.form.inputBorder', '#EFEFEF')}`,
    cursor:         disabled ? 'not-allowed' : 'pointer',
    ...font12A6,
    lineHeight:     '40px',
    '&:last-child': {
        borderRight: '0 none',
    },

    [themedMinWidth('tablet', theme)]: {
        ...font16A6,
        lineHeight: '40px',
    },
}));

const Container = styled('div')(({ theme }) => ({
    color:           '#3E3564',
    width:           '100%',
    border:          `1px solid  ${_get(theme, 'colors.form.inputBorder', '#EFEFEF')}`,
    borderRadius:    10,
    backgroundColor: _get(theme, 'colors.form.inputBg', '#FCFCFC'),
    height:          40,
    lineHeight:      '40px',
    overflow:        'hidden',
    display:         'flex',

    [`${Input}:checked + ${Label}`]: {
        backgroundColor: _get(theme, 'colors.primary'),
        color:           '#ffffff',
    },
}));

const id = (name, value) => `${name}_${value}`;

const Radio = ({ name, options = [], onChange, value, disabled, ...props }) => (
    <Container {..._pick(props, 'className')}>
        {options.map(item => (
            <React.Fragment key={item.value}>
                <Input
                    id={id(name, item.value)}
                    type="radio"
                    name={name}
                    value={item.value}
                    onChange={() => onChange(item.value)}
                    checked={item.value === value}
                    disabled={disabled}
                />
                <Label htmlFor={id(name, item.value)} disabled={disabled}>{item.label}</Label>
            </React.Fragment>
        ))}
    </Container>
);

Radio.propTypes = {
    name:     PropTypes.string.isRequired,
    options:  PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.any.isRequired,
        label: PropTypes.string,
    })).isRequired,
    onChange: PropTypes.func,
    value:    PropTypes.any, // eslint-disable-line react/forbid-prop-types
    disabled: PropTypes.bool,
};

Radio.defaultProps = {
    onChange: () => null,
    value:    null,
    disabled: false,
};

export default Radio;
