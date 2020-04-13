import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _get from 'lodash/get';
import Select from './ProfileOrganisationSelect';

const query = gql`query managedOrganisations{
    me {
        id
        organisations(viewerTeam:["owners", "admins"]) {
            total
            list {
                id
                name
                picture
            }
        }
    }
}`;

export default graphql(query, {
    props: ({ data: { loading, ...data } }) => ({
        loading,
        list:  _get(data, 'me.organisations.list', []),
        total: _get(data, 'me.organisations.total', 0),
    }),
})(Select);
