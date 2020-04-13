import React from 'react';
import { t } from 'ttag';
import qs from 'query-string';
import Layout from "../../components/Layout";
import Redirect from '../../components/Link/RedirectPage';

export default ({ path, query }) => ({
    chunks:    ['redirect'],
    title:     t`Please wait...`,
    component: (<Layout>
        <Redirect to={`${path}?${qs.stringify(query)}`} />
    </Layout>),
});
