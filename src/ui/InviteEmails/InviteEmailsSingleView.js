/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t, jt } from 'ttag';
import Button from '../Button';
import FormField from '../Form/FormField';
import { themedMinWidth } from '../uiUtils';
import { Actions, EmailB, RootB, TeamB, ActionsB, ActionsInfo } from './inviteEmailsStyle';

const Commands = styled('div')(({ theme }) => ({
    textAlign: 'center',
    marginTop: -32,

    [themedMinWidth('tablet', theme)]: {
        textAlign: 'left',
    },
}));

const InviteEmailsSingleView = (props) => {
    const {
        onOpenMany,
        onAddNew,
        onCancel,
        onInvite,
        disabled,
        renderItems,
        renderInfo,
        inviteLabel,
        cancelLabel,
        hideButtons,
        teams,
    } = props;
    const addAnotherButton = (
        <Button
            key="a"
            type="button"
            variant="link"
            label="Add another one"
            size="smaller"
            onClick={onAddNew}
            disabled={disabled}
        />
    );
    const addManyButton = (
        <Button
            key="m"
            type="button"
            variant="link"
            label="add many at once"
            size="smaller"
            onClick={onOpenMany}
            disabled={disabled}
        />
    );

    return (
        <div>
            <div>
                <FormField
                    label={<RootB>
                        <EmailB>{t`Email`}</EmailB>
                        {teams && teams.length > 0 && (<TeamB>{t`Team`}</TeamB>)}
                        <ActionsB />
                    </RootB>}
                >{renderItems()}</FormField>
            </div>
            <Commands>{jt`${addAnotherButton} or ${addManyButton}`}</Commands>
            <Actions>
                <ActionsInfo>{renderInfo()}</ActionsInfo>
                {!hideButtons && <React.Fragment key="buttons">
                    <Button
                        variant="secondary"
                        label={cancelLabel || t`Cancel`}
                        type="button"
                        onClick={onCancel}
                        disabled={disabled}
                    />
                    {' '}
                    <Button
                        variant="primary"
                        label={inviteLabel || t`Invite`}
                        type="button"
                        onClick={onInvite}
                        disabled={disabled}
                    />
                </React.Fragment>}
            </Actions>
        </div>
    );
};

InviteEmailsSingleView.propTypes = {
    onOpenMany:  PropTypes.func.isRequired,
    onCancel:    PropTypes.func.isRequired,
    onInvite:    PropTypes.func.isRequired,
    onAddNew:    PropTypes.func.isRequired,
    renderItems: PropTypes.func.isRequired,
    renderInfo:  PropTypes.func.isRequired,

    disabled: PropTypes.bool,

    inviteLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    hideButtons: PropTypes.bool,
    teams:       PropTypes.arrayOf(PropTypes.shape({})),
};

InviteEmailsSingleView.defaultProps = {
    disabled:    false,
    inviteLabel: null,
    cancelLabel: null,
    hideButtons: false,
    teams:       [],
};

export default InviteEmailsSingleView;
