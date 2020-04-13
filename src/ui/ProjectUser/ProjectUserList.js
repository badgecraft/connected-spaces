import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose, withStateHandlers } from 'recompose';
import usersQuery from './projectUsers.gql';
import { createGraphqlPropsPager } from '../uiPaging';
import View from './ProjectUserListView';
import { getPreferenceValue } from '../uiUtils';
import withSetPreferences from '../User/withSetPreferences';

const ProjectUserList = compose(
    withSetPreferences,
    withStateHandlers(({ viewerPreferences }) => ({
        q:        getPreferenceValue(viewerPreferences, 'project-users-search', ''),
        sort:     getPreferenceValue(viewerPreferences, 'project-users-sort', 'userName'),
        order:    getPreferenceValue(viewerPreferences, 'project-users-order', 'asc'),
        userType: getPreferenceValue(viewerPreferences, 'project-users-type', 'all'),
    }), {
        onSearchChange:   (_, { id, setPreferences }) => q => {
            setPreferences([
                { ident: id, type: 'project', name: 'project-users-search', value: q },
            ]);
            return { q };
        },
        onSortChange:     (_, { id, setPreferences }) => ({ sort, order }) => {
            setPreferences([
                { ident: id, type: 'project', name: 'project-users-sort', value: sort },
                { ident: id, type: 'project', name: 'project-users-order', value: order },
            ]);
            return { sort, order };
        },
        onUserTypeChange: (_, { id, setPreferences }) => userType => {
            setPreferences([
                { ident: id, type: 'project', name: 'project-users-type', value: userType },
            ]);
            return { userType };
        },
    }),
    graphql(usersQuery, {
        props: createGraphqlPropsPager({
            resultPath: 'maybeProject.project.users',
            initial:    'initial',
        }),
    }),
)(View);

ProjectUserList.propTypes = {
    id:                PropTypes.string.isRequired,
    initial:           PropTypes.shape({}).isRequired,
    perms:             PropTypes.shape({}).isRequired,
    offset:            PropTypes.number.isRequired,
    viewerPreferences: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ProjectUserList.displayName = 'ProjectUserList';

export default ProjectUserList;
