import _get from "lodash/get";
import _set from "lodash/set";
import { SubmissionError } from "redux-form";

const toArgsObject = list => list.reduce((map, { name, value }) => ({ ...map, [name]: value }), {});

const getErrorMessage = ({ field, code, args }, translations, parent = null) => {
    const keys = [
        parent && `${parent}.${field}.${code}`,
        `${field}.${code}`,
        parent && `${parent}.${code}`,
        code,
    ].filter(item => item);

    for (let i = 0; i < keys.length; i += 1) {
        const func = translations[keys[i]];
        if (func) {
            return func(toArgsObject(args));
        }
    }

    console.error("failed to find error message", { field, code });
    return code;
};

const ensureStructure = (structure, errors) => errors.reduce(
    (map, item) => {
        if (item.type === "array") {
            return _set(map, item.field, []);
        } else if (item.type === "object") {
            return _set(map, item.field, {});
        }
        return map;
    },
    structure,
);

const fieldName = (item, merge, map) => {
    const field = merge[item.field];
    if (!field) {
        return item.field;
    }

    return map[field] ? item.field : field;
};

export const translateErrors = ({ errors, generalError, translations, parent = null, merge = {} }) => {
    const structure = ensureStructure({
        _error: generalError,
    }, errors);

    return errors.reduce(
        (map, item) => {
            const field = fieldName(item, merge, map);
            if (["array", "object"].indexOf(item.type) !== -1) {
                return _set(map, `${field}._error`, getErrorMessage(item, translations, parent));
            }

            return _set(map, field, getErrorMessage(item, translations, parent));
        },
        structure,
    );
};

export default opts => ({ data }) => {
    const {
        mutation: mutationName,
        translations = {},
        generalError = "Please fix errors",
        merge = {},
        onlyFields = []
    } = opts;
    const isOk = _get(data, [mutationName, "ok"], false);
    if (!isOk) {
        const errors = (_get(data, [mutationName, "errors"]) || [])
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
