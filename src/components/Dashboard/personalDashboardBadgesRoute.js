import React from 'react';
import { t } from 'ttag';
import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import View from './PersonalBadgesView';
import { setOrganisationInCookie } from './dashboardUtils';
import query from '../../ui/Badge/personalBadges.gql';
import { pushFlashMessage } from '../../ui/Flash/flashReducer';

export default createAuthAction()(async (context) => {
    const res = await context.client.query({ query, variables: { offset: 0 } });
    setOrganisationInCookie(context.cookies, 'me');

    if (context.query.badge) {
        // todo fetch and display the received badge
        context.store.dispatch(pushFlashMessage({ message: t`Congratulations! You have received a badge!` }));
    }

    return {
        chunks:    ['personalDashboardBadges'],
        title:     t`My badges`,
        component: (<View
            viewer={context.viewer}
            route={action2Route(context)}
            organisation=""
            initial={_get(res, 'me.badges')}
        />),
    };
});
