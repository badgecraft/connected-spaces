/* eslint-disable global-require */
import { paths } from '../constants';
import { toLink } from '../ui/Link';

const redirectTo = to => async (context, params) => ({
    redirect: toLink({ to, params, query: context.query }),
});

// The top-level (parent) route
const routes = {
    path: '',

    // Keep in mind, routes are evaluated in order
    children: [
        // {
        //     path:   '/',
        //     action: () => ({ redirect: paths.home }),
        // },
        {
            // TODO move to ''
            path: paths.home,
            load: () => import(/* webpackChunkName: 'home' */ './home/homeRoute'),
        },
        {
            path: paths.opportunities,
            load: () => import(/* webpackChunkName: 'opportunities' */ './event/opportunitiesRoute'),
        },
        {
            path: paths.activityView,
            load: () => import(/* webpackChunkName: 'activityView' */ '../components/Activity/activityViewRoute'),
        },
        {
            path: paths.activityUsers,
            load: () => import(/* webpackChunkName: 'activityUsers' */ '../components/Activity/activityUsersRoute'),
        },
        {
            path: paths.activityInvites,
            load: () => import(/* webpackChunkName: 'activityInvites' */ '../components/Activity/activityInvitesRoute'),
        },
        {
            path: paths.activityBadges,
            load: () => import(/* webpackChunkName: 'activityBadges' */ '../components/Activity/activityBadgesRoute'),
        },
        {
            path: paths.activityEvidences,
            // eslint-disable-next-line
            load: () => import(/* webpackChunkName: 'activityEvidences' */ '../components/Activity/activityEvidencesRoute'),
        },
        {
            path: '/playlists',
            load: () => import(/* webpackChunkName: 'playlistSearch' */ '../components/Playlist/playlistSearchRoute'),
        },
        {
            path: paths.playlistCreate,
            // eslint-disable-next-line
            load: () => import(/* webpackChunkName: 'playlistCreate' */ '../components/PlaylistCreate/playlistCreateRoute'),
        },
        {
            path: paths.playlistFinalize,
            load: () =>
                      import(/* webpackChunkName: 'playlistFinalize' */'../components/Playlist/playlistFinalizeRoute'),
        },
        {
            path:   '/playlists/:id',
            action: redirectTo(paths.activityView),
        },
        {
            path: paths.playlistStart,
            load: () => import(/* webpackChunkName: 'playlistStart' */'../components/Playlist/playlistStartRoute'),
        },
        {
            path: paths.playlistLeave,
            load: () => import(/* webpackChunkName: 'playlistLeave' */'../components/Playlist/playlistLeaveRoute'),
        },
        {
            path:   '/playlists/:id/users',
            action: redirectTo(paths.activityUsers),
        },
        {
            path:   '/playlists/:id/invites',
            action: redirectTo(paths.activityInvites),
        },
        {
            path: paths.playlistEdit,
            load: () => import(/* webpackChunkName: 'playlistEdit' */ '../components/PlaylistCreate/playlistEditRoute'),
        },
        {
            path: paths.playlistActivityView,
            // eslint-disable-next-line
            load: () => import(/* webpackChunkName: 'playlistActivityView' */ '../components/Playlist/playlistActivityViewRoute'),
        },
        {
            path: paths.dashboard,
            load: () => import(/* webpackChunkName: 'dashboard' */ '../components/Dashboard/dashboardRoute'),
        },
        {
            path: paths.personalDashboard,
            // eslint-disable-next-line
            load: () => import(/* webpackChunkName: 'personalDashboard' */ '../components/Dashboard/personalDashboardRoute'),
        },
        {
            path: paths.personalDashboardBadges,
            // eslint-disable-next-line
            load: () => import(/* webpackChunkName: 'personalDashboardBadges' */ '../components/Dashboard/personalDashboardBadgesRoute'),
        },
        {
            path: paths.personalDashboardPlaylists,
            // eslint-disable-next-line
            load: () => import(/* webpackChunkName: 'personalDashboardPlaylists' */ '../components/Dashboard/personalDashboardPlaylistsRoute'),
        },
        {
            path: paths.personalDashboardSettings,
            // eslint-disable-next-line
            load: () => import(/* webpackChunkName: 'personalDashboardSettings' */ '../components/Dashboard/personalDashboardSettingsRoute'),
        },
        {
            path: paths.orgDashboard,
            load: () => import(/* webpackChunkName: 'dashboard' */ '../components/Dashboard/dashboardRoute'),
        },
        {
            path: paths.orgDashboardPlaylists,
            // eslint-disable-next-line
            load: () => import(/* webpackChunkName: 'dashboardPlaylists' */ '../components/Dashboard/dashboardPlaylistsRoute'),
        },
        {
            path: paths.orgDashboardAnalytics,
            // eslint-disable-next-line
            load: () => import(/* webpackChunkName: 'dashboardAnalytics' */ '../components/Dashboard/dashboardAnalyticsRoute'),
        },
        {
            path: paths.orgDashboardSettings,
            // eslint-disable-next-line
            load: () => import(/* webpackChunkName: 'dashboardSettings' */ '../components/Dashboard/dashboardSettingsRoute'),
        },
        {
            path: paths.orgDashboardUsers,
            load: () =>
                      import(/* webpackChunkName: 'dashboardUsers' */ '../components/Dashboard/dashboardUsersRoute'),
        },
        {
            path: paths.orgDashboardInvites,
            // eslint-disable-next-line
            load: () => import(/* webpackChunkName: 'dashboardInvites' */ '../components/Dashboard/dashboardInvitesRoute'),
        },
        {
            path: paths.orgDashboardEndorsements,
            load: () => import(/* webpackChunkName: 'de' */ '../components/Dashboard/dashboardEndorsementsRoute'),
        },
        { // todo deprecated
            path: paths.spaceEdit,
            load: () => import(/* webpackChunkName: 'space-edit' */'./space/spaceEditRoute'),
        },
        {
            path: paths.spaceCreate,
            load: () => import(/* webpackChunkName: 'space-create' */ './space/spaceCreateRoute'),
        },
        {
            path: paths.verifiedSpaces,
            load: () => import(/* webpackChunkName: 'verified-spaces' */ './space/verifiedSpacesRoute'),
        },
        {
            path: paths.spaceView,
            load: () => import(/* webpackChunkName: 'space-view' */ './space/spaceViewRoute'),
        },
        {
            path: paths.requestOrganisationVerify,
            load: () => import(/* webpackChunkName: 'orv' */ '../components/Space/organisationRequestVerifyRoute'),
        },
        {
            path: paths.eventCreate,
            load: () => import(/* webpackChunkName: 'event-create' */ './event/eventCreateRoute'),
        },
        {
            path:   '/events/:id',
            action: redirectTo(paths.activityView),
        },
        {
            path:   '/events/:id/users',
            action: redirectTo(paths.activityUsers),
        },
        {
            path:   '/events/:id/invites',
            action: redirectTo(paths.activityInvites),
        },
        {
            path:   '/events/:id/badges',
            action: redirectTo(paths.activityBadges),
        },
        {
            path: paths.activityAttend,
            load: () => import(/* webpackChunkName: 'event-attend' */ './event/eventAttendRoute'),
        },
        {
            path: paths.activityLeave,
            load: () => import(/* webpackChunkName: 'event-leave' */ './event/eventLeaveRoute'),
        },
        {
            path: paths.eventEdit,
            load: () => import(/* webpackChunkName: 'event-edit' */ './event/eventEditRoute'),
        },
        {
            path: paths.health,
            load: () => import(/* webpackChunkName: 'health' */ './health/healthRoute'),
        },
        {
            path: paths.logout,
            load: () => import(/* webpackChunkName: 'redirect' */ './home/redirectRoute'),
        },
        {
            path: paths.authorize,
            load: () => import(/* webpackChunkName: 'redirect' */ './home/redirectRoute'),
        },
        {
            path: paths.privacy,
            load: () => import(/* webpackChunkName: 'privacy' */ './static/privacy'),
        },
        {
            path: paths.termsOfService,
            load: () => import(/* webpackChunkName: 'tos' */ './static/tos'),
        },
        {
            path: paths.security,
            load: () => import(/* webpackChunkName: 'security' */ './static/security'),
        },
        {
            path: paths.handleNotify,
            load: () => import(/* webpackChunkName: 'handleNotify' */ './notify/handleNotificationRoute'),
        },
        {
            path: paths.emailVerify,
            load: () => import(/* webpackChunkName: 'emailVerify' */ './notify/emailVerifyRoute'),
        },
        {
            path: paths.claimByCode,
            load: () => import(/* webpackChunkName: 'claimByCode' */ '../components/Badge/claimCodeRoute'),
        },
        {
            path: paths.notifications,
            load: () => import(/* webpackChunkName: 'notifications' */ '../components/Notify/notificationsRoute'),
        },
        {
            path: paths.evidencesToCheck,
            load: () => import(/* webpackChunkName: 'evidencesToCheck' */ '../components/Notify/evidencesToCheckRoute'),
        },
        {
            path: paths.badgeClassView,
            load: () => import(/* webpackChunkName: 'badgeClass' */ '../components/Badge/badgeClassRoute'),
        },
        {
            path: paths.badgeView,
            load: () => import(/* webpackChunkName: 'userBadge' */ '../components/Badge/userBadgeRoute'),
        },
        {
            path: paths.personalBadgeView,
            // eslint-disable-next-line
            load: () => import(/* webpackChunkName: 'userBadge' */ '../components/Dashboard/personalDashboardBadgeRoute'),
        },
        {
            path: paths.endorsementRequest,
            load: () => import(/* webpackChunkName: 'er' */ '../components/Space/endorsementViewRoute'),
        },
        {
            path: '(.*)',
            load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
        },
    ],

    async action({ next }) {
        // Execute each child route until one of them return the result
        const route = await next();

        // Provide default values for title, description etc.
        route.title = `${route.title || 'Untitled Page'} - Cities of Learning`;
        route.description = route.description || '';

        return route;
    },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
    routes.children.unshift({
        path:   '/error',
        action: require('./error').default,
    });
}

export default routes;
