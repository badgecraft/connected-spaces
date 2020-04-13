import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { breakpoints, Colors } from '../Constants';
import Link from '../Link';
import { skipProps } from './_utils';
import { font10 } from '../../ui/uiFonts';
import FontIcon from '../../ui/Icons/FontIcon';

const Container = styled('div')(({ sticky }) => ({
    height:          48,
    backgroundColor: Colors.white,
    borderTop:       `1px solid ${Colors.stickyBorder}`,
    display:         'flex',
    ...(sticky && {
        position: 'fixed',
        bottom:   0,
        left:     0,
        right:    0,
    }),
}));

const Wrapper = styled('div')(({ sticky }) => ({
    height:               sticky ? 48 : 0,
    ...(!sticky && {
        marginTop: 20,
    }),
    [breakpoints.mobile]: {
        display: 'none',
    },
}));

const MenuItem = styled(skipProps('active')(Link))(({ active, theme }) => ({
    ...font10,
    flexGrow:       1,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    color:          active ? _get(theme, 'colors.primary') : Colors.stickyText,
    flexDirection:  'column',

    [`${FontIcon}`]: {
        marginTop:  6,
        fontSize:   13,
        lineHeight: '13px',
    },
}));

const BottomMenu = ({ sticky, items = [] }) => (
    <Wrapper sticky={sticky}>
        <Container sticky={sticky}>
            {items.filter(item => item.enabled).map(({ title, active, icon, enabled, ...linkProps }) => (
                <MenuItem active={active} key={title} title={title} {...linkProps}>
                    <FontIcon content={icon} />
                    {title}
                </MenuItem>
            ))}
        </Container>
    </Wrapper>
);

BottomMenu.propTypes = {
    sticky: PropTypes.bool,
    items:  PropTypes.arrayOf(PropTypes.shape({
        title:   PropTypes.string.isRequired,
        active:  PropTypes.bool.isRequired,
        icon:    PropTypes.string.isRequired,
        enabled: PropTypes.bool.isRequired,
        // todo links?
    })).isRequired,
};

BottomMenu.defaultProps = {
    sticky: true,
};

export default BottomMenu;
