import React from 'react';
import PropTypes from 'prop-types';
import withActivity from '../../ui/Activity/withActivity';
import Layout from './ActivityLayout';
import Viewport from './ActivityViewport';
import Invites from '../../ui/ProjectUser/ProjectInviteList';
import Invite from '../../ui/ProjectUser/ProjectUserInviteDialog';
import { paths } from '../Constants';

const ActivityInvites = ({ id, invite, initial, project, ...props }) => (
    <Layout tab="invites" project={project} {...props}>
        <Viewport>
            <Invites
                id={id}
                initial={initial}
                offset={0}
                perms={project.perms}
                inviteTo={{ to: paths.activityInvites, params: { id }, query: { invite: '1' } }}
            />
            {invite && (<Invite
                project={id}
                cancelTo={{ to: paths.activityUsers, params: { id } }}
                claimPath={paths.claimByCode}
            />)}
        </Viewport>
    </Layout>
);

ActivityInvites.propTypes = {
    id:      PropTypes.string.isRequired,
    invite:  PropTypes.bool.isRequired,
    initial: PropTypes.shape({}).isRequired,
    project: PropTypes.shape({
        perms: PropTypes.shape({}).isRequired,
    }).isRequired,
};

export default withActivity(ActivityInvites);
