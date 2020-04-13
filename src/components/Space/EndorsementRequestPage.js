import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import _get from 'lodash/get';
import View from './EndorsementRequestPageView';
import query from '../../ui/Endorsement/endorsementQuery.gql';

export default compose(
    graphql(query, {
        props: ({ data: { loading, ...data }, ownProps: { endorsement } }) => ({
            loading,
            endorsement: _get(data, 'maybeEndorsement.endorsement') || endorsement,
        }),
    }),
)(View);
