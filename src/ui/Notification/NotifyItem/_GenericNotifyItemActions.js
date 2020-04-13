import { branch, renderComponent, compose, withState, withHandlers } from 'recompose';
import _get from 'lodash/get';
import { graphql } from 'react-apollo';
import RawControl from './_NotifyItemControl'
import Status from './_NotifyItemStatus';
import defaultRejectMutation from './defaultRejectMutation.gql';

const Control = compose(
    graphql(defaultRejectMutation, { name: 'runRejectMutation', options: { errorPolicy: 'all' } }),
    withState('busy', 'setBusy', false),
    withHandlers({
        onAccept: ({ setBusy, runAcceptMutation, item, refetchQueries = [] }) => () => {
            setBusy(true);
            runAcceptMutation({ variables: { id: item.id }, refetchQueries })
                .catch(err => console.error('error', err))
                .then(() => setBusy(false));
        },
        onReject: ({ setBusy, runRejectMutation, item }) => () => {
            setBusy(true);
            runRejectMutation({ variables: { id: item.id } })
                .catch(err => console.error('error', err))
                .then(() => setBusy(false));
        },
    }),
)(RawControl);

export default compose(
    branch(({ item }) => _get(item, 'perms.handle.value') === 1, renderComponent(Control)),
    branch(({ item }) => _get(item, 'handled', false), renderComponent(Status)),
)(() => null);
