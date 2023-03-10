import {  ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { GetIngredientsAsyncQuery } from "../../contracts/ingredients/GetAllIngredientsAsyncQuery";
import { IngredientState } from "../../contracts/ingredients/IIngredientState";
import { Ingredient } from "../../contracts/ingredients/IngredientDto";
import { AddIngredient, EditIngredient, GetIngredients } from "./ingredientApi";
  
const initialState: IngredientState = {
    ingredientsSlice: [],
    ingredientsCount: 0,
    ingredientsItemsPerPage: 10,
    getIngredientsStatus: 'idle',

    addIngredientIdStatus: 'idle',

    editIngredientIdStatus: 'idle',
};


export const getIngredientsAsync = createAsyncThunk(
    'ingredient/get',
    async (query: GetIngredientsAsyncQuery) => {
        const response = await GetIngredients(query.pageNumber, query.pageSize);
        return response.data;
    }
);

export const addIngredientAsync = createAsyncThunk(
    'ingredient/add',
    async (ingredient: Ingredient) => {
        const response = await AddIngredient(ingredient);
        return response.data;
    }
);

export const editIngredientAsync = createAsyncThunk(
    'ingredient/edit',
    async (ingredient: Ingredient) => {
        const response = await EditIngredient(ingredient);
        return response.data;
    }
);

export const ingredientReducer = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.ingredientsItemsPerPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        addCasesFor_getIngredientsAsync(builder);
        addCasesFor_addIngredientAsync(builder);
        addCasesFor_editIngredientAsync(builder);
    },
});

const addCasesFor_getIngredientsAsync = (builder: ActionReducerMapBuilder<IngredientState>) => {
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

const addCasesFor_addIngredientAsync = (builder: ActionReducerMapBuilder<IngredientState>) => {
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

const addCasesFor_editIngredientAsync = (builder: ActionReducerMapBuilder<IngredientState>) => {
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
export const { setItemsPerPage } = ingredientReducer.actions;

export const selectIngredientsSlice = (state: RootState) => state.ingredient.ingredientsSlice;
export const selectIngredientsCount = (state: RootState) => state.ingredient.ingredientsCount;
export const selectItemsPerPage = (state: RootState) => state.ingredient.ingredientsItemsPerPage;

export default ingredientReducer.reducer;
