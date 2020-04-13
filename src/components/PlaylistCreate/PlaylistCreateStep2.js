import { t } from 'ttag';
import { reduxForm, formValueSelector, change } from 'redux-form';
import { compose, withHandlers, withState } from 'recompose';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { translations } from './playlistUtils';
import mutation from './playlistCreate.gql';
import validationHandler from '../../core/formValidationResult';
import Step2 from './PlaylistStep2';

const selectValue = formValueSelector('PlaylistCreate');

export default compose(
    graphql(mutation, { name: 'runMutation' }),
    withState('newActivityOpen', 'setNewActivityOpen', false),
    withHandlers({
        onSubmit: ({ runMutation, nextStep }) => values =>
            runMutation({ variables: { ...values, dryRun: true } })
                .then(validationHandler({
                    generalError: t`Please fix errors above`,
                    mutation:     "createProject",
                    translations,
                    onlyFields:   ['playlistActivities'],
                }))
                .then(nextStep),
    }),
    reduxForm({
        form:                     'PlaylistCreate',
        destroyOnUnmount:         false,
        forceUnregisterOnUnmount: true,
    }),
    connect(
        state => ({
            organisation:       selectValue(state, 'organisation'),
            playlistActivities: selectValue(state, 'playlistActivities'),
        }),
        dispatch => ({
            updatePlaylistActivities: list => dispatch(change(
                'PlaylistCreate',
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
