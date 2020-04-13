import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const spinnerKeyframes = keyframes`
    0% {  
      left:0;
    }
    50% {
      left: 100%;
    }
    100% {
      left:0%;
    }
`;


const LineSpinnerRoot = styled('div')(({ height, enabled }) => ({
    width:        '100%',
    // position:     'absolute',
    height,
    visibility:   enabled ? 'visible' : 'hidden',
    marginBottom: height * -1,
    overflowX:    'hidden',
}));

const Spinner = styled('span')(({ height }) => ({
    display:         'block',
    animation:       `${spinnerKeyframes} 1.7s infinite linear`,
    position:        'relative',
    width:           96,
    height,
    backgroundColor: 'rgba(119, 119, 119, 0.2)',
    left:            '50%',
    transform:       'translateX(-50%)',
}));

const LineSpinner = ({ enabled, height, ...props }) => (
    <LineSpinnerRoot enabled={enabled} height={height} {...props}>
        <Spinner height={height} />
    </LineSpinnerRoot>
);

LineSpinner.propTypes = {
    height:  PropTypes.number,
    enabled: PropTypes.bool,
};

LineSpinner.defaultProps = {
    height:  4,
    enabled: true,
};

export default LineSpinner;
