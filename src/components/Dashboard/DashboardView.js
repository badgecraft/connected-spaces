import React from 'react';
import PropTypes from 'prop-types';
import { compose, getContext } from 'recompose';
import { graphql } from 'react-apollo';
import { jt, t } from 'ttag';
import styled from '@emotion/styled';
import Layout from './DashboardLayout';
import Events from '../UI/EventList';
import query from './organisationEvents.gql';
import paths from '../../constants/paths';
import Button from '../../ui/Button';
import { createGraphqlPropsPager } from '../../ui/uiPaging';
import { withVisibilityStyle } from '../../ui/uiUtils';

const OrgEvents = compose(
    getContext({ lang: PropTypes.string }),
    graphql(query, {
        props: createGraphqlPropsPager({
            resultPath: 'organisation.projects',
        }),
    })
)(Events);

const Actions = styled('div')({
    margin:    '12px',
    textAlign: 'center',
}, withVisibilityStyle);

// todo check permission before displaying create-event

const DashboardView = ({ organisation, ...props }) => {
    const create = (<Button
        label={t`Create activity`}
        type="link"
        variant="primary"
        to={paths.eventCreateOrganisation}
        params={{ id: organisation }}
    />);

    const quickCreate = (<Button
        key="create"
        label={t`Create activity`}
        type="link"
        variant="primary"
        size="smaller"
        to={paths.eventCreateOrganisation}
        params={{ id: organisation }}
    />);
    return (
        <Layout
            {...props}
            organisation={organisation}
            tab="activities"
            action={create}
        >
            <Actions mobileOnly>
                {create}
            </Actions>
            <OrgEvents
                id={organisation}
                offset={0}
                ml={[0, 0, -4]}
                mr={[0, 0, -4]}
                width={[1, 1, 1 / 2, 1 / 3]}
                noItems={jt`Sorry, there are no activities created in this organisation. ${quickCreate}`}
                variant="control"
            />
        </Layout>
    );
};

DashboardView.propTypes = {
    organisation: PropTypes.string.isRequired,
};

export default DashboardView;
