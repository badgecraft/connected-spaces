import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import DateTime from './DateTime';
import { Colors } from '../Constants';

const Container = styled(Box)`
    border-bottom: 1px solid ${Colors.menuBottom};
`;

const Face = styled.div`
    height: 25px;
    width: 25px;
    background-image: url("${({ src }) => src}");
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 50%;
    display: inline-block;
`;

const Name = styled(Box)`
    flex-grow: 1;
`;

const Info = styled.div`
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.1px;
    color: ${Colors.heading};
    
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Review = ({ review, ...props }) => (
    <Container py={3} {...props}>
        <Info>
            <Face src={review.picture} />
            <Name px={2}>{review.name}</Name>
            <DateTime ts={review.createdAt} />
        </Info>
        <Box my={2}>The event was awesome! I liked it a lot! Waiting for new events! </Box>
    </Container>
);

Review.propTypes = {
    review: PropTypes.shape({
        picture:   PropTypes.string.isRequired,
        name:      PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
    }).isRequired,
};

export default Review;
