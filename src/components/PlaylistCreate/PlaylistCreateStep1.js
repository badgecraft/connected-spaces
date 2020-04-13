import { t } from 'ttag';
import { reduxForm } from 'redux-form';
import { compose, withHandlers, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import mutation from './playlistCreate.gql';
import validationHandler from '../../core/formValidationResult';
import { translations } from './playlistUtils';
import Step1 from './PlaylistStep1';

export default compose(
    withProps(({ initialOrganisation = null }) => ({
        initialValues: {
            name:                      '',
            description:               '',
            skills:                    [],
            organisation:              initialOrganisation,
            coOrganisers:              [],
            coverPicture:              null,
            playlistActivities:        [],
            playlistActivitiesOrdered: false,
        },
    })),
    graphql(mutation, { name: 'runMutation' }),
    withHandlers({
        onSubmit: ({ runMutation, nextStep }) => values =>
            runMutation({ variables: { ...values, dryRun: true } })
                .then(validationHandler({
                    generalError: t`Please fix errors above`,
                    mutation:     'createProject',
                    translations,
                    onlyFields:   ['name', 'description', 'skills', 'organisation', 'coOrganisers', 'coverPicture',
                        'videos'],
                }))
                .then(nextStep),
    }),
    reduxForm({
        form:                     'PlaylistCreate',
        destroyOnUnmount:         false,
        forceUnregisterOnUnmount: true,
    }),
)(Step1);
