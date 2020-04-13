import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import _includes from 'lodash/includes'
import { font14A5 } from '../uiFonts';
import checkedImage from './checked2.svg';

const Root = styled('div')({
    backgroundColor: '#FCFCFC',
    borderRadius:    10,
});

const Label = styled('label')({
    width:          '100%',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    cursor:         'pointer',
});

const Check = styled('div')({
    height:       23,
    width:        23,
    borderRadius: '50%',
    border:       '1px solid #D1D1D1',
    flexShrink:   0,
});

const Item = styled('div')(({ checked, theme }) => ({
    ...font14A5,
    padding:    '0 16px',
    border:     '1px solid #EFEFEF',
    lineHeight: '41px',
    boxSizing:  'border-box',
    color:      checked ? '#ffffff' : '#4A4A4A',

    ...(checked && {
        backgroundColor: _get(theme, 'colors.primary'),
        borderColor:     _get(theme, 'colors.primary'),
    }),

    '&:first-child': {
        borderTopRightRadius: 10,
        borderTopLeftRadius:  10,
    },
    '&:last-child':  {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius:  10,
    },

    'input': {
        position: 'absolute',
        height:   0,
        width:    0,
        opacity:  0,
    },

    [`input:checked + ${Check}`]: {
        borderColor: '#FFFFFF',
        background:  `transparent url("${checkedImage}") center center/8px 6px no-repeat`,
    },
}));

const toId = (name, item) => `${name}-${item.value}`;

const isChecked = ({ multiple, value, item }) => {
    if (!multiple) {
        return item.value === value;
    }

    return _includes(value || [], item.value);
};

const updateValue = (add, list, value) => [...(list || []).filter(item => item !== value), ...(add ? [value] : [])];

// todo variant: default | inverted
const SelectCheck = ({ name, options, value, onChange, multiple, disabled }) => (
    <Root>
        {options.map(item => (
            <Item checked={isChecked({ multiple, value, item })} key={item.value}>
                <Label htmlFor={toId(name, item)}>
                    {item.label}
                    <input
                        id={toId(name, item)}
                        type={multiple ? 'checkbox' : 'radio'}
                        name={name}
                        checked={isChecked({ multiple, value, item })}
                        disabled={disabled}
                        onChange={(evt) => {
                            onChange(
                                multiple
                                    ? updateValue(evt.target.checked, value, item.value)
                                    : item.value
                            );
                        }}
                    />
                    <Check />
                </Label>
            </Item>
        ))}
    </Root>
);

SelectCheck.propTypes = {
    name:     PropTypes.string.isRequired,
    options:  PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
    })).isRequired,
    value:    PropTypes.any, // eslint-disable-line react/forbid-prop-types
    onChange: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
};

SelectCheck.defaultProps = {
    value:    null,
    multiple: false,
    disabled: false,
};

export default SelectCheck;
