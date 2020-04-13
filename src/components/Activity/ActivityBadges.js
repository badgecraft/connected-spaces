import React from 'react';
import PropTypes from 'prop-types';
import withActivity from '../../ui/Activity/withActivity';
import Layout from './ActivityLayout';
import Viewport from './ActivityViewport';
import Badges from '../../ui/Badge/ProjectBadges';
import Issue from '../../ui/IssueBadge/IssueBadgeForm';
import { paths } from '../Constants';

const ActivityBadges = ({ id, initial, project, issueBadgeClass, ...props }) => (
    <Layout tab="badges" project={project} {...props}>
        <Viewport>
            <Badges
                id={id}
                initial={initial}
                project={project}
            />
            <Issue
                id={issueBadgeClass}
                closeTo={{ to: paths.activityBadges, params: { id } }}
                claimPath={paths.claimByCode}
            />
        </Viewport>
    </Layout>
);

ActivityBadges.propTypes = {
    id:              PropTypes.string.isRequired,
    project:         PropTypes.shape({}).isRequired,
    initial:         PropTypes.shape({}).isRequired,
    issueBadgeClass: PropTypes.string,
};

ActivityBadges.defaultProps = {
    issueBadgeClass: null,
};

export default withActivity(ActivityBadges);
