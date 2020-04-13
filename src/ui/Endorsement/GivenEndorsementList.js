import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import { ngettext, msgid } from 'ttag';
import List from '../List/ListWithHeading';
import query from './organisationGivenEndorsements.gql';
import { createGraphqlPropsPager } from '../uiPaging';
import EndorsementItem from './EndorsementItem';

const GivenEndorsementList = compose(
    withHandlers({
        renderItem: () => item => (<EndorsementItem key={item.id} item={item} variant="full" />),
        title:      () => ({ loading, total }) => loading && total === 0
            ? null
            : ngettext(msgid`${total} endorsement`, `${total} endorsements`, total),
    }),
    graphql(query, {
        props: createGraphqlPropsPager({ resultPath: 'maybeOrganisation.organisation.givenEndorsements' }),
    }),
)(List);

GivenEndorsementList.propTypes = {
    id: PropTypes.string.isRequired,
};

export default GivenEndorsementList;
