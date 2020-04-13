import React from 'react';
import { compose, lifecycle } from 'recompose';
import styled from '@emotion/styled';
import { Colors } from '../Constants';
import Header from './_Header';
import IconButton from './IconButton';
import icons from '../Icon/icons';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    background-color: ${Colors.modalBg};
    overflow-y: scroll;
`;

const Modal = () => (
    <Container>
        <Header
            left={<IconButton image={icons.back} type="button" size={16} />}
        >Filters</Header>
        TODO
    </Container>
);

export default compose(
    lifecycle({
        componentDidMount() {
            this.overflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';

        },
        componentWillUnmount() {
            document.body.style.overflow = this.overflow;
        }
    }),
)(Modal);
