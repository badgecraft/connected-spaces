import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import owners from './owners.svg';
import admins from './admins.svg';
import Ago from '../Ago';
import { font12A4, font14, font16, font16A5 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

const Root = styled('div')({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    marginBottom:   8,
    padding:        12,
    boxShadow:      '0 6px 12px 0 rgba(48,6,114,0.11)',
    minHeight:      64,
    width:          '100%',
});

const Main = styled('div')({
    display:  'flex',
    flexGrow: 1,
});

// todo figure out a way to get avatar
const Avatar = styled('div')(() => ({
    width:        30,
    height:       30,
    borderRadius: '50%',
    background:   `silver none center center/contain no-repeat`,
    marginRight:  8,
    flexShrink:   0,
    alignSelf:    'center',
}));

const Team = styled('div')(({ team }) => ({
    width:      19,
    height:     19,
    position:   'relative',
    top:        15,
    left:       -5,
    background: `transparent none center center/contain no-repeat`,
    ...(team === 'owners' && { backgroundImage: `url("${owners}")` }),
    ...((team === 'admins' || team === 'managers') && { backgroundImage: `url("${admins}")` }),
}));

const Primary = styled('div')(({ theme }) => ({
    ...font14,

    [themedMinWidth('tablet', theme)]: {
        ...font16,
    },
}));

const Secondary = styled('div')(({ theme }) => ({
    ...font12A4,

    [themedMinWidth('tablet', theme)]: {
        ...font16A5,
    },
}));

const Details = styled('div')({
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'flex-start',
    justifyContent: 'center',
    flexGrow:       1,
});

const Time = styled('div')({});

const InviteItemView = ({ item }) => {
    const primary = item.name || item.email;
    const secondary = item.email !== primary && item.email;
    return (
        <Root>
            <Main>
                <Avatar>
                    <Team team={item.team} />
                </Avatar>
                <Details>
                    <Primary>{primary}</Primary>
                    {secondary && <Secondary>{secondary}</Secondary>}
                </Details>
            </Main>
            <Time>
                <Ago ts={item.createdAt} systemTs={Date.now()} />
            </Time>
        </Root>
    );
};

InviteItemView.propTypes = {
    item: PropTypes.shape({
        id:        PropTypes.string.isRequired,
        name:      PropTypes.string.isRequired,
        email:     PropTypes.string,
        team:      PropTypes.oneOf(['users', 'admins', 'owners']).isRequired,
        createdAt: PropTypes.number.isRequired,
    }).isRequired,
};

export default InviteItemView;
