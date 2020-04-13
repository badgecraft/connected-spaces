import { graphql } from 'react-apollo';
import { compose, withHandlers, withProps } from 'recompose';
import _get from 'lodash/get';
import { t } from 'ttag';
import View, { ProjectUserItemHeaderView } from './ProjectUserItemView';
import { runOnConfirm } from '../uiUtils';
import updateUserMutation from './updateProjectUserMutation.gql';
import revokeInviteMutation from './revokeProjectInviteMutation.gql';
import runCommandMutation from './runProjectUserCommandMutation.gql';

export default compose(
    withProps(({ item }) => ({
        project: _get(item, 'project.id'),
        user:    _get(item, 'user.id'),
    })),
    graphql(updateUserMutation, { name: 'runProjectUserUpdate' }),
    graphql(revokeInviteMutation, { name: 'runRevokeInvite' }),
    graphql(runCommandMutation, { name: 'runCommand' }),
    withHandlers({
        onGrantOwner:   ({ runCommand, item: { id } }) => () =>
            runCommand({ variables: { id, command: 'grantOwner' } }),
        onGrantAdmin:   ({ runCommand, item: { id } }) => () =>
            runCommand({ variables: { id, command: 'grantManager' } }),
        onRevokeOwner:  ({ runCommand, item: { id } }) => () =>
            runCommand({ variables: { id, command: 'revokeOwner' } }),
        onRevokeAdmin:  ({ runCommand, item: { id } }) => () =>
            runCommand({ variables: { id, command: 'revokeManager' } }),
        onRevokeUser:   ({ runProjectUserUpdate, user, project }) => () => runOnConfirm({
            question: t`Do you want to remove this user?`,
            func:     () => runProjectUserUpdate({
                variables:      { project, user, action: 'revokeUser' },
                refetchQueries: ['projectUsers'],
            }),
        }),
        onRevokeInvite: ({ runRevokeInvite, item }) => () => runOnConfirm({
            question: t`Do you want to remove invite?`,
            func:     () => runRevokeInvite({
                variables:      { id: item.id },
                refetchQueries: ['projectUsers'],
            }),
        }),
    }),
)(View);

export const ProjectUserItemHeader = ProjectUserItemHeaderView;
