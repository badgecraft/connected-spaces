import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderNothing, lifecycle, withState } from 'recompose';
import styled from '@emotion/styled';
import { font12 } from '../uiFonts';

const Root = styled('span')({
    ...font12,
    marginLeft: 8,
});

const View = ({ message, ...props }) => (
    <Root {...props}>{message}</Root>
);

View.propTypes = {
    message: PropTypes.string.isRequired,
};

const LocalFlashMessage = compose(
    withState('enabled', 'setEnabled', true),
    branch(({ enabled }) => !enabled, renderNothing),
    lifecycle({
        componentDidMount() {
            this.timer = setTimeout(() => this.props.setEnabled(false), 5000);
        },
        componentWillUnmount() {
            clearTimeout(this.timer);
        }
    })
)(View);

export default LocalFlashMessage;
