import { withProps, compose } from 'recompose';
import { t } from 'ttag';
import _get from 'lodash/get';
import { graphql } from 'react-apollo';
import View from '../../ui/Menu/MenuList';
import activities from './activities.svg';
import playlists from './playlist.svg';
import settings from './settings.svg';
import analytics from './analytics.svg';
import users from './users.svg';
import invites from './invites.svg';
import paths from '../../constants/paths';
import query from '../../ui/OrganisationSwitcher/organisationSwitcher.gql';

export const dashboardMenuItems = (active, id, opts) => [
    {
        name:   'activities',
        label:  t`Activities`,
        icon:   activities,
        to:     paths.orgDashboard,
        params: { id },
    },
    {
        name:   'playlists',
        label:  t`Playlists`,
        icon:   playlists,
        to:     paths.orgDashboardPlaylists,
        params: { id },
    },
    {
        name:   'analytics',
        label:  t`Analytics`,
        icon:   analytics,
        to:     paths.orgDashboardAnalytics,
        params: { id },
    },
    {
        name:   'settings',
        label:  t`Settings`,
        icon:   settings,
        to:     paths.orgDashboardSettings,
        params: { id },
    },
    {
        name:   'users',
        label:  t`Users`,
        icon:   users,
        to:     paths.orgDashboardUsers,
        params: { id },
    },
    _get(opts, 'endorsements') === true && {
        name:   'endorsements',
        label:  t`Endorsements`,
        icon:   invites, // todo endorsement icon required
        to:     paths.orgDashboardEndorsements,
        params: { id },
    },
].filter(item => item).map(item => ({ ...item, active: item.name === active }));

export const withDashboardMenuItems = graphql(query, {
    options: ({ id }) => ({
        variables: { current: id },
    }),
    props:   ({ data, ownProps: { tab, id } }) => ({
        items: dashboardMenuItems(tab, id, {
            endorsements: _get(data, 'maybeOrganisation.organisation.givenEndorsements.total', 0) > 0,
        }),
    }),
});

export default compose(
    withProps({ tab: 'none' }),
    withDashboardMenuItems,
)(View);
