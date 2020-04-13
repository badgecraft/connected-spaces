import styled from '@emotion/styled';
import _get from 'lodash/get';
import owners from '../ProjectUser/owners.svg';
import admins from '../ProjectUser/admins.svg';
import { font12A6, font14, font16, font16A5 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';

export const Avatar = styled('div')(({ picture }) => ({
    width:        30,
    height:       30,
    borderRadius: '50%',
    background:   `silver url("${picture}") center center/contain no-repeat`,
    marginRight:  8,
    flexShrink:   0,
}));

export const Team = styled('div')(({ team }) => ({
    width:      19,
    height:     19,
    position:   'relative',
    top:        15,
    left:       -5,
    background: `transparent none center center/contain no-repeat`,
    ...(team === 'owners' && { backgroundImage: `url("${owners}")` }),
    ...((team === 'admins' || team === 'managers') && { backgroundImage: `url("${admins}")` }),
}));

export const Name = styled('div')(({ theme }) => ({
    ...font14,
    flexGrow:     1,
    overflow:     'hidden',
    textOverflow: 'ellipsis',
    whiteSpace:   'nowrap',

    [themedMinWidth('tablet', theme)]: {
        ...font16,
    },
}));

export const Email = styled('div')(({ theme }) => ({
    ...font12A6,
    color:     _get(theme, 'colors.primary'),
    marginTop: 4,
}));

export const Info = styled('div')({});

export const StatR = styled('div')(({ theme }) => ({
    ...font12A6,
    display:       'flex',
    alignItems:    'center',
    flexDirection: 'column',
    color:         '#4A4A4A',
    width:         '33.33%',
    flex:          '1 0',

    [themedMinWidth('tablet', theme)]: {
        ...font16A5,
        alignItems: 'flex-start',
    },
}));

export const StatT = styled('div')({});

export const StatV = styled('div')(({ theme }) => ({
    marginTop: 4,

    [themedMinWidth('tablet', theme)]: {
        marginTop: 0,
    },
}));

export const NameAndPic = styled('div')(({ theme }) => ({
    flex: '1 0',

    display:    'flex',
    alignItems: 'center',

    [themedMinWidth('tablet', theme)]: {
        order: 1,
    },
}));

export const Extra = styled('div')(({ theme }) => ({
    flex:      '1 100%',
    marginTop: 8,
    display:   'flex',

    [themedMinWidth('tablet', theme)]:  {
        order:     2,
        flex:      '0 0 280px',
        width:     280,
        marginTop: 0,
    },
    [themedMinWidth('desktop', theme)]: {
        order: 2,
        flex:  '0 0 390px',
        width: 390,
    },
}));

export const Actions = styled('div')(({ theme }) => ({
    flex:       '0 30px',
    width:      30,
    whiteSpace: 'nowrap',
    direction:  'rtl',
    '& > *':    {
        direction: 'ltr',
    },

    [themedMinWidth('tablet', theme)]: {
        flex:  '0 130px',
        width: 130,
        order: 3,
    },
}));

export const Root = styled('div')(({ theme }) => ({
    display:      'flex',
    marginBottom: 4,
    padding:      12,
    boxShadow:    '0 6px 12px 0 rgba(48,6,114,0.11)',
    width:        '100%',
    flexFlow:     'row wrap',
    flexWrap:     'wrap',
    alignItems:   'center',
    minHeight:    '64px',

    [themedMinWidth('tablet', theme)]: {
        flexWrap:     'nowrap',
        [`${StatT}`]: { display: 'none' },
    },
}));

export const Heading = styled('div')(({ theme }) => ({
    display:      'flex',
    marginBottom: 4,
    padding:      12,
    width:        '100%',
    flexFlow:     'row wrap',
    alignItems:   'center',

    [`${Extra}`]: {
        display: 'none',
    },

    [themedMinWidth('tablet', theme)]: {
        [`${Extra}`]: {
            display: 'flex',
        },
    }
}));

export const Type = styled('div')(({ theme }) => ({
    ...font12A6,
    marginTop: 4,
    color:     '#b9bbbb',
    display:   'block',

    [themedMinWidth('desktop', theme)]: {
        display: 'inline-block',
    },
}));
