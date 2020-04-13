import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Heading = styled.h1`
    text-align: center;
`;

export default () => (
    <Container>
        <Heading>This is the health test route</Heading>
    </Container>
);
