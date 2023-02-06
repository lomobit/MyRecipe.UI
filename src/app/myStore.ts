import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import rootReducer from './modules';

// Обычно 2 стора для прода и дева, и один базовый, который в зависимости от переменных окружения выбирает нужный
const myConfigureStore = (reducers = {}, preloadedState = {}, middlewares = []) => createStore(
    combineReducers({
        ...rootReducer,
        ...reducers
    }),
    preloadedState,
    compose(
        applyMiddleware(
            ...middlewares,
            thunk,
            reduxLogger
        ),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default myConfigureStore;
