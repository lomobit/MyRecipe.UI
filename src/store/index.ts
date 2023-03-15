import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import ingredientReducer from './ingredients/reducers';
import gridReducer from './grid/reducers';

export const store = configureStore({
    reducer: {
        ingredient: ingredientReducer,
        grid: gridReducer,
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
