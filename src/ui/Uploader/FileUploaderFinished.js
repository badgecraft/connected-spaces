import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import { Root } from './fileUtils';
import Button from '../Button';

const Details = styled('div')({
    marginBottom: 12,
});

const FileUploaderFinished = ({ onClose, renderResults, uploadResultStatus }) => (
    <Root>
        <Details>{renderResults(uploadResultStatus)}</Details>
        <div>
            <Button type="button" label={t`OK`} onClick={onClose} variant="primary" />
        </div>
    </Root>
);

FileUploaderFinished.propTypes = {
    onClose:            PropTypes.func.isRequired,
    renderResults:      PropTypes.func.isRequired,
    uploadResultStatus: PropTypes.shape({}),
};

FileUploaderFinished.defaultProps = {
    uploadResultStatus: null,
};

export default FileUploaderFinished;
