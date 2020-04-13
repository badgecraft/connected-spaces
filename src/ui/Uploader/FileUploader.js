import PropTypes from 'prop-types';
import { compose, branch, renderComponent, withStateHandlers, withHandlers } from 'recompose';
import { t } from 'ttag';
import Wait from './FileUploaderWait';
import Status from './FileUploaderStatus';
import Finished from './FileUploaderFinished';
import { uploadBlob } from '../Form/Uploader/blobUtils';

const FileUploader = compose(
    withStateHandlers({
        view:               null,
        fileName:           null,
        fileStatus:         null,
        fileProgress:       0,
        uploadResultStatus: null,
    }, {
        onCancelUpload: () => () => ({
            view:               'wait',
            fileName:           null,
            fileStatus:         null,
            fileProgress:       0,
            uploadResultStatus: null,
        }),
        onFinishUpload: () => uploadResultStatus => ({
            view: 'finished',
            uploadResultStatus,
        }),
        onFileChange:   () => change => change,
    }),
    withHandlers({
        onUpload: ({ onFileChange, bucket, onPostUpload, onFinishUpload, visibility = 'public' }) => evt => {
            const { target } = evt;
            if (target && target.files && target.files.length > 0) {
                const [file] = target.files;
                onFileChange({
                    view:         'status',
                    fileName:     file.name,
                    fileStatus:   t`Uploading....`,
                    fileProgress: 0.01,
                });
                uploadBlob({
                    blob:       file,
                    fileName:   file.name,
                    bucket,
                    onUpload:   (err, uploadedFile) => {
                        if (err) {
                            onFileChange({ fileStatus: t`Failed to upload` });
                        } else if (uploadedFile) {
                            onFileChange({ fileStatus: t`Processing....` });
                            Promise.resolve(onPostUpload(uploadedFile))
                                .then(onFinishUpload)
                                .catch(() => onFileChange({ fileStatus: t`Failed to upload file` }));
                        }
                    },
                    onProgress: progress => onFileChange({ fileProgress: progress / 100 }),
                    query:      { visibility }
                });
            }
        },
    }),
    branch(({ view }) => view === 'status', renderComponent(Status)),
    branch(({ view }) => view === 'finished', renderComponent(Finished)),
)(Wait);

FileUploader.propTypes = {
    bucket:        PropTypes.string.isRequired,
    onPostUpload:  PropTypes.func.isRequired,
    onClose:       PropTypes.func.isRequired,
    renderResults: PropTypes.func.isRequired,
    visibility:    PropTypes.oneOf(['public', 'private', 'protected']),
};

FileUploader.defaultProps = {
    visibility: 'public',
};

FileUploader.displayName = 'FileUploader';

export default FileUploader;
