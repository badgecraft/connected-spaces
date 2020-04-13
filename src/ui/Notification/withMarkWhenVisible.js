import React from 'react';
import { graphql } from 'react-apollo';
import { withHandlers, compose } from 'recompose';
import RawMark from './MarkVisibleAsRead';
import markAsReadMutation from './markAsReadMutation.gql';

const Mark = compose(
    graphql(markAsReadMutation, { name: 'runMarkAsRead' }),
    withHandlers({
        markAsRead: ({ runMarkAsRead }) => ids => runMarkAsRead({ variables: { ids } }),
    }),
)(RawMark);

export default Comp => props => (<Mark><Comp {...props} /></Mark>);
