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
            return t`Participants`;
        case 'admins':
            return t`Admins`;
        case 'owners':
            return t`Owners`;
        default:
            return team;
    }
};

const query = gql`
    query projectInviteTeams($project:ID!) {
        project(id:$project) {
            id
            name
            inviteTeams
            joinType
            joinUUID
        }
    }
`;

const mutation = gql`
    mutation inviteToProject($project:ID!, $to:[UserInviteIn!]!) {
        inviteToProject2(id: $project, to:$to) {
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


const ProjectUserAdd = compose(
    graphql(query, {
        options: { errorPolicy: 'all' },
        props:   ({ data, ownProps: { claimPath } }) => {
            const joinType = _get(data, 'project.joinType');
            const joinUUID = _get(data, 'project.joinUUID');
            return {
                teams:    (_get(data, 'project.inviteTeams') || []).map(value => ({
                    label: toTeamName(value),
                    value,
                })),
                autoJoin: (joinType === 'join' && joinUUID && claimPath) ? {
                    name:  _get(data, 'project.name'),
                    title: t`Scan code or access url to join this activity`,
                    code:  joinUUID,
                    claimPath,
                } : null,
            };
        },
    }),
    graphql(mutation, { name: 'runMutation' }),
    withState('inviteStatus', 'setInviteStatus', null),
    withHandlers({
        onSubmit: ({ runMutation, project, setInviteStatus }) => ({ to = [] }) => {
            setInviteStatus(null);
            return runMutation({
                variables:      {
                    to: to.map(invite => _pick(invite, 'type', 'name', 'value', 'team')),
                    project,
                },
                refetchQueries: ['projectUsers'],
            }).then(res => setInviteStatus(_get(res, 'data.inviteToProject2')));
        },
    }),
    reduxForm({
        form:          'InviteToProject',
        initialValues: {
            to: [],
        },
    }),
)(View);

ProjectUserAdd.propTypes = {
    claimPath: PropTypes.string,
    project:   PropTypes.string.isRequired,
    cancelTo:  PropTypes.shape().isRequired,
};

ProjectUserAdd.defaultProps = {
    claimPath: null,
};

ProjectUserAdd.displayName = 'ProjectUserAdd';

export default ProjectUserAdd;
