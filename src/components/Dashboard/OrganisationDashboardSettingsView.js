import React from 'react';
import PropTypes from 'prop-types';
import Layout from './DashboardLayout';
import Form from '../Space/SpaceEdit';
import VerifyBox from '../../ui/Organisation/OrganisationRequestVerifyBox';
import paths from '../../constants/paths';

const OrganisationDashboardSettingsView = ({ id, organisation, ...props }) => (
    <Layout {...props} tab="settings" organisation={id}>
        <VerifyBox id={id} verifyPath={paths.requestOrganisationVerify} />
        <Form id={id} organisation={organisation} />
    </Layout>
);

OrganisationDashboardSettingsView.propTypes = {
    id:           PropTypes.string.isRequired,
    organisation: PropTypes.shape({}).isRequired,
};

export default OrganisationDashboardSettingsView;
