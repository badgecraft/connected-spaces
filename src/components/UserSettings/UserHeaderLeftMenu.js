import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import menu from './menu.svg';
import MenuList from '../../ui/Menu/MenuList';
import ToggableMenu from '../../ui/Menu/ToggableMenu';
import paths from '../../constants/paths';
import activities from './activities.svg';
import home from './home.svg';
import map from './map.svg';
import logout from './logout.svg';
import user from './user.svg';
import withSite from '../_helpers/withSite';

const Logo = styled('img')({
    width: 118,
});

export const leftMenuItems = ({ mapType = 'map', withUser } = {}) => [
    { label: t`Home`, icon: home, to: paths.home, enabled: true },
    { label: t`Opportunities`, icon: activities, to: paths.opportunities, enabled: true },
    { label: t`Playlists`, icon: activities, to: paths.playlistSearch, enabled: true },
    { label: t`Map`, icon: map, to: paths.map, enabled: mapType === 'map' },
    { label: t`Logout`, icon: logout, enabled: withUser, to: paths.logout },
    { label: t`Login`, icon: user, enabled: !withUser, to: paths.authorize },
].filter(item => item.enabled);

const UserHeaderLeftMenu = ({ site, me }) => (
    <ToggableMenu
        name="UserHeaderLeftMenu"
        icon={menu}
        openStyle={{ width: 20 }}
        title={site && (<Logo src={site.logoUrl} />)}
    >
        <MenuList items={leftMenuItems({ mapType: _get(site, 'mapType', 'map'), withUser: !!me })} />
    </ToggableMenu>
);

UserHeaderLeftMenu.propTypes = {
    site: PropTypes.shape({
        logoUrl: PropTypes.string.isRequired,
        mapType: PropTypes.oneOf(['map', 'cover']).isRequired,
    }),
    me:   PropTypes.shape(),
};

UserHeaderLeftMenu.defaultProps = {
    site: null,
    me:   null,
};

export default withSite(UserHeaderLeftMenu);
