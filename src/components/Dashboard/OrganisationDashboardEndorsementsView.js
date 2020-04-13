import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from './DashboardLayout';
import List from '../../ui/Endorsement/GivenEndorsementList';
import { themedMinWidth } from '../../ui/uiUtils';

const Root = styled('div')(({ theme }) => ({
    marginTop:    16,
    marginBottom: 32,
    padding:      '0 16px',

    [themedMinWidth('tablet', theme)]: {
        padding: 0,
    },
}));


const OrganisationDashboardEndorsementsView = ({ id, initial, ...props }) => (
    <Layout {...props} tab="endorsements" organisation={id}>
        <Root>
            <List id={id} offset={0} initial={initial} />
        </Root>
    </Layout>
);

OrganisationDashboardEndorsementsView.propTypes = {
    id:      PropTypes.string.isRequired,
    initial: PropTypes.shape().isRequired,
};

export default OrganisationDashboardEndorsementsView;
