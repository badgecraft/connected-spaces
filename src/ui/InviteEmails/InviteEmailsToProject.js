import { compose, getContext, withHandlers } from 'recompose';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';
import { msgid, ngettext, t } from 'ttag';
import _get from 'lodash/get';
import View from './InviteEmailsView';
import inviteMutation from './inviteEmailsToProject.gql';
import infoQuery from './inviteEmailsToProjectInfo.gql';
import uiFormValidateHandler from '../uiFormValidateHandler';
import withFlash from '../Flash/withFlash';

const toTeamName = value => {
    switch (value) {
        case 'users':
            return t`Earner`;
        case 'admins':
            return t`Admin`;
        case 'owners':
            return t`Owner`;
        default:
            return value;
    }
};

const InviteEmailsToProject = compose(
    withFlash,
    getContext({ pushRoute: PropTypes.func.isRequired }),
    graphql(inviteMutation, { name: 'runInvite' }),
    graphql(infoQuery, {
        options: { errorPolicy: 'all' },
        props:   ({ data, ownProps: { claimPath } }) => {
            const joinType = _get(data, 'maybeProject.project.joinType');
            const joinUUID = _get(data, 'maybeProject.project.joinUUID');
            return {
                teams:    (_get(data, 'maybeProject.project.inviteTeams') || []).map(value => ({
                    label: toTeamName(value),
                    value,
                })),
                autoJoin: (joinType === 'join' && joinUUID && claimPath) ? {
                    name:  _get(data, 'maybeProject.project.name'),
                    title: t`Scan code or access url to join this activity`,
                    code:  joinUUID,
                    claimPath,
                } : null,
            };
        },
    }),

    withHandlers({
        onClose:  ({ pushRoute, cancelTo }) => () => pushRoute(cancelTo),
        onSubmit: ({ runInvite, id, pushRoute, cancelTo, flash }) => ({ to = [], ...values }) =>
            runInvite({
                variables:      { ...values, id, to: to.filter(item => item && item.value) },
                refetchQueries: ['projectUsers'],
            })
                .then(uiFormValidateHandler({
                    mutation:     'inviteToProject4',
                    translations: {
                        required:     () => t`Required`,
                        invalidEmail: () => t`Please check that email you'v entered is valid`,
                    },
                }))
                .then((res) => {
                    const count = (_get(res, 'invites') || []).filter(item => item && item.createdInvite).length;
                    pushRoute(cancelTo);
                    flash(ngettext(msgid`${count} user invited`, `${count} users invited`, count));
                }),
    }),
    reduxForm({
        form:          'InviteEmailsToProject',
        initialValues: {
            to: [
                { team: 'users', type: 'email', value: '' },
                { team: 'users', type: 'email', value: '' },
            ],
        },
    }),
)(View);

InviteEmailsToProject.propTypes = {
    cancelTo: PropTypes.shape({
        to:     PropTypes.string.isRequired,
        params: PropTypes.shape({}).isRequired,
    }).isRequired,
};

InviteEmailsToProject.displayName = 'InviteEmailsToProject';

export default InviteEmailsToProject;
