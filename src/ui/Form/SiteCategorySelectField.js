import { compose } from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import Select from './SelectField';
import { translateCategoryName } from './formUtils';

const query = gql`query getSiteCategories {
    site {
        id
        categories {
            id
            name
        }
    }
}`;

export default compose(
    graphql(query, {
        props: ({ data: { loading, ...data } }) => ({
            options:   _get(data, 'site.categories', []).map(({ id, name }) => ({
                value: id,
                label: translateCategoryName(name)
            })),
            isLoading: loading,
        }),
    }),
)(Select);
