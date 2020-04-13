import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import Layout from './PersonalLayout';
import { themedMinWidth, withVisibilityStyle } from '../../ui/uiUtils';
import query from './personalActivities.gql';
import { createGraphqlPropsPager } from '../../ui/uiPaging';
import Events from '../UI/EventList';

const Activities = compose(
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

const Actions = styled('div')({
    margin:    '12px',
    textAlign: 'center',
}, withVisibilityStyle);

const PersonalActivitiesView = ({ initial, action, ...props }) => (
    <Layout {...props} action={action} tab="activities" organisation="">
        <Root>
            <Actions mobileOnly>{action}</Actions>
            <Activities offset={0} variant="control" />
        </Root>
    </Layout>
);

PersonalActivitiesView.propTypes = {
    initial: PropTypes.shape().isRequired,
    action:  PropTypes.node.isRequired,
};

export default PersonalActivitiesView;
