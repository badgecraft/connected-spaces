import React from 'react';
import Layout from '../../components/Layout';
import NotFound from './NotFound';
import createAuthAction from "../../core/createAuthAction";

const title = 'Page Not Found';

function action({ viewer, path, params }) {
    return {
        chunks:    ['not-found'],
        title,
        component: (<Layout viewer={viewer} route={{ path, params }}>
            <NotFound title={title} />
        </Layout>),
        status:    404,
    };
}

export default createAuthAction({ auth: 'optional' })(action);
