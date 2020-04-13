import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import { withProps } from 'recompose';
import { Box } from '@rebass/emotion';
import _get from 'lodash/get';
import FieldSet from '../Form/FieldSet';
import Button from '../Button';
import { font8, font16A5 } from '../uiFonts';
import ContextMenu from '../Menu/ContextMenu';
import context from './context.svg';
import AddEmail from './AddUserEmailForm';
import LocalFlashMessage from '../Flash/LocalFlashMessage';

const Add = withProps({ type: 'button', label: t`Add email`, variant: 'primary', size: 'smaller' })(Button);

const Row = styled('div')(({ marked }) => ({
    ...font16A5,
    lineHeight:      '32px',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'space-between',
    padding:         '8px 16px',
    borderBottom:    '1px solid #E5E3ED',
    backgroundColor: marked ? '#F6F6F6' : 'transparent',
    width:           '100%',
    '&:last-child':  {
        marginBottom: 0,
        borderBottom: '0 none',
    },
}));

const Unverified = styled('span')(({ theme }) => ({
    ...font8,
    borderRadius:    3,
    backgroundColor: _get(theme, 'colors.error'),
    color:           '#ffffff',
    whiteSpace:      'nowrap',
    padding:         '6px 4px 5px 3px',
    flexShrink:      0,
}));

const Primary = styled('span')(({ theme }) => ({
    ...font8,
    borderRadius:    3,
    backgroundColor: _get(theme, 'colors.primary'),
    color:           '#ffffff',
    whiteSpace:      'nowrap',
    padding:         '6px 4px 5px 3px',
    flexShrink:      0,
}));

const UserEmailsFormView = (props) => {
    const {
        emails, onRemove, onMakePrimary, onReSendVerify, addEmailOpen, setAddEmailOpen, platform, onAdded, status,
    } = props;
    return (
        <FieldSet title={t`Contacts`}>
            <Box flexDirection="column" mb={2}>
                {emails.map(em => (
                    <Row key={em.email} marked={em.primary}>
                        <div>
                            {em.email}{' '}
                            {em.primary && <Primary>{t`Primary email`}</Primary>}
                            {!em.verified && <Unverified>{t`Unverified email`}</Unverified>}
                        </div>
                        <div>
                            <ContextMenu
                                icon={context}
                                items={[
                                    {
                                        label:   t`Make primary`,
                                        enabled: em.verified && !em.primary && !em.busy,
                                        onClick: () => onMakePrimary(em.email),
                                    },
                                    {
                                        label:   t`Re-send verification email`,
                                        enabled: !em.verified && !em.busy,
                                        onClick: () => onReSendVerify(em.email),
                                    },
                                    {
                                        label:   t`Remove`,
                                        enabled: !em.primary && !em.busy,
                                        onClick: () => onRemove(em.email),
                                    },
                                ]}
                            />
                        </div>
                    </Row>
                ))}
            </Box>
            <div>
                <Add onClick={() => setAddEmailOpen(true)} />
                <AddEmail
                    open={addEmailOpen}
                    platform={platform}
                    onClose={() => setAddEmailOpen(false)}
                    onAdded={onAdded}
                />
                {!!status && <LocalFlashMessage message={status} enabled />}
            </div>
        </FieldSet>
    );
};

UserEmailsFormView.propTypes = {
    emails:          PropTypes.arrayOf(PropTypes.shape({
        email:    PropTypes.string.isRequired,
        verified: PropTypes.bool.isRequired,
        primary:  PropTypes.bool.isRequired,
        busy:     PropTypes.bool.isRequired,
    }).isRequired).isRequired,
    onAdded:         PropTypes.func.isRequired,
    addEmailOpen:    PropTypes.bool.isRequired,
    onMakePrimary:   PropTypes.func.isRequired,
    onReSendVerify:  PropTypes.func.isRequired,
    onRemove:        PropTypes.func.isRequired,
    setAddEmailOpen: PropTypes.func.isRequired,
    platform:        PropTypes.string.isRequired,
    status:          PropTypes.string.isRequired,
};

export default UserEmailsFormView;
