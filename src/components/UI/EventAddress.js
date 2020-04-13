import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import { branch, renderNothing } from 'recompose';
import _pick from 'lodash/pick';
import { font16A5 } from '../../ui/uiFonts';
import FontIcon from '../../ui/Icons/FontIcon';

const Container = styled(Box)({
    ...font16A5,
    verticalAlign: 'middle',
});

const EventAddress = ({ address, ...props }) => (
    <Container my={2} {..._pick(props, 'className')}>
        <FontIcon content="location" style={{ marginRight: 4 }} />
        {address}
    </Container>
);

EventAddress.propTypes = {
    address: PropTypes.string.isRequired,
};

export default branch(
    ({ address }) => !address,
    renderNothing,
)(EventAddress);
