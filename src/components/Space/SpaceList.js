import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import _get from 'lodash/get';
import styled from '@emotion/styled';
import { t } from 'ttag';
import { Flex } from '@rebass/emotion';
import query from '../../routes/space/getVerifiedOrganisations.gql';
import { Content as _Content } from '../UI/Content';
import SpaceItem from './SpaceItem';
import { breakpoints } from '../Constants';

const Content = styled(_Content)({
    minHeight:            300,
    [breakpoints.mobile]: {
        minHeight: 500,
    },
});

const Title = styled('h1')({
    fontSize:   14,
    lineHeight: '39px',
});

const List = styled(Flex)({
    flexWrap: 'wrap',
});

const SpaceList = ({ total, list }) => (
    <Content my={[3, 4]}>
        <Title>{t`${total} organisers`}</Title>
        <List>{list.filter(item => item).map(item => (<SpaceItem key={item.id} item={item} />))}</List>
    </Content>
);

SpaceList.propTypes = {
    total: PropTypes.number.isRequired,
    list:  PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
    })).isRequired,
};

export default compose(
    graphql(query, {
        props: ({ data: { loading, ...data } }) => ({
            loading,
            total: _get(data, 'organisations.total', 0),
            list:  _get(data, 'organisations.list', []),
        }),
    })
)(SpaceList);
