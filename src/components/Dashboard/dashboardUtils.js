import _get from 'lodash/get';
import { toLink } from '../../ui/Link';
import paths from '../../constants/paths';
import query from './redirectToDashboard.gql';

const ORG_COOKIE_NAME = 'conn_org1';

const isOwnerOrAdmin = team => ['owners', 'admins'].indexOf(team) !== -1;

export const setOrganisationInCookie = (cookies, organisationId) => {
    if (cookies.set) {
        cookies.set(ORG_COOKIE_NAME, organisationId || '', { maxAge: 60 * 60 * 24 * 3650 });
    }
};

export const getOrganisationIdFromCookie = cookies => (cookies && cookies.get && cookies.get(ORG_COOKIE_NAME)) || '';

export const getDashboardRedirectTo = async ({ cookies, client }) => {
    const idInCookie = (cookies && cookies.get && cookies.get(ORG_COOKIE_NAME)) || '';
    if (idInCookie === 'me') {
        return toLink({ to: paths.personalDashboard });
    }

    const res = await client.query({ query, variables: { id: idInCookie }, options: { errorPolicy: 'all' } });
    const id = _get(res, 'data.maybeOrganisation.organisation.id');
    const idViewerTeam = _get(res, 'data.maybeOrganisation.organisation.viewerTeam');
    if (id && isOwnerOrAdmin(idViewerTeam)) {
        return toLink({ to: paths.orgDashboard, params: { id } });
    }

    const myOrgs = (_get(res, 'data.me.organisations.list') || [])
        .filter(item => isOwnerOrAdmin(item.viewerTeam));

    if (myOrgs.length > 0) {
        return toLink({ to: paths.orgDashboard, params: myOrgs[0] });
    }

    return toLink({ to: paths.personalDashboard });
};
