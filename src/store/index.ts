import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import ingredientReducer from './ingredients/reducers';
import okeiReducer from './okeis/reducers';
import dishReducer from './dishes/reducers';

export const store = configureStore({
    reducer: {
        ingredient: ingredientReducer,
        okei: okeiReducer,
        dish: dishReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(reduxLogger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
