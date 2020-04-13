import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import _get from 'lodash/get';
import View from './UserFormView';
import query from './userFormQuery.gql';

export default compose(
    graphql(query, {
        props: ({ data }) => ({
            loading:   data.loading,
            me:        data.me,
            countries: (_get(data, 'countries') || []).map(({ id, name }) => ({ value: id, label: name })),
            languages: (_get(data, 'languages') || []).filter(({ ui }) => ui).map(({ id, nativeName, name }) => ({
                value: id,
                label: nativeName || name,
                name,
            })),
            timeZones: (_get(data, 'timeZones') || []).map(({ id, name }) => ({ value: id, label: name })),
        }),
    }),
)(View);
