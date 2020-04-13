import React from 'react';
import createAuthAction from '../../core/createAuthAction';
import query from '../../components/Event/opportunitiesPageQuery.gql';
import Opportunities from '../../components/Event/OpportunitiesPage';
import { arrayFromQuery } from '../../core/utils';
import { config2contexts, getOffset } from '../../components/Event/eventUtils';

const action = async ({ client, viewer, path, params, query: args = {}, lang }) => {
    const offset = getOffset(args);
    const searchQuery = {
        categories: arrayFromQuery('category', args),
        skills:     arrayFromQuery('skill', args),
        inputValue: args.q || '',
        contexts:   config2contexts(args.config),
        lang,
    };

    // todo once https://github.com/apollographql/react-apollo/pull/2753 is released to npm, update and
    // add errorPolicy=all , and we can forget this problem :)
    try {
        await client.query({ query, variables: { ...searchQuery, offset } });
    } catch (err) {
        // eslint-disable-next-line
        console.error('wuff... problem, check if it is merged to npm: https://github.com/apollographql/react-apollo/pull/2753');
    }

    return {
        chunks:    ['opportunities'],
        title:     'Opportunities',
        component: (<Opportunities
            viewer={viewer}
            route={{ path, params }}
            searchQuery={searchQuery}
            offset={offset}
        />),
    };
};

export default createAuthAction({ auth: 'optional' })(action);
