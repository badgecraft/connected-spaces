import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors } from '../Constants';

const Error = styled.span`
    color: ${Colors.error};
`;

const Info = styled.span``;

const FormStatus = ({ info, error }) => {
    if (error) {
        return (<Error>{error}</Error>);
    }

    return (<Info>{info}</Info>);
};

FormStatus.propTypes = {
    info:  PropTypes.string.isRequired,
    error: PropTypes.string,
};

FormStatus.defaultProps = {
    error: null,
};

export default FormStatus;
