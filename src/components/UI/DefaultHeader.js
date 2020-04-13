import React from 'react';
import { withProps, compose } from 'recompose';
import Header from './Header';
import RightMenu from '../UserSettings/UserHeaderRightMenu';
import LeftMenu from '../UserSettings/UserHeaderLeftMenu';
import withViewer from '../_helpers/withViewer';

export default compose(
    withViewer,
    withProps(({ viewer }) => ({
        left:           (<LeftMenu />),
        right:          (<RightMenu />),
        withMobileLogo: !viewer,
    })),
)(Header);
