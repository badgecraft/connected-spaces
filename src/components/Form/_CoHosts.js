import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Field } from 'redux-form';
import IconButton, { icons } from '../UI/IconButton';
import Input from './_Input';

const CoHostContainer = styled.div`
    margin-bottom: 10px;
`;

// todo remove controls
const CoHosts = ({ fields, meta: { submitting }, newValue, disabled }) => (
    <React.Fragment>
        {fields.map((field, idx) => ( // eslint-disable-next-line react/no-array-index-key
            <CoHostContainer key={idx}>
                <Field
                    name={`${field}.name`}
                    component={Input}
                    disabled={submitting || disabled}
                />
            </CoHostContainer>
        ))}
        <IconButton size={40} image={icons.addDark} type="button" onClick={() => fields.push({ ...newValue })} />
    </React.Fragment>
);

CoHosts.propTypes = {
    fields:   PropTypes.shape({
        push: PropTypes.func.isRequired,
        map:  PropTypes.func.isRequired,
    }).isRequired,
    meta:     PropTypes.shape({ submitting: PropTypes.bool }).isRequired,
    newValue: PropTypes.shape(),
    disabled: PropTypes.bool,
};

CoHosts.defaultProps = {
    newValue: { name: "" },
    disabled: false,
};

export default CoHosts;
