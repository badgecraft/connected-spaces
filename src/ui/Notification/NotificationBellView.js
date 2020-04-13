import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { compose, withStateHandlers } from 'recompose';
import Context from './NotificationBellContext';
import { themedMinWidth } from '../uiUtils';
import FontIcon from '../Icons/FontIcon';

const Root = styled('button')(({ theme }) => ({
    width:           31,
    height:          31,
    display:         'inline-block',
    backgroundColor: 'transparent',
    verticalAlign:   'middle',
    marginRight:     8,
    cursor:          'pointer',
    border:          '0 none',
    padding:         0,
    outline:         'none',
    flexShrink:      0,
    color:           'inherit',

    [`${FontIcon}`]: {
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        fontSize:       18,
    },

    [themedMinWidth('tablet', theme)]: {
        backgroundSize: '21px 26px',
        width:          35,
        height:         35,

        [`${FontIcon}`]: {
            fontSize: 24,
        }
    },
}));

const Mark = styled('div')(({ theme, visible }) => ({
    width:           5,
    height:          5,
    backgroundColor: _get(theme, 'colors.notificationBubble') || _get(theme, 'colors.primary'),
    borderRadius:    '50%',
    float:           'right',
    marginRight:     8,
    marginTop:       -9,
    visibility:      visible ? 'visible' : 'hidden',

    [themedMinWidth('tablet', theme)]: {
        marginRight: 5,
        marginTop:   -16,
        width:       8,
        height:      8,
    },
}));


const NotificationBellView = ({ bubble, shortOpen, setShortOpen, variant }) => (
    <React.Fragment key="nbv">
        <Root type="button" onClick={() => !shortOpen && setShortOpen(!shortOpen)}>
            <FontIcon content="bell" />
            <Mark visible={bubble} />
        </Root>
        {shortOpen && <Context variant={variant} onClose={() => setTimeout(() => setShortOpen(false), 100)} />}
    </React.Fragment>
);

NotificationBellView.propTypes = {
    bubble:       PropTypes.bool.isRequired,
    shortOpen:    PropTypes.bool.isRequired,
    setShortOpen: PropTypes.func.isRequired,
    variant:      PropTypes.string,
};

NotificationBellView.defaultProps = {
    variant: 'default',
};

export default compose(
    withStateHandlers({ shortOpen: false }, { setShortOpen: () => shortOpen => ({ shortOpen }) }),
)(NotificationBellView);
