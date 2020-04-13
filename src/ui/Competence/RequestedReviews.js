import React from 'react';
import PropTypes from 'prop-types';
import { compose, getContext, withHandlers, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import { msgid, ngettext, t } from 'ttag';
import List from '../List/ListWithHeadingAndAction';
import query from './requestedReviews.gql'
import { createGraphqlPropsPager } from '../uiPaging';
import Button from '../Button';
import Item from './RequestedReviewItem';

export const DefaultActionButton = withProps({
    variant:    'transparent',
    size:       'smaller',
    underlined: true,
})(Button);

const RequestedReviews = compose(
    getContext({ paths: PropTypes.shape({ eventRequestView: PropTypes.string.isRequired }).isRequired }),
    withHandlers({
        renderItem:   () => item => (<Item key={item.id} item={item} />),
        renderAction: ({ paths, id }) => () => (<DefaultActionButton
            type="link"
            label={t`Invite to review`}
            to={paths.eventRequestView}
            params={{ id }}
            query={{ invite: 1 }}
            disableNextScroll
        />),
        renderTitle:  () => ({ loading, total }) => (loading && total === 0
            ? null
            : ngettext(msgid`${total} review for specific people`, `${total} reviews for specific people`, total)),
    }),
    graphql(query, {
        props: createGraphqlPropsPager({ resultPath: 'competenceReviewRequest.reviews' }),
    }),
)(List);

RequestedReviews.displayName = 'RequestedReviews';

RequestedReviews.propTypes = {
    id:     PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired,
};

export default RequestedReviews;
