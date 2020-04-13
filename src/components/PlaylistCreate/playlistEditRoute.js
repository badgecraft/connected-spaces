import React from 'react';
import _get from 'lodash/get';
import createAuthAction, { createAuthRedirect } from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import Form from './PlaylistEditForm';
import query from '../Playlist/playlistView.gql';
import { toLink } from '../Link';
import { paths } from '../Constants';

export default createAuthAction()(async (context, { id }) => {
    const res = await context.client.query({ query, variables: { id, lang: context.lang } });
    const playlist = _get(res, 'data.maybeProject.project', null);
    const canEdit = _get(res, 'data.maybeProject.project.perms.edit.value') === 1;

    if (playlist && canEdit) {
        return {
            chunks:    ['playlistEdit'],
            title:     playlist.name,
            component: (<Form
                playlist={playlist}
                viewer={context.viewer}
                route={action2Route(context)}
            />),
        };
    }

    const error = _get(res, 'data.maybeProject.error', null);
    if (error === 'authorizationRequired') {
        return createAuthRedirect(toLink({ to: paths.activityView, params: { id } }));
    } // todo permission denied

    return null;
})
