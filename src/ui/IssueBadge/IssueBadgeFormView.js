import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import { Field } from 'redux-form';
import _get from 'lodash/get';
import { themedMinWidth } from '../uiUtils';
import Dialog from '../Modal/ModalDialog';
import Issue from './IssueBadgeField';
import Button from '../Button';
import QrCode from './IssueBadgeQrCode';

const Buttons = styled('div')(({ theme }) => ({
    padding:   '0 12px',
    textAlign: 'center',

    [themedMinWidth('tablet', theme)]: {
        textAlign: 'right',
    },
}));

const BadgeClass = styled('div')({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'flex-start',
});

const Pic = styled('div')(({ picture }) => ({
    width:       60,
    height:      60,
    background:  `transparent url("${picture}") center center/contain no-repeat`,
    marginRight: 16,
}));

const Name = styled('div')({});

const getFirstNotUsedMultiCode = badgeClass =>
    (_get(badgeClass, 'claimCodes.list') || []).find(item => item.multi);

const IssueBadgeFormView = ({ badgeClass, handleSubmit, inviteStatus, submitting, onClose, claimPath }) => {
    const claimCode = getFirstNotUsedMultiCode(badgeClass);
    const issueEnabled = _get(badgeClass, 'perms.issue.value') === 1;
    return (
        <Dialog variant="big" title={issueEnabled ? t`Issue badge` : t`Invite to start mission`} onClose={onClose}>
            <BadgeClass>
                <Pic picture={badgeClass.picture} />
                <Name>{badgeClass.name}</Name>
            </BadgeClass>

            {issueEnabled && (<form onSubmit={handleSubmit}>
                <Field
                    name="to"
                    component={Issue}
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
                        label={t`Issue`}
                        disabled={submitting}
                    />
                </Buttons>
            </form>)}
            {claimCode && <QrCode name={badgeClass.name} claimCode={claimCode} claimPath={claimPath} />}
        </Dialog>
    );
};

IssueBadgeFormView.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    inviteStatus: PropTypes.arrayOf(PropTypes.shape()),
    submitting:   PropTypes.bool.isRequired,
    onClose:      PropTypes.func.isRequired,
    badgeClass:   PropTypes.shape({
        id:         PropTypes.string.isRequired,
        name:       PropTypes.string.isRequired,
        picture:    PropTypes.string.isRequired,
        claimCodes: PropTypes.shape({
            total: PropTypes.number.isRequired,
            list:  PropTypes.arrayOf(PropTypes.shape({
                multi: PropTypes.bool.isRequired,
                used:  PropTypes.bool.isRequired,
            })).isRequired,
        }).isRequired,
        perms:      PropTypes.shape({
            issue: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
        }).isRequired,
    }).isRequired,
    claimPath:    PropTypes.string.isRequired,
};

IssueBadgeFormView.defaultProps = {
    inviteStatus: null,
};

export default IssueBadgeFormView
