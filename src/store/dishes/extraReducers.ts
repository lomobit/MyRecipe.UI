import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {IDishState} from "../../contracts/ingredients/interfaces/IDishState";
import {getDishesPageAsync} from "./thunks";

export const addCasesFor_getDishesPageAsync = (builder: ActionReducerMapBuilder<IDishState>) => {
    builder
        .addCase(getDishesPageAsync.pending, (state) => {
            state.getDishesPageStatus = 'loading';
        })
        .addCase(getDishesPageAsync.fulfilled, (state, action) => {
            state.getDishesPageStatus = 'idle';
            state.dishesSlice = action.payload.itemsSlice;
            state.dishesCount = action.payload.count;
        })
        .addCase(getDishesPageAsync.rejected, (state) => {
            state.getDishesPageStatus = 'failed';
        });
}