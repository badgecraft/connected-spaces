import React from 'react';
import styled from '@emotion/styled';
import { t } from 'ttag';
import createAuthAction from '../../core/createAuthAction';
import mutation from './verifyEmail.gql';
import { action2Route } from '../../core/utils';
import Layout from '../../components/Layout';
import { font16, font12, font24, font16A1 } from '../../ui/uiFonts';
import { themedMinWidth } from '../../ui/uiUtils';

const Root = styled('div')({
    height:         '50vh',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    flexDirection:  'column',
});

const Heading = styled('h1')(({ theme }) => ({
    ...font16,
    margin:    '40px 0',
    textAlign: 'center',

    [themedMinWidth('tablet', theme)]: {
        ...font24,
    },
}));

const Desc = styled('p')(({ theme }) => ({
    ...font12,
    textAlign: 'center',

    [themedMinWidth('tablet', theme)]: {
        ...font16A1,
    },
}));

export default createAuthAction({ auth: 'optional' })(async (context, { token }) => {
    await context.client.mutate({
        mutation,
        variables:   { token },
        errorPolicy: 'all',
    });

    return {
        chunks:    ['emailVerify'],
        title:     t`Email verified`,
        component: (<Layout route={action2Route(context)} viewer={context.viewer}>
            <Root>
                <Heading>{t`Email verified, thank you`}</Heading>
                <Desc>{t`You can close this window now.`}</Desc>
            </Root>
        </Layout>),
    };
});
