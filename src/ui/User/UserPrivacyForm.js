import { reduxForm } from 'redux-form';
import { compose, withHandlers, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import _pick from 'lodash/pick';
import View from './UserPrivacyFormView';
import mutation from './updateUserPrivacyMutation.gql';
import uiFormValidateHandler from '../uiFormValidateHandler';

const UserPrivacyForm = compose(
    graphql(mutation, { name: 'runUpdate' }),
    withProps(({ me }) => ({
        initialValues: _pick(me, ['defaultBadgePolicy', 'defaultEvidencePolicy', 'emailViewType']),
    })),
    withHandlers({
        onSubmit: ({ runUpdate }) => variables =>
            runUpdate({ variables })
                .then(uiFormValidateHandler({ mutation: 'updateMe' })),
    }),
    reduxForm({
        form:               'UserPrivacy',
        enableReinitialize: true,
    }),
)(View);

UserPrivacyForm.displayName = 'UserPrivacyForm';

export default UserPrivacyForm;
