import { mapProps } from 'recompose';
import styled from '@emotion/styled';
import { buttonStyle } from './buttonUtils';

export default mapProps(
    ({ label, ...props }) => ({ children: label, ...props }),
)(styled('label')(buttonStyle));
