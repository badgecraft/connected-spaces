import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import { breakpointWidths, breakpoints } from '../Constants/Constants';
import ActivityCard from '../../ui/Card/ActivityCard';

const Container = styled(Box)(({ horizontal }) => ({
    display: 'inline-block',
    ...(horizontal && {
        [breakpoints.mobileMax]: {
            width: [
                `${breakpointWidths.mobile}px !important`,
                '90vw !important',
            ],
        },
    }),
}));

const EventItem = ({ event, horizontal, ...props }) => (
    <Container horizontal={horizontal} px={2} mb={[4, 3, 3]}>
        <ActivityCard {...props} project={event} />
    </Container>
);

EventItem.propTypes = {
    event:      PropTypes.shape().isRequired,
    horizontal: PropTypes.bool.isRequired,
};

export default EventItem;
