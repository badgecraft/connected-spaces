import React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import Dialog from '../Modal/ModalDialog';
import Adder from './EmailAdderField';
import QrView from '../Qr/QrView';

const InviteEmailsView = ({ onClose, handleSubmit, teams, autoJoin, submitting }) => (
    <Dialog onClose={onClose} title={t`Add new users`} variant="big">
        <FieldArray
            name="to"
            component={Adder}
            onInvite={handleSubmit}
            onCancel={onClose}
            teams={teams}
            disabled={submitting}
            defaultItem={{ team: 'users' }}
            rerenderOnEveryChange
        />

        {autoJoin &&
        <QrView
            name={autoJoin.name}
            title={autoJoin.title}
            code={autoJoin.code}
            claimPath={autoJoin.claimPath}
        />}
    </Dialog>
);

InviteEmailsView.propTypes = {
    onClose:      PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    teams:        PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    submitting:   PropTypes.bool.isRequired,
    autoJoin:     PropTypes.shape({
        name:      PropTypes.string.isRequired,
        title:     PropTypes.string.isRequired,
        code:      PropTypes.string.isRequired,
        claimPath: PropTypes.string.isRequired,
    }),
};

InviteEmailsView.defaultProps = {
    autoJoin: null,
};

export default InviteEmailsView;
