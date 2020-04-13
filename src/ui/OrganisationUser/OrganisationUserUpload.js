import PropTypes from 'prop-types';
import { withHandlers, compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import FileUploader from '../UserInvite/UserInviteFormUpload';
import mutation from './inviteToOrganisationFromFile.gql';
import UserInviteUploadStatus from '../UserInvite/UserInviteUploadStatus';

const OrganisationUserUpload = compose(
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
        onPostUpload:  ({ organisation, runInvite }) => ({ publicPath }) => runInvite({
            variables:      { organisation, file: publicPath },
            refetchQueries: ['organisationUsers'],
        }).then(res => _get(res, 'data.inviteToOrganisationFromFile')),
        renderResults: () => UserInviteUploadStatus,
    }),
)(FileUploader);

OrganisationUserUpload.propTypes = {
    organisation: PropTypes.string.isRequired,
};

OrganisationUserUpload.displayName = 'OrganisationUserUpload';

export default OrganisationUserUpload;
