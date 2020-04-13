import { InMemoryCache, defaultDataIdFromObject, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

export default function createCache() {
    // https://www.apollographql.com/docs/react/basics/caching.html#configuration
    return new InMemoryCache({
        dataIdFromObject: defaultDataIdFromObject,
        fragmentMatcher,
    });
}
