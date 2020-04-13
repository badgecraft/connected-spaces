import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { t } from 'ttag';
import stringifyDuration from '../uiStringifyDuration';
import { font12A4 } from '../uiFonts';
import actIcon from './activities.svg';
import timeIcon from './time.svg';
import peopleIcon from './people.svg';
import completedIcon from './completedPlaylist.svg';
import addToPlaylistDark from './addedToPlaylist.svg';

// todo how will the time be stored?

const Root = styled('div')({
    color:        '#3E3564',
    borderBottom: '1px solid #E5E3ED',
    paddingTop:   12,
    marginBottom: 12,
    ...font12A4,
});

const Row = styled('div')({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    marginBottom:   12,
});

const Column = styled('div')(({ icon }) => ({
    background:  `transparent url("${icon}") left center/15px 15px no-repeat`,
    paddingLeft: 21,
    minHeight:   15,
    paddingTop:  1,
}));

const ActivityStats = (props) => {
    const { activities = null, started = null, completed = null, seconds = null, joined = null, added = null } = props;
    const time = seconds == null ? null : stringifyDuration(seconds);
    return (
        <Root>
            {activities !== null && <Row>
                <Column icon={actIcon}>{t`Activities: ${activities}`}</Column>
            </Row>}
            {started !== null && <Row>
                <Column icon={peopleIcon}>{t`Started: ${started}`}</Column>
            </Row>}
            {joined !== null && <Row>
                <Column icon={peopleIcon}>{t`Joined (${joined})`}</Column>
            </Row>}
            {added !== null && <Row>
                <Column icon={addToPlaylistDark}>{t`Added to Playlist (${added})`}</Column>
            </Row>}
            {completed !== null && <Row>
                <Column icon={completedIcon}>{t`Completed the playlist: ${completed}`}</Column>
            </Row>}
            {time && <Row>
                <Column icon={timeIcon}>{t`Time to pass: ${time}`}</Column>
            </Row>}
        </Root>
    );
};

ActivityStats.propTypes = {
    activities: PropTypes.number,
    started:    PropTypes.number,
    completed:  PropTypes.number,
    seconds:    PropTypes.number,
    joined:     PropTypes.number,
    added:      PropTypes.number,
};

ActivityStats.defaultProps = {
    seconds:    null,
    activities: null,
    started:    null,
    completed:  null,
    joined:     null,
    added:      null,
};

export default ActivityStats;
