import _get from 'lodash/get';
import { SubmissionError } from 'redux-form';
import uiTranslateErrors from './uiTranslateErrors';

export const translateErrors = uiTranslateErrors;

const NAMED_CONVERTERS = {
    number: value => parseInt(value, 10),
};

export const withTranslationArguments = (config, func) => input => func(Object.keys(config)
    .map(key => ({ key, converter: typeof config[key] === 'function' ? config[key] : NAMED_CONVERTERS[config[key]] }))
    .reduce((map, { key, converter }) => ({ ...map, [key]: converter(input[key]) }), input));

export default opts => ({ data }) => {
    const {
        mutation: mutationName,
        translations = {},
        generalError = 'Please fix errors',
        merge = {},
        onlyFields = []
    } = opts;
    const isOk = _get(data, [mutationName, 'ok'], false);
    if (!isOk) {
        const errors = (_get(data, [mutationName, 'errors']) || [])
            .filter(item => onlyFields.length === 0
                || onlyFields.indexOf(item.field) !== -1
                || (item.parent && onlyFields.indexOf(item.parent) !== -1));

        if (errors.length === 0 && onlyFields.length > 0) {
            // don't throw SubmissionError when validating only part of the fields.
            return data[mutationName];
        }

        const err = translateErrors({
            generalError,
            errors,
            translations,
            merge,
        });
        throw new SubmissionError(err);
    }

    return data[mutationName];
};


