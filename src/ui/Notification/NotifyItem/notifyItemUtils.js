import { compose, branch, renderComponent, mapProps } from 'recompose';
import styled from '@emotion/styled';
import Link from '../../Link';
import { font12 } from '../../uiFonts';

const boldStyle = {
    fontWeight: 'bold'
};

const StyledLink = styled(Link)({
    ...boldStyle,
    textDecoration: 'underline',
});

export const LinkOrBold = compose(
    branch(({ link }) => link, renderComponent(mapProps(({ link, ...props }) => props)(StyledLink))),
)(styled('strong')(boldStyle));

export const Timestamp = styled('span')({
    ...font12,
    color:      '#989898',
    whiteSpace: 'nowrap',
});
