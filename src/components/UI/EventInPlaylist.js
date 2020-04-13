import React from 'react';
import styled from '@emotion/styled';
import Icon, { icons } from '../Icon/_Icon';
import { Colors } from '../Constants';
import Badge from './EventBadge';

const Root = styled('div')`
    box-shadow: 0 3px 12px 0 rgba(48,6,114,0.11);
    display: flex;
    padding: 8px 6px;
    margin-bottom: 8px;
`;

const Event = styled('div')`
    width: 92px;
    height: 92px;
    margin-right: 15px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 92px 92px;
    background-image: url("${({ bg }) => bg}");
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 9px;
`;

const Info = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Line = styled('div')`
    font-size: 12px;
    line-height: 14px;
    color: ${Colors.heading};
    margin: 5px 0;
`;

// todo ellipsis on second line
const Name = styled('h2')`
    font-size: 14px;
    line-height: 19px;
    max-height: 38px;
    overflow: hidden;
`;

const Details = styled('div')``;

const EventInPlaylist = () => (
    <Root>
        <Event bg="https://www.badgecraft.eu/storage/project/c2c7709b-d58d-4349-bac4-be03295ae7b4.png">
            <Badge count={3} />
            <Icon size={21} image={icons.local} />
        </Event>
        <Info>
            <Name>Discover the citys party scene in city center</Name>
            <Details>
                <Line><Icon image={icons.organizer} size={13} /> State Design Academy</Line>
                <Line><Icon image={icons.date} size={13} /> 21 June, 13:00</Line>
            </Details>
        </Info>
    </Root>
);

export default EventInPlaylist;
