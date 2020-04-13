import { compose, branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import Message from './FlashMessage';
import { getFlashHeadMessage, FLASH_REMOVE_HEAD_MESSAGE } from './flashReducer';

export default compose(
    connect(
        state => ({ ...getFlashHeadMessage(state) }),
        dispatch => ({
            onClick: () => dispatch({ type: FLASH_REMOVE_HEAD_MESSAGE }),
        }),
    ),
    branch(({ message }) => !message, renderNothing),
)(Message);
