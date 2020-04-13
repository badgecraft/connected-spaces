import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import _pick from 'lodash/pick';
import _get from 'lodash/get';
import Layout from '../Layout';
import { Content } from '../UI/Content';
import Events from '../UI/EventList';
import query from './opportunitiesPageQuery.gql';
import history from '../../server/history';
import { toLink } from '../Link';
import { paths } from '../Constants';
// import Search from '../SearchBar/SearchBar';
// import Search from '../Form/Search';
import SearchBar from '../../ui/Search/SearchBar';
import { disableReRouteOnClient } from '../../ui/uiDisableReRouteOnClient';
import { createGraphqlPropsPager } from '../../ui/uiPaging';
import { searchQueryForRequest } from './eventUtils';

const OpportunitiesPageView = ({ onSearchChange, searchQuery, categoryMap, skillMap, ...props }) => (
    <Layout {..._pick(props, 'viewer', 'route')}>
        <Content my={[3, 4]}>
            <SearchBar
                onChange={onSearchChange}
                searchQuery={searchQuery}
                categoryMap={categoryMap}
                skillMap={skillMap}
            />
        </Content>
        <Events {...props} />
    </Layout>
);

OpportunitiesPageView.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
    searchQuery:    PropTypes.shape({}).isRequired,
    categoryMap:    PropTypes.shape({}).isRequired,
    skillMap:       PropTypes.shape({}).isRequired,
};

const mapById = (map, item) => ({ ...map, [item.id]: item });

const OpportunitiesPage = compose(
    withStateHandlers(
        ({ searchQuery }) => ({ searchQuery }),
        { onSearchChange: () => searchQuery => ({ searchQuery }) },
    ),
    withHandlers({
        onSearchChange: ({ onSearchChange }) => searchQuery => {
            disableReRouteOnClient(
                () => history.replace(toLink({ to: `${paths.opportunities}?${searchQueryForRequest(searchQuery)}` })),
            );
            onSearchChange(searchQuery);
        },
    }),
    graphql(query, {
        options: ({ searchQuery, offset }) => ({
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
            variables:   { ...searchQuery, offset },
            ssr:         false,
        }),
        props:   createGraphqlPropsPager({
            resultPath: 'projects',
            append:     (_, raw) => ({
                categoryMap: (_get(raw, 'projects.categories') || []).reduce(mapById, {}),
                skillMap:    (_get(raw, 'projects.skills') || []).reduce(mapById, {}),
            }),
        }),
    }),
)(OpportunitiesPageView);

export default OpportunitiesPage;
