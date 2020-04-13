import React from 'react';
import { compose, withProps } from 'recompose';
import styled from '@emotion/styled';
import _Header from './Header';
import icons from '../Icon/icons';
import IconButton from './IconButton';
import { Colors } from '../Constants';

const Header = styled(_Header)`
    background-color: ${Colors.white};
`;

const Title = styled('span')`
    font-size: 14px;
    font-weight: 500;
    color: #3E3564;
`;

const BackButton = withProps({
    image: icons.back,
    size:  20,
    type:  'link',
})(IconButton);

export default compose(
    withProps(({ title, back }) => ({
        left:     (<BackButton type="link" {...back} />),
        children: (<Title>{title}</Title>),
    }))
)(Header);
