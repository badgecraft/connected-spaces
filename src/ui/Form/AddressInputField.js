import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import { compose, withStateHandlers, withHandlers, mapProps, nest } from 'recompose';
import Field from './FormField';
import Input from './AdressInput';

// todo join address and location fields

const query = gql`
    query findAddress($inputValue: String!) {
        findAddress(address:$inputValue) {
            list {
                id
                text
                secondaryText
            }
        }
    }
`;

const AddressInputField = compose(
    mapProps(({ input, meta: { error }, ...props }) => ({ ...props, ...input, error })),
    withStateHandlers(
        ({ value }) => ({ inputValue: value || '' }),
        { setInputValue: () => inputValue => ({ inputValue }) },
    ),
    withHandlers({
        onBlur:        ({ onBlur }) => () => onBlur && onBlur(),
        onChange:      ({ onChange, onLocationChangeId, setInputValue }) => (opts, { action }) => {
            switch (action) {
                case 'clear':
                    onChange(null);
                    onLocationChangeId(null);
                    setInputValue('');
                    break;
                case 'select-option':
                    onChange(opts.value);
                    onLocationChangeId(opts.id);
                    setInputValue(opts.value);
                    break;
                default:
                    break;
            }
        },
        onInputChange: ({ value, setInputValue, onChange }) => (inputValue, { action }) => {
            if (action === 'input-change') {
                if (value) {
                    onChange(null);
                }
                setInputValue(inputValue);
            }
        },
    }),
    graphql(query, {
        skip:  ({ inputValue }) => !inputValue,
        props: ({ data: { loading, findAddress } }) => ({
            options:   (_get(findAddress, 'list') || []).map(({ text, secondaryText, ...item }) => ({
                ...item,
                value: `${text} ${secondaryText || ''}`,
                label: `${text} ${secondaryText || ''}`,
            })),
            isLoading: loading,
        }),
    }),
    mapProps(({ value, ...props }) => ({
        ...props,
        value:                 value ? { label: value, value } : null,
        filterOption:          null,
        cacheOptions:          false,
        isClearable:           true,
        defaultValue:          null,
        backspaceRemovesValue: true,
        autoComplete:          'off',
        autoCorrect:           'off',
        spellCheck:            'off'
    })),
)(nest(Field, Input));

AddressInputField.displayName = 'AddressInputField';

export default AddressInputField;
