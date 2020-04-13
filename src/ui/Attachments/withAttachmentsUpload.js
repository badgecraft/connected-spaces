import React from 'react';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import { t } from 'ttag';
import _get from 'lodash/get';
import { ErrorRoot, isUploadFailed, isUploadInProgress, isUploadStarted } from './attachmentUtils';
import AttachmentUploadItem from './AttachmentUploadItem';
import Uploading from './AttachmentUploadingItem';
import Error from '../Form/Error';

export default compose(
    withStateHandlers({ uploadStatus: {}, uploadStatusFailures: [] }, {
        onUploadStatusChange: ({ uploadStatus, uploadStatusFailures }) => data => {
            const map = { ...uploadStatus, [data.index]: data };
            const list = [
                ...uploadStatusFailures
                    .filter(item => (item !== data.index)
                        && (isUploadStarted(data) ? _get(map, [item, 'created'] >= data.started) : true)),
                ...(isUploadFailed(data) ? [data.index] : [])
            ];

            return {
                uploadStatusFailures: list,
                uploadStatus:         map,
            };
        },
    }),
    withHandlers({
        renderPreItems: ({ uploadStatus, latestFailureIndex, ...props }) => () => (
            <React.Fragment key="ua">
                <AttachmentUploadItem {...props} />
                {Object.values(uploadStatus).filter(isUploadInProgress).map((info) => (
                    <Uploading key={info.index} {...info} />
                ))}
            </React.Fragment>
        ),
        renderFooter:   ({ uploadStatus, uploadStatusFailures, renderFooter }) => () => {
            return (<React.Fragment key="rf">
                <ErrorRoot>
                    {uploadStatusFailures.map(index => uploadStatus[index]).map(({ name, index }) => (
                        <Error key={index}>{t`Failed to upload ${name}, please try again`}</Error>
                    ))}
                </ErrorRoot>
                {renderFooter && renderFooter()}
            </React.Fragment>);
        },
    }),
)