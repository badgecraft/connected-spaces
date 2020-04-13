import { t } from 'ttag';

export default {
    'name.required':             () => t`Please enter event name`,
    'location.required':         () => t`Please enter event location`,
    'category.required':         () => t`Please select a category`,
    'eventStart.required':       () => t`When does event start?`,
    'coverPicture.required':     () => t`Please upload cover image`,
    'organisation.required':     () => t`Please select an organiser`,
    'videos.invalidArray':       () => t`Not all videos are valid`,
    'invalidVideoUrl':           () => t`Please check that you have copied a valid youtube or vimeo video link`,
    noPrimaryEmail:              () => t`Please verify your primary email first`,
    notValidURL:                 () => t`Please enter a valid URL`,
    'material.invalidArray':     () => t`Not all material information is valid`,
    'eventStart.beforeEventEnd': () => t`Event should start before ending`,
    'eventEnd.beforeEventStart': () => t`Event end has to be after start`,
    'duration.invalid':          () => t`Duration format is invalid`,
    'customFields.invalidArray': () => t`Invalid custom fields`,
};
