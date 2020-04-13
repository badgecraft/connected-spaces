import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { themedMinWidth, withVisibilityStyle } from '../../ui/uiUtils';
import { Colors } from '../Constants';
import { font12A6, font16A3 } from '../../ui/uiFonts';

const Spacer = styled('div')({
    height: 58,
}, withVisibilityStyle);

const BottomMenu = styled('div')(({ theme }) => ({
    height:          74,
    backgroundColor: Colors.white,
    borderTop:       `1px solid ${Colors.stickyBorder}`,
    display:         'flex',
    position:        'fixed',
    bottom:          0,
    left:            0,
    right:           0,
    justifyContent:  'space-between',
    alignItems:      'center',
    paddingLeft:     16,
    paddingRight:    16,

    [themedMinWidth('tablet', theme)]: {
        position:        'initial',
        border:          '0 none',
        backgroundColor: 'transparent',
        padding:         0,
    },
}));

const Back = styled('div')(({ theme }) => ({
    ...font12A6,
    color:    '#A59FC0',
    flexGrow: 1,

    [themedMinWidth('tablet', theme)]: {
        ...font16A3,
        color: '#3E3564',
    },
}));

const PlaylistCreateBottomMenu = ({ back, forward }) => (
    <React.Fragment>
        <Spacer mobileOnly />
        <BottomMenu>
            <Back>{back}</Back>
            {forward}
        </BottomMenu>
    </React.Fragment>
);

PlaylistCreateBottomMenu.propTypes = {
    back:    PropTypes.node.isRequired,
    forward: PropTypes.node.isRequired,
};

export default PlaylistCreateBottomMenu;
