import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _pick from 'lodash/pick';
import { jt, t } from 'ttag';
import _get from 'lodash/get';
import Button from '../Button';
import { font16A3 } from '../uiFonts';

// todo display warning for all emails, not just primary
// todo display controls to re-send verification email

const Root = styled('div')({
    ...font16A3,
    backgroundColor: '#ffffff',
    position:        'fixed',
    left:            0,
    right:           0,
    bottom:          0,
    minHeight:       20,

    boxShadow: '0 -3px 12px 0 rgba(48,6,114,0.11)',
    padding:   '16px 32px',
});

const NotVerifiedPrimaryEmailView = ({ onClick, primaryEmail, emails, ...props }) => {
    const button = (<Button variant="primary" key="b" type="button" onClick={onClick} label={t`OK, done`} />);
    const notVerified = emails.filter(item => !item.verified);
    const primary = !primaryEmail && _get(notVerified[0], 'email');

    if (primary) {
        return (
            <Root {..._pick(props, 'className')}>
                {jt`Your primary email ${primary} is not verified, please check your mailbox. ${button}`}
            </Root>
        )
    }

    return (
        <Root {..._pick(props, 'className')}>
            {t`You don't have a primary email, please visit settings to add it`}
        </Root>
    );
};

NotVerifiedPrimaryEmailView.propTypes = {
    onClick:      PropTypes.func.isRequired,
    primaryEmail: PropTypes.string,
    emails:       PropTypes.arrayOf(PropTypes.shape({
        email:    PropTypes.string.isRequired,
        primary:  PropTypes.bool.isRequired,
        verified: PropTypes.bool.isRequired,
    })).isRequired,
};

NotVerifiedPrimaryEmailView.defaultProps = {
    primaryEmail: null,
};

export default NotVerifiedPrimaryEmailView;
