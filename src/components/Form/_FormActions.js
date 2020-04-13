import styled from '@emotion/styled';
import { Colors, breakpoints } from '../Constants';
import { themedMinWidth } from '../../ui/uiUtils';

export default styled('div')({
    width:                '100%',
    padding:              8,
    margin:               '16px auto',
    textAlign:            'right',
    display:              'flex',
    justifyContent:       'space-between',
    alignItems:           'center',
    fontWeight:           'bold',
    color:                Colors.heading,
    fontSize:             12,
    lineHeight:           '16px',
    [breakpoints.tablet]: {
        width:      697,
        fontSize:   16,
        lineHeight: '18px',
    },
});

export const FormActionButtons = styled('div')({
    whiteSpace: 'nowrap',
});

export const FormActionStatus = styled('div')(({ theme }) => ({
    [themedMinWidth('tablet', theme)]: {
        paddingRight: 12,
    },
}));
