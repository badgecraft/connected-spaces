import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from '../Dashboard/PersonalLayout';
import List from '../../ui/Notification/FullNotificationList';
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

const NotificationsView = ({ initial, ...props }) => (
    <Layout {...props} tab="notifications" organisation="">
        <Root>
            <List initial={initial} limit={20} />
        </Root>
    </Layout>
);

NotificationsView.propTypes = {
    initial: PropTypes.shape({}).isRequired,
};

export default NotificationsView;
