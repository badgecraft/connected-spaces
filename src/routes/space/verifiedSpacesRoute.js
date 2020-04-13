import React from 'react';
import { t } from 'ttag';
import Layout from "../../components/Layout";
import createAuthAction from '../../core/createAuthAction';
import query from './getVerifiedOrganisations.gql';
import SpaceList from '../../components/Space/SpaceList';

async function action({ client, viewer, path, params, lang }) {
    await client.query({ query, variables: { lang } });

    return {
        chunks:    ['verified-spaces'],
        title:     t`All partners`,
        component: (<Layout viewer={viewer} route={{ path, params }}>
            <SpaceList />
        </Layout>),
    };
}

export default createAuthAction({ auth: 'optional' })(action);
