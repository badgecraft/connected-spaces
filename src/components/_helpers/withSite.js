import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose, getContext } from 'recompose';
import query from '../../core/defaultRouteQuery.gql';

export default compose(
    getContext({ lang: PropTypes.string.isRequired }),
    graphql(query, {
        options: 'cache',
        props:   ({ data: { loading, site, me } }) => ({
            loading,
            site,
            me,
        }),
    }),
);
