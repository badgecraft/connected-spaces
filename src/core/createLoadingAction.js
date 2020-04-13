import { loading, loadingDone } from '../actions/runtime';

export default actionFunc => async (...args) => {
    const { store } = args[0];
    store.dispatch(loading());
    const result = await actionFunc(...args);

    store.dispatch(loadingDone());
    return result;
};
