import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import Upload from './_UploadFileAction';
import File from './_UploadedFile';

const Root = styled('div')(({ theme }) => ({
    border:       `1px solid ${_get(theme, 'colors.form.inputBorder', '#EFEFEF')}`,
    borderRadius: 10,
    padding:      10,
    display:      'flex',
    flexWrap:     'wrap',
}));

const Attachments = ({ value, onChange }) => (
    <Root>
        <Upload bucket="evidence" onChange={file => onChange([...(value || []), file])} />
        {(value || []).map(file => (<File
            key={file.id}
            file={file}
            onRemove={() => onChange([...(value || [])].filter(item => item.id !== file.id))}
        />))}
    </Root>
);

Attachments.propTypes = {
    value:    PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Attachments;
