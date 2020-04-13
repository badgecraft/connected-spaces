import _set from 'lodash/set';

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

    console.error('failed to find error message', { field, code });
    return code;
};

const ensureStructure = (structure, errors) => (errors || []).reduce(
    (map, item) => {
        if (item.type === 'array') {
            return _set(map, item.field, []);
        }
        if (item.type === 'object') {
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

const translateErrors = ({ errors, generalError, translations, parent = null, merge = {} }) => {
    const structure = ensureStructure({
        _error: generalError,
    }, errors);

    return (errors || []).reduce(
        (map, item) => {
            const field = fieldName(item, merge, map);
            if (['array', 'object'].indexOf(item.type) !== -1) {
                return _set(map, `${field}._error`, getErrorMessage(item, translations, parent));
            }

            return _set(map, field, getErrorMessage(item, translations, parent));
        },
        structure,
    );
};


const CONVERT_FUNCS = {
    'int': value => parseInt(value, 10),
    fail:  () => {
        throw new Error('invalid converter');
    },
};

const getConverterByName = name => (CONVERT_FUNCS[name] || CONVERT_FUNCS.fail);

export const convertTranslateParams = (config, func) => (input = {}, ...args) => func(
    Object.entries(config)
        .filter(([key]) => typeof input[key] !== 'undefined')
        .reduce((map, [key, conv]) => ({
            ...map,
            [key]: (typeof conv === 'function'
                ? conv(input[key])
                : getConverterByName(conv)(input[key])),
        }), input),
    ...args,
);

export default translateErrors;
