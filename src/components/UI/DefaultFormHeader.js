import React from 'react';
import PropTypes from 'prop-types';
import { withProps, compose } from 'recompose';
import styled from '@emotion/styled';
import Header from './Header';
import RightMenu from '../UserSettings/UserHeaderRightFormMenu';
import withViewer from '../_helpers/withViewer';
import backIcon from '../Icon/svg2/back_.svg'
import Icon from '../Icon/_Icon';
import { font14A1 } from '../../ui/uiFonts';
import MobileRightMenu from '../UserSettings/UserHeaderRightMobileMenu';

const BackButton = styled('button')({
    ...font14A1,
    lineHeight:      'normal',
    outline:         'none',
    border:          '0 none',
    backgroundColor: 'transparent',
    cursor:          'pointer',
    whiteSpace:      'nowrap',
});

const Title = styled('span')({
    display:       'inline-block',
    verticalAlign: 'middle',
    marginLeft:    8,
    marginTop:     -2,
});

export const Back = ({ title, ...props }) => (
    <BackButton {...props}>
        <Icon image={backIcon} size={16} />
        <Title>{title}</Title>
    </BackButton>
);

Back.propTypes = {
    title: PropTypes.string.isRequired,
};

export default compose(
    withViewer,
    withProps(({ viewer, right, title, onClickBack }) => ({
        left:           (<Back title={title} onClick={onClickBack} />),
        right:          (<RightMenu viewer={viewer} right={<React.Fragment>
            {right}
            <MobileRightMenu loading={false} viewer={viewer} openStyle={{ display: 'none' }} />
        </React.Fragment>} />),
        withMobileLogo: !viewer,
    })),
)(Header);
