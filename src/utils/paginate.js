import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize; // calculate the starting index of the items on this page
    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();
}

