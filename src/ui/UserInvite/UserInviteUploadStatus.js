import { branch, renderComponent } from 'recompose';
import PropTypes from 'prop-types';
import Success from './UserInviteUploadStatusSuccess';
import Failed from './UserInviteUploadStatusFailed';

const UserInviteUploadStatus = branch(({ ok }) => ok, renderComponent(Success))(Failed);

UserInviteUploadStatus.propTypes = {
    ok: PropTypes.bool.isRequired,
};

export default UserInviteUploadStatus;
