import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import Link from '../Link';
import { font16A5 } from '../uiFonts';
import { themedMinWidth, withVisibilityStyle } from '../uiUtils';

export const SecondaryContainer = styled('div')(({ theme }) => ({
    width:                              '100%',
    margin:                             '0 auto',
    [themedMinWidth('tablet', theme)]:  {
        width: theme.breakpointWidths.tablet,
    },
    [themedMinWidth('desktop', theme)]: {
        width: theme.breakpointWidths.desktop,
    },
}));

const Root = styled('div')({
    display:   'block',
    boxShadow: '0 3px 12px 0 rgba(48,6,114,0.11)',
    overflow:  'hidden',
}, withVisibilityStyle);

const Items = styled('div')({
    height:   49,
    overflow: 'hidden',
});

const ItemRoot = styled('div')(({ theme }) => ({
    height:          49,
    width:           '100%',
    margin:          '0 auto',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'flex-start',
    overflow:        ['scroll', '-moz-scrollbars-none'],
    overflowY:       'hidden',
    msOverflowStyle: 'none',
    scrollbarWidth:  'none',

    '::-webkit-scrollbar': {
        display: 'none !important',
    },

    [themedMinWidth('tablet', theme)]:  {
        width: theme.breakpointWidths.tablet,
    },
    [themedMinWidth('desktop', theme)]: {
        width: theme.breakpointWidths.desktop,
    },
}));

const Item = styled(Link)(({ theme, active, icon }) => ({
    ...font16A5,
    color:              '#3E3564',
    backgroundImage:    `url("${icon}")`,
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center left',
    backgroundSize:     '15px 15px',
    paddingLeft:        25,
    display:            'inline-block',
    paddingRight:       10,
    borderBottom:       '2px solid transparent',
    lineHeight:         '39px',
    whiteSpace:         'nowrap',
    paddingTop:         5,
    paddingBottom:      3,
    '&:first-child':    {
        marginLeft: 12,
    },
    '&:last-child':     { borderWidth: 2 },

    ...(active && {
        borderBottom: `2px solid ${_get(theme, 'colors.primary')}`,
    }),
    '&:hover': {
        borderBottom: `2px solid ${_get(theme, 'colors.primary')}`,
    },

    [themedMinWidth('tablet', theme)]: {
        marginRight:     25,
        '&:first-child': {
            marginLeft: 0,
        }
    },
}));

const Top = styled('div')(({ theme }) => ({
    width:                              '100%',
    margin:                             '0 auto',
    [themedMinWidth('tablet', theme)]:  {
        width: theme.breakpointWidths.tablet,
    },
    [themedMinWidth('desktop', theme)]: {
        width: theme.breakpointWidths.desktop,
    },
}));

const SecondaryTopMenu = ({ items = [], children, ...props }) => (
    <Root {...props}>
        {children && <Top>{children}</Top>}
        <Items>
            <ItemRoot>
                {items.map(({ label, ...item }) => (
                    <Item key={label} {...item}>{label}</Item>
                ))}
            </ItemRoot>
        </Items>
    </Root>
);

SecondaryTopMenu.propTypes = {
    items:    PropTypes.arrayOf(PropTypes.shape({
        label:  PropTypes.string.isRequired,
        active: PropTypes.bool,
        icon:   PropTypes.string,
    })).isRequired,
    children: PropTypes.node,
};

SecondaryTopMenu.defaultProps = {
    children: null,
};

export default SecondaryTopMenu;
