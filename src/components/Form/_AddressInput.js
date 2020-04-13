import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import _get from 'lodash/get';
import Select from 'react-select/lib/Async';
import { compose, mapProps } from 'recompose';
import _pick from 'lodash/pick';
import _omit from 'lodash/omit';
import { t } from 'ttag';
import { customStyle } from './_Select';
import Field from './FormField';

const query = gql`
    query findAddress($input: String!) {
        findAddress(address:$input) {
            list {
                id
                text
                secondaryText
            }
        }
    }
`;

// todo join address and location fields
class AddressInput extends React.Component {
    static propTypes = {
        client:             PropTypes.shape({
            query: PropTypes.func.isRequired,
        }).isRequired,
        onChange:           PropTypes.func,
        onBlur:             PropTypes.func,
        onFocus:            PropTypes.func,
        error:              PropTypes.string,
        onLocationChangeId: PropTypes.func,
    };

    static defaultProps = {
        onChange:           () => null,
        onBlur:             () => null,
        onFocus:            () => null,
        error:              null,
        onLocationChangeId: () => null,
    };

    fetchAddresses = (input = '') => {
        if (!input) {
            return Promise.resolve([]);
        }

        return this.props.client.query({ query, variables: { input } })
            .then(res => _get(res, 'data.findAddress.list', []))
            .then(list => list.map(({ text, secondaryText, ...item }) => ({
                ...item,
                value: `${text} ${secondaryText || ""}`,
                label: `${text} ${secondaryText || ""}`,
            })))
            .catch(() => []);
    };

    handleChange = ({ id, value }) => {
        const { onChange, onLocationChangeId } = this.props;
        if (onChange) {
            onChange(value);
        }

        if (onLocationChangeId) {
            onLocationChangeId(id);
        }
    };

    render() {
        const { client, onBlur, error, ...props } = this.props;
        return (
            <Field {..._pick(props, 'label', 'help', 'required')} error={error}>
                <Select
                    ref={(ref) => {
                        this.select = ref;
                    }}
                    styles={customStyle(error)}
                    loadOptions={this.fetchAddresses}
                    {..._omit(props, 'label', 'help')}
                    onBlur={() => onBlur && onBlur()}
                    onChange={this.handleChange}
                    noOptionsMessage={() => t`Type in address to search`}
                    placeholder={props.value}
                />
            </Field>)
    }
}

// todo work with inputValue, so that entered address would be editable
export default compose(
    mapProps(({ input, meta: { error }, ...props }) => ({ ...props, ...input, error })),
    withApollo,
)(AddressInput);
