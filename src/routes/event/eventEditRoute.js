import React from 'react';
import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import query from './getProject.gql';
import Layout from '../../components/Layout';
import EventEdit from '../../components/Event/EventEdit';
import { action2Route } from '../../core/utils';

export default createAuthAction()(async ({ client, viewer, lang, ...other }, { id }) => {
    const { data } = await client.query({ query, variables: { id, lang }, errorPolicy: 'all' });
    const project = _get(data, 'maybeProject.project', null);
    if (!project || _get(project, 'perms.edit.value') !== 1) {
        // todo read error, make forbidden and auth require pages
        return null;
    }

    return {
        chunks:    ['event-edit'],
        title:     project.name,
        component: (<Layout viewer={viewer} route={action2Route(other)}>
            <EventEdit project={project} />
        </Layout>),
    };
});
