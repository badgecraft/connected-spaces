import React from 'react';
import styled from '@emotion/styled';
import { t } from 'ttag';
import _get from 'lodash/get';
import { icons } from '../Icon/_Icon';

const Root = styled('span')(({ theme }) => ({
    display:      'inline-block',
    width:        14,
    height:       14,
    borderRadius: 7,
    background:   `${_get(theme, 'colors.primary')} url("${icons.success}") center center/6px 4px no-repeat`,
    marginRight:  8,
    marginLeft:   -3,
}));

const Verified = () => (<Root title={t`Verified organisation`} />);

export default Verified;
