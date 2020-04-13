import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import { ngettext, msgid, t } from 'ttag';
import List, { DefaultActionButton } from '../List/ListWithHeadingAndAction';
import badgeClassQuery from './badgeClassEndorsementsQuery.gql';
import EndorsementItem from './EndorsementItem';
import Button from '../Button';
import { createGraphqlPropsPager } from '../uiPaging';

const Title = ({ total, loading, onClick }) => {
    if (loading && total === 0) {
        return null;
    }

    return (<React.Fragment>
        {ngettext(msgid`${total} endorsement`, `${total} endorsements`, total)}
        <Button
            variant="transparent"
            type="button"
            size="smaller"
            onClick={onClick}
            label={t`Request endorsement`}
            underlined
        />
    </React.Fragment>);
};

Title.propTypes = {
    total:   PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const Endorsements = compose(
    withHandlers({
        renderItem:   () => item => (<EndorsementItem key={item.id} item={item} />),
        loadNext:     () => () => null,
        renderTitle:  () => ({ loading, total }) => loading && total === 0
            ? null
            : ngettext(msgid`${total} endorsement`, `${total} endorsements`, total),
        renderAction: ({ onOpenEndorsementRequest, canRequest }) => () => canRequest && (<DefaultActionButton
            label={t`Request endorsement`}
            onClick={onOpenEndorsementRequest}
        />),
    }),
    graphql(badgeClassQuery, {
        props: createGraphqlPropsPager({ resultPath: 'maybeBadgeClass.badgeClass.endorsements' })
    }),
)(List);

Endorsements.propTypes = {
    id:                       PropTypes.string.isRequired,
    onOpenEndorsementRequest: PropTypes.func.isRequired,
    canRequest:               PropTypes.bool.isRequired,
};

export default Endorsements;
