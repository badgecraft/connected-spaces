import React from 'react';
import styled from '@emotion/styled';
import { Box, Flex } from '@rebass/emotion';
import Review from './Review';
import Button from './Button';

const review = {
    picture:   'https://www.badgecraft.eu/storage/user-avatar/3b2621dc-2168-422e-8b47-b195deb7c786.png',
    name:      'Oleg Frolov',
    createdAt: 1540374166446,
};

const List = styled(Flex)`
    flex-wrap: wrap;
`;

const ReviewList = () => (
    <Box mb={4}>
        <List mb={4}>
            <Review width={1} review={review} />
            <Review width={1} review={review} />
        </List>

        <Button type="link" to="?review" variant="secondary" fullWidth={[true, false, false]}>Leave review</Button>
    </Box>
);

export default ReviewList;
