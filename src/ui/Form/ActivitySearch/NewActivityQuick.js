import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import { compose, withHandlers } from 'recompose';
import { reduxForm, Field } from 'redux-form';
import { graphql } from 'react-apollo';
import Button from '../../Button';
import Input from '../InputField';
import mutation from './newActivityQuick.gql';
import validationHandler from '../../uiFormValidateHandler';
import Dialog from '../../Modal/ModalDialog';

const NewActivityQuick = ({ onCancel, handleSubmit, submitting }) => (
    <Dialog onClose={onCancel} onEscape={onCancel} title={t`New Activity`}>
        <form method="POST" onSubmit={handleSubmit}>
            <Field
                name="name"
                component={Input}
                placeholder={t`Type the name of activity`}
                disabled={submitting}
                autoFocus
                maxLength={90}
            />

            <Button label={t`Save`} variant="primary" />
        </form>
    </Dialog>
);

NewActivityQuick.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onCancel:     PropTypes.func.isRequired,
    submitting:   PropTypes.bool.isRequired,
};

export default compose(
    graphql(mutation, { name: 'runMutation' }),
    withHandlers({
        onSubmit: ({ runMutation, organisation, onSuccess }) => values =>
            runMutation({ variables: { organisation, ...values } })
                .then(validationHandler({
                    generalError: t`Please fix errors above`,
                    mutation:     'createProject',
                    translations: {
                        required: () => t`Please enter name for new activity`,
                        tooLong:  ({ max }) => t`Name cannot exceed ${max} characters`,
                    },
                }))
                .then(({ project }) => onSuccess(project)),
    }),
    reduxForm({
        form: 'QuickActivity',
    }),
)(NewActivityQuick);
