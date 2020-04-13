import React from 'react';
import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import query from '../../ui/BadgeClass/userBadge.gql';
import View from './UserBadgeView';
import { toLink } from '../../ui/Link';
import { paths } from '../Constants';

export default createAuthAction({ auth: 'optional' })(
    async (context, { id }) => {
        const res = await context.client.query({ query, variables: { id }, errorPolicy: 'all' });
        const userBadge = _get(res, 'data.badge');
        if (!userBadge) {
            return null;
        }

        return {
            chunks:    ['userBadge'],
            title:     userBadge.name,
            component: (<View
                id={id}
                route={action2Route(context)}
                viewer={context.viewer}
                badgeClass={userBadge.badgeClass}
                userBadge={userBadge}
                variant={userBadge.mine ? 'default' : 'userBadge'}
            />),
            meta:      [
                {
                    property: 'og:url',
                    content:  toLink({ to: paths.badgeView, params: context.params, baseURL: context.baseURL }),
                },
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: userBadge.name },
                { property: 'og:description', content: userBadge.description },
                { property: 'og:image', content: toLink({ to: userBadge.picture, baseURL: context.baseURL }) },
            ],
        };
    },
);
