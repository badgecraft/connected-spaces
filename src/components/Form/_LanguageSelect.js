import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import Select from './_Select';

const query = gql`query getCountries {
    languages {
        id
        name
        nativeName
    }
}`;

export default graphql(query, {
    props: ({ data: { loading, ...data } }) => ({
        isLoading: loading,
        options:   _get(data, 'languages', []).map(({ id, name, nativeName }) => ({
            value: id,
            label: name !== nativeName ? `${name} (${nativeName})` : name,
        })),
    }),
})(Select);
