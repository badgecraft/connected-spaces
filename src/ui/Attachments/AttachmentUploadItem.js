import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import { ItemRoot } from './attachmentUtils';
import FontIcon from '../Icons/FontIcon';
import { font14A4 } from '../uiFonts';
import withFileUploader from '../Uploader/withFileUploader';

const Controls = styled('div')({
    ...font14A4,
    width:           '100%',
    height:          '100%',
    backgroundColor: ['#6e6e6d', '#6e6e6d20'],

    [`${FontIcon}`]: {
        fontSize: 20,
    },

    'label': {
        textAlign:      'center',
        cursor:         'pointer',
        width:          '100%',
        height:         '100%',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexDirection:  'column',
    },
});

const AttachmentUploadItem = ({ name = 'file', onStartUpload }) => (
    <ItemRoot>
        <Controls>
            <label htmlFor={name}>
                <FontIcon content="upload" />
                <div>{t`Add file`}</div>
            </label>
            <input style={{ display: 'none' }} type="file" id={name} name={name} onChange={onStartUpload} />
        </Controls>
    </ItemRoot>
);

AttachmentUploadItem.propTypes = {
    name:          PropTypes.string.isRequired,
    onStartUpload: PropTypes.func.isRequired,
};

export default withFileUploader(AttachmentUploadItem);
