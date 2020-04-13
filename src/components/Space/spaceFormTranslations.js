import { t } from 'ttag';

export default {
    required:            () => t`Required`,
    notValidURL:         () => t`Please enter a valid website address`,
    noPrimaryEmail:      () => t`Please verify your primary email first`,
    tooLong:             ({ max }) => t`Cannot exceed ${max} characters`,
    'siteId.notAllowed': () => t`It's not allowed to create new organisers`,
};
