import { mapProps } from 'recompose';
import styled from '@emotion/styled';
import { buttonStyle, withoutButtonProps } from './buttonUtils';
import Link from '../Link';

const StyledLink = styled(withoutButtonProps(Link))([
    {
        display:        'inline-block',
        textDecoration: 'none',
        boxSizing:      'border-box',
    },
    ...buttonStyle,
]);

export default mapProps(({ label, ...props }) => ({ children: label, ...props }))(StyledLink);
