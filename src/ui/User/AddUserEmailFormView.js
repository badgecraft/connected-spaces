import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import { Field } from 'redux-form';
import { withProps } from 'recompose';
import { themedMinWidth } from '../uiUtils';
import Dialog from '../Modal/ModalDialog';
import Button from '../Button';
import Input from '../Form/InputField';

const Buttons = styled('div')(({ theme }) => ({
    padding:   '0 12px',
    textAlign: 'center',

    [themedMinWidth('tablet', theme)]: {
        textAlign: 'right',
    },
}));

const Cancel = withProps({ type: 'button', variant: 'secondary', label: t`Cancel` })(Button);
const Add = withProps({ type: 'submit', variant: 'primary', label: t`Add` })(Button);

const AddUserEmailFormView = ({ handleSubmit, submitting, onClose }) => (
    <Dialog variant="default" title={t`Add email`} onEscape={onClose} onClose={onClose}>
        <form onSubmit={handleSubmit}>
            <Field
                name="email"
                component={Input}
                disabled={submitting}
                label={t`Email`}
            />

            <Buttons>
                <Cancel disabled={submitting} onClick={onClose} />
                {' '}
                <Add disabled={submitting} />
            </Buttons>
        </form>
    </Dialog>
);

AddUserEmailFormView.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting:   PropTypes.bool.isRequired,
    onClose:      PropTypes.func.isRequired,
};

export default AddUserEmailFormView
