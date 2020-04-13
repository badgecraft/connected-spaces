import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import { FieldArray } from 'redux-form';
import Dialog from '../Modal/ModalDialog';
import Adder from '../InviteEmails/EmailAdderField';

const ReviewRequestInviteView = ({ onClose, handleSubmit, submitting }) => (
    <Dialog onClose={onClose} title={t`Request review`} variant="big">
        <FieldArray
            name="to"
            component={Adder}
            onInvite={handleSubmit}
            onCancel={onClose}
            teams={[]}
            disabled={submitting}
            rerenderOnEveryChange
        />
    </Dialog>
);

ReviewRequestInviteView.propTypes = {
    onClose:      PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting:   PropTypes.bool.isRequired,
};

export default ReviewRequestInviteView;
