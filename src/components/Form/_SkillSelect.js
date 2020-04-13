import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import { compose, withStateHandlers, mapProps, withHandlers, getContext } from 'recompose';
import { t } from 'ttag';
import { RawSelect } from './_Select';
import Tag from '../UI/Tag';

const Container = styled.div``;

const skillToOption = ({ id, name, ...props }) => ({ label: name, value: id, ...props });
const optionToSkill = ({ label, value, ...props }) => ({ id: value, name: label, ...props });
const existing = item => !!item;

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
const Select = compose(
    getContext({ lang: PropTypes.string }),
    withStateHandlers({ inputValue: '' }, {
        onInputChange: () => inputValue => ({ inputValue }),
    }),
    graphql(skillSearchQuery, {
        props: ({ data: { loading, ...data } }) => ({
            isLoading: loading,
            options:   _get(data, "findSkills.list", []).filter(existing).map(skillToOption),
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
)(RawSelect);

const removeValue = (list, id) => list.filter(item => item.id !== id);
const addValue = (list, skill) => list.find(item => item.id === skill.id) ? list : [...list, skill];

const SkillSelect = ({ value: list = [], onChange }) => (
    <Container>
        <Select
            placeholder={t`Skill (for example: CSS)`}
            onChange={item => onChange(addValue(list, item))}
            value={null} // to always display empty value even when selected :)
        />

        {list.map(({ id, name }) => (
            <Tag key={id} onRemove={() => onChange(removeValue(list, id))}>{name}</Tag>))}
    </Container>
);

SkillSelect.propTypes = {
    onChange: PropTypes.func.isRequired,
    value:    PropTypes.arrayOf(PropTypes.shape({
        id:   PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
};

export default compose(
    mapProps(({ input: { value, onChange }, meta, ...props }) => ({
        ...props,
        value: value instanceof Array ? value : [],
        onChange,
    })),
)(SkillSelect);
