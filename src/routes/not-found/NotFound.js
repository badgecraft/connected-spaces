import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rebass/emotion';
import { t } from 'ttag';

const NotFound = ({ title }) => (
    <Box id="not-found" mx={3} my={5}>
        <h1>{title}</h1>
        <p>{t`Sorry, the page you were trying to view does not exist.`}</p>
    </Box>
);

NotFound.propTypes = {
    title: PropTypes.node.isRequired,
};

export default NotFound;
