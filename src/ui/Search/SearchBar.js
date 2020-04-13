import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import _get from 'lodash/get';
import _includes from 'lodash/includes';
import FontIcon from '../Icons/FontIcon';
import CheckBox from '../Form/Checkbox';
import Skill from '../Tag/SkillTagView';
import Category from '../Tag/CategoryTagView';
import { noEmptyItems, listWithOrWithoutValue, listWithoutValue } from '../uiUtils';
import Input from './DelayedSearchInput';

const InputRoot = styled('div')({
    position:     'relative',
    boxShadow:    '0 3px 12px 0 rgba(48,6,114,0.11)',
    borderRadius: 10,
});

const SearchButton = styled('button')(({ theme }) => ({
    height:                  48,
    width:                   48,
    position:                'absolute',
    right:                   0,
    top:                     0,
    textAlign:               'center',
    lineHeight:              '48px',
    overflow:                'hidden',
    border:                  '0 none',
    backgroundColor:         _get(theme, 'colors.primary'),
    color:                   '#ffffff',
    fontWeight:              300,
    cursor:                  'pointer',
    borderTopRightRadius:    10,
    borderBottomRightRadius: 10,
    fontSize:                16,
    paddingTop:              3,
}));

const Advanced = styled('div')({
    textAlign:      'right',
    marginTop:      8,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'flex-start',
    flexWrap:       'wrap',
    flexDirection:  'row-reverse',
    lineHeight:     '32px',
    minHeight:      32,
});

const SearchBar = ({ searchQuery, onChange, skillMap, categoryMap, ...props }) => (
    <form method="GET" {...props}>
        <InputRoot>
            <Input
                id="q"
                name="q"
                placeholder={t`Try programming`}
                autoComplete="off"
                defaultValue={searchQuery.inputValue}
                onChange={inputValue => onChange({ ...searchQuery, inputValue })}
            />
            <SearchButton type="submit">
                <FontIcon content="search" />
            </SearchButton>
        </InputRoot>
        <Advanced>
            <CheckBox
                variant="right"
                name="event"
                label={t`Events`}
                defaultChecked={_includes(searchQuery.contexts, 'event')}
                onChange={checked => onChange({
                    ...searchQuery,
                    contexts: listWithOrWithoutValue('event', searchQuery.contexts, checked),
                })}
            />
            <CheckBox
                variant="right"
                name="playlist"
                label={t`Playlists`}
                defaultChecked={_includes(searchQuery.contexts, 'playlist')}
                onChange={checked => onChange({
                    ...searchQuery,
                    contexts: listWithOrWithoutValue('playlist', searchQuery.contexts, checked),
                })}
            />
            {noEmptyItems(searchQuery.skills.map(id => skillMap[id]))
                .map(skill => (
                    <Skill
                        key={skill.id}
                        {...skill}
                        onRemove={() => onChange({
                            ...searchQuery,
                            skills: listWithoutValue(skill.id, searchQuery.skills),
                        })}
                    />
                ))}
            {noEmptyItems(searchQuery.categories.map(id => categoryMap[id]))
                .map(category => (
                    <Category
                        key={category.id}
                        {...category}
                        onRemove={() => onChange({
                            ...searchQuery,
                            categories: listWithoutValue(category.id, searchQuery.categories),
                        })}
                    />
                ))}
        </Advanced>
    </form>
);

SearchBar.propTypes = {
    searchQuery: PropTypes.shape({
        inputValue: PropTypes.string.isRequired,
        categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        skills:     PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        contexts:   PropTypes.arrayOf(PropTypes.oneOf(['playlist', 'event'])).isRequired,
    }).isRequired,
    onChange:    PropTypes.func.isRequired,
    categoryMap: PropTypes.shape({}).isRequired,
    skillMap:    PropTypes.shape({}).isRequired,
};

SearchBar.displayName = 'SearchBarView';

export default SearchBar;
