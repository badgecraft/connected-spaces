import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ModalDialog from '../Modal/ModalDialog';
import noPreview from '../Files/noPreview.svg';
import { themedMinWidth } from '../uiUtils';
import { isImage } from './attachmentUtils';
import Attachments from './Attachments';

const Frame = styled('div')({
    padding:         8,
    backgroundColor: 'transparent',
    marginBottom:    12,
});

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

class PreviewModal extends React.Component {

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
            <ModalDialog {...props} title={file && file.original}>
                <Frame>
                    {file && <Image file={file} />}
                </Frame>
                <Attachments
                    variant="line"
                    files={files}
                    marked={previewIndex}
                    onClick={(_, index) => setPreviewIndex(index)}
                />
            </ModalDialog>
        );
    };
}

PreviewModal.propTypes = {
    previewIndex:    PropTypes.number.isRequired,
    setPreviewIndex: PropTypes.func.isRequired,
    files:           PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onNext:          PropTypes.func.isRequired,
    onPrev:          PropTypes.func.isRequired,
};

export default PreviewModal;
