import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withStateHandlers, branch, renderNothing } from 'recompose';
import Attachments from './Attachments';
import Modal from './PreviewModal';

const Preview = compose(
    branch(({ previewIndex }) => previewIndex === null, renderNothing),
    withHandlers({
        onNext: ({ previewIndex, files, setPreviewIndex }) => () => {
            if (previewIndex + 1 < files.length) {
                setPreviewIndex(previewIndex + 1);
            }
        },
        onPrev: ({ previewIndex, setPreviewIndex }) => () => {
            if (previewIndex > 0) {
                setPreviewIndex(previewIndex - 1);
            }
        }
    }),
)(Modal);

const PreviewContainer = ({ files, previewIndex, setPreviewIndex, ...props }) => (
    <React.Fragment key="pc">
        <Attachments {...props} files={files} onClick={(file, index) => setPreviewIndex(index)} />
        <Preview
            files={files}
            previewIndex={previewIndex}
            setPreviewIndex={setPreviewIndex}
            onClose={() => setPreviewIndex(null)}
            onEscape={() => setPreviewIndex(null)}
            onOutsideClose={() => setPreviewIndex(null)}
        />
    </React.Fragment>
);

PreviewContainer.propTypes = {
    files:           PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    previewIndex:    PropTypes.number,
    setPreviewIndex: PropTypes.func.isRequired,
};

PreviewContainer.defaultProps = {
    previewIndex: null,
};

const PreviewableAttachments = compose(
    withStateHandlers({ previewIndex: null }, {
        setPreviewIndex: () => previewIndex => ({ previewIndex }),
    }),
)(PreviewContainer);

PreviewableAttachments.displayName = 'PreviewableAttachments';

export default PreviewableAttachments;
