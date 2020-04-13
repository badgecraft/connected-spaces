import { withHandlers, compose, withStateHandlers } from 'recompose';
import { uploadBlob } from '../Form/Uploader/blobUtils';

const fixExtension = uploaded => {
    if (uploaded.ext && !uploaded.extension) {
        return { ...uploaded, extension: uploaded.ext };
    }
    return uploaded;
};

const withFileUploader = compose(
    withStateHandlers({ uploadIndex: 0 }, {
        onUploadStatusChange: ({ uploadIndex }, { onUploadStatusChange }) => data => {
            if (onUploadStatusChange) {
                onUploadStatusChange(data);
            }
            return {
                uploadIndex:
                    data.status === 'started'
                        ? uploadIndex + 1
                        : uploadIndex,
            };
        },
    }),
    withHandlers({
        onStartUpload: (props) => evt => {
            const {
                onUploadStatusChange, bucket, onUploaded, visibility = 'public', uploadIndex: index, onPostUpload,
            } = props;
            const { target } = evt;
            if (target && target.files && target.files.length > 0) {
                const [file] = target.files;
                const { name } = file;
                const started = Date.now();
                const status = { name, started, index, uploaded: null };
                target.value = '';

                const onUploadHandler = typeof onPostUpload === 'function'
                    ? onPostUpload
                    : (item => item);

                onUploadStatusChange({ ...status, status: 'started', progress: 0.01, uploaded: null });
                uploadBlob({
                    blob:       file,
                    fileName:   file.name,
                    bucket,
                    onUpload:   (err, uploadedFile) => {
                        if (err) {
                            onUploadStatusChange({ ...status, status: 'failed', progress: 0 });
                        } else if (uploadedFile) {
                            onUploadStatusChange({ ...status, status: 'processing', progress: 1 });
                            Promise.resolve()
                                .then(() => onUploadHandler(
                                    fixExtension(uploadedFile),
                                    { name, index },
                                ))
                                .then(uploaded => {
                                    onUploadStatusChange({ ...status, status: 'uploaded', progress: 1, uploaded });
                                    if (onUploaded) {
                                        onUploaded(uploaded);
                                    }
                                })
                                .catch((error) => {
                                    onUploadStatusChange({ ...status, status: 'failed', progress: 0 });
                                    console.error('file upload processing error', { message: error.message, error });
                                });
                        }
                    },
                    onProgress: progress => onUploadStatusChange({
                        name, status: 'uploading', progress: progress / 100, uploaded: null, index,
                    }),
                    query:      { visibility }
                });
            }
        },
    }),
);

export default withFileUploader;
