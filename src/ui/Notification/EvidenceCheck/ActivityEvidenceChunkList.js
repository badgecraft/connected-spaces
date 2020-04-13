import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import { ngettext, msgid, t } from 'ttag';
import { Flex } from '@rebass/emotion';
import styled from '@emotion/styled';
import List from '../../List/ListWithHeading';
import query from './activityEvidenceChunks.gql';
import { createGraphqlPropsPager } from '../../uiPaging';
import Item from './EvidenceChunkItem';
import { font14A1, font24 } from '../../uiFonts';
import { themedMinWidth } from '../../uiUtils';

const Empty = styled('div')(({ theme }) => ({
    ...font14A1,
    marginTop: 16,
    color:     '#3E3564',
    textAlign: 'center',

    [themedMinWidth('tablet', theme)]: {
        ...font24,
    },
}));

const ActivityEvidenceChunkList = compose(
    withHandlers({
        title:       () => ({ total, empty }) => empty
            ? null
            : ngettext(
                msgid`${total} evidence in history`,
                `${total} evidences in history`,
                total,
            )
        ,
        renderItem:  ({ badgeClassViewPath }) => item => (
            <Item key={item.id} item={item} badgeClassViewPath={badgeClassViewPath} />
        ),
        renderEmpty: () => () => (<Empty>{t`Your users must first create some evidence`}</Empty>),
        renderItems: () => content => (<Flex flexWrap="wrap" mx={[-3, 0]}>{content}</Flex>)

    }),
    graphql(query, {
        props: createGraphqlPropsPager({
            resultPath: 'maybeProject.project.evidenceChunks',
        }),
    })
)(List);

ActivityEvidenceChunkList.propTypes = {
    badgeClassViewPath: PropTypes.string.isRequired,
};

export default ActivityEvidenceChunkList;
