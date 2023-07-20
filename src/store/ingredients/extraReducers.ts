import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IIngredientState } from "../../contracts/ingredients/interfaces/IIngredientState";
import {addIngredientAsync, editIngredientAsync, getAllIngredientsAsync, getIngredientsPageAsync} from "./thunks";

export const addCasesFor_getIngredientsPageAsync = (builder: ActionReducerMapBuilder<IIngredientState>) => {
    builder
        .addCase(getIngredientsPageAsync.pending, (state) => {
            state.getIngredientsPageStatus = 'loading';
        })
        .addCase(getIngredientsPageAsync.fulfilled, (state, action) => {
            state.getIngredientsPageStatus = 'idle';
            state.ingredientsSlice = action.payload.itemsSlice;
            state.ingredientsCount = action.payload.count;
        })
        .addCase(getIngredientsPageAsync.rejected, (state) => {
            state.getIngredientsPageStatus = 'failed';
        });
}

export const addCasesFor_getAllIngredientsAsync = (builder: ActionReducerMapBuilder<IIngredientState>) => {
    builder
        .addCase(getAllIngredientsAsync.pending, (state) => {
            state.getAllIngredientsStatus = 'loading';
        })
        .addCase(getAllIngredientsAsync.fulfilled, (state, action) => {
            state.getAllIngredientsStatus = 'idle';
            state.allIngredients = action.payload;
        })
        .addCase(getAllIngredientsAsync.rejected, (state) => {
            state.getAllIngredientsStatus = 'failed';
        });
}

export const addCasesFor_addIngredientAsync = (builder: ActionReducerMapBuilder<IIngredientState>) => {
    builder
        .addCase(addIngredientAsync.pending, (state) => {
            state.addIngredientStatus = 'loading';
        })
        .addCase(addIngredientAsync.fulfilled, (state, action) => {
            state.addIngredientStatus = 'idle';
        })
        .addCase(addIngredientAsync.rejected, (state) => {
            state.addIngredientStatus = 'failed';
        });
}

export const addCasesFor_editIngredientAsync = (builder: ActionReducerMapBuilder<IIngredientState>) => {
    builder
        .addCase(editIngredientAsync.pending, (state) => {
            state.editIngredientStatus = 'loading';
        })
        .addCase(editIngredientAsync.fulfilled, (state, action) => {
            state.editIngredientStatus = 'idle';
        })
        .addCase(editIngredientAsync.rejected, (state) => {
            state.editIngredientStatus = 'failed';
        });
}