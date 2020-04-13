import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, lifecycle, withContext } from 'recompose';
import styled from '@emotion/styled';
import { msgid, ngettext, t } from 'ttag';
import { graphql } from 'react-apollo';
import List from '../../List/ListWithHeading';
import Item from './EvidenceCheckForm';
import query from './evidencesToCheck.gql';
import { createGraphqlPropsPager, createSubscriptionResultPrepender } from '../../uiPaging';
import { font14A1, font24 } from '../../uiFonts';
import { themedMinWidth } from '../../uiUtils';
import watchRequests from './requestedEvidenceCheckSubscription.gql';

const Empty = styled('div')(({ theme }) => ({
    ...font14A1,
    marginTop: 16,
    color:     '#3E3564',
    textAlign: 'center',

    [themedMinWidth('tablet', theme)]: {
        ...font24,
    },
}));

export default compose(
    withContext({ platforms: PropTypes.arrayOf(PropTypes.string).isRequired }, ({ platforms = [] }) => ({ platforms })),
    withHandlers({
        title:       () => ({ total, empty }) => (empty
            ? null
            : ngettext(msgid`${total} evidence to check`, `${total} evidences to check`, total)),
        renderItem:  () => item => (<Item key={item.id} item={item} />),
        renderEmpty: () => () => (<Empty>{t`You don't have any evidences to check at the moment`}</Empty>),
    }),
    graphql(query, {
        props: createGraphqlPropsPager({
            resultPath: 'me.tasksToCheck',
            append:     (_, { subscribeToMore }) => ({
                watchCheckRequests: () => subscribeToMore({
                    document:    watchRequests,
                    updateQuery: createSubscriptionResultPrepender({
                        resultPath:  'me.tasksToCheck',
                        newItemPath: 'subscriptionData.data.requestedTaskCheck',
                    }),
                }),
            }),
        }),
    }),
    lifecycle({
        componentDidMount() {
            if (typeof this.props.watchCheckRequests === 'function') {
                this.props.watchCheckRequests();
            }
        }
    }),
)(List);
