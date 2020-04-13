import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { font14A4 } from '../uiFonts';
import Link from '../Link';

const Root = styled('div')({
    padding:        16,
    borderBottom:   '1px solid #E5E3ED',
    '&:last-child': {
        borderWidth: 0,
    },
});

const Item = styled(Link)(({ icon }) => ({
    ...font14A4,
    color:              '#3E3564',
    display:            'block',
    backgroundImage:    `url("${icon}")`,
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center left',
    backgroundSize:     '15px 15px',
    paddingLeft:        25,
    lineHeight:         '38px',
}));

const MenuList = ({ items }) => (
    <Root>
        {items.map(({ label, enabled, ...item }) => (<Item key={label} {...item}>{label}</Item>))}
    </Root>
);

MenuList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        icon:  PropTypes.string.isRequired,
    })).isRequired,
};

export default MenuList;
