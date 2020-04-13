import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { compose, withHandlers, withState } from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _pick from 'lodash/pick';
import _get from 'lodash/get';
import { t } from 'ttag';
import View from '../UserInvite/UserInviteFormAdd';

const toTeamName = team => {
    switch (team) {
        case 'users':
            return t`Users`;
        case 'admins':
            return t`Admins`;
        case 'owners':
            return t`Owners`;
        default:
            return team;
    }
};

const query = gql`
    query organisationInviteTeams($organisation:ID!) {
        organisation(id:$organisation) {
            id
            name
            inviteTeams
            joinType
            joinUUID
        }
    }
`;

const mutation = gql`
    mutation inviteToOrganisation($organisation:ID!, $to:[UserInviteIn!]!) {
        inviteToOrganisation2(id: $organisation, to:$to) {
            ok
            errors {
                field
                code
                args {
                    name
                    value
                }
            }
            invite {
                type
                value
                name
                team
            }
        }
    }
`;


const OrganisationUserAdd = compose(
    graphql(query, {
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
    graphql(mutation, { name: 'runMutation' }),
    withState('inviteStatus', 'setInviteStatus', null),
    withHandlers({
        onSubmit: ({ runMutation, organisation, setInviteStatus }) => ({ to = [] }) => {
            setInviteStatus(null);
            return runMutation({
                variables:      {
                    to: to.map(invite => _pick(invite, 'type', 'name', 'value', 'team')),
                    organisation,
                },
                refetchQueries: ['organisationUsers'],
            }).then(res => setInviteStatus(_get(res, 'data.inviteToOrganisation2')));
        },
    }),
    reduxForm({
        form:          'Invite',
        initialValues: {
            to: [],
        },
    }),
)(View);

OrganisationUserAdd.propTypes = {
    organisation: PropTypes.string.isRequired,
    claimPath:    PropTypes.string.isRequired,
};

OrganisationUserAdd.displayName = 'OrganisationUserAdd';

export default OrganisationUserAdd;
