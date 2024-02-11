import {combineReducers, legacy_createStore} from 'redux';
import {counterReducer} from './CounterReducer';
import {loadState, saveState} from '../utils/localStorage-utils';

export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
    counter: counterReducer
})

export const store = legacy_createStore(rootReducer, loadState())

store.subscribe(() => {
    saveState(store.getState());
})