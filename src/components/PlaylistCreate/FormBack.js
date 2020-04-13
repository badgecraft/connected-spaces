import styled from '@emotion/styled';
import { font16A3 } from '../../ui/uiFonts';
import back from './back.svg';

export default styled('button')({
    ...font16A3,
    lineHeight:  '18px',
    background:  `transparent url("${back}") left center/7px 10px no-repeat`,
    outline:     'none',
    border:      '0 none',
    cursor:      'pointer',
    paddingLeft: 18,
    paddingTop:  2,
});
