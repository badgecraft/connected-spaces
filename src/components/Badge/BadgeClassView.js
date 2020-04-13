import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import { Box, Flex } from '@rebass/emotion';
import { compose, getContext, lifecycle } from 'recompose';
import styled from '@emotion/styled';
import Layout from '../Layout';
import Viewport from '../../ui/Layout/Viewport';
import BadgeClass from '../../ui/BadgeClass/BadgeClass';
import query from '../../ui/BadgeClass/badgeClass.gql';
import Details from '../../ui/Project/DetailBox';
import Link, { toLink } from '../../ui/Link';
import { paths } from '../Constants';
import back from './back.svg';
import BadgeDetails from './BadgeDetailsView';
import badgeClassSubscription from '../../ui/BadgeClass/badgeClassSubscription.gql';

const ProjectLink = styled(Link)({
    display:     'flex',
    alignItems:  'center',
    background:  `transparent url("${back}") left center/12px 12px no-repeat`,
    paddingLeft: 18,
});

const BadgeClassView = ({ projectId, badgeClass, project, badgeClassTab, bcWebURL, openCriterion, ...props }) => (
    <Layout {...props}>
        <Viewport>
            <Box pt={3} px={2}>
                <ProjectLink to={paths.activityBadges} params={{ id: projectId }}>
                    {project.name}
                </ProjectLink>
            </Box>
            <Flex flexWrap="wrap">
                <Box width={[1, 1, 2 / 3]} pr={[0, 0, 4]}>
                    <Details>
                        <BadgeClass
                            badgeClass={badgeClass}
                            userBadge={badgeClass.userBadge}
                            badgeClassTab={badgeClassTab}
                            createBadgeClassEditHref={bc => toLink({
                                to:      paths.badgecraftProjectEdit,
                                params:  { id: bc.projectId },
                                baseURL: bcWebURL,
                            })}
                            openCriterion={openCriterion}
                        />
                    </Details>
                </Box>
                <Box width={[1, 1, 1 / 3]}>
                    <BadgeDetails badgeClass={badgeClass} />
                </Box>
            </Flex>
        </Viewport>
    </Layout>
);

BadgeClassView.propTypes = {
    badgeClass:    PropTypes.shape({
        id:        PropTypes.string.isRequired,
        userBadge: PropTypes.shape(),
    }).isRequired,
    project:       PropTypes.shape({
        id:      PropTypes.string.isRequired,
        name:    PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    }).isRequired,
    projectId:     PropTypes.string.isRequired,
    badgeClassTab: PropTypes.string.isRequired,
    bcWebURL:      PropTypes.string.isRequired,
    openCriterion: PropTypes.string,
};

BadgeClassView.defaultProps = {
    openCriterion: null,
};

export default compose(
    getContext({
        bcWebURL: PropTypes.string.isRequired,
    }),
    graphql(query, {
        props: ({ data: { subscribeToMore, ...data }, ownProps: { badgeClass } }) => ({
            badgeClass:      _get(data, 'maybeBadgeClass.badgeClass', badgeClass),
            watchBadgeClass: () => subscribeToMore({
                document:  badgeClassSubscription,
                variables: { id: badgeClass.id },
            }),
        }),
    }),
    lifecycle({
        componentDidMount() {
            if (typeof this.props.watchBadgeClass === 'function') {
                this.props.watchBadgeClass();
            }
        }
    }),
)(BadgeClassView);
