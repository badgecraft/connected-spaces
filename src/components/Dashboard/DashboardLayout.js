import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from '../Layout';
import { withDashboardMenuItems } from './OrganisationDashboardMenu';
import Switcher from '../../ui/OrganisationSwitcher';
import Menu, { SecondaryContainer } from '../../ui/Menu/SecondaryTopMenu';
import paths from '../../constants/paths';

export const SwitcherRoot = styled('div')({
    marginTop:      12,
    marginBottom:   12,
    minHeight:      74,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
});

const DashboardMenu = withDashboardMenuItems(Menu);

const DashboardLayout = ({ organisation, tab, children, action, viewer, ...props }) => (
    <Layout viewer={viewer} contextOrganisation={organisation} {...props}>
        <DashboardMenu id={organisation} fromTablet tab={tab}>
            <SwitcherRoot>
                <Switcher
                    organisation={organisation}
                    viewer={viewer}
                    organisationPath={paths.orgDashboard}
                    personalPath={paths.personalDashboard}
                />
                {action}
            </SwitcherRoot>
        </DashboardMenu>
        <SecondaryContainer>{children}</SecondaryContainer>
    </Layout>
);

DashboardLayout.propTypes = {
    organisation: PropTypes.string.isRequired,
    children:     PropTypes.node.isRequired,
    tab:          PropTypes.string.isRequired,
    viewer:       PropTypes.shape(),
    action:       PropTypes.node,
};

DashboardLayout.defaultProps = {
    viewer: null,
    action: null,
};

export default DashboardLayout;
