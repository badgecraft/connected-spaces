import { connect } from 'react-redux';
import { pushFlashMessage } from './flashReducer';

export default connect(
    () => ({}),
    dispatch => ({ flash: message => dispatch(pushFlashMessage({ message })) }),
);
