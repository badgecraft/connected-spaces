import React from 'react';
import { t } from 'ttag';
import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import View from './PersonalSettingsView';
import { setOrganisationInCookie } from './dashboardUtils';

export default createAuthAction()(async (context) => {
    if (parseInt(_get(context, 'query.noLog'), 10) !== 1) {
        setOrganisationInCookie(context.cookies, 'me');
    }
    return {
        chunks:    ['personalDashboardSettings'],
        title:     t`Personal settings`,
        component: (<View viewer={context.viewer} route={action2Route(context)} organisation="" tab="settings" />),
    };
})
