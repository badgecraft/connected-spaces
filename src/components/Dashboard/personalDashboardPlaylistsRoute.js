import React from 'react';
import { t } from 'ttag';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import View from './PersonalPlaylistsView';
import { setOrganisationInCookie } from './dashboardUtils';
import BecomeOrganiser from './BecomeOrganiser';
import becomeOrganiserQuery from './becomeOrganiserCheck.gql';
import personalPlaylistsQuery from './personalPlaylists.gql';

export default createAuthAction()(async (context) => {
    await Promise.all([
        context.client.query({ query: becomeOrganiserQuery }),
        context.client.query({ query: personalPlaylistsQuery, variables: { offset: 0 }, errorPolicy: 'all' })
    ]);
    setOrganisationInCookie(context.cookies, 'me');
    return {
        chunks:    ['personalDashboardPlaylists'],
        title:     t`My playlists`,
        component: (<View
            viewer={context.viewer}
            route={action2Route(context)}
            organisation=""
            action={<BecomeOrganiser forType="playlist" />}
        />),
    };
});
