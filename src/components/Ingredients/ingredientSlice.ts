import {  ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { GetAllIngredientsAsyncQuery } from "../../contracts/ingredients/GetAllIngredientsAsyncQuery";
import { IngredientState } from "../../contracts/ingredients/IIngredientState";
import { Ingredient } from "../../contracts/ingredients/IngredientDto";
import { AddNewIngredient, GetAllIngredients } from "./ingredientApi";
  
const initialState: IngredientState = {
    ingredientsSlice: [],
    ingredientsCount: 0,
    ingredientsItemsPerPage: 10,
    ingredientsStatus: 'idle',

    lastAddedIngredientId: -1,
    lastAddedIngredientIdStatus: 'idle',
};


export const getAllIngredientsAsync = createAsyncThunk(
    'ingredient/getAll',
    async (query: GetAllIngredientsAsyncQuery) => {
        const response = await GetAllIngredients(query.pageNumber, query.pageSize);
        return response.data;
    }
);

export const addNewIngredientAsync = createAsyncThunk(
    'ingredient/add',
    async (ingredient: Ingredient) => {
        const response = await AddNewIngredient(ingredient);
        return response.data;
    }
);

export const ingredientReducer = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        addNewIngredient: (state, action: PayloadAction<Ingredient>) => {
            state.ingredientsSlice.push(action.payload);
            state.ingredientsCount++;
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.ingredientsItemsPerPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        addCasesFor_getAllIngredientsAsync(builder);
        addCasesFor_addNewIngredientAsync(builder);
    },
});

const addCasesFor_getAllIngredientsAsync = (builder: ActionReducerMapBuilder<IngredientState>) => {
    builder
        .addCase(getAllIngredientsAsync.pending, (state) => {
            state.ingredientsStatus = 'loading';
        })
        .addCase(getAllIngredientsAsync.fulfilled, (state, action) => {
            state.ingredientsStatus = 'idle';
            state.ingredientsSlice = action.payload.itemsSlice;
            state.ingredientsCount = action.payload.count;
        })
        .addCase(getAllIngredientsAsync.rejected, (state) => {
            state.ingredientsStatus = 'failed';
        });
}

const addCasesFor_addNewIngredientAsync = (builder: ActionReducerMapBuilder<IngredientState>) => {
    builder
        .addCase(addNewIngredientAsync.pending, (state) => {
            state.lastAddedIngredientIdStatus = 'loading';
        })
        .addCase(addNewIngredientAsync.fulfilled, (state, action) => {
            state.lastAddedIngredientIdStatus = 'idle';
            state.lastAddedIngredientId = action.payload;
        })
        .addCase(addNewIngredientAsync.rejected, (state) => {
            state.lastAddedIngredientIdStatus = 'failed';
        });
}

export const { setItemsPerPage } = ingredientReducer.actions;

export const selectIngredientsSlice = (state: RootState) => state.ingredient.ingredientsSlice;
export const selectIngredientsCount = (state: RootState) => state.ingredient.ingredientsCount;
export const selectItemsPerPage = (state: RootState) => state.ingredient.ingredientsItemsPerPage;
export const selectLastAddedIngredientId = (state: RootState) => state.ingredient.lastAddedIngredientId;

export default ingredientReducer.reducer;
