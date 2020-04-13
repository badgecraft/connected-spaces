import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../Layout';
import Menu, { SecondaryContainer } from '../../ui/Menu/SecondaryTopMenu';
import Switcher from '../../ui/OrganisationSwitcher';
import { SwitcherRoot } from './DashboardLayout';
import { dashboardMenuItems } from '../UserSettings/UserDashboardMenu';
import paths from '../../constants/paths';

const PersonalLayout = ({ tab, children, action, viewer, ...props }) => (
    <Layout viewer={viewer} {...props}>
        <Menu fromTablet items={dashboardMenuItems(tab)}>
            <SwitcherRoot>
                <Switcher
                    organisation=""
                    viewer={viewer}
                    organisationPath={paths.orgDashboard}
                    personalPath={paths.personalDashboard}
                />
                {action}
            </SwitcherRoot>
        </Menu>
        <SecondaryContainer>{children}</SecondaryContainer>
    </Layout>
);

PersonalLayout.propTypes = {
    tab:      PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    viewer:   PropTypes.shape(),
    action:   PropTypes.node,
};

PersonalLayout.defaultProps = {
    viewer: null,
    action: null,
};

export default PersonalLayout;
