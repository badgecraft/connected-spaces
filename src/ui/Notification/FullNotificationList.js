import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, lifecycle, getContext } from 'recompose';
import { graphql } from 'react-apollo';
import styled from '@emotion/styled';
import { msgid, ngettext, t } from 'ttag';
import List from '../List/ListWithHeading';
import { createGraphqlPropsPager, createSubscriptionResultPrepender } from '../uiPaging';
import Item from './NotifyItem/NotifyItem';
import notificationsQuery from './notificationsQuery.gql';
import withMarkWhenVisible from './withMarkWhenVisible';
import notificationSubscription from './notificationSubscription.gql';
import { font14A1, font24 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const Empty = styled('div')(({ theme }) => ({
    ...font14A1,
    marginTop: 16,
    color:     '#3E3564',
    textAlign: 'center',

    [themedMinWidth('tablet', theme)]: {
        ...font24,
    },
}));

export default compose(
    getContext({ platforms: PropTypes.arrayOf(PropTypes.string).isRequired }),
    withMarkWhenVisible,
    withHandlers({
        title:       () => ({ total, empty }) => (empty
            ? null
            : ngettext(msgid`${total} notification`, `${total} notifications`, total)),
        renderItem:  () => item => (<Item key={item.id} item={item} />),
        renderEmpty: () => () => (<Empty>{t`You don't have any notifications at the moment`}</Empty>),
    }),
    graphql(notificationsQuery, {
        props: createGraphqlPropsPager({
            resultPath: 'me.notifications',
            append:     (_, { subscribeToMore }) => ({
                watchNotifications: () => subscribeToMore({
                    document:    notificationSubscription,
                    // todo skip notifications from other platform
                    updateQuery: createSubscriptionResultPrepender({
                        resultPath:  'me.notifications',
                        newItemPath: 'subscriptionData.data.createdNotification',
                    }),
                }),
            }),
        }),
    }),
    lifecycle({
        componentDidMount() {
            if (typeof this.props.watchNotifications === 'function') {
                this.props.watchNotifications();
            }
        },
    }),
)(List);
