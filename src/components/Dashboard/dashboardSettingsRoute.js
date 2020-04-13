import React from 'react';
import { t } from 'ttag';
import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import View from './OrganisationDashboardSettings';
import loadSwitcher from './loadSwitcherInRoute';
import query from '../Space/organisationView.gql';

export default createAuthAction()(async (context, { id }) => {
    const [res] = await Promise.all([
        context.client.query({ query, variables: { id, lang: context.lang }, errorPolicy: 'all' }),
        loadSwitcher(context, id),
    ]);

    const organisation = _get(res, 'data.maybeOrganisation.organisation');
    if (!organisation || _get(organisation, 'perms.edit.value') !== 1) {
        return null;
    }

    return {
        chunks:    ['dashboardSettings'],
        title:     t`Settings`,
        component: (<View
            viewer={context.viewer}
            route={action2Route(context)}
            id={id}
            organisation={organisation}
        />),
    };
});
