import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import Select from './_Select';

const query = gql`query getCountries {
    countries {
        id
        name
    }
}`;

export default graphql(query, {
    props: ({ data: { loading, ...data } }) => ({
        isLoading: loading,
        options:   _get(data, 'countries', []).map(({ id, name }) => ({ value: id, label: name })),
    }),
})(Select);
