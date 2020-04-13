import React from 'react';
import { t } from 'ttag';
import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import View from './EvidencesToCheckView';
import { action2Route } from '../../core/utils';
import evidencesToCheckQuery from '../../ui/Notification/EvidenceCheck/evidencesToCheck.gql';
import { setOrganisationInCookie } from '../Dashboard/dashboardUtils';

export default createAuthAction({})(async (context) => {
    const res = await context.client.query({
        query:     evidencesToCheckQuery,
        variables: { offset: 0, limit: 10, platforms: ['connected'] },
    });

    setOrganisationInCookie(context.cookies, 'me');

    return {
        chunks:    ['evidencesToCheck'],
        title:     t`Evidences to check`,
        component: (<View
            viewer={context.viewer}
            route={action2Route(context)}
            initial={_get(res, 'data.me.tasksToCheck')}
            offset={0}
            limit={10}
        />)
    };
})
