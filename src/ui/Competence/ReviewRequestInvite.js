import PropTypes from 'prop-types';
import { compose, getContext, withHandlers } from 'recompose';
import { reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';
import { t } from 'ttag';
import View from './ReviewRequestInviteView';
import mutation from './inviteToCompetenceReview.gql';
import uiFormValidateHandler from '../uiFormValidateHandler';
import withFlash from '../Flash/withFlash';

const ReviewRequestInvite = compose(
    withFlash,
    getContext({
        pushRoute: PropTypes.func.isRequired,
        paths:     PropTypes.shape({
            eventRequestView: PropTypes.string.isRequired,
        }).isRequired,
    }),
    graphql(mutation, { name: 'runInvite' }),
    withHandlers({
        onClose:  ({ id, paths, pushRoute }) => () => pushRoute({
            to:     paths.eventRequestView,
            params: { id }
        }, { disableNextScroll: true }),
        onSubmit: ({ runInvite, id, pushRoute, flash, paths }) => ({ to = [] }) => runInvite({
            variables:      { id, to: to.filter(inv => inv.value) },
            refetchQueries: ['requestedReviews'],
        })
            .then(uiFormValidateHandler({
                mutation:     'inviteToCompetenceReview',
                translations: {
                    required:     () => t`Required`,
                    invalidEmail: () => t`Please check that email you'v entered is valid`,
                },
            }))
            .then(() => {
                pushRoute({
                    to:     paths.eventRequestView,
                    params: { id }
                }, { disableNextScroll: true });
                flash(t`Review requests sent.`);
            }),
    }),
    reduxForm({
        form:          'inviteToCompetenceReview',
        initialValues: {
            to: [
                { type: 'email', value: '' },
                { type: 'email', value: '' },
            ],
        },
    }),
)(View);

ReviewRequestInvite.propTypes = {
    id: PropTypes.string.isRequired,
};

ReviewRequestInvite.displayName = 'ReviewRequestInvite';

export default ReviewRequestInvite;
