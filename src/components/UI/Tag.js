import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import _Icon, { icons } from '../Icon/_Icon'
import Link from '../Link';
import { breakpoints, paths } from '../Constants';
import { font12A1, font20A1 } from '../../ui/uiFonts';
import { categoryItemStyle } from './CategoryItem';

const rootStyle = ({ dark, variant = 'default', ...other }) => {
    if (variant === 'category') {
        return categoryItemStyle(other);
    }

    return {
        ...font12A1,
        display:              'inline-block',
        height:               25,
        lineHeight:           '25px',
        borderRadius:         13,
        backgroundColor:      '#F0EFF8',
        padding:              '0 15px',
        margin:               5,
        color:                dark ? '#484848' : '#A59FC0',
        whiteSpace:           'nowrap',
        overflow:             'hidden',
        textOverflow:         'ellipsis',
        textDecoration:       'none',
        // boxShadow:            '0 2px 16px 0 #ECECEC', // todo looks strange, but this is design css
        [breakpoints.mobile]: {
            ...font20A1,
            height:       60,
            lineHeight:   '60px',
            borderRadius: 30,
            padding:      '0 35px',
        },
    };
};

const RootLink = styled(Link)(rootStyle);
const RootDiv = styled('div')(rootStyle);

const Icon = styled(_Icon)({
    marginTop:   '-2px',
    marginLeft:  '4px',
    marginRight: '4px',
    lineHeight:  '12px',
    cursor:      'pointer',
});

const Tag = ({ onRemove, children, dark, id, variant }) => {
    const icon = onRemove && (<Icon onClick={onRemove} size={10} image={icons.close} />);
    if (!id) {
        return (<RootDiv variant={variant} dark={dark}>{children}{icon}</RootDiv>)
    }

    return (
        <RootLink
            variant={variant}
            to={paths.opportunitiesWithSkill}
            params={{ id }}
            dark={dark}
        >{children}{icon}</RootLink>
    );
};

Tag.propTypes = {
    onRemove: PropTypes.func,
    children: PropTypes.node.isRequired,
    dark:     PropTypes.bool,
    id:       PropTypes.string,
    variant:  PropTypes.oneOf(['default', 'category']),
};

Tag.defaultProps = {
    onRemove: null,
    dark:     false,
    id:       null,
    variant:  'default',
};

export default Tag;
