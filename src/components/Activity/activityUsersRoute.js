import React from 'react';
import _get from 'lodash/get';
import { t } from 'ttag';
import createAuthAction, { createAuthRedirect } from '../../core/createAuthAction';
import { toLink } from '../Link';
import View from './ActivityUsers';
import query from '../../ui/Activity/activityView.gql';
import usersQuery from '../../ui/ProjectUser/projectUsers.gql';
import { getPreferenceValue } from '../../ui/uiUtils';

export default createAuthAction({ auth: 'optional' })(async (context, { id }) => {
    const projectRes = await context.client.query({ query, variables: { id }, errorPolicy: 'all' });
    const project = _get(projectRes, 'data.maybeProject.project');
    const error = _get(projectRes, 'data.maybeProject.error');
    if (!project) {
        if (error === 'authorisationRequired') {
            return createAuthRedirect(toLink({ to: context.route.path, params: context.params }))
        }
        return null;
    }

    const usersRes = await context.client.query({
        query:       usersQuery,
        variables:   {
            id,
            offset:   0,
            q:        getPreferenceValue(project.viewerPreferences, 'project-users-search', ''),
            sort:     getPreferenceValue(project.viewerPreferences, 'project-users-sort', 'userName'),
            order:    getPreferenceValue(project.viewerPreferences, 'project-users-order', 'asc'),
            userType: getPreferenceValue(project.viewerPreferences, 'project-users-type', 'all'),
        },
        errorPolicy: 'all'
    });

    const { name } = project;
    return {
        chunks:    ['activityUsers'],
        title:     t`Users of ${name}`,
        component: (<View
            id={id}
            project={project}
            context={context}
            invite={_get(context, 'query.invite') === '1'}
            initial={_get(usersRes, 'data.maybeProject.project.users')}
        />),
    };
});
