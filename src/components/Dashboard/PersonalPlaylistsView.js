import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import Layout from './PersonalLayout';
import { themedMinWidth } from '../../ui/uiUtils';
import query from './personalPlaylists.gql';
import { createGraphqlPropsPager } from '../../ui/uiPaging';
import Events from '../UI/EventList';

const Playlists = compose(
    graphql(query, {
        props: createGraphqlPropsPager({
            resultPath: 'me.projects',
            initial:    'initial',
        }),
    }),
)(Events);

const Root = styled('div')(({ theme }) => ({
    marginTop:    16,
    marginBottom: 32,
    padding:      '0 16px',

    [themedMinWidth('tablet', theme)]: {
        padding: 0,
    },
}));

const PersonalPlaylistsView = ({ initial, ...props }) => (
    <Layout {...props} tab="playlists" organisation="">
        <Root>
            <Playlists offset={0} variant="control" />
        </Root>
    </Layout>
);

PersonalPlaylistsView.propTypes = {
    initial: PropTypes.shape().isRequired,
};

export default PersonalPlaylistsView;
