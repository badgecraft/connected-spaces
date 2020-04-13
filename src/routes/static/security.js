import React from 'react';
import { action2Route } from '../../core/utils';
import Layout from '../../components/Layout';
import html from './security.md';
import Page from '../../components/UI/ContentPage';
import createAuthAction from '../../core/createAuthAction';

export default createAuthAction({ auth: 'optional' })(async (context) => ({
    chunks:    ['security'],
    title:     html.title,
    component: (<Layout viewer={context.viewer} route={action2Route(context)}>
        <Page {...html} />
    </Layout>),
}));
