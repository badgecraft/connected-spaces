import _get from 'lodash/get';
import { t } from 'ttag';
import createAuthAction from '../../core/createAuthAction';
import paths from '../../constants/paths';
import { toLink } from '../../components/Link';
import mutation from '../../ui/Activity/joinActivity.gql';
import query from '../../ui/Activity/activityView.gql';
import { pushFlashMessage } from '../../ui/Flash/flashReducer';

export default createAuthAction()(async (context, { id }) => {
    const { client, store } = context;
    const res = await client.mutate({ mutation, variables: { id }, errorPolicy: 'all' });
    if (_get(res, 'data.joinProject')) {
        const name = _get(res, 'data.joinProject.project.name');
        store.dispatch(pushFlashMessage({ message: t`You'r now attending event ${name}` }));

        await client.query({
            query,
            variables:   { id },
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        });
    }

    return { redirect: toLink({ to: paths.activityView, params: { id } }) };
});
