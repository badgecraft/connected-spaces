import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { mapProps, compose, withStateHandlers } from 'recompose';
import _pick from 'lodash/pick';
import { Colors } from '../Constants';
import Icon, { icons } from '../Icon/_Icon';
import Field from './FormField';
import { uploadBlob, b64toBlob } from './Uploader/blobUtils';
import Cropper from './Uploader/Cropper';

const HEIGHT = 170;

const Container = styled.label`
    border: 1px dashed ${({ error }) => error ? Colors.error : Colors.inputBorder};
    border-radius: 10px;
    height: ${HEIGHT}px;
    text-align: center;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    margin: 0 auto;
    max-width: 100%;
    width: ${({ width, height }) => `${width * (HEIGHT / height)}px`};
    
    ${({ value }) => `
        background-image: url("${value}");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: auto 170px;
    `}
`;

const Text = styled.div`
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    color: ${Colors.eventSecondary};
    margin-top: 10px;
`;

const Input = styled('input')`
    visibility: hidden;
`;

const ProgressBox = styled('div')`
    width: 100%;
`;

const ProgressBar = styled('div')`
    width: 80%;
    margin: 0 auto;
    background-color: #A59FC0;
    height: 3px;
`;

const ProgressValue = styled('div')`
    width: ${({ value }) => (Math.max(1, value))}%;
    background-color: #F3047C;
    height: 100%;
`;

const defaultToImage = (image, pixelCrop, opts) => {
    const scale = Math.min(opts.width / pixelCrop.width, 1);

    const newWidth = parseInt(pixelCrop.width * scale, 10);
    const newHeight = parseInt(pixelCrop.height * scale, 10);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
        0, 0, newWidth, newHeight,
    );

    return canvas.toDataURL();
};

export class RawUploader extends React.Component {
    static propTypes = {
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
        width:          PropTypes.number.isRequired,
        height:         PropTypes.number.isRequired,
    };

    static defaultProps = {
        details:  null,
        error:    null,
        fileName: null,
        src:      null,
    };

    componentWillUnmount = () => {
        if (this.uploadXhr) {
            this.uploadXhr.abort();
            this.uploadXhr = null;
        }
    };

    handleFileChange = ({ target }) => {
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
            })
        }
    };

    render() {
        const { name, value, details, error, progress, cropperVisible, cancelCrop, setProgress, src, width, height, ...props } = this.props;
        const fileName = `${name}_file`;

        return (
            <React.Fragment>
                <Container
                    htmlFor={fileName}
                    {..._pick(props, 'className')}
                    error={error}
                    value={value}
                    width={width}
                    height={height}
                >
                    <Icon image={icons.upload} size={34} />
                    {details && <Text>{details}</Text>}
                    <Input
                        innerRef={(ref) => {
                            this.input = ref;
                        }}
                        type="file"
                        name={fileName}
                        id={fileName}
                        onChange={this.handleFileChange}
                        accept="image/*"
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

export default compose(
    withStateHandlers(
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
    ),
    mapProps(({ input, meta: { error }, label, help, required, ...props }) => ({
        label,
        help,
        error,
        required,
        children: (<RawUploader {...props} {...input} error={error} />)
    })),
)(Field);
