import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import List from './List';
import { font14A1, font24 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const Heading = styled('h1')(({ theme }) => ({
    ...font14A1,
    color:      '#3E3564',
    margin:     '0 16px 16px 16px',
    display:    'flex',
    alignItems: 'center',

    [themedMinWidth('tablet', theme)]: {
        ...font24,
    },
}));

const ListWithHeading = ({ title, ...props }) => {
    const { list, loading, total } = props;
    const empty = (loading && list.length === 0) || total === 0;
    const heading = typeof title === 'function'
        ? title({ list, loading, total, empty })
        : title;

    return (
        <div>
            <Heading hide={!heading}>{heading}</Heading>
            <List {...props} />
        </div>
    );
};

ListWithHeading.propTypes = {
    title:   PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    list:    PropTypes.arrayOf(PropTypes.shape()).isRequired,
    total:   PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default ListWithHeading;
