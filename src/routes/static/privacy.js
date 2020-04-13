import React from 'react';
import { action2Route } from '../../core/utils';
import Layout from '../../components/Layout';
import privacy from './privacy.md';
import Page from '../../components/UI/ContentPage';
import createAuthAction from '../../core/createAuthAction';

export default createAuthAction({ auth: 'optional' })(async (context) => ({
    chunks:    ['privacy'],
    title:     privacy.title,
    component: (<Layout viewer={context.viewer} route={action2Route(context)}>
        <Page {...privacy} />
    </Layout>),
}));
