import React from 'react';
import { t } from 'ttag';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import View from './DashboardView';
import { getDashboardRedirectTo } from './dashboardUtils';
import eventsQuery from './organisationEvents.gql';
import loadSwitcher from './loadSwitcherInRoute';

export default createAuthAction()(async (context, { id }) => {
    if (!id) {
        const redirect = await getDashboardRedirectTo(context);
        return { redirect };
    }

    const [switcher] = await Promise.all([
        loadSwitcher(context, id),
        context.client.query({
            query:       eventsQuery,
            variables:   {
                id,
                lang:   context.lang,
                offset: 0,
            },
            errorPolicy: 'all',
        }),
    ]);

    if (!switcher.loaded) {
        const redirect = await getDashboardRedirectTo(context);
        return { redirect };
    }

    return {
        chunks:    ['dashboard'],
        title:     t`Dashboard`,
        component: (<View viewer={context.viewer} route={action2Route(context)} organisation={id} />),
    };
})
