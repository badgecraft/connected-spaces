import React from 'react';
import { t } from 'ttag';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import View from './OrganisationDashboardPlaylistsView';
import playlistQuery from './organisationPlaylists.gql';
import loadSwitcher from './loadSwitcherInRoute';

export default createAuthAction()(async (context, { id }) => {
    const { viewer } = context;
    await Promise.all([
        loadSwitcher(context, id),
        context.client.query({
            query:       playlistQuery,
            variables:   {
                id,
                lang:   context.lang,
                offset: 0,
            },
            errorPolicy: 'all',
        }),
    ]);

    return {
        chunks:    ['dashboardPlaylists'],
        title:     t`Playlists`,
        component: (<View viewer={viewer} route={action2Route(context)} organisation={id} />),
    };
});
