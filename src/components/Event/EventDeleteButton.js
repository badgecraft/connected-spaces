import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { compose, withProps, branch, renderNothing } from 'recompose';
import { t } from 'ttag';
import _get from 'lodash/get';
import Button from '../UI/Button';
import withFlash from '../../ui/Flash/withFlash';
import withLocationChange from '../_helpers/withLocationChange';
import { paths } from '../Constants';

const query = gql`query projectForDelete($id:ID!) {
    project(id:$id) {
        id
        name
        perms {
            remove { value }
        }
        organisationId
    }
}`;

const mutation = gql`mutation removeProject($id:ID!){
    removeProject(id:$id)
}`;

export default compose(
    withFlash,
    withLocationChange,
    withApollo,
    graphql(query),
    graphql(mutation),
    branch(
        ({ data }) => _get(data, 'project.perms.remove.value') !== 1,
        renderNothing,
    ),
    withProps(({ flash, locationChange, data, mutate, client }) => ({
        type:     'button',
        variant:  'secondary',
        children: t`Delete event`,
        onClick:  () => {
            // eslint-disable-next-line no-alert
            const confirmed = window.confirm(t`Are you sure you want to delete this event?`);
            if (confirmed) {
                mutate()
                    .then(() => {
                        client.resetStore();
                        const id = _get(data, 'project.organisationId');
                        if (id) {
                            locationChange({ to: paths.orgDashboard, params: { id } });
                        } else {
                            locationChange({ to: paths.home });
                        }
                        flash(t`Event deleted`);
                    })
                    .catch(err => console.error('failed to remove event', err));
            }
        },
    })),
)(Button);
