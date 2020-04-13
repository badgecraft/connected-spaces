import { compose, getContext, withProps, withHandlers } from 'recompose';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';
// import _updateWith from 'lodash/updateWith';
// import _get from 'lodash/get';
import View from './EvidenceCheckRow';
import mutation from './reviewTask.gql';
import query from './evidencesToCheck.gql';

export default compose(
    getContext({ paths: PropTypes.shape().isRequired, platforms: PropTypes.arrayOf(PropTypes.string).isRequired }),
    graphql(mutation, { name: 'runReviewTask' }),
    withProps(({ item }) => ({ form: `EvidenceCheck${item.id}` })),
    reduxForm({
        initialValues: {
            comment: '',
        },
    }),
    withHandlers({
        reviewTask: ({ runReviewTask, platforms }) => variables => runReviewTask({
            variables,
            refetchQueries: [{ query, variables: { offset: 0, limit: 10, platforms } }, 'projectEvidencesToCheck'],
            // update:         (cache, data) => {
            //     const inCache = cache.readQuery({ query });
            //     const updatedData = _updateWith(inCache, 'me.tasksToCheck', res => ({
            //         ...res,
            //         total: _get(data, 'data.reviewTask.me.tasksToCheck.total', 0),
            //         list:  res.list.filter(item => item.id !== variables.id),
            //     }));
            //     cache.writeQuery({ query, data: updatedData });
            //     // somehow, parent is not re-rendered client.queryManager.broadcastQueries();
            // },
        }),
    }),
    withHandlers({
        handleAccept: ({ handleSubmit, reviewTask, item: { id } }) => (evt) => handleSubmit((values) => reviewTask({
            ...values,
            status: 'accept',
            id,
        }))(evt),
        handleReject: ({ handleSubmit, reviewTask, item: { id } }) => (evt) => handleSubmit((values) => reviewTask({
            ...values,
            status: 'reject',
            id,
        }))(evt),
    }),
)(View);
