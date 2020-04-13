import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import mutation from './setPreferencesMutation.gql';

export default compose(
    graphql(mutation, { name: 'runSetPreferences' }),
    withHandlers({
        setPreferences: ({ runSetPreferences }) => (preferences = []) => runSetPreferences({
            variables: { preferences },
        }).catch(() => null),
    }),
);
