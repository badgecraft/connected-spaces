import React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';
import { getContext, withHandlers, compose } from 'recompose';
import Add from './OrganisationUserAdd';
import Upload from './OrganisationUserUpload';
import Dialog from '../Modal/ModalDialogWithTabs';

const OrganisationUserInviteDialog = ({ onClose, ...props }) => (
    <Dialog
        variant="big"
        onEscape={() => null}
        onClose={onClose}
        tabItems={[
            {
                enabled: true,
                label:   t`Add new users`,
                content: () => (<Add onClose={onClose} {...props} />),
                active:  true,
            },
            {
                enabled: true,
                label:   t`Upload users`,
                content: () => (<Upload onClose={onClose} {...props} />),
                active:  false,
            },
        ]}
    />
);

OrganisationUserInviteDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default compose(
    getContext({ pushRoute: PropTypes.func.isRequired }),
    withHandlers({
        onClose: ({ pushRoute, cancelTo }) => () => pushRoute(cancelTo),
    }),
)(OrganisationUserInviteDialog)
