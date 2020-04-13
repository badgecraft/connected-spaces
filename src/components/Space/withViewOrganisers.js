import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose, branch, renderNothing } from 'recompose';
import _get from 'lodash/get';

const query = gql`query withViewOrganisers {
    organisations(verified:true) {
        total
    }
}`;

export const graphqlQuery = graphql(query, {
    props: ({ data }) => ({ organiserCount: _get(data, 'organisations.total', 0) }),
});

export const minCount = 5;

export default compose(
    graphqlQuery,
    // todo remove 'true ||' once we know what to display here
    branch(({ organiserCount }) => true || organiserCount < minCount, renderNothing),
);
