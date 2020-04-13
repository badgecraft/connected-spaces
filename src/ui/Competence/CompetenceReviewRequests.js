import React from 'react';
import PropTypes from 'prop-types';
import { compose, getContext, withHandlers, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import { ngettext, msgid } from 'ttag';
import List from '../List/ListWithHeadingAndAction';
import query from './projectCompetenceReviewRequests.gql';
import { createGraphqlPropsPager } from '../uiPaging';
import ItemView from './CompetenceReviewRequestItem';
import withCompetenceReviewRequest from './withCompetenceReviewRequest';

const Item = compose(
    getContext({ pushRoute: PropTypes.func.isRequired }),
    withProps(({ item }) => ({ id: item.id })),
    withCompetenceReviewRequest,
)(ItemView);

const CompetenceReviewRequests = compose(
    withHandlers({
        renderItem:  ({ requestViewPath, reviewStartPath }) => item => (<Item
            key={item.id}
            item={item}
            requestViewPath={requestViewPath}
            reviewStartPath={reviewStartPath}
        />),
        renderTitle: () => ({ loading, total }) => loading && total === 0
            ? null
            : ngettext(msgid`${total} request`, `${total} requests`, total),
    }),
    graphql(query, {
        props: createGraphqlPropsPager({ resultPath: 'maybeProject.project.reviewRequests' })
    }),
)(List);

CompetenceReviewRequests.propTypes = {
    id:              PropTypes.string.isRequired,
    model:           PropTypes.string.isRequired,
    requestViewPath: PropTypes.string.isRequired,
};

export default CompetenceReviewRequests;
