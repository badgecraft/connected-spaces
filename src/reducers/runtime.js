import {
    SET_RUNTIME_VARIABLE,
    SET_LOADING_DONE,
    SET_LOADING,
} from '../constants';

export default function runtime(state = { flash: [], loading: false, offset: 0 }, action) {
    switch (action.type) {
        case 'APP_TICK':
            return {
                ...state,
                now: action.payload.now,
            };
        case SET_RUNTIME_VARIABLE:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        case SET_LOADING:
            return { ...state, loading: true };
        case SET_LOADING_DONE:
            return { ...state, loading: false };
        default:
            return state;
    }
}

