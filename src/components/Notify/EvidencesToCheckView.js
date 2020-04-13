import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from '../Dashboard/PersonalLayout';
import List from '../../ui/Notification/EvidenceCheck/EvidenceRowList';
import { themedMinWidth } from '../../ui/uiUtils';

const Root = styled('div')(({ theme }) => ({
    marginTop:    16,
    marginBottom: 32,
    padding:      '0 16px',
    minHeight:    200,

    [themedMinWidth('tablet', theme)]: {
        padding: 0,
    },
}));

const EvidencesToCheckView = ({ initial, offset, limit, ...props }) => (
    <Layout {...props} tab="evidencesToCheck" organisation="">
        <Root>
            <List initial={initial} offset={offset} limit={limit} platforms={['connected']} />
        </Root>
    </Layout>
);

EvidencesToCheckView.propTypes = {
    initial: PropTypes.shape({}).isRequired,
    offset:  PropTypes.number.isRequired,
    limit:   PropTypes.number.isRequired,
};

export default EvidencesToCheckView;
