import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import { Box, Flex } from '@rebass/emotion';
import { branch, lifecycle, renderComponent, compose } from 'recompose';
import styled from '@emotion/styled';
import { t } from 'ttag';
import DefaultLayout from '../Layout';
import PersonalLayout from '../Dashboard/PersonalLayout';
import Viewport from '../../ui/Layout/Viewport';
import query from '../../ui/BadgeClass/userBadge.gql';
import BadgeClass from '../../ui/BadgeClass/BadgeClass';
import Details from '../../ui/Project/DetailBox';
import BadgeDetails from './BadgeDetailsView';
import badgeClassSubscription from '../../ui/BadgeClass/badgeClassSubscription.gql';
import Link from '../../ui/Link';
import back from './back.svg';
import { paths } from '../Constants';

const Layout = branch(({ tab }) => !!tab, renderComponent(PersonalLayout))(DefaultLayout);

const BackLink = styled(Link)({
    display:     'flex',
    alignItems:  'center',
    background:  `transparent url("${back}") left center/12px 12px no-repeat`,
    paddingLeft: 18,
});

const UserBadgeView = ({ badgeClass, userBadge, variant, ...props }) => (
    <Layout {...props}>
        <Viewport>
            {_get(userBadge, 'mine') && <Box pt={3} px={2}>
                <BackLink to={paths.personalDashboardBadges}>{t`Back to my  badges`}</BackLink>
            </Box>}

            <Flex flexWrap="wrap">
                <Box width={[1, 1, 2 / 3]} pr={[0, 0, 4]}>
                    <Details>
                        <BadgeClass badgeClass={badgeClass} userBadge={userBadge} variant={variant} />
                    </Details>
                </Box>
                <Box width={[1, 1, 1 / 3]}>
                    <BadgeDetails badgeClass={badgeClass} userBadge={userBadge} />
                </Box>
            </Flex>

        </Viewport>
    </Layout>
);

UserBadgeView.propTypes = {
    badgeClass: PropTypes.shape({}),
    userBadge:  PropTypes.shape({
        mine: PropTypes.bool.isRequired,
    }),
    variant:    PropTypes.oneOf(['default', 'userBadge']),
};

UserBadgeView.defaultProps = {
    badgeClass: null,
    userBadge:  null,
    variant:    'default',
};

export default compose(
    graphql(query, {
        props: ({ data: { subscribeToMore, ...data }, ownProps: { badgeClass, userBadge } }) => ({
            badgeClass:      _get(data, 'badge.badgeClass', badgeClass),
            userBadge:       _get(data, 'badge', userBadge),
            watchBadgeClass: () => badgeClass && subscribeToMore({
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
)(UserBadgeView);
