import React from 'react';
import { t } from 'ttag';
import _get from 'lodash/get';
import createAuthAction from '../../core/createAuthAction';
import { action2Route } from '../../core/utils';
import Form from './PlaylistCreateForm';

export default createAuthAction()(async (context) => ({
    chunks:    ['playlistCreate'],
    title:     t`Create a playlist`,
    component: (<Form
        viewer={context.viewer}
        route={action2Route(context)}
        initialOrganisation={_get(context, 'query.organisation', null)}
    />),
}))
