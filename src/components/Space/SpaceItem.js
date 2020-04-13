import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rebass/emotion';
import styled from '@emotion/styled';
import _Link from '../Link';
import { paths, breakpoints } from '../Constants';
import { viewProps } from '../UI/_utils';

const Link = styled(_Link)({
    display:                 'block',
    width:                   '100%',
    lineHeight:              '34px',
    [breakpoints.mobileMax]: {
        whiteSpace:   'nowrap',
        overflow:     'hidden',
        textOverflow: 'ellipsis',
    },
});

const Root = styled(Box)({
    borderBottom:         '1px solid #E5E3ED',
    [breakpoints.mobile]: {
        textAlign: 'center',
    },
});

const Pic = styled('span')(({ src }) => ({
    display:              'inline-box',
    width:                34,
    height:               34,
    verticalAlign:        'middle',
    backgroundImage:      `url("${src}")`,
    backgroundPosition:   'center center',
    backgroundSize:       'contain',
    marginRight:          8,
    [breakpoints.mobile]: {
        width:  120,
        height: 120,
    },
}));

const Name = styled('span')({
    [breakpoints.mobile]: {
        display: 'block',
    },
});

const SpaceItem = ({ item: { id, name, picture }, ...props }) => (
    <Root width={[1, 1 / 2, 1 / 4]} py={2} px={2} {...viewProps(props)}>
        <Link to={paths.spaceView} params={{ id }}>
            <Pic src={picture} />
            <Name>{name}</Name>
        </Link>
    </Root>
);

SpaceItem.propTypes = {
    item: PropTypes.shape({
        id:      PropTypes.string.isRequired,
        name:    PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    }).isRequired,
};

export default SpaceItem;
