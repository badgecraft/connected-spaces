import React from 'react';
import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import View from './OrganisationRequestVerifyPage';
import { action2Route } from '../../core/utils';
import query from '../../ui/Organisation/organisationVerifyStatus.gql';

export default createAuthAction()(async (context, { id }) => {
    const res = await context.client.query({ query, errorPolicy: 'all', variables: { id } });
    const name = _get(res, 'data.maybeOrganisation.organisation.name');
    return {
        chunks:    ['orv'],
        title:     name,
        component: (<View id={id} route={action2Route(context)} viewer={context.viewer} />),
    };
});
