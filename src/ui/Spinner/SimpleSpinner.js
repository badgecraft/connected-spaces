import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const simpleSpinnerKeyframes = keyframes`
    0% {  }
    100% { transform: rotate(360deg); }
`;

const SimpleSpinner = styled.span(({ size = 18 }) => ({
    animation:     `${simpleSpinnerKeyframes} 1s infinite linear`,
    borderRadius:  '50%',
    border:        '2px solid rgba(119, 119, 119, 0.2)',
    borderBottom:  '2px solid rgba(119, 119, 119, 0.8)',
    display:       'inline-block',
    width:         size,
    height:        size,
    verticalAlign: 'middle',

}));

export default SimpleSpinner;
