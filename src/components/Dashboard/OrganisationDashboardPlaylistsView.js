import React from 'react';
import PropTypes from 'prop-types';
import { compose, getContext } from 'recompose';
import { graphql } from 'react-apollo';
import { t, jt } from 'ttag';
import styled from '@emotion/styled';
import Layout from './DashboardLayout';
import Events from '../UI/EventList';
import query from './organisationPlaylists.gql';
import paths from '../../constants/paths';
import Button from '../../ui/Button';
import { createGraphqlPropsPager } from '../../ui/uiPaging';
import { withVisibilityStyle } from '../../ui/uiUtils';

// todo playlist item view, links to playlists not events
const OrgPlaylists = compose(
    getContext({ lang: PropTypes.string }),
    graphql(query, {
        props: createGraphqlPropsPager({
            resultPath: 'organisation.projects',
        }),
    })
)(Events);

// todo check permission before displaying create button

const Actions = styled('div')({
    margin:    '12px',
    textAlign: 'center',
}, withVisibilityStyle);

const OrganisationDashboardPlaylistsView = ({ organisation, ...props }) => {
    const create = (<Button
        label={t`Create playlist`}
        type="link"
        variant="primary"
        to={paths.playlistCreateOrganisation}
        params={{ id: organisation }}
    />);
    const quickCreate = (<Button
        key="create"
        label={t`Create playlist`}
        type="link"
        variant="primary"
        size="smaller"
        to={paths.playlistCreateOrganisation}
        params={{ id: organisation }}
    />);
    return (
        <Layout
            {...props}
            organisation={organisation}
            tab="playlists"
            action={create}
        >
            <Actions mobileOnly>{create}</Actions>
            <OrgPlaylists
                offset={0}
                id={organisation}
                ml={[0, 0, -4]}
                mr={[0, 0, -4]}
                width={[1, 1, 1 / 2, 1 / 3]}
                noItems={jt`Sorry, there are no playlsits created in this organisation. ${quickCreate}`}
                variant="control"
            />
        </Layout>
    );
};

OrganisationDashboardPlaylistsView.propTypes = {
    organisation: PropTypes.string.isRequired,
};

export default OrganisationDashboardPlaylistsView;
