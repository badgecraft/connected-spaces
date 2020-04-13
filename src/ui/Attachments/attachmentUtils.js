import styled from '@emotion/styled';
import _get from 'lodash/get';

export const isImage = ({ type }) => type && type.indexOf('image/') === 0;

export const ItemControl = styled('div')(({ theme }) => ({
    width:      128,
    height:     128,
    position:   'absolute',
    textAlign:  'right',
    visibility: 'hidden',

    'button, a': {
        color:       _get(theme, 'colors.primary'),
        fontSize:    20,
        lineHeight:  '20px',
        marginRight: 6,
        display:     'inline-block',

        '&:hover': {
            color: '#ffffff',
        },
    },
}));

export const ItemRoot = styled('div')(({ onClick }) => ({
    width:       128,
    height:      128,
    overflow:    'hidden',
    display:     'inline-block',
    marginRight: 8,
    marginBottom: 8,
    cursor:      onClick ? 'pointer' : 'default',

    '&:last-of-type': {
        marginRight: 0,
    },

    '*': {
        boxSizing: 'border-box',
    },

    '&:hover': {
        [`${ItemControl}`]: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            visibility:      'visible',
        },
    }
}));

export const isUploadInProgress = ({ status }) => ['started', 'uploading'].indexOf(status) !== -1;

export const isUploadFailed = ({ status }) => status === 'failed';

export const isUploadStarted = ({ status }) => status === 'started';

export const ErrorRoot = styled('div')(({ theme }) => ({
    margin: '0 16px',
    color:  _get(theme, 'colors.error'),
}));
