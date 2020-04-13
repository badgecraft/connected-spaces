import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { t } from 'ttag';
import UserSelect from '../Form/UserSelect';
import Select from '../Form/Select';
import remove from './remove.svg';
import { font14, font12A4, font16, font16A5, font14A4 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';
import { translateErrors } from '../uiFormValidateHandler';

const Root = styled('div')({
    textAlign: 'left',
});

const Search = styled('div')({
    marginBottom: 12,
});

const Users = styled('div')({});

const UserRow = styled('div')({
    marginBottom: 8,
    padding:      '21px 12px 12px 12px',
    boxShadow:    '0 6px 12px 0 rgba(48,6,114,0.11)',
});

const UserRowInner = styled('div')({
    display:    'flex',
    alignItems: 'center',
});

const defaultFace = '/img/default-profile.png';

const Avatar = styled('div')(({ picture }) => ({
    width:        30,
    height:       30,
    background:   `#666666 url("${picture || defaultFace}") center center/contain no-repeat`,
    borderRadius: '50%',
    flexShrink:   0,
    marginRight:  8,
}));

const Details = styled('div')({
    flexGrow: 1,
});

const Primary = styled('div')(({ theme }) => ({
    ...font14,

    [themedMinWidth('tablet', theme)]: {
        ...font16,
    },
}));

const Secondary = styled('div')(({ theme }) => ({
    ...font12A4,

    [themedMinWidth('tablet', theme)]: {
        ...font16A5,
    },
}));

const Team = styled('div')({
    flexShrink: 0,
    minWidth:   120,
});

const Actions = styled('div')({
    marginLeft: 8,
    flexShrink: 0,
});

const Rm = styled('button')({
    width:      18,
    height:     18,
    outline:    'none',
    background: `transparent url("${remove}") center center/12px 12px no-repeat`,
    border:     '0 none',
    cursor:     'pointer',
});

const removeValue = (list, { type, value }) => list.filter(item => !(item.type === type && item.value === value));

const addValue = (list, userIdent) => [
    userIdent,
    ...removeValue(list, { type: userIdent.type, value: userIdent.value }),
];

const changeTeam = (list, userIdent, team) => list.map(item => {
    if (item.type === userIdent.type && item.value === userIdent.value) {
        return { ...item, team };
    }

    return item;
});

const shouldPrintEmail = userIdent =>
    userIdent.type === 'user' && userIdent.primaryEmail && userIdent.name !== userIdent.primaryEmail;

const Status = styled('div')(({ theme, error }) => ({
    ...font14A4,
    minHeight:    19,
    textAlign:    'right',
    marginBottom: -10,
    marginRight:  23,
    ...(error && {
        color: _get(theme, 'colors.form.error', '#d65757'),
    }),

    [themedMinWidth('tablet', theme)]: {
        ...font16A5,
    },
}));

const InviteStatus = ({ status }) => {
    if (!status) { // eslint-disable-next-line react/jsx-curly-brace-presence
        return (<Status>{' '}</Status>);
    }

    if (status.ok) {
        return (<Status>{t`Sent.`}</Status>);
    }

    const errors = translateErrors({
        errors:       status.errors,
        translations: {},
    });

    return (
        <Status error>{Object.keys(errors || {}).map(key => errors[key]).filter(item => item).join(', ')}</Status>
    );
};

InviteStatus.propTypes = {
    status: PropTypes.shape({
        ok:     PropTypes.bool.isRequired,
        errors: PropTypes.arrayOf(PropTypes.shape({})),
    }),
};

InviteStatus.defaultProps = {
    status: null,
};

const UserInvite = ({ value, onChange, teams, defaultTeam, inviteStatus, disabled }) => (
    <Root>
        <Search>
            <UserSelect
                onChange={user => onChange(addValue(value || [], { ...user, team: defaultTeam }))}
                value={null}
                escapeClearsValue
                exclude={value || []}
                disabled={disabled}
            />
        </Search>
        <Users>
            {(value || []).map((userIdent, index) => (
                <UserRow key={`${userIdent.type}/${userIdent.value}`}>
                    <UserRowInner>
                        <Avatar picture={userIdent.picture} />
                        <Details>
                            <Primary>{userIdent.name || userIdent.value}</Primary>
                            {shouldPrintEmail(userIdent) && <Secondary>{userIdent.primaryEmail}</Secondary>}
                        </Details>
                        <Team>
                            <Select
                                options={teams}
                                value={teams.find(item => item.value === userIdent.team)}
                                onChange={toTeam => onChange(changeTeam(value || [], userIdent, toTeam.value))}
                            />
                        </Team>
                        <Actions>
                            <Rm
                                type="button"
                                disabled={disabled}
                                onClick={() => onChange(removeValue(value || [], userIdent))}
                            />
                        </Actions>
                    </UserRowInner>
                    <InviteStatus status={_get(inviteStatus, index)} />
                </UserRow>
            ))}
        </Users>

    </Root>
);

UserInvite.propTypes = {
    value:        PropTypes.arrayOf(PropTypes.shape({
        type:         PropTypes.oneOf(['user', 'email']).isRequired,
        value:        PropTypes.string.isRequired,
        team:         PropTypes.string.isRequired,
        picture:      PropTypes.string,
        primaryEmail: PropTypes.string,
    })).isRequired,
    onChange:     PropTypes.func.isRequired,
    teams:        PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
    defaultTeam:  PropTypes.string.isRequired,
    inviteStatus: PropTypes.arrayOf(PropTypes.shape({})),
    disabled:     PropTypes.bool,
};

UserInvite.defaultProps = {
    inviteStatus: null,
    disabled:     false,
};

export default UserInvite;
