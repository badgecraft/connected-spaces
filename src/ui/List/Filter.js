import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { branch, renderNothing } from 'recompose';
import Link from '../Link/CurrentPathLink';
import { font12A6, font16A3 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const FilterItem = styled(Link)(({ theme, active }) => ({
    ...font12A6,
    color:   active ? '#4A4A4A' : '#9B9B9B',
    padding: '0 5px',

    '&:hover':         {
        color: '#4A4A4A',
    },
    '&:first-of-type': {
        paddingLeft: 0,
    },
    '&:last-of-type':  {
        paddingRight: 0,
    },

    [themedMinWidth('tablet', theme)]: {
        ...font16A3,
    },

    [themedMinWidth('desktop', theme)]: {
        padding: '0 20px',
    },
}));

const Filter = ({ items = [] }) => (
    <div>
        {items.filter(item => item.enabled).map(({ label, active, ...other }) => (
            <FilterItem {...other} key={label} active={active}>{label}</FilterItem>
        ))}
    </div>
);

Filter.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        enabled: PropTypes.bool.isRequired,
        label:   PropTypes.string.isRequired,
        active:  PropTypes.bool.isRequired,
        to:      PropTypes.string,
    })).isRequired,
};

export default branch(({ items }) => items.filter(item => item.enabled).length <= 1, renderNothing)(Filter);
