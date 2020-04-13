import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import usersQuery from './organisationUsers.gql';
import { createGraphqlPropsPager } from '../uiPaging';
import View from './OrganisationUserListView';
import withSetPreferences from '../User/withSetPreferences';
import { getPreferenceValue } from '../uiUtils';

const OrganisationUserList = compose(
    withSetPreferences,
    withStateHandlers(({ viewerPreferences }) => ({
        q:        getPreferenceValue(viewerPreferences, 'organisation-users-search', ''),
        sort:     getPreferenceValue(viewerPreferences, 'organisation-users-sort', 'userName'),
        order:    getPreferenceValue(viewerPreferences, 'organisation-users-order', 'asc'),
        userType: getPreferenceValue(viewerPreferences, 'organisation-users-type', 'all'),
    }), {
        onSearchChange:   (_, { id, setPreferences }) => q => {
            setPreferences([
                { ident: id, type: 'project', name: 'organisation-users-search', value: q },
            ]);
            return { q };
        },
        onSortChange:     (_, { id, setPreferences }) => ({ sort, order }) => {
            setPreferences([
                { ident: id, type: 'project', name: 'organisation-users-sort', value: sort },
                { ident: id, type: 'project', name: 'organisation-users-order', value: order },
            ]);
            return { sort, order };
        },
        onUserTypeChange: (_, { id, setPreferences }) => userType => {
            setPreferences([
                { ident: id, type: 'project', name: 'organisation-users-type', value: userType },
            ]);
            return { userType };
        },
    }),
    graphql(usersQuery, {
        props: createGraphqlPropsPager({
            resultPath: 'maybeOrganisation.organisation.users',
            initial:    'initial',
        }),
    }),
)(View);

OrganisationUserList.propTypes = {
    id:                PropTypes.string.isRequired,
    initial:           PropTypes.shape({}).isRequired,
    perms:             PropTypes.shape({}).isRequired,
    offset:            PropTypes.number.isRequired,
    inviteTo:          PropTypes.shape({}).isRequired,
    viewerPreferences: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default OrganisationUserList;
