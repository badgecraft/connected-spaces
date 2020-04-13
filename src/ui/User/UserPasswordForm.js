import { reduxForm } from 'redux-form';
import { compose, withHandlers, branch, renderNothing, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import { t, ngettext, msgid } from 'ttag';
import _get from 'lodash/get';
import withFormReset from '../Form/withFormReset';
import View from './UserPasswordFormView';
import changeMutation from './updateUserPasswordMutation.gql';
import createMutation from './createUserPasswordMutation.gql';
import uiFormValidateHandler, { withTranslationArguments } from '../uiFormValidateHandler';

const UserPasswordForm = compose(
    branch(({ me }) => !me, renderNothing),
    withProps(({ me }) => ({
        type: (_get(me, 'connections') || []).find(item => item && item.type === 'password')
                  ? 'change'
                  : 'create',
    })),
    withFormReset({ form: 'UserPassword' }),
    graphql(changeMutation, { name: 'runChange' }),
    graphql(createMutation, { name: 'runCreate' }),
    withHandlers({
        onSubmit: ({ type, runCreate, runChange, resetForm }) => variables =>
            (type === 'create' ? runCreate : runChange)({ variables })
                .then(uiFormValidateHandler({
                    mutation:     type === 'create' ? 'createPassword' : 'changePassword',
                    translations: {
                        required:                () => t`Required`,
                        invalidPassword:         () => t`Password is invalid`,
                        tooShort:                withTranslationArguments(
                            { min: 'number' },
                            ({ min }) => ngettext(
                                msgid`Password must be at least ${min} character long`,
                                `Password must be at least ${min} characters long`,
                                min,
                            ),
                        ),
                        doNotMatch:              () => t`Passwords do not match`,
                        alreadyHasPassword:      () => t`You already have a password`,
                        primaryEmailNotVerified: () => t`Primary email must be verified to create password`,
                    },
                }))
                .then(resetForm),
    }),
    reduxForm({
        form:          'UserPassword',
        initialValues: {
            cPassword:  '',
            password:   '',
            rePassword: ''
        },
    }),
)(View);

UserPasswordForm.displayName = 'UserPasswordForm';

export default UserPasswordForm;
