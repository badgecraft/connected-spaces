import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, branch, renderNothing, renderComponent } from 'recompose';
import _get from 'lodash/get';
import Item from './ActivityItemView';
import Loading from './ActivityItemLoadingView';

const query = gql`query getActivity($id:ID!) {
    maybeProject(id:$id) {
        id
        project {
            id
            name
            coverPicture
            coverMeta {
                id
                dominantColor
            }
            status
            site (excludeCurrent: true) {
                id
                title
            }
            organisation {
                id
                name
            }
        }
    }
}`;

export default compose(
    graphql(query, {
        props: ({ data: { loading, ...data }, ownProps: { item } }) => ({
            item: _get(data, 'maybeProject.project', item),
            loading,
        }),
        skip:  ({ id }) => !id,
    }),
    branch(({ item, loading }) => loading && !item, renderComponent(Loading)),
    branch(({ item }) => !item, renderNothing),
)(Item);
