import React from 'react';
import styled from '@emotion/styled';
import modalify from './modalify';
import { themedMinWidth } from '../uiUtils';
import remove from './close.svg';
import { font18A1, font24 } from '../uiFonts';

export const Root = modalify()(
    styled(({ children, className }) => (<div className={className}>{children}</div>))(({ theme, variant }) => ({
        backgroundColor: '#ffffff',
        borderRadius:    10,
        width:           '90%',
        margin:          '0 auto',
        padding:         '34px 22px 28px 22px',
        textAlign:       'center',
        overflow:        'hidden',
        overflowY:       'auto',
        maxHeight:       '90%',

        ...(variant === 'big' && { height: '100%' }),

        [themedMinWidth('tablet', theme)]: {
            maxWidth: 660,
        },
    })),
);

export const Right = styled('div')({
    float: 'right',
});

export const Abs = styled('div')({ position: 'absolute' });

export const Remove = styled('button')(({ theme }) => ({
    width:      18,
    height:     18,
    display:    'inline-block',
    position:   'relative',
    background: `transparent url("${remove}") center center/12px 12px no-repeat`,
    outline:    'none',
    border:     '0 none',
    top:        -18,
    right:      12,
    cursor:     'pointer',

    [themedMinWidth('tablet', theme)]: {
        backgroundSize: '18px 18px',
        top:            -10,
        right:          20,
    },
}));

export const Heading = styled('h2')(({ theme }) => ({
    ...font18A1,
    color:        '#3E3564',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
    whiteSpace:   'nowrap',

    [themedMinWidth('tablet', theme)]: {
        ...font24,
    },
}));
