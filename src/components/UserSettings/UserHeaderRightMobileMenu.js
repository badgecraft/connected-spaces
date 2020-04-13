import React from 'react';
import _get from 'lodash/get';
import { t } from 'ttag';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { compose, getContext, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import Switcher from '../../ui/OrganisationSwitcher';
import OrgMenu from '../Dashboard/OrganisationDashboardMenu';
import UserDashboardMenu from './UserDashboardMenu';
import MenuList from '../../ui/Menu/MenuList';
import { leftMenuItems } from './UserHeaderLeftMenu';
import ToggableMenu, { toggableMenuButtonStyle } from '../../ui/Menu/ToggableMenu';
import { themedMinWidth } from '../../ui/uiUtils';
import paths from '../../constants/paths';
import Link, { toLink } from '../../ui/Link';
import user from './user.svg';
import { getOrganisationIdFromCookie } from '../Dashboard/dashboardUtils';
import query from './userHeaderRightMenu.gql';
import Bell from '../../ui/Notification/NotificationBell';

const MobileRoot = styled('div')(({ theme }) => ({
    display:                           'inline-block',
    [themedMinWidth('tablet', theme)]: {
        display: 'none',
    },
}));

const Login = styled(Link)({
    ...toggableMenuButtonStyle,
    display:         'inline-block',
    backgroundImage: `url("${user}")`,
});

const UserHeaderRightMobileMenu = ({ organisation, loading, viewer, openStyle, pathname, mapType }) => {
    if (!viewer) {
        return (
            <MobileRoot>
                <Login href={toLink({ to: paths.authorizeWithBack, params: { back: pathname || '' } })} />
            </MobileRoot>
        )
    }

    const organisationId = _get(organisation, 'id', '');
    return (
        <MobileRoot>
            <Bell />
            <ToggableMenu
                name="userHeaderRightMenu"
                icon={_get(organisation, 'picture', loading ? null : viewer.picture)}
                openStyle={{
                    ...openStyle,
                    ...(organisation && { backgroundColor: _get(organisation, 'pictureMeta.dominantColor') })
                }}
                title={t`Dashboard`}
            >
                <Switcher
                    organisation={organisationId}
                    viewer={viewer}
                    organisationPath={paths.orgDashboard}
                    personalPath={paths.personalDashboard}
                />
                {organisationId
                    ? (<OrgMenu id={organisationId} />)
                    : <UserDashboardMenu />}
                <MenuList items={leftMenuItems({ withUser: !!viewer, mapType })} />
            </ToggableMenu>
        </MobileRoot>
    );
};

UserHeaderRightMobileMenu.propTypes = {
    viewer:       PropTypes.shape({ picture: PropTypes.string.isRequired }),
    organisation: PropTypes.shape(),
    loading:      PropTypes.bool.isRequired,
    openStyle:    PropTypes.shape(),
    pathname:     PropTypes.string.isRequired,
    mapType:      PropTypes.oneOf(['cover', 'map']).isRequired,
};

UserHeaderRightMobileMenu.defaultProps = {
    viewer:       null,
    organisation: null,
    openStyle:    {},
};

export default compose(
    getContext({
        cookies:  PropTypes.shape(),
        pathname: PropTypes.string.isRequired,
        mapType:  PropTypes.string.isRequired,
    }),
    withProps(({ cookies, organisationId }) => {
        if (organisationId) {
            return {};
        }
        const inCookie = getOrganisationIdFromCookie(cookies);
        if (inCookie !== 'me') {
            return { organisationId: inCookie };
        }
        return {};
    }),
    graphql(query, {
        skip:  ({ organisationId }) => !organisationId,
        props: ({ data }) => ({
            loading:      data.loading,
            organisation: _get(data, 'maybeOrganisation.organisation'),
        }),
    }),
)(UserHeaderRightMobileMenu);
