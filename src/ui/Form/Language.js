import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import gql from 'graphql-tag';
import { compose, getContext, withHandlers } from 'recompose';
import Select from './Select';

const query = gql`query languages ($lang: String) {
    languages(lang: $lang) {
        id
        name
        nativeName
        ui
    }
}`;

export default compose(
    getContext({
        lang: PropTypes.string.isRequired,
    }),
    withHandlers({
        onChange: ({ onChange }) => opt => onChange(opt.value),
    }),
    graphql(query, {
        props: ({ data: { loading, ...data }, ownProps: { value } }) => {
            const options = (_get(data, 'languages') || []).map(item => ({
                ...item,
                label: item.nativeName,
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
