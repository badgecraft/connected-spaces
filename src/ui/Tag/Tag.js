import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { font12A2, font16A3 } from '../uiFonts';
import remove from './remove.svg';
import { themedMinWidth } from '../uiUtils';
import MaybeLink from '../Link/MaybeLink';

const Root = styled(MaybeLink)(({ theme, fullWidth }) => ({
    ...font12A2,
    display:         fullWidth ? 'block' : 'inline-block',
    backgroundColor: '#F0EFF8',
    borderRadius:    15,
    padding:         '7px 8px 5px',
    lineHeight:      '12px',
    marginRight:     10,
    color:           '#A59FC0',
    overflow:        'hidden',
    textOverflow:    'ellipsis',
    maxWidth:        '100%',
    whiteSpace:      'nowrap',
    marginTop:       1,
    marginBottom:    1,
    textDecoration:  'none',

    '&:last-of-type': {
        marginRight: 'initial',
    },

    [themedMinWidth('tablet', theme)]: {
        ...font16A3,
        lineHeight: '18px',
        padding:    '7px 16px 5px',
    },
}));

const Remove = styled('button')(({ theme }) => ({
    display:            'inline-block',
    verticalAlign:      'middle',
    border:             '1px solid #A59FC0',
    borderRadius:       '50%',
    backgroundColor:    'transparent',
    height:             16,
    width:              16,
    marginTop:          -3,
    marginBottom:       -1,
    outline:            'none',
    backgroundImage:    `url("${remove}")`,
    backgroundRepeat:   'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize:     '6px 6px',
    marginLeft:         6,
    cursor:             'pointer',

    [themedMinWidth('tablet', theme)]: {
        marginTop: -4,
    },
}));

const Tag = ({ label, withHash, prefix, onRemove, fullWidth, ...props }) => {
    const text = `${withHash ? '#' : ''}${label}`;
    return (
        <Root title={text} fullWidth={fullWidth} {...props}>
            {prefix}
            {text}
            {onRemove && <Remove type="button" onClick={onRemove} />}
        </Root>
    );
};

Tag.propTypes = {
    label:     PropTypes.string.isRequired,
    withHash:  PropTypes.bool,
    onRemove:  PropTypes.func,
    prefix:    PropTypes.node,
    fullWidth: PropTypes.bool,
};

Tag.defaultProps = {
    withHash:  true,
    onRemove:  null,
    prefix:    null,
    fullWidth: false,
};

export default Tag;
