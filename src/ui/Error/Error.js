import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import _get from 'lodash/get';
import { font20, font16A7 } from '../uiFonts';

const Root = styled('div')({
    textAlign:      'center',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    minHeight:      '50vh',
});

const Title = styled('h1')(({ theme }) => ({
    ...font20,
    color: _get(theme, 'colors.error'),
}));

const Message = styled('p')({
    ...font16A7,
});

const Error = ({ title, message }) => (
    <Root>
        <Box mx={3} my={5}>
            <Title>{title}</Title>
            <Message>{message}</Message>
        </Box>
    </Root>
);

Error.propTypes = {
    title:   PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default Error;
