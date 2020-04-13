import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { themedMinWidth } from '../../ui/uiUtils';

const Root = styled('div')(({ theme }) => ({
    height:                            151,
    [themedMinWidth('tablet', theme)]: {
        height: 365,
    },
}));

const Image = styled('div')(({ picture, theme }) => ({
    height:             '100%',
    backgroundImage:    `url("${picture}")`,
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize:     '100% auto',
    margin:             '0 auto',

    [themedMinWidth('mobile', theme)]: {
        backgroundPosition: 'center center',
        backgroundSize:     `auto ${theme.breakpointWidths.tablet}px`,
    },

    [themedMinWidth('tablet', theme)]: {
        width: theme.breakpointWidths.tablet,
    },

    [themedMinWidth('desktop', theme)]: {
        width: theme.breakpointWidths.desktop,
    },
}));

const Gradient = styled('div')(({ color }) => ({
    background: `linear-gradient(180deg,${color}00 0%,${color}88 65%, ${color}FF 100%)`,
    position:   'relative',
    top:        '-100%',
    height:     '100%',
}));

const Content = styled('div')({
    margin: '0 auto',
    height: '100%',
});

const EventCover = ({ picture, meta, children }) => (
    <Root>
        <Image picture={picture} />
        <Gradient color={_get(meta, 'dominantColor') || '#db7805'}>
            <Content>{children}</Content>
        </Gradient>
    </Root>
);

EventCover.propTypes = {
    picture:  PropTypes.string.isRequired,
    children: PropTypes.node,
    meta:     PropTypes.shape({
        dominantColor: PropTypes.string.isRequired,
    }),
};

EventCover.defaultProps = {
    children: null,
    meta:     null,
};

export default EventCover;
