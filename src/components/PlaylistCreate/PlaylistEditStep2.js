import { t } from 'ttag';
import { reduxForm, formValueSelector, change } from 'redux-form';
import { compose, withHandlers, withState, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { translations } from './playlistUtils';
import mutation from './playlistUpdate.gql';
import validationHandler from '../../core/formValidationResult';
import Step2 from './PlaylistStep2';

const selectValue = formValueSelector('PlaylistEdit');

export default compose(
    graphql(mutation, { name: 'runMutation' }),
    withState('newActivityOpen', 'setNewActivityOpen', false),
    withHandlers({
        onSubmit: ({ runMutation, nextStep, playlist: { id } }) => values =>
            runMutation({ variables: { ...values, dryRun: true, id } })
                .then(validationHandler({
                    generalError: t`Please fix errors above`,
                    mutation:     "updateProject",
                    translations,
                    onlyFields:   ['playlistActivities'],
                }))
                .then(nextStep),
    }),
    reduxForm({
        form:                     'PlaylistEdit',
        destroyOnUnmount:         false,
        forceUnregisterOnUnmount: true,
    }),
    withProps(({ playlist }) => ({ organisation: playlist.organisationId })),
    connect(
        state => ({ playlistActivities: selectValue(state, 'playlistActivities') }),
        dispatch => ({
            updatePlaylistActivities: list => dispatch(change(
                'PlaylistEdit',
                'playlistActivities',
                list
            )),
        }),
        ({ playlistActivities, ...stateProps }, { updatePlaylistActivities, ...actions }, ownProps) => ({
            appendActivity: project => updatePlaylistActivities(
                [...playlistActivities, { id: project.id, mandatory: false }],
            ),
            ...stateProps,
            ...actions,
            ...ownProps,
        }),
    ),
)(Step2);
