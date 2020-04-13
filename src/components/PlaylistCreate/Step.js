import React from 'react';
import styled from '@emotion/styled';
import { t } from 'ttag';
import PropTypes from 'prop-types';
import { font14A4, font16A3 } from '../../ui/uiFonts';
import { themedMinWidth, withVisibilityStyle } from '../../ui/uiUtils';

const Root = styled('span')(({ theme }) => ({
    display:       'inline-block',
    verticalAlign: 'middle',
    ...font14A4,
    color:         '#3E3564',

    [themedMinWidth('tablet', theme)]: {
        ...font16A3,
    },
}), withVisibilityStyle);

const Step = ({ current, total, ...other }) => (
    <Root {...other}>{t`Step ${current}/${total}`}</Root>
);

Step.propTypes = {
    current: PropTypes.number.isRequired,
    total:   PropTypes.number.isRequired,
};

export default Step;
