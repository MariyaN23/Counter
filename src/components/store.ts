import {combineReducers, legacy_createStore} from 'redux';
import {counterReducer} from './CounterReducer';

export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
    counter: counterReducer
})

export const store = legacy_createStore(rootReducer)