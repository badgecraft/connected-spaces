import { t } from 'ttag';
import { withProps } from 'recompose';
import OtherFormErrorsView from '../Form/OtherFormErrorsView';
import { toArrayOfErrorStrings } from '../Form/formUtils';
import translateErrors from '../uiTranslateErrors';

const UserInviteUploadStatusFailed = withProps(({ errors }) => ({
    errors: toArrayOfErrorStrings(translateErrors({
        errors,
        translations: {
            'file.invalidFileType': () => t`Only CSV, XLS files are supported`,
            'file.invalidFormat':   () => t`Invalid file format, please check example file`,
        },
    }))
}))(OtherFormErrorsView);

export default UserInviteUploadStatusFailed;
