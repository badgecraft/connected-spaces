import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors, breakpoints } from '../Constants';

const Container = styled('fieldset')({
    border:               '0 none',
    margin:               '8px auto',
    boxShadow:            '0 3px 12px 0 rgba(48,6,114,0.11)',
    width:                '100%',
    padding:              '33px 16px 0 16px',
    [breakpoints.tablet]: {
        width: 697,
    },
    legend:               {
        position:   'relative',
        top:        29,
        fontSize:   18,
        fontWeight: 'bold',
        lineHeight: '24px',
        color:      Colors.heading,
    },
    '&:last-child':       {
        marginBottom: 37,
    },
});

const FieldSet = ({ title, children, ...props }) => (
    <Container {...props}>
        <legend>{title}</legend>
        {children}
    </Container>
);

FieldSet.propTypes = {
    title:    PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
};

export default FieldSet;
