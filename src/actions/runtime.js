import { SET_RUNTIME_VARIABLE, SET_LOADING, SET_LOADING_DONE } from '../constants';

export function setRuntimeVariable({ name, value }) {
    return {
        type:    SET_RUNTIME_VARIABLE,
        payload: {
            name,
            value,
        },
    };
}

export const setActiveOrganisation = ({ id }) => ({
    type:    SET_RUNTIME_VARIABLE,
    payload: { name: 'organisation', value: id },
});

export const loading = () => ({ type: SET_LOADING });

export const loadingDone = () => ({ type: SET_LOADING_DONE });
