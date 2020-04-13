import React from 'react';
import { t } from 'ttag';
import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import homeQuery from './home.gql';
import Home from './HomeDashboard';
import { action2Route } from '../../core/utils';
import { toLink } from '../../components/Link';
import { paths } from '../../components/Constants';

async function action(context) {
    const { client, viewer, lang } = context;
    const result = await client.query({
        query:     homeQuery,
        variables: { lang },
        options:   () => ({ errorPolicy: 'all' }),
    });
    const title = _get(result, 'data.site.title', t`Home`);
    const description = _get(result, 'data.site.description');
    const cover = _get(result, 'data.site.coverUrl') || _get(result, 'data.site.logoUrl');
    const meta = [
        { property: 'og:url', content: toLink({ to: paths.home, baseURL: context.baseURL }) },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        description && { property: 'og:description', content: description },
        cover && {
            property: 'og:image',
            content:  toLink({ to: cover, baseURL: context.baseURL }),
        },
    ].filter(item => item);

    return {
        chunks:    ['home'],
        title,
        component: (<Home viewer={viewer} route={action2Route(context)} />),
        meta,
    };
}

export default createAuthAction({ auth: 'optional' })(action);
