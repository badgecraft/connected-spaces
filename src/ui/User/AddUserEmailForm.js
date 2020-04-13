import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose, renderNothing, branch, withHandlers } from 'recompose';
import { reduxForm } from 'redux-form';
import { t } from 'ttag';
import View from './AddUserEmailFormView';
import addEmail from './addUserEmailMutation.gql';
import uiFormValidateHandler from '../uiFormValidateHandler';
import withFormReset from '../Form/withFormReset';

const AddUserEmailForm = compose(
    branch(({ open }) => !open, renderNothing),
    graphql(addEmail, { name: 'runAddEmail' }),
    withFormReset({ form: 'AddUserEmail' }),
    withHandlers({
        onSubmit: ({ runAddEmail, platform, onClose, resetForm, onAdded }) => values =>
            runAddEmail({ variables: { ...values, platform } })
                .then(uiFormValidateHandler({
                    mutation:     'addEmail',
                    translations: {
                        'email.invalidEmail': () => t`Please provide a valid email`,
                        'email.alreadyUsed':  () => t`Email you'v provided is already use by other user`,
                    },
                }))
                .then(resetForm)
                .then(onClose)
                .then(() => onAdded(values.email)),
    }),
    reduxForm({
        form:          'AddUserEmail',
        initialValues: {
            email: '',
        },
    }),
)(View);

AddUserEmailForm.propTypes = {
    open:     PropTypes.bool.isRequired,
    platform: PropTypes.string.isRequired,
    onAdded:  PropTypes.func.isRequired,
};

export default AddUserEmailForm;
