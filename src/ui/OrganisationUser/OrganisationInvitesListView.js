import React from 'react';
import PropTypes from 'prop-types';
import { msgid, ngettext, t } from 'ttag';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import List from '../List/List';
import { font14A1, font24, font14A4 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';
import Link from '../Link';
import Item from '../UserInvite/InviteItemView';

const Heading = styled('h1')(({ theme }) => ({
    ...font14A1,
    color:  '#3E3564',
    margin: '0 16px 16px 16px',

    [themedMinWidth('tablet', theme)]: {
        ...font24,
    },
}));

const Invite = styled(Link)({
    ...font14A4,
    marginLeft:     8,
    textDecoration: 'underline',
});

const OrganisationInvitesListView = (props) => {
    const { list, total, loading, perms, inviteTo } = props;
    return (
        <React.Fragment>
            <Heading hide={list.length === 0 && loading}>
                {ngettext(msgid`${total} invite`, `${total} invites`, total)}
                {_get(perms, 'invite.value') === 1 && <Invite {...inviteTo}>{t`Invite user`}</Invite>}
            </Heading>
            <List
                {...props}
                renderItem={item => (<Item key={item.id} item={item} />)}
            />
        </React.Fragment>
    );
};

OrganisationInvitesListView.propTypes = {
    list:     PropTypes.arrayOf(PropTypes.shape()).isRequired,
    total:    PropTypes.number.isRequired,
    loading:  PropTypes.bool.isRequired,
    perms:    PropTypes.shape({
        invite: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
    }).isRequired,
    inviteTo: PropTypes.shape({}).isRequired,
};

export default OrganisationInvitesListView;
