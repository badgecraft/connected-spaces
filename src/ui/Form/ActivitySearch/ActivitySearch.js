import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { withTheme } from 'emotion-theming';
import { t } from 'ttag';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import query from './activitySearch.gql';
import Option from './ActivitySearchOption';
import plus from './plus.svg';
import { font12A5, font12, font16A1, font16A3 } from '../../uiFonts';
import { themedMinWidth } from '../../uiUtils';
import Item from './ActivityItem';
import remove from './remove.svg';
import { updateQueryListUpdater } from '../../uiPaging';

// todo load more? using a group view?
// todo new activity modal

const setAtLeastOneMandatory = list => {
    if (list.filter(item => item.mandatory).length === 0) {
        return list.map((item, index) => ({ ...item, mandatory: index === 0 }));
    }
    return list;
};

const removeValue = (list, id) => setAtLeastOneMandatory(list.filter(item => item.id !== id));
const addValue = (list, id) => setAtLeastOneMandatory([...removeValue(list, id), { id, mandatory: false }]);
const item2Option = item => ({ value: item.id, label: item.name, ...item });

const Root = styled('div')({});

const List = styled('div')({
    marginTop: 25,
});

const Create = styled('button')(({ theme }) => ({
    ...font12A5,
    display:            'inline-block',
    verticalAlign:      'middle',
    backgroundColor:    'transparent',
    backgroundPosition: 'left center',
    backgroundSize:     '20px 20px',
    backgroundRepeat:   'no-repeat',
    backgroundImage:    `url("${plus}")`,
    border:             '0 none',
    outline:            'none',
    paddingLeft:        28,
    height:             24,
    color:              '#3E3564',
    cursor:             'pointer',

    [themedMinWidth('tablet', theme)]: {
        ...font16A3,
        lineHeight:     '23px',
        backgroundSize: '25px 25px',
        height:         29,
        paddingLeft:    33,
    },
}));

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
            height:             21,
            width:              21,
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
            ...(isFocused && {
                borderBottomLeftRadius:  0,
                borderBottomRightRadius: 0,
            }),
            '&:hover':       {},
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        placeholder:        (base) => ({
            ...base,
            color: '#C4C0D4',
        }),
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
        menu:               base => ({
            ...base,
            marginTop:               0,
            backgroundColor:         _get(theme, 'colors.form.inputBg', '#FCFCFC'),
            border:                  `1px solid ${_get(theme, 'colors.form.outline', '#c4c4c4')}`,
            boxShadow:               'none',
            borderBottomLeftRadius:  10,
            borderBottomRightRadius: 10,
            borderTopLeftRadius:     0,
            borderTopRightRadius:    0,
            borderTop:               '0 none',
        }),
    };
};

const Group = styled('div')(({ theme }) => ({
    ...font12,
    marginBottom:  5,
    color:         '#3E3564',
    textTransform: 'none',

    [themedMinWidth('tablet', theme)]: {
        ...font16A1,
    },
}));

const NoOptionsRoot = styled('div')({
    textAlign: 'left',
});

// todo re-enable once draft events available (here and on NoOptionsRoot)
const formatGroupLabel = (data, { onAddActivityClick }) => (
    <div>
        <Group>{data.label} ({data.total})</Group>
        {onAddActivityClick && false && <div>
            <Create type="button" onClick={onAddActivityClick}>{t`Create your first activity`}</Create>
        </div>}
    </div>
);

const TheSelect = compose(
    withStateHandlers({ inputValue: '' }, {
        onInputChange: () => inputValue => ({ inputValue }),
    }),
    graphql(query, {
        props: ({ data: { loading, fetchMore, ...data }, ownProps: { exclude = [], inputValue } }) => {
            const total = _get(data, 'organisation.projects.total', 0);
            const offset = _get(data, 'organisation.projects.offset', 0);
            const limit = _get(data, 'organisation.projects.limit', 0);
            const q = _get(data, 'organisation.projects.q', '');

            return {
                isLoading: loading,
                options:   [
                    {
                        label: t`Your opportunities`,
                        total,
                        options:
                               (_get(data, 'organisation.projects.list') || [])
                                   .filter(item => item)
                                   .filter(item => exclude.indexOf(item.id) === -1)
                                   .map(item2Option),
                    },
                ],
                fetchMore: () => {
                    if (!loading && offset + limit < total) {
                        return fetchMore({
                            variables:   { offset: offset + limit, },
                            updateQuery: updateQueryListUpdater('organisation.projects.list', inputValue !== q),
                        });
                    }

                    return null;
                },
            };
        },
    }),
    withHandlers({
        onChange:             ({ onChange, onInputChange }) => (item, { action }) => {
            if (action === 'select-option') {
                onInputChange('');
                onChange(item);
            }
        },
        onMenuScrollToBottom: ({ fetchMore }) => () => fetchMore(),
        filterOption:         () => () => () => true,
    }),
)(Select);

const Remove = styled('button')(({ theme }) => ({
    width:         24,
    height:        24,
    display:       'inline-block',
    verticalAlign: 'middle',
    background:    `transparent url("${remove}") center center/12px 12px no-repeat`,
    outline:       'none',
    border:        '0 none',
    cursor:        'pointer',
    flexShrink:    0,

    [themedMinWidth('tablet', theme)]: {
        backgroundSize: '16px 16px',
    },
}));

// todo on value add to list, try to populate that item to cache?
const ActivitySearch = ({ empty, error, theme, value, onChange, onAddActivityClick, organisation }) => {
    const list = value || [];
    return (
        <Root>
            <TheSelect
                styles={customStyle({ error, theme })}
                formatGroupLabel={data => formatGroupLabel(data, { onAddActivityClick })}
                components={{ Option }}
                noOptionsMessage={() => (<NoOptionsRoot>
                    {t`There are no activities in your organisation`}
                    {false &&
                    <Create type="button" onClick={onAddActivityClick}>{t`Create your first activity`}</Create>}
                </NoOptionsRoot>)}
                value={null}
                onChange={item => onChange(addValue(list, item.id))}
                tabSelectsValue={false}
                blurInputOnSelect
                onAddActivityClick={onAddActivityClick}
                organisation={organisation}
                exclude={list.map(item => item.id)}
            />
            <List>
                {list.length === 0
                    ? empty()
                    : (list.map(({ id }) => (
                        <Item
                            key={id}
                            id={id}
                            actions={<Remove type="button" onClick={() => onChange(removeValue(list, id))} />}
                        />
                    )))}
            </List>
        </Root>
    );
};

ActivitySearch.propTypes = {
    empty:              PropTypes.func.isRequired,
    error:              PropTypes.string,
    theme:              PropTypes.shape().isRequired,
    value:              PropTypes.arrayOf(PropTypes.shape({
        id:        PropTypes.string.isRequired,
        mandatory: PropTypes.bool.isRequired,
    })).isRequired,
    onChange:           PropTypes.func.isRequired,
    onAddActivityClick: PropTypes.func,
    organisation:       PropTypes.string.isRequired,
};

ActivitySearch.defaultProps = {
    error:              null,
    onAddActivityClick: null,
};

export default withTheme(ActivitySearch);
