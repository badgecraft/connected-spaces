import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { t } from 'ttag';
import styled from '@emotion/styled';
import Invite from './UserInviteField';
import Button from '../Button';
import QrView from '../Qr/QrView';
import { themedMinWidth } from '../uiUtils';

const Buttons = styled('div')(({ theme }) => ({
    padding:   '0 12px',
    textAlign: 'center',

    [themedMinWidth('tablet', theme)]: {
        textAlign: 'right',
    },
}));

const UserInviteFormAdd = ({ handleSubmit, inviteStatus, submitting, onClose, teams, autoJoin }) => (
    <React.Fragment key="anu">
        <form onSubmit={handleSubmit}>
            <Field
                name="to"
                component={Invite}
                teams={teams}
                defaultTeam="users"
                inviteStatus={inviteStatus}
                disabled={submitting}
            />

            <Buttons>
                <Button
                    type="button"
                    variant="secondary"
                    label={inviteStatus !== null ? t`Close` : t`Cancel`}
                    disabled={submitting}
                    onClick={onClose}
                />
                {' '}
                <Button
                    type="submit"
                    variant="primary"
                    label={t`Invite`}
                    disabled={submitting}
                />
            </Buttons>
        </form>

        {autoJoin &&
        <QrView
            name={autoJoin.name}
            title={autoJoin.title}
            code={autoJoin.code}
            claimPath={autoJoin.claimPath}
        />}
    </React.Fragment>
);

UserInviteFormAdd.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    inviteStatus: PropTypes.arrayOf(PropTypes.shape({})),
    submitting:   PropTypes.bool.isRequired,
    onClose:      PropTypes.func.isRequired,
    teams:        PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
    autoJoin:     PropTypes.shape({
        title:     PropTypes.string.isRequired,
        code:      PropTypes.string.isRequired,
        name:      PropTypes.string.isRequired,
        claimPath: PropTypes.string.isRequired,
    }),
};

UserInviteFormAdd.defaultProps = {
    inviteStatus: null,
    autoJoin:     null,
};

export default UserInviteFormAdd;
