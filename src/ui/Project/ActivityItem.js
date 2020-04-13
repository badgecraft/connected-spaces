import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import { t } from 'ttag';
import uiStringifyDuration from '../uiStringifyDuration';
import { font14, font12A4, font16, font8, font14A5 } from '../uiFonts';
import flag from './flag.svg';
import time from './time.svg';
import go from './go.svg';
import online from './online.svg';
import offline from './offline.svg';
import completed from './completed.svg';
import { themedMinWidth } from '../uiUtils';
import Link from '../Link';
import LinkIfAvailable from '../Link/LinkIfAvailable';

// todo where to get properties: expired, completed, actionTime, isOnline
// todo open activity
// todo display text: expired next to mandatory/optional

const Root = styled('div')(({ theme }) => ({
    display:        'flex',
    alignItems:     'flex-start',
    justifyContent: 'flex-start',
    borderBottom:   '1px solid #E5E3ED',
    padding:        '12px 0',

    '&:last-child': {
        borderBottom: '0 none',
    },

    [themedMinWidth('tablet', theme)]: {
        padding: '22px 0',
    },
}));

const Pic = styled('div')(({ picture, meta, theme }) => ({
    width:      92,
    height:     92,
    background: `${_get(meta, 'dominantColor', '#666666')} url("${picture}") center center/contain no-repeat`,
    flexShrink: 0,
    display:    'flex',

    [themedMinWidth('tablet', theme)]: {
        width:  86,
        height: 86,
    },
}));

const Details = styled('div')({
    paddingLeft: 16,
    flexGrow:    1,
});

const Name = styled('div')(({ theme }) => ({
    color:        '#3E3564',
    ...font14,
    marginBottom: 7,

    [themedMinWidth('tablet', theme)]: {
        ...font16,
    },
}));

const Flags = styled('div')(({ theme }) => ({
    ...font12A4,
    color:        '#3E3564',
    background:   `transparent url("${flag}") 3px center/13px 18px no-repeat`,
    paddingLeft:  23,
    minHeight:    18,
    marginBottom: 8,
    paddingTop:   4,

    [themedMinWidth('tablet', theme)]: {
        ...font14A5,
    },
}));

const Time = styled('div')(({ theme }) => ({
    ...font12A4,
    color:       '#3E3564',
    background:  `transparent url("${time}") left center/15px 15px no-repeat`,
    paddingLeft: 23,
    minHeight:   15,
    paddingTop:  1,

    [themedMinWidth('tablet', theme)]: {
        ...font14A5,
    },
}));

const Action = styled(Link)(({ theme }) => ({
    ...font14,
    color:         _get(theme, 'colors.primary'),
    textTransform: 'uppercase',
    float:         'right',
    background:    `transparent url("${go}") right center/14px 10px no-repeat`,
    paddingRight:  22,
    marginTop:     6,

    [themedMinWidth('tablet', theme)]: {
        marginTop: -12,
    },
}));

const Expired = styled('div')(({ theme }) => ({
    ...font8,
    backgroundColor: _get(theme, 'colors.primary'),
    borderRadius:    3,
    display:         'inline-block',
    color:           '#ffffff',
    padding:         '4px 5px 3px 6px',
    position:        'relative',
    top:             -3,
    textTransform:   'uppercase',
}));

const Completed = styled('div')({
    display:    'inline-block',
    width:      18,
    height:     18,
    background: `transparent url("${completed}") center center/contain no-repeat`,
    position:   'relative',
    top:        6,
    left:       6,
});

const Online = styled('div')(({ isOnline }) => ({
    width:      20,
    height:     20,
    background: `transparent url("${isOnline ? online : offline}") center center/contain no-repeat`,
    alignSelf:  'flex-end',
    margin:     '0 0 6px 6px',
}));

const ActivityItem = ({ item, link }) => {
    const seconds = _get(item, 'project.duration.seconds', null);
    const duration = seconds === null ? t`Unknown duration` : uiStringifyDuration(seconds);
    return (
        <Root>
            <LinkIfAvailable enabled={!!link} {...link} target="_blank">
                <Pic picture={_get(item, 'project.picture')} meta={_get(item, 'project.pictureMeta')}>
                    {false && <Expired>{t`Expired`}</Expired>}
                    {item.completed && <Completed
                        data-balloon={t`You have completed this activity`}
                        data-balloon-pos="right"
                    />}
                    {_get(item, 'project.type') === 'digitalXp' && <Online isOnline />}
                </Pic>
            </LinkIfAvailable>
            <Details>
                <LinkIfAvailable enabled={!!link} {...link} target="_blank">
                    <Name>{_get(item, 'project.name')}</Name>
                </LinkIfAvailable>
                <Flags>
                    {item.mandatory ? t`Mandatory` : t`Optional`}
                </Flags>
                <Time>{duration}</Time>
                <Action target="_blank" {...link}>{t`View activity details`}</Action>
            </Details>
        </Root>
    );
};

ActivityItem.propTypes = {
    item: PropTypes.shape({
        mandatory: PropTypes.bool.isRequired,
        project:   PropTypes.shape({
            name:        PropTypes.string.isRequired,
            type:        PropTypes.string.isRequired,
            picture:     PropTypes.string.isRequired,
            pictureMeta: PropTypes.shape({
                dominantColor: PropTypes.string.isRequired,
            }),
            duration:    PropTypes.shape({
                seconds: PropTypes.number.isRequired,
            }),
        }).isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    link: PropTypes.shape({}).isRequired,
};

export default ActivityItem;
