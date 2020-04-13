import React from 'react';
import PropTypes from 'prop-types';
import withActivity from '../../ui/Activity/withActivity';
import Layout from './ActivityLayout';
import Viewport from './ActivityViewport';
import Overview from './ActivityOverview';
import AfterCreate from '../Event/EventBadgeAfterCreate';

const ActivityView = ({ project, init, ...props }) => (
    <Layout tab="overview" project={project} {...props}>
        <Viewport>
            <Overview project={project} />
            {init && <AfterCreate id={project.id} project={project} />}
        </Viewport>
    </Layout>
);

ActivityView.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
    init:    PropTypes.bool.isRequired,
};

export default withActivity(ActivityView);
