import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rebass/emotion';
import Layout from '../Layout';
import Viewport from '../../ui/Layout/Viewport';
import Form from '../../ui/Organisation/OrganisationRequestVerify';
import paths from '../../constants/paths';

const OrganisationRequestVerifyPage = ({ id, ...props }) => (
    <Layout {...props}>
        <Viewport>
            <Box my={3}>
                <Form
                    id={id}
                    cancelPath={{ to: paths.orgDashboardSettings, params: { id } }}
                    afterPath={{ to: paths.orgDashboardSettings, params: { id } }}
                />
            </Box>
        </Viewport>
    </Layout>
);

OrganisationRequestVerifyPage.propTypes = {
    id: PropTypes.string.isRequired,
};

export default OrganisationRequestVerifyPage;
