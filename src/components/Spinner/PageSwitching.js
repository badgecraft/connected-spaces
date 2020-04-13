import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { compose, branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import _get from 'lodash/get';

const loadingKeyframes = keyframes`
    from {left: -200px; width: 30%;}
    50% {width: 30%;}
    70% {width: 70%;}
    80% { left: 50%;}
    95% {left: 120%;}
    to {left: 100%;}
`;

const Root = styled('div')(({ theme }) => ({
    position:        'fixed',
    top:             0,
    right:           0,
    left:            0,
    height:          '4px',
    animation:       `${loadingKeyframes} 2s linear infinite`,
    backgroundColor: _get(theme, 'colors.primary'),
}));

const PageSwitching = () => (<Root />);

export default compose(
    connect(state => ({ loading: _get(state, 'runtime.loading', false) })),
    branch(({ loading }) => !loading, renderNothing),
)(PageSwitching);
