import React from 'react';
import { t } from 'ttag';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import View from './PersonalActivitiesView';
import { setOrganisationInCookie } from './dashboardUtils';
import BecomeOrganiser from './BecomeOrganiser';
import becomeOrganiserQuery from './becomeOrganiserCheck.gql';
import personalActivitiesQuery from './personalActivities.gql';

export default createAuthAction()(async (context) => {
    await Promise.all([
        context.client.query({ query: becomeOrganiserQuery }),
        context.client.query({ query: personalActivitiesQuery, variables: { offset: 0 }, errorPolicy: 'all' }),
    ]);
    setOrganisationInCookie(context.cookies, 'me');
    return {
        chunks:    ['dashboard'],
        title:     t`Personal dashboard`,
        component: (<View
            viewer={context.viewer}
            route={action2Route(context)}
            action={<BecomeOrganiser forType="activity" />}
        />),
    };
});
