import { graphql } from 'react-apollo';
import { t } from 'ttag';
import { compose, withProps, withHandlers } from 'recompose';
import Button from '../Button';
import mutation from './markAllNotificationsAsRead.gql';

export default compose(
    graphql(mutation, { name: 'runMutation' }),
    withHandlers({
        onClick: ({ runMutation }) => () => {
            runMutation({ refetchQueries: ['notificationsQuery'] });
        },
    }),
    withProps({
        label:   t`Mark all as read`,
        type:    'button',
        size:    'small',
        variant: 'transparent',
    }),
)(Button);
