import React from 'react';
import { t } from 'ttag';
import _get from 'lodash/get';
import EventCreate from '../../components/Event/EventCreate';
import Layout from '../../components/Layout';
import createAuthAction from '../../core/createAuthAction';
import organisationExistsQuery from './organisationExists.gql';
// import { setActiveOrganisation } from '../../actions/runtime';
import { action2Route } from '../../core/utils';
import Header from '../../components/UI/FormHeader';
import { paths } from '../../components/Constants';

const getOrganisation = async ({ client, id }) => {
    if (id) {
        const { data } = await client.query({ query: organisationExistsQuery, variables: { id } });
        return _get(data, 'organisation', null);
    }

    return null;
};

async function action(context) {
    const organisation = await getOrganisation({
        client: context.client,
        id:     _get(context, 'query.organisation', null),
    });

    // context.store.dispatch(setActiveOrganisation({ id }));

    // todo by default select personal organisation?

    return {
        chunks:    ['event-create'],
        title:     'Create event',
        component: (<Layout
            viewer={context.viewer}
            route={action2Route(context)}
            header={<Header title={t`New opportunity`} back={{ to: paths.home }} />}
            bottomConfig={{ noEmail: true }}
        >
            <EventCreate organisation={organisation} viewer={context.viewer} />
        </Layout>),
    };
}

export default createAuthAction()(action);
