import _get from 'lodash/get';

const TIMEOUT = 15000;

export const FLASH_REMOVE_HEAD_MESSAGE = 'FLASH_REMOVE_HEAD_MESSAGE';
export const FLASH_PUSH_MESSAGE = 'FLASH_PUSH_MESSAGE';

export const getFlashHeadMessage = state => _get(state, ['flash', 'list', 0], null);
export const pushFlashMessage = ({ message, ts = Date.now() }) => ({
    type:    FLASH_PUSH_MESSAGE,
    payload: {
        message,
        ts,
    }
});

export default (state = { list: [] }, action = {}) => {
    switch (action.type) {
        case 'APP_TICK':
            return {
                ...state,
                list: [...state.list.filter(item => item.ts + TIMEOUT > action.payload.now)],
            };
        case FLASH_REMOVE_HEAD_MESSAGE:
            return {
                ...state,
                list: [...state.list.slice(1)],
            };
        case FLASH_PUSH_MESSAGE:
            return {
                ...state,
                list: [...state.list, { ...action.payload }],
            };
        default:
            return state;
    }
}
