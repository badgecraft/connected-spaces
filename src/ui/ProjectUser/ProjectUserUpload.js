import PropTypes from 'prop-types';
import { withHandlers, compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import FileUploader from '../UserInvite/UserInviteFormUpload';
import mutation from './inviteToProjectFromFile.gql';
import UserInviteUploadStatus from '../UserInvite/UserInviteUploadStatus';

const ProjectUserUpload = compose(
    graphql(mutation, { name: 'runInvite' }),
    withProps({
        visibility: 'private',
        accept:     [
                        'text/csv',
                        'application/vnd.ms-excel',
                        'application/msexcel',
                        'application/x-msexcel',
                        'application/x-ms-excel',
                        'application/x-excel',
                        'application/x-dos_ms_excel',
                        'application/xls',
                        'application/x-xls',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    ].join(','),
    }),
    withHandlers({
        onPostUpload:  ({ project, runInvite }) => ({ publicPath }) => runInvite({
            variables:      { project, file: publicPath },
            // todo projectInvites should be removed (merged with project users)
            refetchQueries: ['projectInvites', 'projectUsers'],
        }).then(res => _get(res, 'data.inviteToProjectFromFile')),
        renderResults: () => UserInviteUploadStatus,
    }),
)(FileUploader);

ProjectUserUpload.propTypes = {
    project: PropTypes.string.isRequired,
};

ProjectUserUpload.displayName = 'ProjectUserUpload';

export default ProjectUserUpload;
