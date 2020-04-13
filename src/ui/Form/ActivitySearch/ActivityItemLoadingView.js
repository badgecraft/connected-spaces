import React from 'react';
import styled from '@emotion/styled';
import { themedMinWidth } from '../../uiUtils';

const Root = styled('div')({
    display:        'flex',
    alignItems:     'center',
    flexDirection:  'row',
    borderBottom:   '1px solid #E5E3ED',
    padding:        '12px 0',
    '&:last-child': {
        borderBottom: '0 none',
    },
});

const Pic = styled('div')(({ theme }) => ({
    width:           92,
    height:          92,
    backgroundColor: '#BDBDBD',
    flexShrink:      0,
    display:         'flex',

    [themedMinWidth('tablet', theme)]: {
        width:  86,
        height: 86,
    },
}));

const Naming = styled('div')({
    flexGrow: 1,
});

const Text = styled('div')(({ theme }) => ({
    backgroundColor: '#BDBDBD',
    height:          19 - 4,
    marginLeft:      8,
    marginBottom:    8,

    [themedMinWidth('tablet', theme)]: {
        height: 21 - 4,
    },
}));

const ActivityItemLoadingView = () => (
    <Root>
        <Pic />
        <Naming>
            <Text />
            <Text />
        </Naming>
    </Root>
);

export default ActivityItemLoadingView;
