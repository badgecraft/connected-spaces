import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import styled from '@emotion/styled';
import { themedMinWidth } from '../uiUtils';

const Root = styled('div')(({ theme }) => ({
    height: 282,
    // height: 320,

    [themedMinWidth('tablet', theme)]:  {
        height: 360,
    },
    [themedMinWidth('desktop', theme)]: {
        height: 460,
    },
}));

const Image = styled('div')(({ picture, theme }) => ({
    height:     '100%',
    background: `transparent url("${picture}") center center/auto 100% no-repeat`,
    margin:     '0 auto',

    '@media (max-width: 540px)': {
        backgroundPosition: 'left',
    },

    [themedMinWidth('tablet', theme)]: {
        width:              theme.breakpointWidths.tablet,
        backgroundPosition: 'center center',
        backgroundSize:     [
            '100% auto',
            'cover',
        ],
    },

    [themedMinWidth('desktop', theme)]: {
        width: theme.breakpointWidths.desktop,
    },
}));

const Gradient = styled('div')(({ color, theme }) => {
    const bg = color || _get(theme, 'colors.primary');
    return {
        background: `linear-gradient(180deg,${bg}00 0%,${bg}88 65%, ${bg}FF 100%)`,
        position:   'relative',
        top:        '-100%',
        height:     '100%',
    };
});

const Content = styled('div')({
    margin: '0 auto',
    height: '100%',
});


const Cover = ({ picture, meta, children, defaultColor }) => (
    <Root>
        <Image picture={picture} />
        <Gradient color={_get(meta, 'dominantColor') || defaultColor}>
            <Content>{children}</Content>
        </Gradient>
    </Root>
);

Cover.propTypes = {
    picture:      PropTypes.string.isRequired,
    meta:         PropTypes.shape({
        dominantColor: PropTypes.string.isRequired,
    }),
    children:     PropTypes.node,
    defaultColor: PropTypes.string,
};

Cover.defaultProps = {
    meta:         null,
    children:     null,
    defaultColor: null,
};

export default Cover;
