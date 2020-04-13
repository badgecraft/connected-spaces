import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';

const Images = styled(Box)`
    white-space: nowrap;
    overflow-x: scroll;
`;

const Image = styled(Box)`
    display: inline-block;
`;

const PhotoList = (props) => (
    <Images my={1} ml={-3} mr={-3} pl={2} pr={2} {...props}>
        <Image mx={2}>
            <img
                width={220}
                src="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/3/2016/05/10105129/discount-codes-reach-more-people-eventbrite.png"
                alt=""
            />
        </Image>
        <Image mx={2}>
            <img
                width={220}
                src="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/3/2016/05/10105129/discount-codes-reach-more-people-eventbrite.png"
                alt=""
            />
        </Image>
        <Image mx={2}>
            <img
                width={220}
                src="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/3/2016/05/10105129/discount-codes-reach-more-people-eventbrite.png"
                alt=""
            />
        </Image>
        <Image mx={2}>
            <img
                width={220}
                src="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/3/2016/05/10105129/discount-codes-reach-more-people-eventbrite.png"
                alt=""
            />
        </Image>
    </Images>
);

export default PhotoList;
