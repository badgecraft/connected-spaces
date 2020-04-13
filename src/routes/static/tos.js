import React from 'react';
import { action2Route } from '../../core/utils';
import Layout from '../../components/Layout';
import html from './tos.md';
import Page from '../../components/UI/ContentPage';
import createAuthAction from '../../core/createAuthAction';

export default createAuthAction({ auth: 'optional' })(async (context) => ({
    chunks:    ['tos'],
    title:     html.title,
    component: (<Layout viewer={context.viewer} route={action2Route(context)}>
        <Page {...html} />
    </Layout>),
}));
