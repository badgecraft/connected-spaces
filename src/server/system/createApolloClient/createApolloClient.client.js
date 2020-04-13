import { ApolloClient } from 'apollo-client';
import { from, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import apolloLogger from 'apollo-link-logger';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import createCache from './createCache';
// import createLocalState from './createLocalState';

export default function createApolloClient({ lang, oauthClientId }) {
    const cache = createCache().restore(window.App.apolloState);
    const proto = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const wsUri = `${proto}${window.location.host}/api/subscriptions`;

    return new ApolloClient({
        link:               split(
            // split based on operation type
            ({ query }) => {
                const { kind, operation } = getMainDefinition(query);
                return kind === 'OperationDefinition' && operation === 'subscription';
            },
            new WebSocketLink({
                uri:     wsUri,
                options: {
                    reconnect:        true,
                    connectionParams: {
                        'x-oauth-client': oauthClientId,
                        'x-lang':         lang,
                    },
                }
            }),
            from([
                onError(({ graphQLErrors, networkError }) => {
                    if (graphQLErrors)
                        graphQLErrors.map(({ message, locations, path }) =>
                            console.warn(
                                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                            ),
                        );
                    if (networkError) console.warn(`[Network error]: ${networkError}`);
                }),
                ...(__DEV__ ? [apolloLogger] : []),
                // createLocalState({ cache }),
                new HttpLink({
                    uri:         '/api/graphql',
                    credentials: 'include',
                    headers:     {
                        'X-Oauth-Client': oauthClientId,
                        'X-Lang':         lang,
                    },
                }),
            ]),
        ),
        cache,
        queryDeduplication: true,
        connectToDevTools:  true,
        defaultOptions:     {
            watchQuery: {
                fetchPolicy: 'cache-and-network',
                errorPolicy: 'all',
            },
            query:      {
                // fetchPolicy: "cache-and-network",
                errorPolicy: 'all',
            },
            mutate:     {
                errorPolicy: 'all',
            },
        },
    });
}
