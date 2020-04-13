import { withProps, compose, withStateHandlers, branch, renderNothing } from 'recompose';
import { t } from 'ttag';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import Dialog from '../../ui/Modal/ModalDialog';
import query from '../../ui/BottomBar/userPrimaryEmail.gql';

export default compose(
    graphql(query, {
        props: ({ data: { loading, ...data } }) => ({
            loading,
            primaryEmail: _get(data, 'me.primaryEmail', null)
        }),
    }),
    withStateHandlers(() => ({ open: true }), {
        onClose: () => () => ({ open: false }),
    }),
    branch(({ open, loading, primaryEmail }) => !open || loading || primaryEmail, renderNothing),
    withProps(({ explanation }) => ({
        title:    t`Your primary email is not verified`,
        children: explanation,
    })),
)(Dialog);
