import React from 'react';
import { compose, withHandlers, lifecycle } from 'recompose';
import styled from '@emotion/styled';
import { msgid, ngettext, t } from 'ttag';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import List from '../../List/ListWithHeading';
import Item from './EvidenceCheckForm';
import query from './projectEvidencesToCheck.gql';
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
    withHandlers({
        title:       () => ({ total, empty }) => (empty
            ? null
            : ngettext(msgid`${total} evidence to check`, `${total} evidences to check`, total)),
        renderItem:  () => item => (<Item key={item.id} item={item} />),
        renderEmpty: () => () => (<Empty>{t`You don't have any evidences to check at the moment`}</Empty>),
    }),
    graphql(query, {
        props: createGraphqlPropsPager({
            resultPath: 'maybeProject.project.tasksToCheck',
            append:     (_, { subscribeToMore }, ownProps) => ({
                watchCheckRequests: () => subscribeToMore({
                    document:    watchRequests,
                    updateQuery: createSubscriptionResultPrepender({
                        resultPath:  'maybeProject.project.tasksToCheck',
                        newItemPath: 'subscriptionData.data.requestedTaskCheck',
                        filter:      item => _get(item, 'badgeClass.projectId') === ownProps.id,
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
