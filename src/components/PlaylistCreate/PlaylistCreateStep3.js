import { t } from 'ttag';
import { reduxForm } from 'redux-form';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import mutation from './playlistCreate.gql';
import validationHandler from '../../core/formValidationResult';
import { translations } from './playlistUtils';
import Step3 from './PlaylistStep3';

export default compose(
    graphql(mutation, { name: 'runMutation' }),
    withHandlers({
        onSubmit: ({ runMutation, nextStep }) => values =>
            runMutation({ variables: { ...values, dryRun: true } })
                .then(validationHandler({
                    generalError: t`Please fix errors above`,
                    mutation:     'createProject',
                    translations,
                    onlyFields:   ['playlistActivitiesOrdered', 'playlistActivities'],
                }))
                .then(nextStep),
    }),
    reduxForm({
        form:                     'PlaylistCreate',
        destroyOnUnmount:         false,
        forceUnregisterOnUnmount: true,
    }),
)(Step3);
