import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import Layout from './PersonalLayout';
import { font16, font24 } from '../../ui/uiFonts';
import { themedMinWidth } from '../../ui/uiUtils';

const Coming = styled('h1')(({ theme }) => ({
    ...font16,
    margin:    '80px 0',
    textAlign: 'center',
    width:     '100%',

    [themedMinWidth('tablet', theme)]: {
        ...font24,
        margin: '140px 0',
    },
}));

const DashboardView = props => (
    <Layout {...props}>
        <Coming>{t`Coming soon...`}</Coming>
    </Layout>
);

DashboardView.propTypes = {
    organisation: PropTypes.string.isRequired,
};

export default DashboardView;
