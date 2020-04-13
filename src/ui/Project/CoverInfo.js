import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { themedMinWidth } from '../uiUtils';
import Viewport from '../Layout/Viewport';
import { font18A1, font24A2 } from '../uiFonts';

const Root = styled('div')(({ theme, displayOnMobile }) => ({
    ...(!displayOnMobile && { display: 'none' }),

    [themedMinWidth('tablet', theme)]: {
        height:         332,
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'space-between',
        zIndex:         100,
        position:       'relative',
        top:            -332,
        marginBottom:   -332,
        paddingBottom:  26,
        paddingTop:     13,
    },
}));

const CoverControl = styled('div')(({ theme }) => ({
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'flex-end',
    padding:        '0 20px',
    height:         '100%',
    color:          '#ffffff',
    flexDirection:  'column',

    [themedMinWidth('tablet', theme)]: {
        flexDirection: 'row',
    },
}));

export const CoverName = styled('h1')(({ theme }) => ({
    ...font18A1,
    color:  '#3E3564',
    margin: '12px 0',

    [themedMinWidth('tablet', theme)]: {
        ...font24A2,
        margin: 0,
        color:  '#ffffff',
    },
}));

export const CoverExta = styled('div')(({ theme }) => ({
    display: 'none',

    [themedMinWidth('tablet', theme)]: {
        display: 'block',
    },
}));

const Details = styled('div')({});

const Action = styled('div')({
    whiteSpace:    'nowrap',
    display:       'flex',
    flexDirection: 'row',
    alignItems:    'center',
});

const CoverInfo = ({ details, action, ...props }) => (
    <Viewport>
        <Root {...props}>
            <CoverControl>
                <Details>{details}</Details>
                <Action>{action}</Action>
            </CoverControl>
        </Root>
    </Viewport>
);

CoverInfo.propTypes = {
    details: PropTypes.node,
    action:  PropTypes.node,
};

CoverInfo.defaultProps = {
    details: null,
    action:  null,
};

export default CoverInfo;
