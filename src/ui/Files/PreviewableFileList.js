import React from 'react';
import { compose, withHandlers, withProps, withStateHandlers } from 'recompose';
import FileList from './FileList';
import FullPreview from './FullPreview';

export default compose(
    withStateHandlers({
        previewIndex: null,
    }, {
        setPreviewIndex: () => previewIndex => ({ previewIndex }),
        onClose:         () => () => ({ previewIndex: null }),
    }),
    withHandlers({
        onEscape:       ({ onClose }) => onClose,
        onOutsideClose: ({ onClose }) => onClose,
        onFileClick:    ({ setPreviewIndex }) => (evt, file, index) => {
            evt.preventDefault();
            setPreviewIndex(index);
        },
        onNext:         ({ previewIndex, files, setPreviewIndex }) => () => {
            if (previewIndex + 1 < files.length) {
                setPreviewIndex(previewIndex + 1);
            }
        },
        onPrev:         ({ previewIndex, setPreviewIndex }) => () => {
            if (previewIndex > 0) {
                setPreviewIndex(previewIndex - 1);
            }
        }
    }),
    withProps(({ children, ...props }) => ({
        ...props,
        children: (<React.Fragment>
            {children}
            {props.previewIndex !== null && <FullPreview {...props} />}
        </React.Fragment>),
    })),
)(FileList);
