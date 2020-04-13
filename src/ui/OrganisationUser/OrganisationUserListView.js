import React from 'react';
import PropTypes from 'prop-types';
import { msgid, ngettext, t } from 'ttag';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import List, { Empty } from '../List/SearchList';
import Item, { OrganisationUserItemHeader } from './OrganisationUserItem';
import Link from '../Link';
import { font14A4 } from '../uiFonts';

const Invite = styled(Link)({
    ...font14A4,
    marginLeft:     8,
    textDecoration: 'underline',
});

const toEmptyText = ({ text, userType }) => {
    if (userType === 'invited') {
        return text
            ? t`Sorry, no invited users found for query '${text}`
            : `Organisation does not have any invites`;
    }
    return text
        ? t`Sorry no users found for query '${text}'`
        : t`Organisation does not have any users`
};

const OrganisationUserListView = (props) => {
    const { total, perms, inviteTo, q: text, sort, order, onSortChange, userType, onUserTypeChange } = props;
    return (
        <List
            {...props}
            renderItem={item => (<Item key={item.id} item={item} />)}
            renderEmpty={() => (<Empty>{toEmptyText({ text, userType })}</Empty>)}
            renderHeader={() => (<OrganisationUserItemHeader
                onChange={onSortChange}
                sort={sort}
                order={order}
                userType={userType}
                onUserTypeChange={onUserTypeChange}
            />)}
        >
            {ngettext(msgid`user in list`, `users in list`, total)}
            {_get(perms, 'invite.value') === 1 && <Invite {...inviteTo}>{t`Invite user`}</Invite>}
        </List>
    );
};

OrganisationUserListView.propTypes = {
    total:    PropTypes.number.isRequired,
    perms:    PropTypes.shape({
        invite: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
    }).isRequired,
    inviteTo: PropTypes.shape({}).isRequired,
    q:        PropTypes.string.isRequired,

    onSortChange:     PropTypes.func.isRequired,
    sort:             PropTypes.string.isRequired,
    order:            PropTypes.string.isRequired,
    userType:         PropTypes.string.isRequired,
    onUserTypeChange: PropTypes.func.isRequired,
};

export default OrganisationUserListView;
