import React from 'react';
import _get from 'lodash/get';
import createAuthAction, { createAuthRedirect } from '../../core/createAuthAction';
import View from './BadgeClassView';
import { action2Route, isIdsEqual } from '../../core/utils';
import badgeClassQuery from '../../ui/BadgeClass/badgeClass.gql';
import activityQuery from '../../ui/Activity/activityView.gql';
import { toLink } from '../Link';

export default createAuthAction({ auth: 'optional' })(
    async (context, { id, projectId }) => {
        const [badgesRes, projectRes] = await Promise.all([
            context.client.query({ query: badgeClassQuery, variables: { id }, errorPolicy: 'all' }),
            context.client.query({
                query:       activityQuery,
                variables:   { id: projectId },
                errorPolicy: 'all',
            }),
        ]);

        const project = _get(projectRes, 'data.maybeProject.project', null);
        const badgeClass = _get(badgesRes, 'data.maybeBadgeClass.badgeClass');
        const error = _get(badgesRes, 'data.maybeBadgeClass.error');

        if (!badgeClass || !project || !isIdsEqual(projectId, badgeClass.projectId)) {
            if (error === 'authorizationRequired') {
                return createAuthRedirect(toLink({ to: context.route.path, params: context.params }))
            }
            return null;
        }

        return {
            chunks:    ['badgeClass'],
            title:     badgeClass.name,
            component: (<View
                id={id}
                projectId={projectId}
                route={action2Route(context)}
                viewer={context.viewer}
                badgeClass={badgeClass}
                project={project}
                tab="overview"
                context={context}
                badgeClassTab={_get(context, 'query.badgeClassTab') || 'information'}
                openCriterion={_get(context, 'query.openCriterion') || null}
            />),
        };
    },
);
