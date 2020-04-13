import nodeFetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import apolloLogger from 'apollo-link-logger';
import createCache from './createCache';

export default ({ accessToken, uri = '/api/graphql', host, oauthClientId, lang, headers = {} }) => {
    const link = from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.warn(JSON.stringify({
                        message: `[GraphQL error]: ${message}`,
                        locations,
                        path,
                    })),
                );
            if (networkError) console.warn(JSON.stringify({ message: `[Network error]: ${networkError}` }));
        }),
        ...(__DEV__ ? [apolloLogger] : []),
        new HttpLink({
            uri:     `${host}${uri}`,
            fetch:   nodeFetch,
            headers: {
                ...headers,
                Authorization:    `Bearer ${accessToken}`,
                'X-Oauth-Client': oauthClientId,
                'X-Lang':         lang,
            },
        }),
    ]);

    return new ApolloClient({
        link,
        cache:              createCache(),
        ssrMode:            true,
        queryDeduplication: false,
    });
}
