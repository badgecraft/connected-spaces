import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rebass/emotion';
import styled from '@emotion/styled';
import { branch, renderComponent, getContext } from 'recompose';
import _get from 'lodash/get';
import Link from '../Link';
// import { skipProps } from '../../components/UI/_utils';

const Root = styled(Box)({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    marginBottom:   16,
    flexDirection:  'column',
});

const Pic = styled('div')(({ picture }) => ({
    width:      120,
    height:     120,
    background: `transparent url("${picture}") center center/contain no-repeat`,
    margin:     '0 auto',
}));

const Name = styled('div')({
    marginTop: 8,
});

const badgeStyle = {
    textAlign: 'center',
};

const BadgeDiv = styled('div')(badgeStyle);
const BadgeLink = styled(Link)(badgeStyle);

const Badge = branch(({ link }) => link, renderComponent(BadgeLink))(BadgeDiv);

const BadgeListItem = ({ item, paths }) => (
    <Root width={[1, 1 / 2, 1 / 3, 1 / 4]} title={item.name}>
        <Badge link={_get(item, 'perms.view.value') === 1} to={paths.personalBadgeView} params={{ id: item.id }}>
            <Pic picture={item.picture} />
            <Name>{item.name}</Name>
        </Badge>
    </Root>
);

BadgeListItem.propTypes = {
    item:  PropTypes.shape({
        id:      PropTypes.string.isRequired,
        name:    PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        perms:   PropTypes.shape({
            view: PropTypes.shape({ value: PropTypes.oneOf([0, 1]).isRequired }).isRequired,
        }).isRequired,
    }).isRequired,
    paths: PropTypes.shape({
        personalBadgeView: PropTypes.string.isRequired,
    }).isRequired,
};

export default getContext({ paths: PropTypes.shape().isRequired })(BadgeListItem);
