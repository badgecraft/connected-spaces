import styled from '@emotion/styled';
import { t } from 'ttag';
import _get from 'lodash/get';
import { mapProps } from 'recompose';
import { minWidthFromProps } from '../uiUtils';

const Button = styled('button')(({ theme }) => ({
    zIndex:                               6000,
    backgroundColor:                      _get(theme, 'colors.primary'),
    color:                                _get(theme, 'colors.textOnPrimary'),
    position:                             'fixed',
    bottom:                               52,
    left:                                 20,
    height:                               60,
    width:                                60,
    borderRadius:                         30,
    borderColor:                          _get(theme, 'colors.primary'),
    fontSize:                             30,
    lineHeight:                           '60px',
    boxShadow:                            '0 3px 12px 0 rgba(48,6,114,0.11)',
    cursor:                               'pointer',
    outline:                              'none',
    textAlign:                            'center',
    padding:                              0,
    margin:                               0,
    transiation:                          'all 200ms',
    '&:hover':                            {
        boxShadow:       '0 3px 12px 0 rgba(48,6,114,0.22)',
        backgroundColor: _get(theme, 'colors.primary'),
    },
    [minWidthFromProps('tablet', theme)]: {
        bottom: 20,
        left:   'unset',
        right:  20,
    },
}));

export default mapProps(({ onOpen, onClose, ...props }) => ({
    ...props,
    onClick:  onOpen,
    title:    t`Click here if you need help or want to report a bug`,
    children: '?',
}))(Button);
