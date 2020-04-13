import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from '../Layout';
import Viewport from '../../ui/Layout/Viewport';
import Form from '../../ui/Endorsement/HandleEndorsementRequest'
import { themedMinWidth } from '../../ui/uiUtils';
import paths from '../../constants/paths';

const Root = styled('div')(({ theme }) => ({
    marginTop:    16,
    marginBottom: 32,
    padding:      '0 16px',

    [themedMinWidth('tablet', theme)]: {
        padding: 0,
    },
}));

const EndorsementRequestPageView = ({ endorsement, ...props }) => (
    <Layout {...props}>
        <Viewport>
            <Root>
                <Form endorsement={endorsement} onAcceptPath={paths.orgDashboardEndorsements} />
            </Root>
        </Viewport>
    </Layout>
);

EndorsementRequestPageView.propTypes = {
    endorsement: PropTypes.shape({}).isRequired,
};

export default EndorsementRequestPageView;
