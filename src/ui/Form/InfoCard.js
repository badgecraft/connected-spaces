import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Flex, Box } from '@rebass/emotion';
import _get from 'lodash/get';
import { withState } from 'recompose';
import { font18A1, font12, font14A1, font24, font14A3 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';
import chevron from './chevron.svg';

// todo store and retrieve status to/from cookie

const Icon = styled('div')(({ icon }) => ({
    width:              28,
    height:             28,
    backgroundImage:    `url("${icon}")`,
    backgroundPosition: 'center center',
    backgroundRepeat:   'no-repeat',
    margin:             '8px 0',
}));

const Image = styled('div')(({ theme, image }) => ({
    backgroundImage:    `url("${image}")`,
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center center',
    flexShrink:         0,
    width:              296,
    height:             198,
    margin:             '0 auto',

    [themedMinWidth('tablet', theme)]: {
        float: 'right',
    },
}));

const H1 = styled('h1')(({ theme, open }) => ({
    ...font18A1,
    color:      _get(theme, 'colors.primary'),
    transition: 'all 200ms',

    [themedMinWidth('tablet', theme)]: {
        ...font24,
        marginTop: open ? 27 : 0,
    },
}));

const H2 = styled('h2')(() => ({
    color:      '#3E3564',
    ...font14A1,
    lineHeight: '19px',
}));

const Text = styled('p')(({ theme }) => ({
    ...font12,
    margin:  '5px 0 30px 0',
    padding: 0,

    [themedMinWidth('tablet', theme)]: {
        ...font14A3,
    },
}));

const Chevron = styled('button')(({ open }) => ({
    backgroundColor:    'transparent',
    backgroundImage:    `url("${chevron}")`,
    backgroundPosition: 'center center',
    backgroundSize:     '15px 9px',
    backgroundRepeat:   'no-repeat',
    width:              20,
    height:             14,
    display:            'inline-block',
    outline:            'none',
    border:             '0 none',
    cursor:             'pointer',
    transform:          `rotate(${open ? 180 : 0}deg)`,
    transition:         'all 200ms',
}));

const ChevRoot = styled('div')(({ theme }) => ({
    float:     'right',
    marginTop: 0,

    [themedMinWidth('tablet', theme)]: {
        marginTop: 4,
    },
}));

const Root = styled('div')({
    padding:      16,
    boxShadow:    '0 3px 12px 0 rgba(48,6,114,0.07)',
    marginBottom: 16,
});

const HidableBox = styled(Box)(({ open }) => ({
    height:     open ? 'auto' : 0,
    overflow:   'hidden',
    transition: 'all 200ms',
}));

const HidableFlex = styled(Flex)(({ open }) => ({
    height:     open ? 'auto' : 0,
    overflow:   'hidden',
    transition: 'all 200ms',
    // minHeight:  open ? 50 : 0,
}));

const InfoCard = ({ open, setOpen, title, description, image, items = [] }) => (
    <Root>
        <ChevRoot>
            <Chevron type="button" open={open} onClick={() => setOpen(!open)} />
        </ChevRoot>

        <Flex flexWrap="wrap">
            <Box width={[1, 1, 1 / 2]}>
                <H1 open={open}>{title}</H1>
                {open && <Text>{description}</Text>}
            </Box>
            <HidableBox open={open} width={[1, 1, 1 / 2]}>
                <Image image={image} />
            </HidableBox>
        </Flex>

        {items.length > 0 && <HidableFlex flexWrap="wrap" open={open}>
            {items.map(item => (
                <Box key={item.title} width={[1, 1, 1 / items.length]} pr={[0, 0, 3]}>
                    <Icon icon={item.icon} />
                    <H2>{item.title}</H2>
                    <Text>{item.description}</Text>
                </Box>
            ))}
        </HidableFlex>}
    </Root>
);

InfoCard.propTypes = {
    open:    PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,

    title:       PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image:       PropTypes.string.isRequired,
    items:       PropTypes.arrayOf(PropTypes.shape({
        icon:        PropTypes.string.isRequired,
        title:       PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })).isRequired,
};

export default withState('open', 'setOpen', ({ closed }) => !closed)(InfoCard);
