import { compose, getContext, withHandlers } from 'recompose';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';
import { msgid, ngettext, t } from 'ttag';
import _get from 'lodash/get';
import View from './InviteEmailsView';
import inviteToOrganisation from './inviteEmailsToOrganisation.gql';
import infoQuery from './inviteEmailsToOrganisationInfo.gql';
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

const InviteEmailsToOrganisation = compose(
    withFlash,
    getContext({ pushRoute: PropTypes.func.isRequired }),
    graphql(inviteToOrganisation, { name: 'runInvite' }),
    graphql(infoQuery, {
        props: ({ data, ownProps: { claimPath } },) => {
            const joinType = _get(data, 'organisation.joinType');
            const joinUUID = _get(data, 'organisation.joinUUID');
            return {
                teams:    (_get(data, 'organisation.inviteTeams') || []).map(value => ({
                    label: toTeamName(value),
                    value,
                })),
                autoJoin: (joinType === 'join' && joinUUID) ? {
                    name:  _get(data, 'organisation.name'),
                    title: t`Scan code or access url to join this organisation`,
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
                refetchQueries: ['organisationUsers'],
            })
                .then(uiFormValidateHandler({
                    mutation:     'inviteToOrganisation3',
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
        form:          'InviteEmailsToOrganisation',
        initialValues: {
            to: [
                { team: 'users', type: 'email', value: '' },
                { team: 'users', type: 'email', value: '' },
            ],
        },
    }),
)(View);

InviteEmailsToOrganisation.propTypes = {
    cancelTo: PropTypes.shape({
        to:     PropTypes.string.isRequired,
        params: PropTypes.shape({}).isRequired,
    }).isRequired,
};

InviteEmailsToOrganisation.displayName = 'InviteEmailsToOrganisation';

export default InviteEmailsToOrganisation;
