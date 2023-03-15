import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import ingredientSlice from './ingredients/slice';

export const store = configureStore({
    reducer: {
        ingredient: ingredientSlice,
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
