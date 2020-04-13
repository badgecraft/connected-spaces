import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { compose, getContext, withHandlers, withStateHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import gql from 'graphql-tag';
import Select from './Select';
import Tag from '../Tag/SkillTag';
import search from './search.svg';

// todo exclude selected values

const Root = styled('div')({});
const Tags = styled('div')({
    margin:   '16px 0',
    overflow: 'hidden',
});

const removeValue = (list, id) => list.filter(item => item !== id);
const addValue = (list, skillId) => [...removeValue(list, skillId), skillId];

const skillSearchQuery = gql`
    query skillSearchQuery($lang:String!, $inputValue:String) {
        findSkills(lang:$lang, q:$inputValue) {
            total
            list {
                id
                name
            }
        }
    }
`;

const skillToOption = ({ id, name, ...props }) => ({ label: name, value: id, ...props });
const optionToSkill = ({ label, value, ...props }) => ({ id: value, name: label, ...props });

// todo remove the ones already in the options
const TheSelect = compose(
    getContext({ lang: PropTypes.string }),
    withStateHandlers({ inputValue: '' }, {
        onInputChange: () => inputValue => ({ inputValue }),
    }),
    graphql(skillSearchQuery, {
        props: ({ data: { loading, ...data } }) => ({
            isLoading: loading,
            options:   _get(data, "findSkills.list", []).filter(item => item).map(skillToOption),
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
        input:              base => ({ ...base, ...searchIcon }),
        singleValue:        base => ({ ...base, ...searchIcon }),
        option:             (styles, { isSelected, isFocused }) => ({
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
        }),
    };
};

const SkillSelect = ({ value: list = [], onChange, ...props }) => (
    <Root>
        <TheSelect
            {...props}
            customStyle={customStyle}
            value={null}
            onChange={item => onChange(addValue(list || [], item.id))}
        />
        <Tags>
            {(list || []).map(id => (
                <Tag
                    key={id}
                    id={id}
                    onRemove={() => onChange(removeValue(list || [], id))}
                />
            ))}
        </Tags>
    </Root>
);

SkillSelect.propTypes = {
    value:    PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SkillSelect;
