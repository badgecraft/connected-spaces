import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { compose, getContext, withHandlers } from 'recompose';
import { msgid, ngettext, t } from 'ttag';
import styled from '@emotion/styled';
import _get from 'lodash/get';
import List from '../List/ListWithHeading';
import query from './eventBadges.gql';
import { createGraphqlPropsPager } from '../uiPaging';
import Badge from './BadgeClassListItem';
import Link, { toLink } from '../Link';
import { font14A4 } from '../uiFonts';
import Button from '../Button';

const CreateLink = styled(Link)({
    ...font14A4,
    marginLeft:     8,
    textDecoration: 'underline',
});

const NoBadges = styled('div')({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
});

export default compose(
    getContext({ bcWebURL: PropTypes.string.isRequired, paths: PropTypes.shape().isRequired }),
    withHandlers({
        title:       ({ project, id, bcWebURL, paths }) => ({ empty, total }) => !empty && (
            <React.Fragment key="t">
                {ngettext(msgid`${total} badge`, `${total} badges`, total)}
                {_get(project, 'perms.createBadgeClass.value') === 1 && <CreateLink
                    href={toLink({ to: paths.badgecraftProjectEdit, params: { id }, baseURL: bcWebURL })}
                    target="_blank">{t`Edit badges`}</CreateLink>}
            </React.Fragment>
        ),
        renderItem:  ({ paths }) => item => (<Badge key={item.id} item={item} issuePath={paths.activityBadgesIssue} />),
        renderEmpty: ({ project, id, bcWebURL, paths }) => () => (
            <React.Fragment key="e">
                <NoBadges>
                    {t`Sorry there are no badges in this activity`}
                    {' '}
                    {_get(project, 'perms.createBadgeClass.value') === 1 &&
                    <Button
                        type="link"
                        variant="primary"
                        size="smaller"
                        href={toLink({ to: paths.badgecraftProjectEdit, params: { id }, baseURL: bcWebURL })}
                        target="_blank"
                        label={t`Create badges`}
                    />}
                </NoBadges>
            </React.Fragment>
        ),
    }),
    graphql(query, {
        options: {
            errorPolicy: 'all',
        },
        props:   createGraphqlPropsPager({
            resultPath: 'maybeProject.project.badgeClasses',
            initial:    'initial',
        }),
    }),
)(List);
