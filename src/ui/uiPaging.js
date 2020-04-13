import _get from 'lodash/get';
import _set from 'lodash/set';
import _uniqBy from 'lodash/uniqBy';
import _updateWith from 'lodash/updateWith';
import _clone from 'lodash/cloneDeep';

export function updateQueryListUpdater(listPath, reset = false, idProp = 'id') {
    return (previousResult, { fetchMoreResult }) => {
        const prevList = _get(previousResult, listPath, []);
        const nextList = _get(fetchMoreResult, listPath, []);

        const newList = [...(reset ? [] : prevList), ...nextList];

        // TODO should not add the same element.
        return _set(
            fetchMoreResult,
            listPath,
            _uniqBy(newList, item => _get(item, idProp)),
        );
    };
}

export function createGraphqlPropsPager(opts) {
    const { id = null, resultPath, listPath, defaultLimit = 12, append = {}, idProp, initial = {}, propName } = opts;
    const path = resultPath.split('.');
    const innerListPath = listPath || [...path, 'list'];

    return ({ data: raw, ownProps }) => {
        const { sort = 'none', order = 'none', q = '' } = ownProps;
        const { loading, fetchMore, error, refetch, networkStatus, ...data } = raw;
        const { total = 0, limit = defaultLimit, offset = 0, ...otherListData } = _get(data, path, initial) || {};

        const result = {
            loading,
            // todo remove items of no usages found
            items:    _get(data, innerListPath, []).filter(v => v),
            list:     _get(data, innerListPath, []).filter(v => v),
            hasNext:  offset + limit < total,
            total,
            limit,
            offset,
            q,
            id:       id || `${sort}-${order}-${q}`,
            sort:     _get(otherListData, 'sort', ownProps.sort),
            order:    _get(otherListData, 'order', ownProps.order),
            empty:    total === 0 && !q,
            loadNext: (_newOffset) => {
                const newOffset = typeof _newOffset === 'undefined'
                    ? offset + limit
                    : _newOffset;
                return fetchMore({
                    variables:   { offset: newOffset },
                    updateQuery: updateQueryListUpdater(innerListPath, newOffset === 0, idProp),
                });
            },
            error,
            refetch,
            networkStatus,
        };

        const appendData = typeof append === 'function' ? append(result, raw, ownProps) : append;

        if (propName) {
            return { [propName]: { ...result, ...appendData, } }
        }

        return { ...result, ...appendData, };
    };
}


export const prependResult = (prev, path, item, idProp = 'id') => {
    if (!item) {
        return prev;
    }

    return _updateWith(
        _clone(prev),
        path,
        res => ({
            ...res,
            total:  res.total + 1,
            offset: res.offset + 1,
            list:   [item, ...res.list.filter(i => i && i[idProp] !== item[idProp])],
        }),
    );
};

export const createSubscriptionResultPrepender = opts => (prev, data) => {
    const { resultPath, newItemPath, filter = () => true } = opts;
    const newItem = _get(data, newItemPath);
    return prependResult(
        prev,
        resultPath,
        filter(newItem) ? newItem : null,
    );
};
