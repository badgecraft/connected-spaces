import React from 'react';
import { t } from 'ttag';
import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import View from './NotificationsView';
import { action2Route } from '../../core/utils';
import notificationsQuery from '../../ui/Notification/notificationsQuery.gql';
import { setOrganisationInCookie } from '../Dashboard/dashboardUtils';

export default createAuthAction({})(async (context) => {
    const res = await context.client.query({
        query:     notificationsQuery,
        variables: { limit: 20, platforms: context.platforms },
    });

    setOrganisationInCookie(context.cookies, 'me');

    return {
        chunks:    ['notifications'],
        title:     t`Your notifications`,
        component: (<View
            viewer={context.viewer}
            route={action2Route(context)}
            initial={_get(res, 'data.me.notifications')}
        />)
    };
})
