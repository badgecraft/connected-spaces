import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Error from './Error';

const Root = styled('div')({});

const OtherFormErrorsView = ({ errors }) => (
    <Root>
        {errors.map(({ field, error }) => (
            <Error key={field}>{error}</Error>
        ))}
    </Root>
);

OtherFormErrorsView.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.shape({
        field: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
    })).isRequired,
};

export default OtherFormErrorsView;
