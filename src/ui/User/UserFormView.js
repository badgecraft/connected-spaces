import React from 'react';
import { t } from 'ttag';
import styled from '@emotion/styled';
import { minWidthFromProps, withVisibilityStyle } from '../uiUtils';
import { font24 } from '../uiFonts';
import Personal from './UserPersonalForm';
import Emails from './UserEmailsForm';
import Password from './UserPasswordForm';
import Connections from './UserConnectionsFormView';
import Privacy from './UserPrivacyForm';

const Container = styled('div')(({ theme }) => ({
    border:                                '0 none',
    margin:                                '8px auto',
    width:                                 '100%',
    padding:                               0,
    [minWidthFromProps('tablet', theme)]:  {
        padding: '16px 16px 0 16px',
        width:   theme.breakpointWidths.tablet,
    },
    [minWidthFromProps('desktop', theme)]: {
        width: theme.breakpointWidths.desktop,
    },
}));

const Heading = styled('h1')({ ...font24 }, withVisibilityStyle);

const UserFormView = (props) => (
    <Container>
        <Heading fromTablet>{t`Personal settings`}</Heading>
        <Personal {...props} />
        <Emails {...props} />
        <Privacy {...props} />
        <Password {...props} />
        <Connections {...props} />
    </Container>
);

export default UserFormView;
