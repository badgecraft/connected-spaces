import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import Layout from './DashboardLayout';
import Button from '../../ui/Button';
import { themedMinWidth, withVisibilityStyle } from '../../ui/uiUtils';
import Users from '../../ui/OrganisationUser/OrganisationUserList';
import { paths } from '../Constants';
// todo remove when were sure not to restore it
// import Invite from '../../ui/OrganisationUser/OrganisationUserInviteDialog';
import InviteEmailsToOrganisation from '../../ui/InviteEmails/InviteEmailsToOrganisation';

// todo check permission before displaying create button

const Actions = styled('div')({
    margin:    '12px',
    textAlign: 'center',
}, withVisibilityStyle);

const Root = styled('div')(({ theme }) => ({
    marginTop:    16,
    marginBottom: 32,
    padding:      '0 16px',

    [themedMinWidth('tablet', theme)]: {
        padding: 0,
    },
}));

const OrganisationDashboardUsersView = ({ id, organisation, initial, displayInvite, ...props }) => {
    const create = (<Button
        label={t`Invite user`}
        type="link"
        variant="primary"
        to={paths.orgDashboardUsersInvite}
        params={{ id }}
    />);
    return (
        <Layout
            {...props}
            organisation={id}
            tab="users"
            action={create}
        >
            <Root>
                <Actions mobileOnly>{create}</Actions>
                <Users
                    id={id}
                    initial={initial}
                    offset={0}
                    inviteTo={{ to: paths.orgDashboardUsersInvite, params: { id } }}
                    perms={organisation.perms}
                    viewerPreferences={organisation.viewerPreferences}
                />
                {displayInvite && <InviteEmailsToOrganisation
                    id={id}
                    cancelTo={{ to: paths.orgDashboardUsers, params: { id } }}
                    claimPath={paths.claimByCode}
                />}
            </Root>
        </Layout>
    );
};

OrganisationDashboardUsersView.propTypes = {
    id:            PropTypes.string.isRequired,
    organisation:  PropTypes.shape({
        perms:             PropTypes.shape().isRequired,
        viewerPreferences: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
    initial:       PropTypes.shape({}).isRequired,
    displayInvite: PropTypes.bool.isRequired,
};

export default OrganisationDashboardUsersView;
