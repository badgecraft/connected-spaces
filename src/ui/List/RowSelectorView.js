import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import left from './left.svg';
import right from './right.svg';
import { font12A6, font16A6 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const Root = styled('div')(({ theme }) => ({
    ...font12A6,
    lineHeight: '40px',
    whiteSpace: 'nowrap',

    [themedMinWidth('tablet', theme)]: {
        ...font16A6,
        lineHeight: '40px',
    },
}));

const moveConfig = {
    width:         20,
    height:        20,
    outline:       'none',
    border:        '0 none',
    cursor:        'pointer',
    display:       'inline',
    verticalAlign: 'middle',
    marginBottom:  1,
};

const Left = styled('button')(({ disabled }) => ({
    ...moveConfig,
    background: `transparent url("${left}") center center/6px 10px no-repeat`,
    ...(disabled && {
        opacity: 0.2,
        cursor:  'not-allowed',
    })
}));

const Right = styled('button')(({ disabled }) => ({
    ...moveConfig,
    background: `transparent url("${right}") center center/6px 10px no-repeat`,
    ...(disabled && {
        opacity: 0.2,
        cursor:  'not-allowed',
    })
}));

const Value = styled('span')(({ withBorder }) => ({
    height:       40,
    minWidth:     40,
    borderRadius: 12,
    display:      'inline-block',
    textAlign:    'center',
    ...(withBorder && {
        backgroundColor: '#FCFCFC',
        border:          '1px solid #E5E3ED',
    }),
}));

const RowSelectorView = ({ total, current, onChange }) => (
    <Root>
        <Left type="button" onClick={() => onChange(current - 1)} disabled={current < 2} />
        <Value withBorder>{current}</Value> / <Value>{total}</Value>
        <Right type="button" onClick={() => onChange(current + 1)} disabled={current + 1 > total} />
    </Root>
);

RowSelectorView.propTypes = {
    total:    PropTypes.number.isRequired,
    current:  PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default RowSelectorView;
