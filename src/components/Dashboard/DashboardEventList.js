import { compose, branch, renderNothing, withProps, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import List from '../UI/EventList';
import query from './dashboardEvents.gql';
import { createGraphqlPropsPager } from '../../ui/uiPaging';
import withLocationChange from '../_helpers/withLocationChange';
import paths from '../../constants/paths';
import { config2contexts } from '../Event/eventUtils';

export default compose(
    withLocationChange,
    branch(({ config }) => !config || config === 'none', renderNothing),
    withProps(({ config }) => ({ contexts: config2contexts(config) })),
    graphql(query, {
        props:   createGraphqlPropsPager({ resultPath: 'projects' }),
        options: {
            fetchPolicy: 'cache-fist',
            errorPolicy: 'all',
        },
    }),
    withHandlers({
        loadNext: ({ pushRoute, offset, limit, config }) => () => pushRoute({
            to:     paths.opportunitiesWithQuery,
            params: {
                config,
                offset: offset + limit,
            },
        }),
    }),
)(List);
