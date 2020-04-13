import React from 'react';
import _get from 'lodash/get';
import { t } from 'ttag';
import createAuthAction from '../../core/createAuthAction';
import query from './getNotification.gql';
import mutation from './acceptNotification.gql';
import { toLink } from '../../ui/Link';
import paths from '../../constants/paths';
import { action2Route } from '../../core/utils';
import Layout from '../../components/Layout';
import Error from '../../ui/Error/Error';

const typeSwitcher = (notification) => {
    switch (_get(notification, '__typename')) {
        case 'OrganisationInviteNotification':
            if (_get(notification, 'organisation.long.viewerTeam') === 'owners') {
                return {
                    redirect: toLink({
                        to:     paths.orgDashboard,
                        params: { id: _get(notification, 'organisation.id') }
                    }),
                };
            }
            return {
                redirect: toLink({
                    to:     paths.spaceView,
                    params: { id: _get(notification, 'organisation.id') }
                }),
            };
        case 'ProjectInviteNotification':
            return {
                redirect: toLink({
                    to:     paths.activityView,
                    params: { id: _get(notification, 'project.id') }
                }),
            };
        default:
            return null;
    }
};

export default createAuthAction()(async (context, { id }) => {
    const res = await context.client.query({ query, variables: { id }, errorPolicy: 'all' });
    const notification = _get(res, 'data.maybeNotification.notification', null);
    const error = _get(res, 'data.maybeNotification.error', null);
    if (!notification) {
        if (error === 'permissionDenied' || error === 'Access not allowed') {
            const title = t`Permission denied`;
            return {
                chunks:    ['handleNotify'],
                title,
                component: (<Layout viewer={context.viewer} route={action2Route(context)}>
                    <Error title={title} message={t`Sorry, the link is already used or is for different user`} />
                </Layout>),
                status:    403,
            };
        }
        return null;
    }

    if (notification.handled) {
        return typeSwitcher(notification);
    }

    if (_get(notification, 'perms.handle.value') === 1) {
        const done = await context.client.mutate({
            mutation,
            variables:   { id: _get(notification, 'id') },
            errorPolicy: 'all'
        });

        return typeSwitcher(_get(done, 'data.handleNotification'));
    }

    return null;
});
