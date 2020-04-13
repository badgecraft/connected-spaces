import PropTypes from 'prop-types';
import { compose, withHandlers, withState, branch, renderNothing, getContext } from 'recompose';
import { reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import Form from './IssueBadgeFormView';
import query from './issueBadgePrepare.gql';
import mutation from './issueBadgeMutation.gql'

const IssueBadgeForm = compose(
    branch(({ id }) => !id, renderNothing),
    getContext({ pushRoute: PropTypes.func.isRequired }),
    graphql(query, {
        props: ({ data: { loading, ...data } }) => ({
            loading,
            badgeClass: _get(data, 'maybeBadgeClass.badgeClass'),
        }),
    }),
    branch(({ loading, badgeClass }) => (loading && !badgeClass) || !badgeClass, renderNothing),
    graphql(mutation, { name: 'runIssueBadgeMutation' }),
    withState('inviteStatus', 'setInviteStatus', null),
    withHandlers({
        onSubmit: ({ id, runIssueBadgeMutation, setInviteStatus }) => ({ to }) =>
            runIssueBadgeMutation({ variables: { id, to: to.map(issue => _pick(issue, 'type', 'name', 'value')) } })
                .then(res => setInviteStatus(_get(res, 'data.issueBadges'))),
        onClose:  ({ closeTo, pushRoute }) => () => pushRoute(closeTo),
    }),
    reduxForm({
        form:          'IssueBadge',
        initialValues: {
            to: [],
        },
    }),
)(Form);

IssueBadgeForm.propTypes = {
    id:        PropTypes.string,
    closeTo:   PropTypes.shape({ to: PropTypes.string.isRequired, params: PropTypes.shape({}).isRequired }).isRequired,
    claimPath: PropTypes.string.isRequired,
};

export default IssueBadgeForm;
