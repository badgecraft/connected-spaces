import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _pick from 'lodash/pick';
import { t } from 'ttag';
import { Colors } from '../Constants';

const Container = styled.div`
    margin: 14px 0;
`;

const Label = styled.label`
    font-weight: 500;
    color: ${Colors.heading};
    font-size: 12px;
    line-height: 23px;
`;

const Help = styled.p`
    font-weight: 300;
    color: ${Colors.heading};
    font-size: 12px;
    line-height: 16px;
`;

const Field = styled.div`
    margin: 5px 0;
    flex-grow: 1;
`;

const Error = styled.div`
    font-size: 12px;
    line-height: 14px;
    color: ${Colors.error};
    min-height: 14px;
`;

const FormField = ({ label, help, error, children, required, ...props }) => (
    <Container {..._pick(props, 'className')}>
        {label && <Label>{label}{!required && ` (${t`Optional`})`}</Label>}
        {help && <Help>{help}</Help>}
        <Field>{children}</Field>
        <Error>{error}</Error>
    </Container>
);

FormField.propTypes = {
    label:    PropTypes.node,
    help:     PropTypes.node,
    children: PropTypes.node.isRequired,
    error:    PropTypes.node,
    required: PropTypes.bool,
};

FormField.defaultProps = {
    label:    null,
    help:     null,
    error:    null,
    required: false,
};

export default FormField;
