import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _get from 'lodash/get';
import Select from './_Select';
import { translateCategoryName } from '../../../../ui/Form/formUtils';

const query = gql`query getCategories {
    site {
        id
        categories {
            id
            name
        }
    }
}`;

export default graphql(query, {
    props: ({ data: { loading, ...data } }) => ({
        options:   _get(data, 'site.categories', [])
                       .map(({ id, name }) => ({ value: id, label: translateCategoryName(name) })),
        isLoading: loading,
    }),
})(Select);
