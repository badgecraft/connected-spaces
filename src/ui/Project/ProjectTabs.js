import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { mapProps, branch, renderNothing } from 'recompose';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import Link from '../Link';
import { themedMinWidth } from '../uiUtils';
import { font16A5 } from '../uiFonts';

const TabRoot = styled('div')(({ color, theme }) => ({
    height:          40,
    lineHeight:      '40px',
    backgroundColor: color || _get(theme, 'colors.primary'),
    padding:         0,
}));

const TabsContainer = styled('div')(({ theme }) => ({
    marginLeft:  'auto',
    marginRight: 'auto',
    width:       '100%',
    whiteSpace:  'nowrap',
    overflowX:   'auto',
    paddingLeft: 16,

    [themedMinWidth('tablet', theme)]:  {
        padding: 0,
        width:   theme.breakpointWidths.tablet,
    },
    [themedMinWidth('desktop', theme)]: {
        width: theme.breakpointWidths.desktop,
    },
}));

const Tab = styled(mapProps(props => _omit(props, 'active', 'enabled'))(Link))(({ active, colorType }) => {
    const activeColor = colorType === 'light' ? '#3E3564' : '#ffffff';
    return {
        ...font16A5,
        lineHeight:   'unset',
        display:      'inline-block',
        padding:      '0 16px',
        borderBottom: `2px solid ${active ? activeColor : 'transparent'}`,
        height:       40,
        color:        [activeColor, active ? activeColor : `${activeColor}CC`],
        '&:hover':    {
            color: activeColor,
        },
    };
});

const Tabs = ({ color, colorType, tabs = [] }) => (
    <TabRoot color={color}>
        <TabsContainer>
            {tabs.filter(({ enabled }) => enabled).map(({ label, active, ...item }) => (
                <Tab key={label} active={active} colorType={colorType} {...item}>{label}</Tab>
            ))}
        </TabsContainer>
    </TabRoot>
);

Tabs.propTypes = {
    color:     PropTypes.string,
    colorType: PropTypes.string,
    tabs:      PropTypes.arrayOf(PropTypes.shape({
        label:   PropTypes.string.isRequired,
        active:  PropTypes.bool.isRequired,
        enabled: PropTypes.bool.isRequired,
    })).isRequired,
};

Tabs.defaultProps = {
    color:     null,
    colorType: null,
};

export default branch(({ tabs = [] }) => tabs.filter(({ enabled }) => enabled).length < 2, renderNothing)(Tabs);
