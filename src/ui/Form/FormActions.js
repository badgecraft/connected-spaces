import styled from '@emotion/styled';
import _get from 'lodash/get';
import { minWidthFromProps, maxWidthFromProps } from '../uiUtils';

export default styled('div')(({ bottomSticky, theme }) => ({
    width:          '100%',
    padding:        8,
    margin:         '16px auto',
    textAlign:      'right',
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'center',
    fontWeight:     'bold',
    color:          _get(theme, 'colors.form.text', '#3E3564'),
    fontSize:       12,
    lineHeight:     '16px',

    ...(bottomSticky && {
        [maxWidthFromProps('tablet', theme)]: {
            position:        'fixed',
            bottom:          0,
            left:            0,
            right:           0,
            backgroundColor: '#ffffff',
            boxShadow:       '0 3px 12px 0 rgba(48,6,114,0.11)',
            margin:          0,
            zIndex:          2000,
            height:          '74px',
        },
    }),

    [minWidthFromProps('tablet', theme)]: {
        width:      697,
        fontSize:   16,
        lineHeight: '18px',
    },
}));
