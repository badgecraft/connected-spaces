import React from 'react';
import { t } from 'ttag';
import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import View from './PlaylistFinalizeView';
import query from './playlistView.gql';
import { toLink } from '../../ui/Link';
import paths from '../../constants/paths';

export default createAuthAction()(async ({ viewer, client, ...other }, { id }) => {
    const { data } = await client.query({ query, variables: { id }, errorPolicy: 'all' });
    const playlist = _get(data, 'maybeProject.project');
    if (!playlist) {
        return null;
    }

    const allPublished = (playlist.playlistActivities || [])
        .every(item => _get(item, 'project.status') === 'published');
    if (allPublished) {
        return { redirect: toLink({ to: paths.activityView, params: { id } }) };
    }

    return {
        chunks:    ['playlistFinalize'],
        title:     t`Finalize playlist`,
        component: (<View viewer={viewer} route={action2Route(other)} id={id} playlist={playlist} />),
    };
})
