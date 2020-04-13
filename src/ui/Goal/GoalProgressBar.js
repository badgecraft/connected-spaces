import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { themedMinWidth } from '../uiUtils';

const Root = styled('div')(({ theme, autoWidth }) => ({
    display:         'inline-block',
    verticalAlign:   'middle',
    height:          5,
    backgroundColor: '#A59FC0',
    borderRadius:    5,
    ...(!autoWidth && {
        width: 50,
    }),

    [themedMinWidth('tablet', theme)]: {
        ...(!autoWidth && {
            width:       100,
            marginLeft:  12,
            marginRight: 12,
        }),
    },
}));

const Value = styled('div')(({ value, theme }) => ({
    height:          '100%',
    width:           `${value * 100}%`,
    backgroundColor: _get(theme, 'colors.primary'),
    borderRadius:    5,
}));

const GoalProgressBar = ({ value, ...props }) => (<Root {...props}><Value value={value} /></Root>);

GoalProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
};

export default GoalProgressBar;
