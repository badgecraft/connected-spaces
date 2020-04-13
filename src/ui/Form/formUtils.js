import { t } from 'ttag';

// eslint-disable-next-line import/prefer-default-export
export const translateCategoryName = name => {
    switch (name) {
        case 'Life skills':
            return t`Life skills`;
        case 'Creativity and design':
            return t`Creativity and design`;
        case 'Civic engagement':
            return t`Civic engagement`;
        case 'Experience abroad':
            return t`Experience abroad`;
        case 'Science':
            return t`Science`;
        case 'Technology and computers':
            return t`Technology and computers`;
        case 'Global world':
            return t`Global world`;
        case 'Crafts and making':
            return t`Crafts and making`;
        case 'Sports and active lifestyle':
            return t`Sports and active lifestyle`;
        case 'Arts and culture':
            return t`Arts and culture`;
        case 'Career and job readiness':
            return t`Career and job readiness`;
        case 'Environment end ecology':
            return t`Environment end ecology`;
        default:
            return name;
    }
};

const alwaysAsString = error => {
    if (Array.isArray(error)) {
        // eslint-disable-next-line no-underscore-dangle
        return error._error;
    }
    return error;
};

export const toArrayOfErrorStrings = (formErrors, meta = {}) => Object
    .keys(formErrors)
    .filter(key => typeof meta[key] === 'undefined')
    .map(field => ({ field, error: alwaysAsString(formErrors[field]) }))
    .filter(f => f.error);
