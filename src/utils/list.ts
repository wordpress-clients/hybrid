import _isEmpty from 'lodash/isEmpty';

export function getUniqueStoreKey(type, query) {
    return _isEmpty(query)
        ? type
        : type + JSON.stringify(query);
}