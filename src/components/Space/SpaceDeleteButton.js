import { branch, compose, renderNothing, withProps } from 'recompose';
import { withApollo, graphql } from 'react-apollo';
import { t } from 'ttag';
import gql from 'graphql-tag';
import _get from 'lodash/get';
import Button from '../../ui/Button';
import withFlash from '../../ui/Flash/withFlash';
import withLocationChange from '../_helpers/withLocationChange';
import { paths } from '../Constants';

const query = gql`
    query organisationForDelete($id:ID!) {
        maybeOrganisation(id:$id) {
            id
            organisation {
                id
                perms {
                    remove { value }
                }
            }
        }
    }
`;

const mutation = gql`
    mutation deleteOrganisation($id:ID!) {
        removeOrganisation(id:$id)
    }
`;

export default compose(
    withFlash,
    withLocationChange,
    withApollo,
    graphql(query),
    graphql(mutation),
    branch(
        ({ data }) => _get(data, 'maybeOrganisation.organisation.perms.remove.value') !== 1,
        renderNothing,
    ),
    withProps(({ flash, locationChange, mutate, client }) => ({
        type:    'button',
        variant: 'secondary',
        label:   t`Delete organisation`,
        onClick: () => {
            // eslint-disable-next-line no-alert
            const confirmed = window.confirm(t`Are you sure you want to delete this organisation?`);
            if (!confirmed) {
                return null;
            }

            // eslint-disable-next-line no-alert
            const doubleConfirmed = window.confirm(t`Are you absolutely sure? this is not reversable`);
            if (!doubleConfirmed) {
                return null;
            }

            return mutate()
                .then(() => {
                    client.resetStore();

                    locationChange({ to: paths.home });
                    flash(t`Organisation removed, no way back`);
                })
                .catch(err => console.error('failed to remove event', err));

        },
    })),
)(Button);
