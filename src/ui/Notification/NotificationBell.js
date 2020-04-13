import PropTypes from 'prop-types';
import { compose, branch, renderNothing, getContext, lifecycle } from 'recompose';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import View from './NotificationBellView';
import notificationBellQuery from './notificationBell.gql';
import watchNotifications from './notificationBellSubscription.gql';

const hasBubble = (data, onlyNotifications) => _get(data, 'me.notifications.unread', 0) > 0
    || (!onlyNotifications && _get(data, 'me.tasksToCheck.total', 0) > 0);

export default compose(
    getContext({ platforms: PropTypes.arrayOf(PropTypes.string).isRequired }),
    graphql(notificationBellQuery, {
        props: ({ data: { loading, subscribeToMore, ...data }, ownProps: { platforms, variant } }) => ({
            loading,
            bubble:             hasBubble(data, variant === 'onlyNotifications'),
            visible:            !!_get(data, 'me', null),
            watchNotifications: () => subscribeToMore({
                document:  watchNotifications,
                variables: { platforms },
            }),
        }),
    }),
    branch(({ visible }) => !visible, renderNothing),
    lifecycle({
        componentDidMount() {
            if (typeof this.props.watchNotifications === 'function') {
                this.props.watchNotifications();
            }
        }
    }),
)(View);
