import React from 'react';
import _get from 'lodash/get';
import { t } from 'ttag';
import SpaceView from '../../components/Space/SpaceView';
import Layout from '../../components/Layout';
import createAuthAction from '../../core/createAuthAction';
import getOrganisationQuery from './getOrganisation.gql';
import { setActiveOrganisation } from '../../actions/runtime';
import { toLink } from '../../components/Link';
import { paths } from '../../components/Constants';
import { pushFlashMessage } from '../../ui/Flash/flashReducer';

async function action({ client, viewer, store, path, params, baseURL, lang, query }, { id }) {
    const { data } = await client.query({ query: getOrganisationQuery, variables: { id, lang }, errorPolicy: 'all' });
    const organisation = _get(data, 'maybeOrganisation.organisation', null);
    if (!organisation) {
        // todo read error unauthorized/perm denied
        return null;
    }
    const { name } = organisation;
    store.dispatch(setActiveOrganisation({ id }));
    if (query.joinWelcome === '1') {
        store.dispatch(pushFlashMessage({ message: t`Congratulations! You have joined ${name}` }));
    }

    return {
        chunks:    ['space-view'],
        title:     name,
        component: (<Layout viewer={viewer} route={{ path, params }}>
            <SpaceView id={id} organisation={organisation} />
        </Layout>),
        meta:      [
            { property: 'og:url', content: toLink({ to: paths.spaceView, params: { id }, baseURL }) },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: organisation.name },
            { property: 'og:description', content: organisation.description },
            {
                property: 'og:image',
                content:  toLink({ to: organisation.coverPicture || organisation.picture, baseURL }),
            },
        ],
    };
}

export default createAuthAction({ auth: 'optional' })(action);
