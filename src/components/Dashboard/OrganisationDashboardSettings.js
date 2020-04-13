import { graphql } from 'react-apollo';
import _get from 'lodash/get';
import View from './OrganisationDashboardSettingsView';
import query from '../Space/organisationView.gql';

export default graphql(query, {
    props: ({ data: { loading, ...data }, ownProps: { organisation } }) => ({
        loading,
        organisation: _get(data, 'maybeOrganisation.organisation', organisation),
    }),
})(View);
