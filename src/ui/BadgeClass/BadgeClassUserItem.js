import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import Ago from '../Ago';
import { font12, font12A4, font14, font16, font16A5 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const Root = styled('div')({
    width:        '100%',
    display:      'flex',
    alignItems:   'center',
    marginBottom: 16,
    ...font12,
});

const Pic = styled('div')(({ picture }) => ({
    width:        32,
    height:       32,
    display:      'inline-block',
    background:   `transparent url("${picture}") center center/contain no-repeat`,
    borderRadius: '50%',
    marginRight:  8,
}));

const Status = styled('span')({
    '>span': {
        color: '#A59FC0',
    },
});

const Primary = styled('div')(({ theme }) => ({
    ...font14,

    [themedMinWidth('tablet', theme)]: {
        ...font16,
    },
}));

const Secondary = styled('div')(({ theme }) => ({
    ...font12A4,
    display: 'inline-block',

    [themedMinWidth('tablet', theme)]: {
        ...font16A5,
    },
}));

const Details = styled('div')({
    flexGrow: 1,
});


const BadgeClassUserItem = ({ item }) => {
    const picture = _get(item, 'owner.picture');
    const name = _get(item, 'owner.name');
    const email = _get(item, 'owner.primaryEmail');
    return (
        <Root>
            <Pic picture={picture} />
            <Status>
                <Details>
                    <Primary>{name} {email && <Secondary>({email})</Secondary>}</Primary>
                </Details>
                <Ago ts={item.created} />
            </Status>
        </Root>
    );
};

BadgeClassUserItem.propTypes = {
    item: PropTypes.shape({
        owner:   PropTypes.shape({
            name:         PropTypes.string.isRequired,
            picture:      PropTypes.string.isRequired,
            primaryEmail: PropTypes.string,
        }).isRequired,
        created: PropTypes.number.isRequired,
    }).isRequired,
};

export default BadgeClassUserItem;
