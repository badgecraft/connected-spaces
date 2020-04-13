import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import upload from './upload.svg';
import { font12A6 } from '../../uiFonts';
import { uploadBlob } from './blobUtils';

const Root = styled('label')(({ disabled }) => ({
    backgroundColor: '#F3F4F5',
    borderRadius:    5,
    width:           100,
    height:          87,
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    flexDirection:   'column',
    marginRight:     8,
    marginBottom:    8,

    ...(!disabled && {
        cursor: 'pointer',
    }),
}));

const Upload = styled('div')({
    width:      18,
    height:     18,
    marginTop:  18,
    background: `transparent url("${upload}") center center/contain no-repeat`,
});

const Text = styled('div')({
    ...font12A6,
    color:     '#3E3564',
    textAlign: 'center',
    padding:   8,
});

const Input = styled('input')({
    display: 'none',
});

class UploadFileAction extends React.Component {

    handleFileChangeWithoutCrop = (evt) => {
        const { target } = evt;
        const { bucket, onChange, visibility } = this.props;

        const setProgress = () => null; // todo

        if (target && target.files && target.files.length > 0) {
            const [file] = target.files;
            this.uploadXhr = uploadBlob({
                blob:       file,
                fileName:   file.name,
                bucket,
                query:      { visibility },
                onUpload:   (err, result) => {
                    if (err) {
                        console.error('image upload error', err);
                        setProgress(0);
                    } else {
                        // const img = new Image();
                        // img.onload = () => {
                        //     onChange({
                        //         id:         result.id,
                        //         extension:  result.ext,
                        //         original:   result.original,
                        //         publicPath: result.publicPath,
                        //     });
                        //     setProgress(0);
                        // };
                        // img.src = result.publicPath;
                        onChange({
                            id:            result.id,
                            extension:     result.ext,
                            original:      result.original,
                            publicPath:    result.publicPath,
                            type:          result.type,
                            dominantColor: result.dominantColor,
                        });
                        setProgress(0);
                    }
                },
                onProgress: value => setProgress(value),
            });
        }

        if (this.input) {
            this.input.value = '';
        }
    };

    render = () => {
        const { id, disabled } = this.props;
        return (
            <Root htmlFor={disabled ? `${id}_disabled` : id} disabled={disabled}>
                <Upload />
                <Text>{t`Tap to attach a file`}</Text>
                <Input
                    type="file"
                    ref={(ref) => {
                        this.input = ref;
                    }}
                    onChange={this.handleFileChangeWithoutCrop}
                    id={id}
                    disabled={disabled}
                />
            </Root>
        );
    };
}

UploadFileAction.propTypes = {
    id:         PropTypes.string,
    onChange:   PropTypes.func.isRequired,
    bucket:     PropTypes.string.isRequired,
    disabled:   PropTypes.bool,
    visibility: PropTypes.string,
};

UploadFileAction.defaultProps = {
    id:         'fileUpload',
    disabled:   false,
    visibility: 'public',
};

export default UploadFileAction;
