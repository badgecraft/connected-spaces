import React from 'react';
import SpaceCreate from '../../components/Space/SpaceCreate';
import Layout from '../../components/Layout';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';

export default createAuthAction()(async (context) => ({
    chunks:    ['space-create'],
    title:     'Create new space',
    component: (<Layout viewer={context.viewer} route={action2Route(context)} bottomConfig={{ noEmail: true }}>
        <SpaceCreate viewer={context.viewer} />
    </Layout>),
}));
