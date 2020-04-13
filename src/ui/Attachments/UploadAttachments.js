import { compose, branch, renderComponent } from 'recompose';
import Attachments from './Attachments';
import PreviewableAttachments from './PreviewableAttachments';
import withAttachmentsUpload from './withAttachmentsUpload';

const UploadAttachments = compose(
    withAttachmentsUpload,
    branch(({ withPreview }) => withPreview, renderComponent(PreviewableAttachments)),
)(Attachments);

UploadAttachments.dispayName = 'UploadAttachments';

export default UploadAttachments;
