import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import { paths } from '../Constants';
import mutation from './claimCode.gql';
import { toLink } from '../../ui/Link';

export default createAuthAction()(async (context) => {
    const { code = '' } = context.query;

    if (code) {
        const res = await context.client.mutate({ mutation, variables: { code } });
        const resolveCode = _get(res, 'data.resolveCode', {});

        switch (resolveCode && resolveCode.__typename) {
            case 'ResolveCodeBadgeGained':
                return {
                    redirect: toLink({
                        to:    paths.personalDashboardBadges,
                        query: { badge: _get(resolveCode, 'badge.id') },
                    }),
                };
            case 'ResolveCodeBadgeClassView':
                return {
                    redirect: toLink({
                        to:     paths.badgeClassView,
                        params: {
                            projectId: _get(resolveCode, 'badgeClass.projectId'),
                            id:        _get(resolveCode, 'badgeClass.id'),
                        },
                    }),
                };
            case 'ResolveCodeProjectJoin':
                return {
                    redirect: toLink({
                        to:     paths.activityView,
                        params: { id: _get(resolveCode, 'project.id') },
                        query:  { joinWelcome: _get(resolveCode, 'joined') ? 1 : 0 }
                    }),
                };
            case 'ResolveCodeOrganisationJoin':
                return {
                    redirect: toLink({
                        to:     paths.spaceView,
                        params: { id: _get(resolveCode, 'organisation.id') },
                        query:  { joinWelcome: _get(resolveCode, 'joined') ? 1 : 0 }
                    }),
                };
            default:
                // todo it would be better to have a page with message 'Invalid code, try entering it again'
                return { redirect: paths.home };
        }
    }

    return { redirect: paths.home };
});
