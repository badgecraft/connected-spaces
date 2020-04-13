import { nest } from 'recompose';
import styled from '@emotion/styled';
import Viewport from '../../ui/Layout/Viewport';
import { themedMinWidth } from '../../ui/uiUtils';

const Root = styled('div')(({ theme }) => ({
    marginTop:    16,
    marginBottom: 32,
    padding:      '0 16px',
    width:        '100%',

    [themedMinWidth('tablet', theme)]: {
        padding: 0,
    },
}));

export default nest(Viewport, Root);
