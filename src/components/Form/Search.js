import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _pick from 'lodash/pick';
import _omit from 'lodash/omit';
import { t } from 'ttag';
import _get from 'lodash/get';
import { Colors } from '../Constants';
import searchSmall from '../Icon/svg2/SearchSmall.svg';
import searchBig from '../Icon/svg2/SearchBig.svg';
import Icon from '../Icon/_Icon';
import paths from '../../constants/paths';
import { themedMinWidth } from '../../ui/uiUtils';

const Form = styled('form')({
    position:     'relative',
    boxShadow:    '0 3px 12px 0 rgba(48,6,114,0.11)',
    borderRadius: 10,
});

const Input = styled('input')(({ variant, theme }) => ({
    height:                        48,
    width:                         '100%',
    padding:                       '0 48px 0 49px',
    border:                        '0 none',
    boxSizing:                     'border-box',
    outline:                       'none',
    backgroundImage:               `url("${searchSmall}")`,
    backgroundRepeat:              'no-repeat',
    backgroundPosition:            '8px center',
    fontSize:                      16,
    borderRadius:                  10,
    color:                         '#484848',
    '::-webkit-input-placeholder': {
        color: Colors.eventSecondary,
    },
    '::-moz-placeholder':          {
        color: Colors.eventSecondary,
    },
    ':-ms-input-placeholder':      {
        color: Colors.eventSecondary,
    },
    ':-moz-placeholder':           {
        color: Colors.eventSecondary,
    },
    ...(variant === 'large' && {
        [themedMinWidth('tablet', theme)]: {
            height:             80,
            fontSize:           24,
            lineHeight:         '39px',
            backgroundSize:     '18px 18px',
            paddingLeft:        71,
            paddingRight:       81,
            backgroundPosition: '26px center',
        },
    })
}));

const SearchButton = styled('button')(({ variant, theme }) => ({
    height:                  48,
    width:                   48,
    position:                'absolute',
    right:                   0,
    top:                     0,
    textAlign:               'center',
    lineHeight:              '48px',
    overflow:                'hidden',
    border:                  '0 none',
    backgroundColor:         _get(theme, 'colors.primary'),
    color:                   Colors.white,
    fontWeight:              300,
    cursor:                  'pointer',
    borderTopRightRadius:    10,
    borderBottomRightRadius: 10,
    ...(variant === 'large' && {
        [themedMinWidth('tablet', theme)]: {
            height: 80,
            width:  80,
        },
    })
}));

const Search = ({ variant, ...props }) => (
    <Form method="GET" action={paths.opportunities} {..._pick(props, 'className')}>
        <Input variant={variant} id="q" name="q" placeholder={t`Try programming`} {..._omit(props, 'className')} />
        <SearchButton type="submit" variant={variant}>
            <Icon image={searchBig} size={variant === 'large' ? [13, 26] : 13} />
        </SearchButton>
    </Form>
);

Search.propTypes = {
    variant: PropTypes.oneOf(['default', 'large']),
};

Search.defaultProps = {
    variant: 'default',
};

export default Search;
