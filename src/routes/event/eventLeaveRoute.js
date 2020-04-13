import { t } from 'ttag';
import createAuthAction from '../../core/createAuthAction';
import paths from '../../constants/paths';
import { toLink } from '../../components/Link';
import mutation from '../../ui/Activity/leaveActivity.gql';
import query from '../../ui/Activity/activityView.gql';
import { pushFlashMessage } from '../../ui/Flash/flashReducer';

export default createAuthAction()(async (context, { id }) => {
    const { client, store } = context;
    await client.mutate({ mutation, variables: { id } });
    await client.query({ query, variables: { id }, fetchPolicy: 'network-only', errorPolicy: 'all' });

    store.dispatch(pushFlashMessage({ message: t`You'r no longer attending the event` }));

    return { redirect: toLink({ to: paths.activityView, params: { id } }) };
});
