import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { compose, withStateHandlers, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import { createFilter } from 'react-select';
import _get from 'lodash/get';
import { t } from 'ttag';
import Select from './Select';
import { font12A4, font14, font16, font16A5 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

// todo exclude user id's and/or emails? using query
// todo exclude me

// eslint-disable-next-line max-len
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Root = styled('div')(({ isFocused, isDisabled, theme }) => ({
    alignItems:   'center',
    display:      'flex',
    minHeight:    30,
    padding:      '4px 12px',
    color:        '#3E3564',
    cursor:       'pointer',
    marginBottom: 8,
    ...(isFocused && {
        backgroundColor: [_get(theme, 'colors.primary'), _get(theme, 'colors.primaryFocused')],
    }),
    ...(isDisabled ? {
        color:     '#C4C0D4',
        cursor:    'default',
        ':active': {
            backgroundColor: 'transparent',
        },
    } : {
        ':active': {
            backgroundColor: [_get(theme, 'colors.primary'), _get(theme, 'colors.primarySelected')],
        },
    }),
}));

const Avatar = styled('div')(({ picture }) => ({
    background:   `#666666 url("${picture || '/img/default-profile.png'}") center center/contain no-repeat`,
    borderRadius: '50%',
    marginRight:  8,
    height:       30,
    width:        30,
    flexShrink:   0,
    display:      'inline-block',
}));

const Details = styled('div')({
    flexGrow: 1,
});

const Primary = styled('div')(({ theme }) => ({
    ...font14,

    [themedMinWidth('tablet', theme)]: {
        ...font16,
    },
}));

const Secondary = styled('div')(({ theme }) => ({
    ...font12A4,

    [themedMinWidth('tablet', theme)]: {
        ...font16A5,
    },
}));

const Option = ({ data, innerProps, isDisabled, isFocused, children }) => {
    switch (data.type) {
        case 'user':
        case 'email':
            return (
                <Root {...innerProps} isFocused={isFocused} isDisabled={isDisabled}>
                    <Avatar picture={data.picture} />
                    <Details>
                        <Primary>{data.name || data.value}</Primary>
                        {data.primaryEmail && <Secondary>{data.primaryEmail}</Secondary>}
                    </Details>
                </Root>
            );
        case 'summary':
            return (
                <Root {...innerProps} isFocused={isFocused} isDisabled={isDisabled}>
                    {children}
                </Root>
            );
        default:
            console.error(`unknown user option of type: ${data.type}`);
            return null;
    }
};

Option.propTypes = {
    data:       PropTypes.shape().isRequired,
    innerProps: PropTypes.shape().isRequired,
    isDisabled: PropTypes.bool.isRequired,
    isFocused:  PropTypes.bool.isRequired,
    children:   PropTypes.node,
};

Option.defaultProps = {
    children: null,
};

const query = gql`query findUsers($q:String) {
    users(offset: 0, q:$q) {
        total
        list {
            id
            name
            picture
            primaryEmail
        }
    }
}`;

const item2option = item => ({ value: item.id, label: item.name, type: 'user', ...item });

const skipNonEmailOrUser = options => item => {
    if (!EMAIL_REGEX.test(item.label)) {
        return false;
    }

    return !options.some(opt => opt.primaryEmail === item.value);
};

export default compose(
    withProps({
        components:       { Option },
        placeholder:      t`Enter email or search for user`,
        noOptionsMessage: () => t`No users found, enter a valid email`,
        loadingMessage:   () => t`Searching...`,
    }),
    withStateHandlers({ q: '' }, {
        onInputChange: () => q => ({ q }),
    }),
    graphql(query, {
        props: ({ data: { loading, ...data }, ownProps: { q, exclude = [] } }) => {
            const total = _get(data, 'users.total', 0);
            const users = (_get(data, 'users.list') || [])
                .filter(item => item)
                .map(item2option)
                .filter(user => !exclude.find(item => item.type === 'user' && item.value === user.id));

            const other = total - users.length;
            const options = [
                ...users,
                ...(other > 0 ? [{
                    type:     'summary',
                    label:    t`And ${other} others, restrict the search a bit more`,
                    disabled: true,
                    value:    null,
                }] : [])
            ];

            return {
                isLoading:    loading,
                options:      [
                    {
                        label:   'email',
                        options: [{ label: q, value: q, type: 'email' }].filter(skipNonEmailOrUser(options))
                    },
                    { label: 'users', options },
                ],
                filterOption: createFilter({
                    stringify: option => ''
                        .concat(option.label, ' ')
                        .concat(option.value, ' ')
                        .concat(_get(option, 'data.primaryEmail', '')),
                }),
            };
        },
    }),
)(Select);
