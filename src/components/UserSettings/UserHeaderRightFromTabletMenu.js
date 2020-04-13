import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import { getContext } from 'recompose';
import Button from '../../ui/Button';
import paths from '../../constants/paths';
import Profile from './UserProfileDropDown';
import { themedMinWidth } from '../../ui/uiUtils';
import { toLink } from '../../ui/Link';
import Bell from '../../ui/Notification/NotificationBell';

const TabletRoot = styled('div')(({ theme }) => ({
    display:                           'none',
    [themedMinWidth('tablet', theme)]: {
        display:    ['inline-block', 'flex'],
        alignItems: 'center',
    },
}));

const UserHeaderRightFromTabletMenu = ({ viewer, pathname, mapType }) => (
    <TabletRoot>
        {viewer
            ? (<React.Fragment key="withV">
                <Button type="menuLink" variant="transparent" label={t`Dashboard`} to={paths.dashboard} />
                <Button type="menuLink" variant="transparent" label={t`Playlists`} to={paths.playlistSearch} />
                <Button type="menuLink" variant="transparent" label={t`Opportunities`} to={paths.opportunities} />
                {mapType === 'map' && <Button type="menuLink" variant="transparent" label={t`Map`} to={paths.home} />}
                <Bell />
                <Profile viewer={viewer} />
            </React.Fragment>)
            : (<React.Fragment key="withoutV">
                <Button
                    type="link"
                    variant="secondary"
                    label={t`Sign Up`}
                    href={toLink({ to: paths.authorizeWithBack, params: { back: pathname || '' } })}
                />
                <Button
                    type="link"
                    variant="transparent"
                    label={t`Login`}
                    href={toLink({ to: paths.authorizeWithBack, params: { back: pathname || '' } })}
                />
            </React.Fragment>)}
    </TabletRoot>
);

UserHeaderRightFromTabletMenu.propTypes = {
    viewer:   PropTypes.shape(),
    pathname: PropTypes.string.isRequired,
    mapType:  PropTypes.oneOf(['map', 'cover']),
};

UserHeaderRightFromTabletMenu.defaultProps = {
    viewer:  null,
    mapType: null,
};

export default getContext({
    pathname: PropTypes.string.isRequired,
    mapType:  PropTypes.string.isRequired,
})(UserHeaderRightFromTabletMenu);
