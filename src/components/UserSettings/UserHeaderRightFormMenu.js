import React from 'react';
import PropTypes from 'prop-types';
import { getContext, compose } from 'recompose';
import styled from '@emotion/styled';
import { withVisibilityStyle } from '../../ui/uiUtils';
import TabletRoot from './UserHeaderRightFromTabletMenu';

const Root = styled('div')({ display: 'inline-block' });

const Div = styled('div')(withVisibilityStyle);

const UserHeaderRightFormMenu = ({ viewer, right }) => (
    <Root>
        <Div mobileOnly>{right}</Div>
        <TabletRoot viewer={viewer} />
    </Root>
);

UserHeaderRightFormMenu.propTypes = {
    viewer: PropTypes.shape(),
    right:  PropTypes.node.isRequired,
};

UserHeaderRightFormMenu.defaultProps = {
    viewer: null,
};

export default compose(
    getContext({
        viewer: PropTypes.shape(),
    }),
)(UserHeaderRightFormMenu);
