import gql from 'graphql-tag';
import { compose, withProps, withStateHandlers, lifecycle } from 'recompose';
import { graphql, withApollo } from 'react-apollo';
import _get from 'lodash/get';
import Select from './Select';

// todo would be better that maybeOrganisation would be used only for initial value, cos it feels slow
// todo display some 'no organisation' icon, cos it's a bit strange to see text on with padding on the left

const query = gql`query organisationSelect($organisationId:ID!, $offset:Int, $q: String, $viewerTeam:[String!]){
    maybeOrganisation(id:$organisationId) {
        id
        organisation {
            id
            name
            picture
            viewerTeam
            pictureMeta {
                id
                dominantColor
            }
            perms {
                createProject { value }
            }
        }
    }
    me {
        id
        organisations(offset:$offset, q:$q, limit:10, viewerTeam: $viewerTeam) {
            total
            offset
            limit
            list {
                id
                name
                picture
                viewerTeam
                pictureMeta {
                    id
                    dominantColor
                }
                perms {
                    createProject { value }
                }
            }
        }
    }
}`;

const icon = (org) => {
    const picture = _get(org, 'picture');
    if (!picture) {
        return {};
    }

    return {
        alignItems: 'center',
        display:    'flex',

        ':before': {
            backgroundColor:    _get(org, 'pictureMeta.dominantColor', '#666666'),
            backgroundImage:    `url("${picture}")`,
            backgroundRepeat:   'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize:     'contain',
            borderRadius:       '50%',
            content:            '" "',
            display:            'block',
            marginRight:        8,
            height:             40,
            width:              40,
        },
    };
};


const customStyle = ({ error, theme }) => {
    const borderColor = error ? _get(theme, 'colors.form.error') : _get(theme, 'colors.form.inputBorder', '#EFEFEF');
    return {
        control:            (styles, { isFocused }) => ({
            ...styles,
            minHeight:       52,
            borderColor:     isFocused ? _get(theme, 'colors.form.outline', '#c4c4c4') : borderColor,
            backgroundColor: _get(theme, 'colors.form.inputBg', '#FCFCFC'),
            fontSize:        16,
            fontWeight:      'normal',
            borderRadius:    10,
            boxShadow:       'none',
            '&:hover':       {},
        }),
        input:              styles => ({
            ...styles,
            alignItems: 'center',
            display:    'flex',

            ':before': {
                content:     '" "',
                display:     'block',
                marginRight: 8,
                height:      40,
                width:       40,
            },
        }),
        option:             (styles, { data, isSelected, isFocused, isDisabled }) => ({
            ...styles,
            ...icon(data),
            color:     '#3E3564',
            ...(isFocused && {
                backgroundColor: [_get(theme, 'colors.primary'), _get(theme, 'colors.primaryFocused')],
            }),
            ...(isSelected && {
                backgroundColor: [_get(theme, 'colors.primary'), _get(theme, 'colors.primarySelected')],
            }),
            ':active': {
                backgroundColor: [_get(theme, 'colors.primary'), _get(theme, 'colors.primarySelected')],
            },
            ...(isDisabled && {
                color:     '#C4C0D4',
                cursor:    'default',
                ':active': {
                    backgroundColor: 'transparent',
                },
            })
        }),
        singleValue:        (styles, { data }) => ({ ...styles, ...icon(data), color: '#3E3564' }),
        valueContainer:     (styles) => ({ ...styles, padding: 8 }),
        placeholder:        (base) => ({
            ...base,
            color:      '#C4C0D4',
            alignItems: 'center',
            display:    'flex',

            ':before': {
                content:     '" "',
                display:     'block',
                marginRight: 8,
                height:      40,
                width:       40,
            },
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
    };
};

const fetchAllOrganisations = ({ client, variables, appendTo = [], offset = 0, limit = 10 }) => client
    .query({ query, variables: { offset, limit, ...variables } })
    .then(res => new Promise(resolve => {
        setTimeout(() => resolve(res), 500);
    }))
    .then(({ data }) => {
        const res = _get(data, 'me.organisations', { list: [], offset, limit, total: 0 });
        if (res.offset + res.limit < res.total) {
            return fetchAllOrganisations({
                client,
                variables,
                appendTo: appendTo.concat(res.list),
                offset:   res.offset + limit,
                limit,
            });
        }
        return appendTo.concat(res.list).filter(item => item);
    });

const item2Option = item => ({
    label:    item.name,
    value:    item.id, ...item,
    disabled: _get(item, 'perms.createProject.value') !== 1,
});

export default compose(
    withProps({
        q: '',
        customStyle,
    }),
    graphql(query, {
        props: ({ data: { loading, ...data } }) => {
            const value = _get(data, 'maybeOrganisation.organisation', null);
            return {
                value:     value && item2Option(value) || null,
                isLoading: loading,
                options:   (_get(data, 'me.organisations.list') || []).map(item2Option),
            };
        },
    }),
    withApollo,
    withStateHandlers(({ options }) => ({
        options:   options || [],
        isLoading: true,
    }), {
        setOptions: () => items => ({ options: items.map(item2Option) }),
        setLoading: () => isLoading => ({ isLoading }),
    }),
    lifecycle({
        componentDidMount() {
            const { client, setOptions, setLoading, ...props } = this.props;
            return fetchAllOrganisations({ client, variables: props }).then((options) => {
                setOptions(options);
                setLoading(false);
            });
        },
    }),
)(Select);
