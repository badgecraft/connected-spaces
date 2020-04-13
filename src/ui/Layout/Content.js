import styled from '@emotion/styled';
import { themedMinWidth } from '../uiUtils';

export default styled('div')(({ theme }) => ({
    padding: '16px 12px 16px 12px',

    [themedMinWidth('tablet', theme)]: {
        padding: '16px 0 16px 0',
    },
}));
