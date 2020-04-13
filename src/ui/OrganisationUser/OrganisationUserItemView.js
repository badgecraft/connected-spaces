import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { t } from 'ttag';
import ContextMenu from '../Menu/ContextMenu';
import context from '../ProjectUser/context.svg';
import owners from '../ProjectUser/owners.svg';
import admins from '../ProjectUser/admins.svg';
import remove from '../ProjectUser/remove.svg';
import {
    Extra,
    Heading,
    NameAndPic,
    Actions,
    Root,
    Info,
    Email,
    Avatar,
    Team,
    Name,
    StatR,
    StatT,
    StatV,
    Type,
} from '../List/userItemRowStyles';
import Filter from '../List/Filter';
import OrderBy from '../List/OrderBy';

// todo team labels on hover
// todo loading indicator when changing...

const OrganisationUserItemView = ({ item, ...props }) => (
    <Root>
        <NameAndPic>
            <Avatar picture={item.picture}>
                <Team team={item.team} />
            </Avatar>
            <Info>
                <Name>
                    {item.name}{item.name && ' '}
                    <Type>{item.type === 'invited' ? t`Waiting for user to accept invite` : ''}</Type>
                </Name>
                <Email>{item.email}</Email>
            </Info>
        </NameAndPic>

        <Actions>
            <ContextMenu
                icon={context}
                items={[
                    {
                        image:   owners,
                        label:   t`Grant owner`,
                        enabled: _get(item, 'perms.grantOwner.value') === 1,
                        onClick: props.onGrantOwner,
                    },
                    {
                        image:   admins,
                        label:   t`Grant admin`,
                        enabled: _get(item, 'perms.grantAdmin.value') === 1,
                        onClick: props.onGrantAdmin,
                    },
                    {
                        image:   remove,
                        label:   t`Revoke owner`,
                        enabled: _get(item, 'perms.revokeOwner.value') === 1,
                        onClick: props.onRevokeOwner,
                    },
                    {
                        image:   remove,
                        label:   t`Revoke admin`,
                        enabled: _get(item, 'perms.revokeAdmin.value') === 1,
                        onClick: props.onRevokeAdmin,
                    },
                    {
                        image:   remove,
                        label:   t`Remove user`,
                        enabled: _get(item, 'perms.revokeUser.value') === 1,
                        onClick: props.onRevokeUser,
                    },
                    {
                        image:   remove,
                        label:   t`Remove invite`,
                        enabled: _get(item, 'perms.revokeInvite.value') === 1,
                        onClick: props.onRevokeInvite,
                    },
                ]}
            />
        </Actions>
        <Extra>
            <StatR>
                <StatT>{t`Badges`}</StatT>
                <StatV>{_get(item, 'stats.badgesReceived')}</StatV>
            </StatR>
            <StatR>
                <StatT>{t`Quests`}</StatT>
                <StatV>{_get(item, 'stats.quests')}</StatV>
            </StatR>
        </Extra>
    </Root>
);

OrganisationUserItemView.propTypes = {
    item: PropTypes.shape({
        id:      PropTypes.string.isRequired,
        name:    PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        email:   PropTypes.string,
        team:    PropTypes.oneOf(['users', 'admins', 'managers', 'owners']).isRequired,
        type:    PropTypes.oneOf(['user', 'draft', 'invited']).isRequired,
        stats:   PropTypes.shape({
            badgesReceived: PropTypes.number.isRequired,
            quests:         PropTypes.number.isRequired,
        }).isRequired,
        perms:   PropTypes.shape({
            grantOwner:  PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
            grantAdmin:  PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
            revokeOwner: PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
            revokeAdmin: PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
            revokeUser:  PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
        }).isRequired,
    }).isRequired,

    onGrantOwner:   PropTypes.func.isRequired,
    onGrantAdmin:   PropTypes.func.isRequired,
    onRevokeOwner:  PropTypes.func.isRequired,
    onRevokeAdmin:  PropTypes.func.isRequired,
    onRevokeUser:   PropTypes.func.isRequired,
    onRevokeInvite: PropTypes.func.isRequired,
};

export default OrganisationUserItemView;

export const OrganisationUserItemHeaderView = ({ userType, onUserTypeChange, perms, ...props }) => (
    <Heading>
        <NameAndPic>
            <Filter items={[
                {
                    enabled: _get(perms, 'invite.value') === 1,
                    label:   t`All users`,
                    active:  userType === 'all',
                    // appendQuery: { userType: 'all' },
                    onClick: (evt) => {
                        evt.preventDefault();
                        onUserTypeChange('all');
                    },
                },
                {
                    enabled: true,
                    label:   t`Joined users`,
                    active:  userType === 'user',
                    // appendQuery: { userType: 'user' },
                    onClick: (evt) => {
                        evt.preventDefault();
                        onUserTypeChange('user');
                    },
                },
                {
                    enabled: _get(perms, 'invite.value') === 1,
                    label:   t`Invited users`,
                    active:  userType === 'invited',
                    // appendQuery: { userType: 'invited' },
                    onClick: (evt) => {
                        evt.preventDefault();
                        onUserTypeChange('invited');
                    },
                },
            ]} />
        </NameAndPic>
        <Actions>
            <OrderBy
                {...props}
                options={[
                    { sort: 'userName', order: 'asc', label: t`By name (a-z)` },
                    { sort: 'userName', order: 'desc', label: t`By name (z-a)` },
                    { sort: 'userJoined', order: 'asc', label: t`By join date (asc)` },
                    { sort: 'userJoined', order: 'desc', label: t`By join date(desc)` },
                ]}
            />
        </Actions>
        <Extra>
            <StatR><StatT>{t`Badges`}</StatT></StatR>
            <StatR><StatT>{t`Quests`}</StatT></StatR>
        </Extra>
    </Heading>
);

OrganisationUserItemHeaderView.propTypes = {
    userType:         PropTypes.oneOf(['all', 'invited', 'user']).isRequired,
    onUserTypeChange: PropTypes.func.isRequired,
    perms:            PropTypes.shape({
        invite: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
    }).isRequired,
};
