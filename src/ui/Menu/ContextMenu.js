import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { branch, compose, renderNothing, withStateHandlers, withHandlers } from 'recompose';
import context from './context.svg';
import { font14A5 } from '../uiFonts';
import { themedMinWidth } from '../uiUtils';
import outsidify from '../Modal/outsidify';
import escapify from '../Modal/escapify';

const Root = styled('div')({
    display:    'inline-block',
    flexShrink: 0,
});

const Toggler = styled('button')(({ icon }) => ({
    verticalAlign: 'middle',
    width:         30,
    height:        30,
    background:    `transparent url("${icon || context}") center center/4px 18px no-repeat`,
    cursor:        'pointer',
    outline:       'none',
    border:        '0 none',
}));

const Anchor = styled('div')(({ zIndex }) => ({
    position: 'relative',
    zIndex,
}));

const Pos = styled('div')({ position: 'absolute', right: 0 });

const Items = styled('div')(({ expanded, theme }) => ({
    height:          expanded ? 'auto' : 0,
    left:            -182,
    overflow:        'hidden',
    boxShadow:       '0 3px 12px 0 rgba(48,6,114,0.11)',
    backgroundColor: '#ffffff',
    borderRadius:    15,
    width:           200,

    [themedMinWidth('tablet', theme)]: {
        left:  -282,
        width: 300,
    },
}));

const Item = styled('button')({
    ...font14A5,
    color:           '#3E3564',
    padding:         '6px 20px',
    backgroundColor: 'transparent',
    border:          '0 none',
    borderBottom:    '1px solid #E5E3ED',
    outline:         'none',
    display:         'block',
    textAlign:       'left',
    width:           '100%',
    cursor:          'pointer',

    '&:first-child': {
        paddingTop: 16,
    },

    '&:last-child': {
        borderBottom:  '0 none',
        paddingBottom: 16,
    },
});

const Icon = styled('span')(({ image }) => ({
    width:         16,
    height:        16,
    display:       'none',
    verticalAlign: 'middle',
    margin:        '0px 8px 0 -8px',
    background:    'transparent none center center/contain no-repeat',
    ...(image && {
        backgroundImage: `url("${image}")`,
        display:         'inline-block',
    }),

}));

const ContextMenu = ({ expanded, setExpanded, items, icon, onClick, toggler, zIndex }) => {
    const toggleElem = (typeof toggler === 'function')
        ? toggler({ icon, onClick })
        : (<Toggler icon={icon} onClick={onClick} type="button" />);
    return (
        <Root>
            {toggleElem}
            <Anchor zIndex={zIndex}>
                <Pos>
                    <Items expanded={expanded}>
                        {items.filter(({ enabled }) => enabled).map(item => (
                            <Item
                                key={item.label}
                                type="button"
                                onClick={() => {
                                    setExpanded(false);
                                    item.onClick();
                                }}><Icon image={item.image} />{item.label}</Item>
                        ))}
                    </Items>
                </Pos>
            </Anchor>
        </Root>
    );
};

ContextMenu.propTypes = {
    expanded:    PropTypes.bool.isRequired,
    setExpanded: PropTypes.func.isRequired,
    items:       PropTypes.arrayOf(PropTypes.shape({
        label:   PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        enabled: PropTypes.bool.isRequired,
        image:   PropTypes.string,
    })).isRequired,
    icon:        PropTypes.string,
    toggler:     PropTypes.func,
    onClick:     PropTypes.func.isRequired,
    zIndex:      PropTypes.number,
};

ContextMenu.defaultProps = {
    icon:    null,
    toggler: null,
    zIndex:  null,
};

export default compose(
    branch(({ items = [] }) => items.filter(({ enabled }) => enabled).length === 0, renderNothing),
    withStateHandlers({ expanded: false }, {
        setExpanded: () => expanded => ({ expanded }),
        onClose:     () => () => ({ expanded: false }),
        onEscape:    () => () => ({ expanded: false }),
    }),
    withHandlers({
        onClick: ({ expanded, setExpanded }) => () => setExpanded(!expanded),
    }),
    outsidify(),
    escapify(),
)(ContextMenu);
