import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import { ngettext, msgid, t } from 'ttag';
import Layout from './PersonalLayout';
import { themedMinWidth } from '../../ui/uiUtils';
import query from '../../ui/Badge/personalBadges.gql';
import { createGraphqlPropsPager } from '../../ui/uiPaging';
import List from '../../ui/List/ListWithHeading';
import Badge from '../../ui/Badge/BadgeListItem';

const Badges = compose(
    withHandlers({
        renderItem:  () => (item) => (<Badge key={item.id} item={item} />),
        renderEmpty: () => () => t`Sorry, you don't have any badges yet`,
        title:       () => ({ total, empty }) => empty
            ? null
            : ngettext(msgid`${total} badge`, `${total} badges`, total),
    }),
    graphql(query, {
        props: createGraphqlPropsPager({
            resultPath: 'me.badges',
            initial:    'initial',
        }),
    }),
)(List);

const Root = styled('div')(({ theme }) => ({
    marginTop:    16,
    marginBottom: 32,
    padding:      '0 16px',

    [themedMinWidth('tablet', theme)]: {
        padding: 0,
    },
}));

const PersonalBadgesView = ({ initial, ...props }) => (
    <Layout {...props} tab="badges" organisation="">
        <Root>
            <Badges offset={0} />
        </Root>
    </Layout>
);

PersonalBadgesView.propTypes = {
    initial: PropTypes.shape().isRequired,
};

export default PersonalBadgesView;
