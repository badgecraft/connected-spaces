import React from 'react';
import _get from 'lodash/get';
import { t } from 'ttag';
import createAuthAction, { createAuthRedirect } from '../../core/createAuthAction';
import { toLink } from '../Link';
import View from './ActivityBadges';
import query from '../../ui/Activity/activityView.gql';
import badgesQuery from '../../ui/Badge/eventBadges.gql';
import issueBadgePrepareQuery from '../../ui/IssueBadge/issueBadgePrepare.gql';

export default createAuthAction({ auth: 'optional' })(async (context, { id }) => {
    const [projectRes, badgesRes, badgeClassRes] = await Promise.all([
        context.client.query({ query, variables: { id }, errorPolicy: 'all' }),
        context.client.query({ query: badgesQuery, variables: { id }, errorPolicy: 'all' }),
        context.query.issueBadgeClass
            ? context.client.query({
                query:       issueBadgePrepareQuery,
                variables:   { id: context.query.issueBadgeClass },
                errorPolicy: 'all',
            })
            : null,
    ]);
    const project = _get(projectRes, 'data.maybeProject.project');
    const error = _get(projectRes, 'data.maybeProject.error');
    if (!project) {
        if (error === 'authorisationRequired') {
            return createAuthRedirect(toLink({ to: context.route.path, params: context.params }))
        }
        return null;
    }

    const badgeClass = _get(badgeClassRes, 'data.maybeBadgeClass.badgeClass');
    const issueBadgeClass = badgeClass && badgeClass.id || null;

    const { name } = project;
    return {
        chunks:    ['activityBadges'],
        title:     t`Badges of ${name}`,
        component: (<View
            id={id}
            project={project}
            context={context}
            initial={_get(badgesRes, 'data.maybeProject.project.badgeClasses')}
            issueBadgeClass={issueBadgeClass}
        />),
    };
});
