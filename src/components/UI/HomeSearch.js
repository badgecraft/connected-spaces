import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rebass/emotion';
import styled from '@emotion/styled';
import _Search from '../Form/Search';
import Map from './MapWithCard';
import { themedMaxWidth, themedMinWidth } from '../../ui/uiUtils';

const Search = styled(_Search)(({ theme }) => ({
    [themedMinWidth('mobile', theme)]: {
        position:     'absolute',
        width:        '80%',
        marginLeft:   '10%',
        marginTop:    -40,
        marginBottom: 40,
    },
}));

const SearchBox = styled('div')(({ theme }) => ({
    [themedMinWidth('tablet', theme)]: {
        position: 'relative',
    },
}));

const MapArea = styled('div')(({ theme }) => ({
    minHeight:                         400,
    [themedMaxWidth('mobile', theme)]: {
        display: 'none',
    },
}));

const Cover = styled('div')(({ coverUrl, theme }) => ({
    height:     400,
    background: `transparent url("${coverUrl}") center center/cover no-repeat`,
    margin:     '-16px -16px 16px -16px',

    [themedMinWidth('mobile', theme)]: {
        marginTop: 0,
    },

    [themedMinWidth('tablet', theme)]: {
        margin: 0,
    },
}));

const HomeSearch = ({ coverUrl, mapType, ...props }) => (
    <Box mx={[3, 0, 0]} my={[3, 0]}>
        {mapType === 'cover'
            ? (<Cover coverUrl={coverUrl} />)
            : (<MapArea><Map {...props} /></MapArea>)
        }
        <SearchBox><Search variant="large" /></SearchBox>
    </Box>
);

HomeSearch.propTypes = {
    coverUrl: PropTypes.string,
    mapType:  PropTypes.oneOf(['map', 'cover']).isRequired,
};

HomeSearch.defaultProps = {
    coverUrl: null,
};

export default HomeSearch;
