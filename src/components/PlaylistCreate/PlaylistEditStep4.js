import { t } from 'ttag';
import { reduxForm, reset, formValueSelector } from 'redux-form';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { translations } from './playlistUtils';
import mutation from './playlistUpdate.gql';
import validationHandler from '../../core/formValidationResult';
import withPushRoute from '../_helpers/withLocationChange';
import paths from '../../constants/paths';
import Step4 from './PlaylistStep4';

const selector = formValueSelector('PlaylistEdit');

export default compose(
    connect(
        state => ({ idList: (selector(state, 'playlistActivities') || []).map(item => _get(item, 'id', '')) }),
        dispatch => ({ resetForm: () => dispatch(reset('PlaylistEdit')) }),
    ),
    withPushRoute,
    graphql(mutation, { name: 'runMutation' }),
    withHandlers({
        onSubmit: ({ runMutation, pushRoute, resetForm, noStep, playlist: { id } }) => values =>
            runMutation({ variables: { ...values, skills: [], dryRun: false, id } })
                .then(validationHandler({
                    generalError: t`Please fix errors above`,
                    mutation:     'updateProject',
                    translations,
                    onlyFields:   ['playlistActivities'],
                }))
                .then(({ project }) => {
                    noStep();
                    pushRoute({ to: paths.playlistFinalize, params: project });
                    resetForm();
                }),
    }),
    reduxForm({
        form:                     'PlaylistEdit',
        destroyOnUnmount:         false,
        forceUnregisterOnUnmount: true,
    }),
)(Step4);
