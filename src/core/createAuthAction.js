import qs from 'query-string';
import query from './defaultRouteQuery.gql';
import PATHS from '../constants/paths';
import createLoadingAction from './createLoadingAction';

export const createAuthRedirect = back => ({ redirect: `${PATHS.authorize}?back=${back}` });

export default (opts = { auth: 'required' }) => actionFunc => createLoadingAction(async (...args) => {
    const { client, lang } = args[0];
    const { data: { me, site } } = await client.query({ query, variables: { lang } });
    const back = encodeURIComponent(`${args[0].path || ''}?${qs.stringify(args[0].query)}`);

    args[0].site = site; // eslint-disable-line no-param-reassign

    if (!me && opts.auth !== 'optional') {
        return createAuthRedirect(back);
    }

    args[0].viewer = me; // eslint-disable-line no-param-reassign


    return actionFunc(...args);
});
