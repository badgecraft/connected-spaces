import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import FileItem from './FileItem';
import { themedMinWidth } from '../uiUtils';

const Root = styled('div')(({ theme, variant }) => ({
    ...(variant === 'default' && {
        border:       `1px solid ${_get(theme, 'colors.form.inputBorder', '#EFEFEF')}`,
        borderRadius: 10,
        padding:      10,
    }),
    display:        'flex',
    flexWrap:       'wrap',
    justifyContent: 'space-around',

    [themedMinWidth('tablet', theme)]: {
        justifyContent: 'flex-start',
    },
}));

const FileList = ({ files, variant, onFileClick, renderWhenEmpty, children, previewIndex }) => {
    if (!renderWhenEmpty && files.length === 0) {
        return null;
    }
    return (
        <Root variant={variant}>
            {children}
            {files.map((file, index) => (
                <FileItem
                    key={file.id}
                    item={file}
                    onClick={(evt) => onFileClick && onFileClick(evt, file, index)}
                    marked={previewIndex === index}
                />
            ))}
        </Root>
    );
};

FileList.propTypes = {
    files:           PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
    })).isRequired,
    variant:         PropTypes.oneOf(['default', 'preview']),
    onFileClick:     PropTypes.func,
    renderWhenEmpty: PropTypes.bool,
    children:        PropTypes.node,
    previewIndex:    PropTypes.number,
};

FileList.defaultProps = {
    variant:         'default',
    onFileClick:     null,
    renderWhenEmpty: false,
    children:        null,
    previewIndex:    null,
};

export default FileList;
