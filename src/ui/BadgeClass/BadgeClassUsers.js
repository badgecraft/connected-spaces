import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import { ngettext, msgid } from 'ttag';
import List from '../List/ListWithHeading';
import query from './badgeClassUsersQuery.gql';
import { createGraphqlPropsPager } from '../uiPaging';
import Item from './BadgeClassUserItem';

const BadgeClassUsers = compose(
    withHandlers({
        renderItem: () => item => (<Item key={item.id} item={item} />),
        title:      () => ({ loading, total }) => loading && total === 0
            ? null
            : ngettext(msgid`${total} issued badge`, `${total} issued badges`, total),
    }),
    graphql(query, { props: createGraphqlPropsPager({ resultPath: 'maybeBadgeClass.badgeClass.issuedBadges' }) }),
)(List);

BadgeClassUsers.propTypes = {
    id:     PropTypes.string.isRequired,
    offset: PropTypes.number,
};

export default BadgeClassUsers;
