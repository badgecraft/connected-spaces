import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@rebass/emotion';
import { t } from 'ttag';

const Root = styled('div')({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    flexDirection:  'column',
    minHeight:      '300px',
});

const ListSpinner = () => (
    <Box mx={4} mb={4}>
        <Root>{t`Please wait while loading...`}</Root>
    </Box>
);

export default ListSpinner;
