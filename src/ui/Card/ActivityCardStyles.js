import styled from '@emotion/styled';
import _get from 'lodash/get';
import badgeIcon from './badge.svg';
import offlineIcon from './offline.svg';
import onlineIcon from './online.svg';
import { font12A2, font12A3, font12A4, font16A4, font16A5, font8 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';
import MaybeLink from '../Link/MaybeLink';

export const CoverActions = styled('div')(({ variant, padding = 8 }) => ({
    display:        'flex',
    alignItems:     'stretch',
    justifyContent: 'space-between',
    color:          variant === 'light' ? '#3E3564' : '#ffffff',
    padding,

    '& > div': {
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        '& > div':      {
            marginRight:      8,
            '&:last-of-type': {
                marginRight: 0,
            },
        },
    },
}));

export const Badge = styled('div')({
    background: `transparent url("${badgeIcon}") center center/contain no-repeat`,
    width:      21,
    height:     21,
    color:      '#3E3564',
    textAlign:  'center',
    ...font12A2,
    lineHeight: '21px',
    display:    'inline-block',
});

export const ActivityType = styled('div')(({ type }) => ({
    background: `transparent url("${type === 'digitalXp' ? onlineIcon : offlineIcon}") center center/contain no-repeat`,
    width:      21,
    height:     21,
    display:    'inline-block',
}));

export const ActivityDate = styled('div')(({ theme }) => ({
    ...font12A3,
    color:     '#ffffff',
    textAlign: 'right',

    [themedMinWidth('tablet', theme)]: {
        ...font16A4,
    }
}));

export const PlaylistLabel = styled('div')(({ theme }) => ({
    ...font8,
    borderRadius:    3,
    backgroundColor: _get(theme, 'colors.primary'),
    color:           '#ffffff',
    whiteSpace:      'nowrap',
    padding:         '6px 4px 5px 3px',
    flexShrink:      0,
    verticalAlign:   'middle',
}));

export const Completed = styled('span')(({ theme }) => ({
    color: _get(theme, 'colors.primary'),

    i: {
        position: 'relative',
        top:      2,
    }
}));

export const DetailLine = styled('div')(({ theme }) => ({
    ...font12A4,
    whiteSpace:   'nowrap',
    textOverflow: 'ellipsis',
    overflow:     'hidden',
    marginBottom: 8,

    i: {
        width:    20,
        display:  'inline-block',
        position: 'relative',
        top:      2,
    },

    [themedMinWidth('tablet', theme)]: {
        ...font16A5,
    },
}));

export const Link = styled(MaybeLink)({
    textDecoration: 'underline',
    color:          '#3E3564',
});

export const Details = styled('div')({
    flexGrow:       1,
    display:        'flex',
    flexDirection:  'column',
    justifyContent: 'flex-start',
});