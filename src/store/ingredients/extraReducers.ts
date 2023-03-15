import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IIngredientState } from "../../contracts/ingredients/interface/IIngredientState";
import { addIngredientAsync, editIngredientAsync, getIngredientsAsync } from "./thunks";

export const addCasesFor_getIngredientsAsync = (builder: ActionReducerMapBuilder<IIngredientState>) => {
    builder
        .addCase(getIngredientsAsync.pending, (state) => {
            state.getIngredientsStatus = 'loading';
        })
        .addCase(getIngredientsAsync.fulfilled, (state, action) => {
            state.getIngredientsStatus = 'idle';
            state.ingredientsSlice = action.payload.itemsSlice;
            state.ingredientsCount = action.payload.count;
        })
        .addCase(getIngredientsAsync.rejected, (state) => {
            state.getIngredientsStatus = 'failed';
        });
}

export const addCasesFor_addIngredientAsync = (builder: ActionReducerMapBuilder<IIngredientState>) => {
    builder
        .addCase(addIngredientAsync.pending, (state) => {
            state.addIngredientIdStatus = 'loading';
        })
        .addCase(addIngredientAsync.fulfilled, (state, action) => {
            state.addIngredientIdStatus = 'idle';
        })
        .addCase(addIngredientAsync.rejected, (state) => {
            state.addIngredientIdStatus = 'failed';
        });
}

export const addCasesFor_editIngredientAsync = (builder: ActionReducerMapBuilder<IIngredientState>) => {
    builder
        .addCase(editIngredientAsync.pending, (state) => {
            state.editIngredientIdStatus = 'loading';
        })
        .addCase(editIngredientAsync.fulfilled, (state, action) => {
            state.editIngredientIdStatus = 'idle';
        })
        .addCase(editIngredientAsync.rejected, (state) => {
            state.editIngredientIdStatus = 'failed';
        });
}