import { reset } from 'redux-form';
import { connect } from 'react-redux';

export default ({ form }) => connect(
    () => ({}),
    dispatch => ({
        resetForm: () => dispatch(reset(form))
    }),
);
