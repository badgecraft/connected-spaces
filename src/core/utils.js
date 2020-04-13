import _get from 'lodash/get';
import _pick from 'lodash/pick';

// eslint-disable-next-line import/prefer-default-export
export const isAllowed = (perms, permName) => _get(perms, [permName, 'value']) === 1;

export const action2Route = props => _pick(props, 'path', 'params', 'query');

export const arrayFromQuery = (name, query) => {
    const v = query[name];
    if (typeof v === 'string') {
        return [v];
    } else if (v && v.length) {
        return v.slice(0);
    }
    return [];
};

export const isIdsEqual = (id1, id2) => id1 && `${id1}` === `${id2}`;

export const required = () => {
    throw new Error('Missing required parameter');
};
