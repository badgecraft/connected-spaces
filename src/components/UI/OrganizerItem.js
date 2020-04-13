import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors } from '../Constants';

const Container = styled.div`
    padding: 7px;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.1px;
    font-weight: 500;
    color: ${Colors.heading};
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
    vertical-align: middle;
    margin-right: 8px;
    border: 0.5px solid #C4C0D4;
    border-radius: 20px;
`;

const OrganizerItem = ({ name, picture }) => (
    <Container><Image src={picture} alt={name} />{name}</Container>
);

OrganizerItem.propTypes = {
    name:    PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
};

export default OrganizerItem;
