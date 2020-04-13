import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { t } from 'ttag';
import { withTheme } from 'emotion-theming';
import { customStyle } from './Select';

const AddressInput = ({ error, theme, ...props }) => (<Select
    styles={customStyle({
        error,
        theme,
        placeholderColor: 'hsl(0,0%,60%)',
        inputOpacityFix:  true,
    })}
    noOptionsMessage={({ inputValue }) =>
        inputValue ? t`Cannot find any addresses` : t`Type in address to search`}
    filterOption={null}
    placeholder={t`Type in address to search`}
    {...props}
    cacheOptions={false}
    isClearable
/>);

AddressInput.propTypes = {
    error: PropTypes.string,
    theme: PropTypes.shape({}).isRequired,
};

AddressInput.defaultProps = {
    error: null,
};

export default withTheme(AddressInput);
