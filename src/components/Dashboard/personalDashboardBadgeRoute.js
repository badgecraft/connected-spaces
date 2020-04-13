import React from 'react';
import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import query from '../../ui/BadgeClass/userBadge.gql';
import View from '../Badge/UserBadgeView';
import { setOrganisationInCookie } from './dashboardUtils';

export default createAuthAction({ auth: 'optional' })(
    async (context, { id }) => {
        const res = await context.client.query({ query, variables: { id }, errorPolicy: 'all' });
        const userBadge = _get(res, 'data.badge');
        if (!userBadge) {
            return null;
        }

        setOrganisationInCookie(context.cookies, 'me');

        return {
            chunks:    ['userBadge'],
            title:     userBadge.name,
            component: (<View
                tab="badges"
                id={id}
                route={action2Route(context)}
                viewer={context.viewer}
                userBadge={userBadge}
                badgeClass={userBadge.badgeClass} />),
        };
    },
);
