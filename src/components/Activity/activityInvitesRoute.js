import React from 'react';
import _get from 'lodash/get';
import { t } from 'ttag';
import createAuthAction, { createAuthRedirect } from '../../core/createAuthAction';
import { toLink } from '../Link';
import View from './ActivityInvites';
import query from '../../ui/Activity/activityView.gql';
import invitesQuery from '../../ui/ProjectUser/projectInvites.gql';

export default createAuthAction({ auth: 'optional' })(async (context, { id }) => {
    const [projectRes, invitesRes] = await Promise.all([
        context.client.query({ query, variables: { id }, errorPolicy: 'all' }),
        context.client.query({ query: invitesQuery, variables: { id }, errorPolicy: 'all' }),
    ]);
    const project = _get(projectRes, 'data.maybeProject.project');
    const error = _get(projectRes, 'data.maybeProject.error');
    if (!project) {
        if (error === 'authorisationRequired') {
            return createAuthRedirect(toLink({ to: context.route.path, params: context.params }))
        }
        return null;
    }

    const { name } = project;
    return {
        chunks:    ['activityInvites'],
        title:     t`Invites of ${name}`,
        component: (<View
            id={id}
            project={project}
            context={context}
            initial={_get(invitesRes, 'data.maybeProject.project.invites')}
            invite={_get(context, 'query.invite') === '1'}
        />),
    };
});
