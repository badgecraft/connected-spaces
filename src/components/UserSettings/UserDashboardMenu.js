import { withProps } from 'recompose';
import { t } from 'ttag';
import View from '../../ui/Menu/MenuList';
import activities from './activities.svg';
import playlists from './playlist.svg';
import badges from './badges.svg';
// import collections from './collections.svg';
// import organisers from './organisers.svg';
// import history from './history.svg';
import settings from './settings.svg';
// import logout from './logout.svg';
import bell from './bell.svg';
import paths from '../../constants/paths';

export const dashboardMenuItems = (active) => [
    {
        name:  'activities',
        label: t`My activities`,
        icon:  activities,
        to:    paths.personalDashboard,
    },
    {
        name:  'playlists',
        label: t`My playlists`,
        icon:  playlists,
        to:    paths.personalDashboardPlaylists,
    },
    {
        name:  'badges',
        label: t`My badges`,
        icon:  badges,
        to:    paths.personalDashboardBadges,
    },
    {
        name:  'notifications',
        label: t`Notifications`,
        icon:  bell,
        to:    paths.notifications,
    },
    {
        name:  'evidencesToCheck',
        label: t`Evidences`,
        icon:  bell,
        to:    paths.evidencesToCheck,
    },
    // {
    //     name:  'collections',
    //     label: t`Collections`,
    //     icon:  collections,
    //     to:    paths.collections,
    // },
    // {
    //     name:  'organisers',
    //     label: t`Fallowed organisers`,
    //     icon:  organisers,
    //     to:    paths.fallowedOrganisers,
    // },
    // {
    //     name:  'history',
    //     label: t`History`,
    //     icon:  history,
    //     to:    paths.history,
    // },
    {
        name:  'settings',
        label: t`Personal settings`,
        icon:  settings,
        // paths.profileSettings
        to:    paths.personalDashboardSettings,
    },
    // {
    //     name:  'logout',
    //     label: t`Logout`,
    //     icon:  logout,
    //     to:    paths.logout,
    // },
].map(item => ({ ...item, active: item.name === active }));

export default withProps({ items: dashboardMenuItems() })(View);
