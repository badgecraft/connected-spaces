import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ModalDialog from '../Modal/ModalDialog';
import FileList from './FileList';
import noPreview from './noPreview.svg';
import { themedMinWidth } from '../uiUtils';

const isImage = file => file && file.type.indexOf('image/') === 0;

const Frame = styled('div')(({ backgroundColor }) => ({
    padding:         8,
    backgroundColor: backgroundColor || 'transparent',
    marginBottom:    12,
}));

const Image = styled('div')(({ file, theme }) => ({
    width:      '100%',
    height:     'auto',
    minHeight:  300,
    background: (isImage(file)
        ? `transparent url("${file.publicPath}") center center/contain no-repeat`
        : `transparent url("${noPreview}") center center/50% 50% no-repeat`),

    [themedMinWidth('tablet', theme)]: {
        minHeight: 400,
    },
}));

class FullPreview extends React.Component {

    componentDidMount = () => {
        document.addEventListener('keyup', this.handleKeyPress, false);
    };

    componentWillUnmount = () => {
        document.removeEventListener('keyup', this.handleKeyPress, false);
    };

    handleKeyPress = (evt) => {
        if (evt.keyCode === 37) {
            this.props.onPrev();
        } else if (evt.keyCode === 39) {
            this.props.onNext();
        }
    };

    render = () => {
        const { previewIndex, setPreviewIndex, files, ...props } = this.props;
        const file = files[previewIndex] || null;
        return (
            <ModalDialog {...props} title={file.original}>
                <Frame backgroundColor={file.dominantColor}>
                    <Image file={file} />
                </Frame>
                <FileList
                    variant="preview"
                    files={files}
                    onFileClick={(evt, _, index) => {
                        evt.preventDefault();
                        setPreviewIndex(index);
                    }}
                    previewIndex={previewIndex}
                />
            </ModalDialog>
        );
    };
}

FullPreview.propTypes = {
    previewIndex:    PropTypes.number.isRequired,
    setPreviewIndex: PropTypes.func.isRequired,
    files:           PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onNext:          PropTypes.func.isRequired,
    onPrev:          PropTypes.func.isRequired,
};

export default FullPreview;
