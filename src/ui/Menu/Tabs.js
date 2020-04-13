import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import Link from '../Link';
import { font16A5 } from '../uiFonts';

const Root = styled('div')({});

const Menu = styled('div')(({ fullWidth, theme }) => ({
    borderBottom: `1px solid ${_get(theme, 'colors.primary')}`,
    whiteSpace:   'nowrap',
    margin:       '0 -16px',
    overflowX:    'scroll',
    ...(fullWidth ? {
        display: 'flex',
        margin:  '0 -22px',
    } : {})
}));

const Content = styled('div')({
    paddingTop:    8,
    paddingBottom: 8,
});

const Item = styled(Link)(({ active, fullWidth, theme }) => ({
    ...font16A5,
    borderBottom: `2px solid ${active ? _get(theme, 'colors.primary') : 'transparent'}`,
    padding:      '0 16px',
    height:       32,
    display:      'inline-block',
    ...(fullWidth ? { flexGrow: 1 } : {}),
    '&:hover':    {
        borderBottom: `2px solid ${_get(theme, 'colors.primary')}`,
    },
}));

const Tabs = ({ items, fullWidth, ...props }) => {
    const available = items.filter(item => item.enabled);
    const activeItem = available.find(item => item.active);

    return (
        <Root {...props}>
            {available.length > 1 && (<Menu fullWidth={fullWidth}>
                {available.map(({ label, active, enabled, content, ...item }) => (
                    <Item key={label} active={active} fullWidth={fullWidth} {...item}>{label}</Item>
                ))}
            </Menu>)}
            {activeItem && <Content>{activeItem.content()}</Content>}
        </Root>
    );
};

Tabs.propTypes = {
    fullWidth: PropTypes.bool,
    items:     PropTypes.arrayOf(PropTypes.shape({
        enabled: PropTypes.bool.isRequired,
        active:  PropTypes.bool,
        label:   PropTypes.string.isRequired,
        content: PropTypes.func.isRequired,
    })).isRequired,
};

Tabs.defaultProps = {
    fullWidth: false,
};

export default Tabs;
