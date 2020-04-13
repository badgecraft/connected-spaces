import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import _get from 'lodash/get';
import Category from './CategoryItem';
// import Button from './Button';

const Container = styled.div``;

const getCount = item => _get(item, 'projects.total', 0);
const sumCounts = list => list.reduce((acc, item) => acc + getCount(item), 0);

const Categories = ({ list = [], active = null }) => {
    if (sumCounts(list) === 0) {
        return null;
    }

    return (
        <Container>
            <Category active={!active} id={null} name={t`All`} count={sumCounts(list)} />
            {list
                .filter(item => item)
                .map(cat => ({ ...cat, count: getCount(cat) }))
                .filter(({ count }) => count > 0)
                .map(cat => (<Category key={cat.id} {...cat} active={cat.id === active} />))}
            {/* <Button variant="more" size="small" type="button">More TODO</Button> */}
        </Container>
    );
};

Categories.propTypes = {
    list:   PropTypes.arrayOf(PropTypes.shape({
        id:       PropTypes.string.isRequired,
        projects: PropTypes.shape({
            total: PropTypes.number.isRequired,
        }).isRequired,
    })).isRequired,
    active: PropTypes.string,
};

Categories.defaultProps = {
    active: null,
};

export default Categories;
