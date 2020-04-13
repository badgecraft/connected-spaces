import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import gql from 'graphql-tag';
import Select from './Select';
import search from './search.svg';
import remove from './remove.svg';
import { themedMinWidth } from '../uiUtils';

const Root = styled('div')({});
const List = styled('div')({
    margin:      '16px 0',
    overflow:    'hidden',
    paddingLeft: 12,
    paddingTop:  4,
});

const removeValue = (list, id) => list.filter(item => item.id !== id);
const addValue = (list, skill) => list.find(item => item.id === skill.id) ? list : [...list, skill];

// todo and X others, refine the search to see more
const organisationSearchQuery = gql`
    query organisationSearchQuery($inputValue:String, $viewerTeam:[String]) {
        organisations(q:$inputValue, limit:20, viewerTeam:$viewerTeam) {
            total
            list {
                id
                name
                picture
                pictureMeta {
                    id
                    dominantColor
                }
            }
        }
    }
`;


const item2Option = item => ({ label: item.name, value: item.id, ...item });
const optionToSkill = ({ label, value, ...props }) => ({ id: value, name: label, ...props });

// todo remove the ones already in the options
const TheSelect = compose(
    withStateHandlers({ inputValue: '' }, {
        onInputChange: () => inputValue => ({ inputValue }),
    }),
    graphql(organisationSearchQuery, {
        props: ({ data: { loading, ...data } }) => ({
            isLoading: loading,
            options:   _get(data, "organisations.list", []).filter(item => item).map(item2Option),
        }),
    }),
    withHandlers({
        onChange: ({ onChange, onInputChange }) => (item, { action }) => {
            if (action === "select-option") {
                onInputChange('');
                onChange(optionToSkill(item))
            }
        }
    }),
)(Select);

const searchIcon = {
    alignItems: 'center',
    display:    'flex',

    ':before': {
        backgroundImage:    `url("${search}")`,
        backgroundRepeat:   'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize:     'contain',
        content:            '" "',
        display:            'block',
        marginRight:        8,
        height:             13,
        width:              13,
    },
};

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
        control:            (base, { isFocused }) => ({
            ...base,
            borderColor:     isFocused ? _get(theme, 'colors.form.outline', '#c4c4c4') : borderColor,
            backgroundColor: _get(theme, 'colors.form.inputBg', '#FCFCFC'),
            fontSize:        16,
            fontWeight:      'normal',
            borderRadius:    10,
            boxShadow:       'none',
            '&:hover':       {},
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        placeholder:        (base) => ({
            ...base,
            color: '#C4C0D4',
            ...searchIcon,
        }),
        input:              (base) => ({ ...base, ...searchIcon }),
        singleValue:        (base, { data }) => ({ ...base, ...searchIcon, ...icon(data) }),
        option:             (styles, { isSelected, isFocused, data }) => ({
            ...styles,
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
            ...icon(data)
        }),
    };
};

const Organiser = styled('div')({
    display:       'flex',
    alignItems:    'center',
    paddingBottom: 8,
    marginBottom:  8,
});
const OrgPicture = styled('div')(({ picture, color }) => ({
    height:             40,
    width:              40,
    backgroundColor:    color || '#666666',
    backgroundImage:    `url("${picture}")`,
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize:     'contain',
    flexShrink:         0,
    borderRadius:       '50%',
}));

const OrgName = styled('div')({
    marginLeft: 8,
    color:      '#3E3564',
});

const OrgRemove = styled('button')(({ theme }) => ({
    flexShrink:         0,
    display:            'inline-block',
    verticalAlign:      'middle',
    border:             '1px solid #A59FC0',
    borderRadius:       '50%',
    backgroundColor:    'transparent',
    height:             16,
    width:              16,
    marginTop:          -3,
    marginBottom:       -1,
    outline:            'none',
    backgroundImage:    `url("${remove}")`,
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize:     '6px 6px',
    marginLeft:         6,
    cursor:             'pointer',

    [themedMinWidth('tablet', theme)]: {
        marginTop: -4,
    },
}));

const MultiOrganisationSelect = ({ value: list = [], onChange, ...props }) => (
    <Root>
        <TheSelect
            {...props}
            customStyle={customStyle}
            value={null}
            onChange={item => onChange(addValue(list || [], item))}
        />
        <List>
            {(list || []).map(item => (
                <Organiser key={`${item.id}${item.name}`}>
                    <OrgPicture picture={item.picture} color={_get(item, 'pictureMeta.dominantColor')} />
                    <OrgName>{item.name}</OrgName>
                    <OrgRemove type="button" onClick={() => onChange(removeValue(list || [], item.id))} />
                </Organiser>
            ))}
        </List>
    </Root>
);

MultiOrganisationSelect.propTypes = {
    value:    PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default MultiOrganisationSelect;
