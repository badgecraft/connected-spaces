import PropTypes from 'prop-types';
import { compose, getContext, withProps, lifecycle } from 'recompose';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import View from './NotificationBellContextView';
import evidencesToCheckQuery from './EvidenceCheck/evidencesToCheck.gql';
import notificationsQuery from './notificationsQuery.gql';
import notificationSubscription from './notificationSubscription.gql';
import withMarkWhenVisible from './withMarkWhenVisible';
import { createSubscriptionResultPrepender } from '../uiPaging';

const NotificationBellContext = compose(
    getContext({
        paths:     PropTypes.shape().isRequired,
        platforms: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    graphql(notificationsQuery, {
        props: ({ data: { loading, subscribeToMore, ...data } }) => ({
            notifications:        {
                total:  _get(data, 'me.notifications.total', 0),
                unread: _get(data, 'me.notifications.unread', 0),
                list:   _get(data, 'me.notifications.list') || [],
            },
            notificationsLoading: loading,
            watchNotifications:   () => subscribeToMore({
                document:    notificationSubscription,
                updateQuery: createSubscriptionResultPrepender({
                    resultPath:  'me.notifications',
                    newItemPath: 'subscriptionData.data.createdNotification',
                }),
            }),
        }),
    }),
    graphql(evidencesToCheckQuery, {
        props: ({ data: { loading, ...data }, ownProps: { variant } }) => ({
            evidences:        {
                total: variant === 'onlyNotifications' ? 0 : _get(data, 'me.tasksToCheck.total', 0),
                list:  _get(data, 'me.tasksToCheck.list') || [],
            },
            evidencesLoading: loading,
        }),
    }),
    withProps(({ evidencesLoading, notificationsLoading }) => ({
        loading: evidencesLoading || notificationsLoading,
    })),
    withMarkWhenVisible,
    lifecycle({
        componentDidMount() {
            if (typeof this.props.watchNotifications === 'function') {
                this.props.watchNotifications();
            }
        },
    }),
)(View);

NotificationBellContext.propTypes = {
    variant: PropTypes.oneOf(['default', 'onlyNotifications']).isRequired,
};

NotificationBellContext.displayName = 'NotificationBellContext';

export default NotificationBellContext;
