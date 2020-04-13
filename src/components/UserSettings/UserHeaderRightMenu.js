import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { getContext, compose } from 'recompose';
import TabletRoot from './UserHeaderRightFromTabletMenu';
import MobileRoot from './UserHeaderRightMobileMenu';

const Root = styled('div')({
    display: 'inline-block',
    color:   '#3E3564',
});

const openStyle = {
    backgroundColor: '#666666',
    width:           31,
    height:          31,
    borderRadius:    16,
    padding:         0,
};

const UserHeaderRightMenu = ({ viewer, contextOrganisation, loading }) => (
    <Root>
        <MobileRoot viewer={viewer} organisationId={contextOrganisation} loading={loading} openStyle={openStyle} />
        <TabletRoot viewer={viewer} />
    </Root>
);

UserHeaderRightMenu.propTypes = {
    viewer:              PropTypes.shape({}),
    contextOrganisation: PropTypes.string,
    loading:             PropTypes.bool,
};

UserHeaderRightMenu.defaultProps = {
    viewer:              null,
    contextOrganisation: null,
    loading:             false,
};

export default compose(
    getContext({
        contextOrganisation: PropTypes.string,
        viewer:              PropTypes.shape(),
    }),
)(UserHeaderRightMenu);
