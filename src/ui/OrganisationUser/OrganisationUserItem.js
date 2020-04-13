import { graphql } from 'react-apollo';
import { compose, withHandlers, withProps } from 'recompose';
import _get from 'lodash/get';
import { t } from 'ttag';
import View, { OrganisationUserItemHeaderView } from './OrganisationUserItemView';
import runCommandMutation from './runOrganisationUserCommandMutation.gql';
import { runOnConfirm } from '../uiUtils';
import updateUserMutation from './updateOragnisationUserMutation.gql';
import revokeInvite from './revokeOrganisationInviteMutation.gql';

const OrganisationUserItem = compose(
    withProps(({ item }) => ({
        organisation: _get(item, 'organisation.id'),
        user:         _get(item, 'user.id'),
    })),
    graphql(runCommandMutation, { name: 'runCommand' }),
    graphql(updateUserMutation, { name: 'runOrganisationUserUpdate' }),
    graphql(revokeInvite, { name: 'runRevokeInvite' }),
    withHandlers({
        onGrantOwner:   ({ runCommand, item: { id } }) => () =>
            runCommand({ variables: { id, command: 'grantOwner' } }),
        onGrantAdmin:   ({ runCommand, item: { id } }) => () =>
            runCommand({ variables: { id, command: 'grantAdmin' } }),
        onRevokeOwner:  ({ runCommand, item: { id } }) => () =>
            runCommand({ variables: { id, command: 'revokeOwner' } }),
        onRevokeAdmin:  ({ runCommand, item: { id } }) => () =>
            runCommand({ variables: { id, command: 'revokeAdmin' } }),
        onRevokeUser:   ({ runOrganisationUserUpdate, user, organisation }) => () => runOnConfirm({
            question: t`Do you want to remove this user?`,
            func:     () => runOrganisationUserUpdate({
                variables:      { organisation, user, action: 'revokeUser' },
                refetchQueries: ['organisationUsers'],
            }),
        }),
        onRevokeInvite: ({ runRevokeInvite, item: { id } }) => () => runOnConfirm({
            question: t`Do you want to remove this invite?`,
            func:     () => runRevokeInvite({
                variables:      { id },
                refetchQueries: ['organisationUsers'],
            }),
        }),
    }),
)(View);

export default OrganisationUserItem;

export const OrganisationUserItemHeader = OrganisationUserItemHeaderView;
