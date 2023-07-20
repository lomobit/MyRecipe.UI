import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {IDishState} from "../../contracts/dishes/interfaces/IDishState";
import {addDishAsync, getDishesPageAsync} from "./thunks";

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

export const addCasesFor_addDishAsync = (builder: ActionReducerMapBuilder<IDishState>) => {
    builder
        .addCase(addDishAsync.pending, (state) => {
            state.addDishStatus = 'loading';
        })
        .addCase(addDishAsync.fulfilled, (state, action) => {
            state.addDishStatus = 'idle';
        })
        .addCase(addDishAsync.rejected, (state) => {
            state.addDishStatus = 'failed';
        });
}