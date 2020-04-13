import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { t } from 'ttag';
import ContextMenu from '../Menu/ContextMenu';
import context from './context.svg';
import owners from './owners.svg';
import admins from './admins.svg';
import remove from './remove.svg';
import OrderBy from '../List/OrderBy';
import Filter from '../List/Filter';
import {
    NameAndPic,
    Heading,
    Root,
    Actions,
    Avatar,
    Team,
    Email,
    Extra,
    Name,
    Info,
    StatR,
    StatT,
    StatV,
    Type,
} from '../List/userItemRowStyles';

// todo team labels on hover
// todo loading indicator when changing...

const ProjectUserItemView = ({ item, ...props }) => (
    <Root>
        <NameAndPic>
            <Avatar picture={item.picture}>
                <Team team={_get(item, 'team')} />
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
                        enabled: _get(item, 'perms.grantManager.value') === 1,
                        onClick: props.onGrantAdmin,
                    },
                    {
                        image:   remove,
                        label:   t`Revoke owner`,
                        enabled: _get(item, 'perms.revokeOwner.value') === 1,
                        onClick: props.onRevokeOwner,
                    },
                    {
                        label:   t`Revoke admin`,
                        image:   remove,
                        enabled: _get(item, 'perms.revokeManager.value') === 1,
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
                        label:   t`Cancel invite`,
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
            <StatR>
                <StatT>{t`Certificates`}</StatT>
                <StatV>{_get(item, 'stats.certificates')}</StatV>
            </StatR>
        </Extra>
    </Root>
);

ProjectUserItemView.propTypes = {
    item: PropTypes.shape({
        id:      PropTypes.string.isRequired,
        name:    PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        email:   PropTypes.string,
        type:    PropTypes.oneOf(['user', 'draft', 'invited']).isRequired,
        team:    PropTypes.oneOf(['users', 'admins', 'managers', 'owners']).isRequired,
        stats:   PropTypes.shape({
            badgesReceived: PropTypes.number.isRequired,
            quests:         PropTypes.number.isRequired,
            certificates:   PropTypes.number.isRequired,
        }).isRequired,
        perms:   PropTypes.shape({
            grantOwner:    PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
            grantManager:  PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
            revokeOwner:   PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
            revokeManager: PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
            revokeUser:    PropTypes.shape({ value: PropTypes.oneOf([0, 1]) }).isRequired,
        }).isRequired,
    }).isRequired,

    onGrantOwner:   PropTypes.func.isRequired,
    onGrantAdmin:   PropTypes.func.isRequired,
    onRevokeOwner:  PropTypes.func.isRequired,
    onRevokeAdmin:  PropTypes.func.isRequired,
    onRevokeUser:   PropTypes.func.isRequired,
    onRevokeInvite: PropTypes.func.isRequired,
};

export default ProjectUserItemView;

export const ProjectUserItemHeaderView = ({ userType, onUserTypeChange, perms, ...props }) => (
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
            <StatR><StatT>{t`Certificates`}</StatT></StatR>
        </Extra>
    </Heading>
);

ProjectUserItemHeaderView.propTypes = {
    userType:         PropTypes.oneOf(['all', 'invited', 'user']).isRequired,
    onUserTypeChange: PropTypes.func.isRequired,
    perms:            PropTypes.shape({
        invite: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
    }).isRequired,
};
