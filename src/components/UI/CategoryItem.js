import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import Link from '../Link';
import paths from '../../constants/paths';
import { skipProps } from './_utils';
import { font12A1, font12A2, font16A2, font16A3 } from '../../ui/uiFonts';
import { translateCategoryName } from '../../ui/Form/formUtils';
import { themedMinWidth } from '../../ui/uiUtils';

export const categoryItemStyle = ({ active, theme }) => ({
    ...font12A2,
    ...(active && font12A1),
    backgroundColor: active ? _get(theme, 'colors.primary') : '#F0EFF8',
    color:           active ? '#FFFFFF' : '#A59FC0',
    display:         'inline-block',
    padding:         '4px 15px',
    borderRadius:    15,
    margin:          '3px 6px 3px 0',
    textDecoration:  'none',

    [themedMinWidth('tablet')]: {
        paddingTop: 5,
        ...font16A3,
        ...(active && font16A2),
    },
});

const Container = styled(skipProps('active')(Link))(categoryItemStyle);

const CategoryItem = ({ id, name, count, active }) => (
    <Container
        to={id ? paths.opportunitiesInCategory : paths.opportunities}
        params={{ id }}
        active={active}
    >{translateCategoryName(name)} ({count})</Container>
);

CategoryItem.propTypes = {
    id:     PropTypes.string,
    name:   PropTypes.string.isRequired,
    count:  PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
};

CategoryItem.defaultProps = {
    id: null,
};

export default CategoryItem;
