import React from 'react';
import _get from 'lodash/get';
import { t } from 'ttag';
import createAuthAction, { createAuthRedirect } from '../../core/createAuthAction';
import { toLink } from '../Link';
import View from './ActivityEvidencesView';
import query from '../../ui/Activity/activityView.gql';
import evidenceQuery from '../../ui/Notification/EvidenceCheck/projectEvidencesToCheck.gql';
import historyQuery from '../../ui/Notification/EvidenceCheck/activityEvidenceChunks.gql';

export default createAuthAction({ auth: 'optional' })(async (context, { id }) => {
    const [projectRes, evidenceRes, historyRes] = await Promise.all([
        context.client.query({ query, variables: { id }, errorPolicy: 'all' }),
        context.client.query({ query: evidenceQuery, variables: { id, offset: 0 }, errorPolicy: 'all' }),
        context.client.query({ query: historyQuery, variables: { id, offset: 0 }, errorPolicy: 'all' }),
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
    const history = parseInt(context.query.history, 10) === 1;
    return {
        chunks:    ['activityEvidences'],
        title:     t`Evidences of ${name}`,
        component: (<View
            id={id}
            project={project}
            context={context}
            initialToCheck={_get(evidenceRes, 'data.maybeProject.project.tasksToCheck')}
            initialHistory={_get(historyRes, 'data.maybeProject.project.evidenceChunks')}
            history={history}
        />),
    };
});
