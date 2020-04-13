import React from 'react';
import PropTypes from 'prop-types';
import withActivity from '../../ui/Activity/withActivity';
import Layout from './ActivityLayout';
import Viewport from './ActivityViewport';
import Users from '../../ui/ProjectUser/ProjectUserList';
// todo remove when were sure not to restore it
// import Invite from '../../ui/ProjectUser/ProjectUserInviteDialog';
import { paths } from '../Constants';
import Invite from '../../ui/InviteEmails/InviteEmailsToProject';

const ActivityUsers = ({ id, initial, project, invite, ...props }) => (
    <Layout {...props} tab="users" project={project}>
        <Viewport>
            <Users
                id={id}
                initial={initial}
                perms={project.perms}
                offset={0}
                inviteTo={{ to: paths.activityUsersInvite, params: { id } }}
                viewerPreferences={project.viewerPreferences}
            />
            {invite && (
                <Invite
                    id={id}
                    cancelTo={{ to: paths.activityUsers, params: { id } }}
                    claimPath={paths.claimByCode}
                />
            )}
        </Viewport>
    </Layout>
);

ActivityUsers.propTypes = {
    id:      PropTypes.string.isRequired,
    initial: PropTypes.shape().isRequired,
    invite:  PropTypes.bool.isRequired,
    project: PropTypes.shape({
        perms:             PropTypes.shape().isRequired,
        viewerPreferences: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
};

export default withActivity(ActivityUsers);
