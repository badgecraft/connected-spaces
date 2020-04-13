import styled from '@emotion/styled';
import { minWidthFromProps } from '../uiUtils';

export default styled('form')(({ theme }) => ({
    border:                                '0 none',
    margin:                                '8px auto',
    width:                                 '100%',
    padding:                               0,
    [minWidthFromProps('tablet', theme)]:  {
        padding: '16px 16px 0 16px',
        width:   theme.breakpointWidths.tablet,
    },
    [minWidthFromProps('desktop', theme)]: {
        width: theme.breakpointWidths.desktop,
    },
}))
