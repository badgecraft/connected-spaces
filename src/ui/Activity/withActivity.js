import PropTypes from 'prop-types';
import { compose, getContext, withHandlers, lifecycle } from 'recompose';
import { graphql, withApollo } from 'react-apollo';
import _get from 'lodash/get';
import { t } from 'ttag';
import gql from 'graphql-tag';
import query from './activityView.gql';
import withFlash from '../Flash/withFlash';
import updatedActivity from './updatedActivitySubscription.gql';
import updatedBadgeClass from '../BadgeClass/badgeClassSubscription.gql';

const mutation = gql`mutation removeProject($id:ID!){
    removeProject(id:$id)
}`;

export default compose(
    getContext({
        lang:      PropTypes.string.isRequired,
        pushRoute: PropTypes.func.isRequired,
    }),
    withFlash,
    withApollo,
    graphql(query, {
        options: {
            errorPolicy: 'all',
        },
        props:   ({ data: { loading, maybeProject, subscribeToMore }, ownProps: { id, project, lang } }) => ({
            loading,
            project:      _get(maybeProject, 'project') || project,
            watchProject: () => {
                subscribeToMore({
                    document:  updatedActivity,
                    variables: { id, lang },
                });
                if (project && project.completeBadgeClass) {
                    subscribeToMore({
                        document:  updatedBadgeClass,
                        variables: { id: project.completeBadgeClass.id },
                    });
                }
            },
        }),
    }),
    graphql(mutation, { name: 'runRemoveMutation' }),
    withHandlers({
        onActivityRemove: ({ id, project, runRemoveMutation, client, pushRoute, flash, context: { paths } }) => () => {
            // eslint-disable-next-line no-alert
            const confirmed = window.confirm(t`Are you sure you want to delete this activity?`);
            if (confirmed) {
                return runRemoveMutation({ variables: { id } })
                    .then(() => {
                        client.resetStore();
                        const organisationId = _get(project, 'organisationId');
                        if (organisationId) {
                            pushRoute({ to: paths.orgDashboard, params: { id: organisationId } });
                        } else {
                            pushRoute({ to: paths.home });
                        }
                        flash(t`Activity deleted`);
                    })
                    .catch(err => console.error('failed to remove event', err));
            }

            return null;
        },
        onEventLeave:     ({ pushRoute, id, context: { paths } }) => () => {
            // eslint-disable-next-line no-alert
            const confirmed = window.confirm(t`Are you sure you want to leave this event?`);
            if (confirmed) {
                pushRoute({ to: paths.activityLeave, params: { id } })
            }
        },
    }),
    lifecycle({
        componentDidMount() {
            if (typeof this.props.watchProject === 'function') {
                this.props.watchProject();
            }
        }
    }),
);
