import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { font12, font16A1 } from '../uiFonts';
import success from './success.svg';
import { themedMinWidth } from '../uiUtils';

const Container = styled('div')({ position: 'relative' });

const Icon = styled('div')({
    display:     'inline-block',
    width:       12,
    height:      8,
    background:  `transparent url("${success}") center center/contain no-repeat`,
    marginRight: 8,
});

const Message = styled('div')(({ theme }) => ({
    ...font12,
    padding:         '8px 12px',
    backgroundColor: _get(theme, 'colors.primary'),
    position:        'absolute',
    right:           0,
    left:            0,
    zIndex:          1000,
    textAlign:       'center',
    overflow:        'hidden',
    textOverflow:    'ellipsis',
    color:           '#ffffff',
    cursor:          'pointer',
    boxShadow:       '0 14px 14px 0 rgba(0,0,0,0.2)',

    [themedMinWidth('tablet', theme)]: { ...font16A1 },
}));

const FlashMessage = ({ message, ...props }) => (
    <Container {...props}>
        <Message><Icon />{message}</Message>
    </Container>
);

FlashMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default FlashMessage;
