import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _pick from 'lodash/pick';
import _get from 'lodash/get';
import { withStateHandlers } from 'recompose';
import { uploadBlob, b64toBlob } from './blobUtils';
import Cropper from './Cropper';
import { font12A2 } from '../../uiFonts';
import upload from './upload.svg';
import { themedMinWidth } from '../../uiUtils';

const HEIGHT = 170;
const HEIGHT_T = 340;

const UploadIcon = styled('span')(({ variant }) => ({
    display:            'inline-block',
    verticalAlign:      'middle',
    width:              34,
    height:             34,
    backgroundImage:    `url("${upload}")`,
    backgroundPosition: 'center center',
    backgroundSize:     'contain',
    backgroundRepeat:   'no-repeat',
    borderRadius:       17,

    ...(variant === 'inline' && {
        width:      24,
        height:     24,
        marginTop:  12,
        marinRight: -10,
    }),
}));

const Text = styled('div')({
    ...font12A2,
    lineHeight:      '16px',
    marginTop:       10,
    padding:         8,
    borderRadius:    8,
    backgroundColor: '#ffffff',
    boxShadow:       '1px 1px 1px #eeeeee',
    // color: ${Colors.eventSecondary};
});

const Container = styled('label')(({ width, height, theme, error, value, variant, disabled }) => ({
    border:         `1px dashed ${_get(theme, 'colors.form.inputBorder', '#EFEFEF')}`,
    borderRadius:   10,
    textAlign:      'center',
    padding:        10,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    flexDirection:  'column',
    cursor:         'pointer',
    margin:         '0 auto',
    height:         Math.min(HEIGHT, height),
    maxHeight:      Math.min(HEIGHT, height),
    maxWidth:       Math.round(Math.min(HEIGHT, height) * (width / height)),
    ...(value ? {
        backgroundImage:    `url("${value}")`,
        backgroundRepeat:   'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize:     `auto ${Math.min(HEIGHT, height)}px`,
    } : { backgroundColor: '#fcfcfc' }),
    ...(error && {
        borderColor: _get(theme, 'colors.form.error'),
    }),

    [themedMinWidth('tablet', theme)]: {
        height:         Math.min(HEIGHT_T, height),
        maxHeight:      Math.min(HEIGHT_T, height),
        maxWidth:       Math.round(Math.min(HEIGHT_T, height) * (width / height)),
        backgroundSize: `auto ${Math.min(HEIGHT_T, height)}px`,
    },

    '&:hover': {
        [`${UploadIcon}`]: {
            backgroundColor: '#ffffff',
            ...(!disabled && {
                display: 'inline-block',
            }),
        },
        [`${Text}`]:       {
            backgroundColor: '#ffffff',
        },
    },
    ...(variant === 'avatar' && {
        border:                            '0 none',
        height:                            90,
        width:                             90,
        borderRadius:                      '50%',
        backgroundSize:                    'contain',
        [themedMinWidth('tablet', theme)]: {
            height: 135,
            width:  135,
        },
    }),
    ...(variant === 'inline' && {
        width:           'auto',
        height:          'auto',
        maxWidth:        'unset',
        maxHeight:       'unset',
        backgroundSize:  'auto',
        display:         'inline-block',
        backgroundColor: 'transparent',
        border:          '0 none',
        input:           {
            display: 'none',
        },
    }),
    ...(disabled && {
        cursor: 'not-allowed',
    }),
}));

const Input = styled('input')({ visibility: 'hidden' });

const ProgressBox = styled('div')({ width: '100%' });

const ProgressBar = styled('div')({
    width:           '80%',
    margin:          '0 auto',
    backgroundColor: '#A59FC0',
    height:          3,
});

const ProgressValue = styled('div')(({ value, theme }) => ({
    width:           `${Math.max(1, value)}%`,
    backgroundColor: _get(theme, 'colors.primary'),
    height:          '100%',
}));

const defaultToImage = (image, pixelCrop, opts) => {
    const scale = Math.min(opts.width / pixelCrop.width, 1);

    const newWidth = parseInt(pixelCrop.width * scale, 10);
    const newHeight = parseInt(pixelCrop.height * scale, 10);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
        0, 0, newWidth, newHeight,
    );

    return canvas.toDataURL();
};

class Uploader extends React.Component {
    componentWillUnmount = () => {
        if (this.uploadXhr) {
            this.uploadXhr.abort();
            this.uploadXhr = null;
        }
    };

    handleFileChange = (evt) => {
        const { width, height } = this.props;
        if (!width && !height) {
            this.handleFileChangeWithoutCrop(evt);
        } else {
            this.handleFileChangeWithCrop(evt);
        }
    };

