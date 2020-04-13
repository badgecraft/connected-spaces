import _get from 'lodash/get';

export const NAME = 'toggableMenu';
export const TOGGLE_MENU_OPEN = 'TOGGLE_MENU_OPEN';
export const TOGGLE_MENU_CLOSE = 'TOGGLE_MENU_CLOSE';

export const isOpen = (state, name = 'none', defaultValue = false) => _get(state, [NAME, name], defaultValue);

export default () => ({
    [NAME]: (state = {}, action = {}) => {
        switch (action.type) {
            case TOGGLE_MENU_OPEN:
                return {
                    ...state,
                    [_get(action, 'payload.name', 'none')]: true,
                };
            case TOGGLE_MENU_CLOSE:
                return {
                    ...state,
                    [_get(action, 'payload.name', 'none')]: false
                };
            case 'SET_LOADING': // todo would be better if it would detect route change
                return {};
            default:
                return state;
        }
    },
});
