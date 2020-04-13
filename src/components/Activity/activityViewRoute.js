import React from 'react';
import _get from 'lodash/get';
import { t } from 'ttag';
import createAuthAction, { createAuthRedirect } from '../../core/createAuthAction';
import query from '../../ui/Activity/activityView.gql';
import { toLink } from '../Link';
import View from './ActivityView';
import { getActivityMeta } from './activityUtils';
import { pushFlashMessage } from '../../ui/Flash/flashReducer';

export default createAuthAction({ auth: 'optional' })(async (context, { id }) => {
    const res = await context.client.query({ query, variables: { id }, errorPolicy: 'all' });
    const project = _get(res, 'data.maybeProject.project');
    const error = _get(res, 'data.maybeProject.error');
    if (!project) {
        if (error === 'authorisationRequired') {
            return createAuthRedirect(toLink({ to: context.route.path, params: context.params }))
        }
        return null;
    }

    const { name } = project;
    if (context.query.joinWelcome === '1') {
        context.store.dispatch(pushFlashMessage({ message: t`Congratulations! You have joined ${name}` }));
    }

    return {
        chunks:    ['activityView'],
        title:     name,
        component: (<View
            id={id}
            project={project}
            context={context}
            init={_get(context, 'query.initBadge') === '1'}
        />),
        meta:      getActivityMeta({ project, context }),
    };
});