    handleFileChangeWithCrop = ({ target }) => {
        const { setToCrop } = this.props;
        if (target && target.files && target.files.length > 0) {
            const [file] = target.files;
            const reader = new FileReader();
            reader.addEventListener(
                'load',
                () => setToCrop(reader.result, file.name),
                false
            );
            reader.readAsDataURL(file);
        }

        if (this.input) {
            this.input.value = '';
        }
    };

    handleFileChangeWithoutCrop = (evt) => {
        const { target } = evt;
        const { bucket, setProgress, onChange } = this.props;

        if (target && target.files && target.files.length > 0) {
            const [file] = target.files;
            this.uploadXhr = uploadBlob({
                blob:       file,
                fileName:   file.name,
                bucket,
                onUpload:   (err, result) => {
                    if (err) {
                        console.error('image upload error', err);
                        setProgress(0);
                        return;
                    }

                    if (result && result.type && result.type.indexOf('image/') === 0) {
                        const img = new Image();
                        img.onload = () => {
                            onChange(result.publicPath);
                            setProgress(0);
                        };
                        img.src = result.publicPath;
                    } else {
                        onChange(result.publicPath);
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

    handleSave = (image, pixcelCrop) => {
        const { setProgress, cancelCrop, fileName, bucket, onChange, width, height } = this.props;

        setProgress(1);
        cancelCrop();

        const b64 = defaultToImage(image, pixcelCrop, { width, height });
        if (b64) {
            this.uploadXhr = uploadBlob({
                blob:       b64toBlob(b64),
                fileName,
                bucket,
                onUpload:   (err, result) => {
                    if (err) {
                        console.error('image upload error', err);
                        setProgress(0);
                    } else {
                        const img = new Image();
                        img.onload = () => {
                            onChange(result.publicPath);
                            setProgress(0);
                        };
                        img.src = result.publicPath;
                    }
                },
                onProgress: value => setProgress(value),
            });
        }
    };

    render() {
        const {
            name,
            value,
            details,
            error,
            progress,
            cropperVisible,
            cancelCrop,
            setProgress,
            src,
            width,
            height,
            variant,
            disabled,
            accept,
            ...props
        } = this.props;
        const fileName = `${name}_file`;

        return (
            <React.Fragment key="c">
                <Container
                    htmlFor={`${fileName}${disabled ? '_disabled' : ''}`}
                    {..._pick(props, 'className')}
                    error={error}
                    value={value}
                    width={width}
                    height={height}
                    variant={variant}
                    disabled={disabled}
                >
                    <UploadIcon variant={variant} />
                    {details && <Text>{details}</Text>}
                    <Input
                        ref={(ref) => {
                            this.input = ref;
                        }}
                        type="file"
                        name={fileName}
                        id={fileName}
                        onChange={this.handleFileChange}
                        accept={accept}
                    />
                    <Input type="hidden" name={name} value={value} onChange={props.onChange} />

                    {progress > 0 && <ProgressBox>
                        <ProgressBar>
                            <ProgressValue value={progress} />
                        </ProgressBar>
                    </ProgressBox>}
                </Container>

                {cropperVisible &&
                <Cropper src={src} onCancel={cancelCrop} onSave={this.handleSave} aspect={width / height} />}
            </React.Fragment>
        );
    }
}

Uploader.propTypes = {
    variant:        PropTypes.oneOf(['default', 'avatar', 'inline']),
    name:           PropTypes.string.isRequired,
    value:          PropTypes.string.isRequired,
    details:        PropTypes.node,
    error:          PropTypes.string,
    bucket:         PropTypes.string.isRequired,
    onChange:       PropTypes.func.isRequired,
    progress:       PropTypes.number.isRequired,
    setToCrop:      PropTypes.func.isRequired,
    setProgress:    PropTypes.func.isRequired,
    cancelCrop:     PropTypes.func.isRequired,
    fileName:       PropTypes.string,
    cropperVisible: PropTypes.bool.isRequired,
    src:            PropTypes.string,
    width:          PropTypes.number,
    height:         PropTypes.number,
    disabled:       PropTypes.bool,
    accept:         PropTypes.string,
};

Uploader.defaultProps = {
    details:  null,
    error:    null,
    fileName: null,
    src:      null,
    variant:  'default',
    disabled: false,
    accept:   'image/*',
    width:    null,
    height:   null,
};

export default withStateHandlers(
    () => ({
        progress:       0,
        src:            null,
        fileName:       null,
        cropperVisible: false,
    }),
    {
        setToCrop:   () => (src, fileName) => ({ src, fileName, cropperVisible: true }),
        setProgress: () => (progress) => ({ progress }),
        cancelCrop:  () => () => ({ src: null, fileName: null, cropperVisible: false }),
    },
)(Uploader);
