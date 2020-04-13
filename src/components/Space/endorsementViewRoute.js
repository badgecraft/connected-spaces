import React from 'react';
import _get from 'lodash/get';
import createAuthAction, { createAuthRedirect } from '../../core/createAuthAction';
import View from './EndorsementRequestPage';
import { action2Route } from '../../core/utils';
import query from '../../ui/Endorsement/endorsementQuery.gql';
import { toLink } from '../Link';

export default createAuthAction()(async (context, { id }) => {
    const res = await context.client.query({ query, variables: { id }, errorPolicy: 'all' });
    const endorsement = _get(res, 'data.maybeEndorsement.endorsement');
    const error = _get(res, 'data.maybeEndorsement.error');
    if (!endorsement) {
        if (error === 'authorisationRequired') {
            return createAuthRedirect(toLink({ to: context.route.path, params: context.params }))
        } else if (error === 'permissionDenied') {
            // todo display an information page
        }
        return null;
    }

    return {
        chunks:    ['er'],
        title:     _get(endorsement, 'object.name'),
        component: (<View
            id={id}
            endorsement={endorsement}
            route={action2Route(context)}
            viewer={context.viewer}
        />),
    };
});
