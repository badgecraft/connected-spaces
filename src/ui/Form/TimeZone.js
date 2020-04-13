import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import gql from 'graphql-tag';
import { withHandlers, compose } from 'recompose';
import Select from './Select';

const query = gql`query timeZones {
    timeZones {
        id
        name
    }
}`;

export default compose(
    withHandlers({
        onChange: ({ onChange }) => opt => onChange(opt.value),
    }),
    graphql(query, {
        props: ({ data: { loading, ...data }, ownProps: { value } }) => {
            const options = (_get(data, 'timeZones') || []).map(item => ({
                ...item,
                label: item.name,
                value: item.id,
            }));
            return {
                isLoading: loading,
                options,
                value:     options.find(item => item.value === value),
            };
        },
    }),
)(Select);
