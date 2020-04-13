import { t } from 'ttag';
import { reduxForm } from 'redux-form';
import { compose, withHandlers, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import _pick from 'lodash/pick';
import mutation from './playlistUpdate.gql';
import validationHandler from '../../core/formValidationResult';
import { translations } from './playlistUtils';
import Step1 from './PlaylistStep1';

export default compose(
    withProps(({ playlist }) => ({
        initialValues: {
            ..._pick(playlist, 'name', 'description', 'skills', 'coverPicture', 'playlistActivitiesOrdered'),
            skills:             (playlist.skills || []).map(skill => skill.id),
            videos:             (playlist.videos || []).map(video => _pick(video, 'input')),
            playlistActivities: (playlist.playlistActivities || []).filter(item => item).map(({ project, ...act }) => ({
                id: project.id,
                ..._pick(act, 'mandatory'),
            })),
        },
    })),
    graphql(mutation, { name: 'runMutation' }),
    withHandlers({
        onSubmit: ({ runMutation, nextStep, playlist: { id } }) => values =>
            runMutation({ variables: { ...values, dryRun: true, id } })
                .then(validationHandler({
                    generalError: t`Please fix errors above`,
                    mutation:     "updateProject",
                    translations,
                    onlyFields:   ['name', 'description', 'skills', 'coverPicture', 'videos'],
                }))
                .then(nextStep),
    }),
    reduxForm({
        form:                     'PlaylistEdit',
        enableReinitialize:       true,
        destroyOnUnmount:         false,
        forceUnregisterOnUnmount: true,
    }),
)(Step1);
