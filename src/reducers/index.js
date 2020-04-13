import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import runtime from './runtime';
import createToggableMenu from '../ui/Menu/toggableMenuReducer';
import flash from '../ui/Flash/flashReducer';

export default combineReducers({
    runtime,
    form,
    ...createToggableMenu(),
    flash,
});
