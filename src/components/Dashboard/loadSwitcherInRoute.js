import _get from 'lodash/get';
import switcherQuery from '../../ui/OrganisationSwitcher/organisationSwitcher.gql';
import { setOrganisationInCookie } from './dashboardUtils';

const loadSwitcherInRoute = async (context, id) => {
    const res = await context.client.query({
        query:       switcherQuery,
        variables:   { current: id, lang: context.lang },
        errorPolicy: 'all',
    });

    const loadedId = _get(res, 'data.maybeOrganisation.organisation.id', null);
    const loadedViewerTeam = _get(res, 'data.maybeOrganisation.organisation.viewerTeam', null);

    if (loadedId && ['owners', 'admins'].indexOf(loadedViewerTeam) !== -1) {
        setOrganisationInCookie(context.cookies, loadedId);
        return { loaded: loadedId };
    }

    setOrganisationInCookie(context.cookies, '');
    return { loaded: null }
};

export default loadSwitcherInRoute;
