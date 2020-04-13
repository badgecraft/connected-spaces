import React from 'react';
import { t } from 'ttag';
import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import View from './OrganisationDashboardEndorsementsView';
import loadSwitcher from './loadSwitcherInRoute';
import query from '../Space/organisationView.gql';
import endorsementsQuery from '../../ui/Endorsement/organisationGivenEndorsements.gql';

export default createAuthAction()(async (context, { id }) => {
    const [res, endRes] = await Promise.all([
        context.client.query({ query, variables: { id, lang: context.lang }, errorPolicy: 'all' }),
        context.client.query({ query: endorsementsQuery, variables: { id, offset: 0 }, errorPolicy: 'all' }),
        loadSwitcher(context, id),
    ]);

    const organisation = _get(res, 'data.maybeOrganisation.organisation');
    if (!organisation || _get(organisation, 'perms.edit.value') !== 1) {
        return null;
    }

    const initial = _get(endRes, 'data.maybeOrganisation.organisation.givenEndorsements');

    return {
        chunks:    ['de'],
        title:     t`Endorsements`,
        component: (<View
            viewer={context.viewer}
            route={action2Route(context)}
            id={id}
            organisation={organisation}
            initial={initial}
        />),
    };
});
