import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _pick from 'lodash/pick';
import _get from 'lodash/get';
import { t } from 'ttag';
import { font12A2, font12, font16A4, font16A7 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';
import Error from './Error';

const Container = styled('div')(({ variant }) => ({
    textAlign: 'left',
    ...(variant === 'default' && { margin: '14px 0' }),
}));

const Label = styled('label')(({ theme }) => ({
    ...font12A2,
    color:          _get(theme, 'colors.form.text', '#3E3564'),
    lineHeight:     '23px',
    display:        'flex',
    justifyContent: 'space-between',

    [themedMinWidth('tablet', theme)]: {
        ...font16A4,
    },
}));

const Help = styled('p')(({ theme }) => ({
    ...font12,
    color: _get(theme, 'colors.form.text', '#3E3564'),

    [themedMinWidth('tablet', theme)]: {
        ...font16A7,
    },
}));

const Field = styled('div')({
    margin:   '5px 0',
    flexGrow: 1,
});

const L = styled('span')({
    display:        'flex',
    justifyContent: 'space-between',
    width:          '100%',
});
const RO = styled('span')(({ theme }) => ({
    ...font12,
    [themedMinWidth('tablet', theme)]: {
        ...font16A7,
    },
}));

const FormField = ({ label, help, error, fixedErrorContainer, children, required, variant, ...props }) => (
    <Container variant={variant} {..._pick(props, 'className')}>
        {label && <Label><L>{label}</L>{required && <RO>{` (${t`Required`})`}</RO>}</Label>}
        {help && <Help>{help}</Help>}
        <Field>{children}</Field>
        {(error || fixedErrorContainer) && <Error>{error}</Error>}
    </Container>
);

FormField.propTypes = {
    label:               PropTypes.node,
    help:                PropTypes.node,
    children:            PropTypes.node.isRequired,
    error:               PropTypes.node,
    fixedErrorContainer: PropTypes.bool,
    required:            PropTypes.bool,
    variant:             PropTypes.oneOf(['default', 'slim']),
};

FormField.defaultProps = {
    label:               null,
    help:                null,
    error:               null,
    fixedErrorContainer: true,
    required:            false,
    variant:             'default',
};

export default FormField;
