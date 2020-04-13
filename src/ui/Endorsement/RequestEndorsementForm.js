import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { t } from 'ttag';
import styled from '@emotion/styled';
import UserSelectField from '../Form/UserSelectField';
import InputField from '../Form/InputField';
import Button from '../Button';
import ModalDialog from '../Modal/ModalDialog';
import EndorsementInfo from './EndorsementInfo';

const Form = styled('form')({
    marginTop:    12,
    marginBottom: 12,
    padding:      12,
});

const RequestEndorsementForm = ({ handleSubmit, onClose }) => (
    <ModalDialog variant="big" title={t`Request endorsement`} onClose={onClose} onEscape={onClose}>
        <EndorsementInfo closed />
        <Form method="POST" onSubmit={handleSubmit}>
            <Field
                name="requestRecipient"
                component={UserSelectField}
                required
                label={t`Endorsement recipient`}
                help={t`Person within endorser organisation`}
            />

            <Field
                name="requestMessage"
                component={InputField}
                label={t`Endorsement request message`}
                help={t`Explain the reason for endorsement`}
                multiLine
                required
            />

            <Button type="submit" label={t`Request endorsement`} variant="primary" fullWidth />
        </Form>
    </ModalDialog>
);

RequestEndorsementForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onClose:      PropTypes.func.isRequired,
};

export default RequestEndorsementForm;
