import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import close from './close.svg';
import { font14A1 } from '../uiFonts';
import overflowify from '../Modal/modalOverflowify';
import { TOGGLE_MENU_OPEN, TOGGLE_MENU_CLOSE, isOpen } from './toggableMenuReducer';

const Root = styled('div')({
    height:    '100%',
    overflowY: 'auto',
});

const OpenRoot = overflowify()(
    styled('div')({
        position:        'fixed',
        left:            0,
        right:           0,
        bottom:          0,
        top:             0,
        backgroundColor: '#fff',
        zIndex:          7000,
    }),
);

const Head = styled('div')({
    display:        'flex',
    alignItem:      'center',
    justifyContent: 'space-between',
    padding:        16,
});

const Title = styled('div')({
    ...font14A1,
    whiteSpace:   'nowrap',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
    flexGrow:     1,
});

export const toggableMenuButtonStyle = {
    backgroundColor:    'transparent',
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize:     'contain',
    width:              17,
    height:             17,
    border:             '0 none',
    outline:            'none',
    cursor:             'pointer',
    padding:            7,
    flexShrink:         0,
    display:            'inline-block',
    verticalAlign:      'middle',
};

const Close = styled('button')({
    ...toggableMenuButtonStyle,
    backgroundImage: `url("${close}")`,
});

const Open = styled('button')(({ icon, openStyle }) => ({
    ...toggableMenuButtonStyle,
    backgroundImage: `url("${icon}")`,
    ...openStyle,
}));

const ToggableMenu = ({ icon, openStyle, title, children, open, setOpen }) =>
    open
        ? (<OpenRoot>
            <Root>
                <Head>
                    <Title>{title}</Title>
                    <Close type="button" onClick={() => setOpen(false)} />
                </Head>
                {children}
            </Root>
        </OpenRoot>)
        : <Open icon={icon} openStyle={openStyle} type="button" onClick={() => setOpen(true)} />;

ToggableMenu.propTypes = {
    setOpen:   PropTypes.func.isRequired,
    open:      PropTypes.bool.isRequired,
    icon:      PropTypes.string,
    title:     PropTypes.node,
    children:  PropTypes.node.isRequired,
    openStyle: PropTypes.shape({}),
};

ToggableMenu.defaultProps = {
    openStyle: {},
    icon:      null,
    title:     null,
};

export default connect(
    (state, { name }) => ({ open: isOpen(state, name) }),
    (dispatch, { name }) => ({
        setOpen: open => dispatch({
            type:    open ? TOGGLE_MENU_OPEN : TOGGLE_MENU_CLOSE,
            payload: { name },
        }),
    }),
)(ToggableMenu);
