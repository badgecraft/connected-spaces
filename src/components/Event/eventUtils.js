export const config2contexts = config => {
    switch (config) {
        case 'playlists':
            return ['playlist'];
        case 'activities':
            return ['event'];
        default:
            return ['event', 'playlist'];
    }
};

export const contexts2config = contexts => {
    const hasEvent = contexts.indexOf('event') !== -1;
    const hasPlaylist = contexts.indexOf('playlist') !== -1;

    if (hasEvent && hasPlaylist) {
        return 'all';
    }

    if (hasPlaylist) {
        return 'playlists';
    }

    if (hasEvent) {
        return 'activities';
    }

    return 'none';
};

export const searchQueryForRequest = searchQuery => [
    ...searchQuery.categories.map(value => ({ key: 'category', value })),
    ...searchQuery.skills.map(value => ({ key: 'skill', value })),
    { key: 'q', value: searchQuery.inputValue },
    { key: 'config', value: contexts2config(searchQuery.contexts) },
]
    .filter(({ value }) => value)
    .map(({ key, value }) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

export const getOffset = query => {
    const offset = parseInt(query.offset, 10);
    if (!Number.isNaN(offset) && offset >= 0) {
        return offset;
    }
    return 0;
};
