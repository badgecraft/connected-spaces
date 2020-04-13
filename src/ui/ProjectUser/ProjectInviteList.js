import { graphql } from 'react-apollo';
import usersQuery from './projectInvites.gql';
import { createGraphqlPropsPager } from '../uiPaging';
import View from './ProjectInvitesListView';

export default graphql(usersQuery, {
    props: createGraphqlPropsPager({
        resultPath: 'maybeProject.project.invites',
        initial:    'initial',
    }),
})(View);
