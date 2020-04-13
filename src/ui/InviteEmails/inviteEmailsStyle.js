import styled from '@emotion/styled';
import { themedMinWidth } from '../uiUtils';

export const Actions = styled('div')(({ theme }) => ({
    textAlign: 'center',
    display:   'flex',

    '& > *': {
        marginLeft: 8,
    },

    [themedMinWidth('tablet', theme)]: {
        textAlign: 'right',
    },
}));

export const ActionsInfo = styled('div')({
    flexGrow:       1,
    alignItems:     'center',
    justifyContent: 'flex-end',
    display:        'flex',
});

export const RootB = styled('div')({
    display:        'flex',
    alignItems:     'flex-start',
    justifyContent: 'center',
    marginBottom:   8,
    width:          '100%',
});

export const EmailB = styled('div')({
    flex: '4 0'
    // paddingRight: 8,
});

export const TeamB = styled('div')({
    flex:       '1 0',
    marginLeft: 8,
});

export const ActionsB = styled('div')({
    width:         40,
    flex:          '0 0 40px',
    verticalAlign: 'middle',
    paddingTop:    9,
});
