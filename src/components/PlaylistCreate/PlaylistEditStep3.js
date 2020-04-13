import { t } from 'ttag';
import { reduxForm } from 'redux-form';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import mutation from './playlistUpdate.gql';
import validationHandler from '../../core/formValidationResult';
import { translations } from './playlistUtils';
import Step3 from './PlaylistStep3';

export default compose(
    graphql(mutation, { name: 'runMutation' }),
    withHandlers({
        onSubmit: ({ runMutation, nextStep, playlist: { id } }) => values =>
            runMutation({ variables: { ...values, dryRun: true, id } })
                .then(validationHandler({
                    generalError: t`Please fix errors above`,
                    mutation:     'updateProject',
                    translations,
                    onlyFields:   ['playlistActivitiesOrdered', 'playlistActivities'],
                }))
                .then(nextStep),
    }),
    reduxForm({
        form:                     'PlaylistEdit',
        destroyOnUnmount:         false,
        forceUnregisterOnUnmount: true,
    }),
)(Step3);
