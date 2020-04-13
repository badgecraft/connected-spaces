import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import { font12A6, font16A6 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const Root = styled('label')(({ theme }) => ({
    display:    'inline-block',
    lineHeight: '18px',
    cursor:     'pointer',

    [themedMinWidth('tablet', theme)]: {
        lineHeight: '24px',
    },
}));

const Cont = styled('div')(({ theme }) => ({
    height:          18,
    width:           26,
    borderRadius:    9,
    backgroundColor: '#d2d2d2',
    padding:         2,
    display:         'inline-block',
    whiteSpace:      'nowrap',
    lineHeight:      '18px',

    [themedMinWidth('tablet', theme)]: {
        height:       24,
        width:        35,
        padding:      4,
        borderRadius: 11,
    },
}));

const Mark = styled('div')(({ theme }) => ({
    width:           14,
    height:          14,
    backgroundColor: '#ffffff',
    borderRadius:    '50%',
    display:         'inline-block',
    transition:      'margin .2s ease',
    marginLeft:      0,

    [themedMinWidth('tablet', theme)]: {
        width:  16,
        height: 16,
    },
}));

const Label = styled('span')(({ theme }) => ({
    ...font12A6,
    color:         '#4A4A4A',
    height:        '22px',
    lineHeight:    '16px',
    marginLeft:    7,
    display:       'inline-block',
    verticalAlign: 'middle',

    [themedMinWidth('tablet', theme)]: {
        ...font16A6,
        height: 25,
    },
}));

const Checkbox = styled('input')(({ theme }) => ({
    display:                 'none',
    [`&:checked + ${Cont}`]: {
        backgroundColor: _get(theme, 'colors.primary'),
        [`${Mark}`]:     {
            marginLeft:                        8,
            [themedMinWidth('tablet', theme)]: {
                marginLeft: 11,
            },
        },
    },
}));

const Toggler = ({ id, label, ...props }) => (
    <Root htmlFor={id}>
        <Checkbox {...props} id={id} type="checkbox" />
        <Cont>
            <Mark />
        </Cont>
        <Label {..._pick(props, 'data-balloon', 'data-balloon-pos')}>{label}</Label>
    </Root>
);

Toggler.propTypes = {
    id:    PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
};

export default Toggler;
