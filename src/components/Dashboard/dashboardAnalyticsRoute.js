import React from 'react';
import { t } from 'ttag';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import View from './DashboardCommingSoonView';
import loadSwitcher from './loadSwitcherInRoute';

export default createAuthAction()(async (context, { id }) => {
    await loadSwitcher(context, id);

    return {
        chunks:    ['dashboardAnalytics'],
        title:     t`Analytics`,
        component: (<View viewer={context.viewer} route={action2Route(context)} organisation={id} tab="analytics" />),
    };
});
