import React from 'react';
import _get from 'lodash/get';
import gql from 'graphql-tag';
import createAuthAction, { createAuthRedirect } from '../../core/createAuthAction';
import query from '../../ui/Activity/activityView.gql';
import { toLink } from '../Link';
import View from '../Activity/ActivityView';
import { getActivityMeta } from '../Activity/activityUtils';

const playlistCheckQuery = gql`
    query playlistCheckQuery($id:ID!) {
        maybeProject(id: $id) {
            id
            project {
                id
                playlistActivities {
                    id
                }
            }
        }
    }
`;


async function action(context, { id, ...args }) {
    const [res, playlistRes] = await Promise.all([
        context.client.query({ query, variables: { id }, errorPolicy: 'all' }),
        context.client.query({ query: playlistCheckQuery, variables: { id: args.playlist, errorPolicy: 'all' } }),
    ]);
    const project = _get(res, 'data.maybeProject.project', null);
    const playlist = _get(playlistRes, 'data.maybeProject.project', null);
    const error = _get(res, 'data.maybeProject.error', null);
    if ((!project || !playlist)) {
        if (error === 'authorizationRequired') {
            return createAuthRedirect(toLink({ to: context.route.path, params: context.params }));
        }
        return null;
    }

    if ((playlist.playlistActivities || []).map(item => item.id).indexOf(id) === -1) {
        return null;
    }

    return {
        chunks:    ['playlistActivityView'],
        title:     project.name,
        component: (<View id={id} project={project} context={context} init={false} />),
        meta:      getActivityMeta({ project, context }),
    };
}

export default createAuthAction({ auth: 'optional' })(action);
