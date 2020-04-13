import React from 'react';
import { t } from 'ttag';
import _get from 'lodash/get';
import createAuthAction, { createAuthRedirect } from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import View from './OrganisationDashboardUsersView';
import usersQuery from '../../ui/OrganisationUser/organisationUsers.gql';
import loadSwitcher from './loadSwitcherInRoute';
import orgQuery from '../../ui/Organisation/organisationView.gql'
import { toLink } from '../Link';
import { getPreferenceValue } from '../../ui/uiUtils';

export default createAuthAction()(async (context, { id }) => {
    const { viewer } = context;
    const orgRes = await context.client.query({ query: orgQuery, variables: { id }, errorPolicy: 'all' });
    const org = _get(orgRes, 'data.maybeOrganisation.organisation');
    const error = _get(orgRes, 'data.maybeOrganisation.error');
    if (!org) {
        if (error === 'authorisationRequired') {
            return createAuthRedirect(toLink({ to: context.route.path, params: context.params }))
        }
        return null;
    }

    const [usersRes] = await Promise.all([
        context.client.query({
            query:       usersQuery,
            variables:   {
                id,
                offset: 0,
                q:      getPreferenceValue(org.viewerPreferences, 'organisation-users-search', ''),
                sort:   getPreferenceValue(org.viewerPreferences, 'organisation-users-sort', 'userName'),
                order:  getPreferenceValue(org.viewerPreferences, 'organisation-users-order', 'asc'),
            },
            errorPolicy: 'all',
        }),
        loadSwitcher(context, id),
    ]);

    return {
        chunks:    ['dashboardUsers'],
        title:     t`Users`,
        component: (<View
            viewer={viewer}
            route={action2Route(context)}
            id={id}
            organisation={org}
            initial={_get(usersRes, 'data.maybeOrganisation.organisation.users')}
            displayInvite={_get(context, 'query.invite') === '1'}
        />),
    };
});
