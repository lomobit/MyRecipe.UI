import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddIngredient, EditIngredient, GetIngredients } from "../../clients/ingredient";
import { GetIngredientsAsyncQuery } from "../../contracts/ingredients/GetIngredientsAsyncQuery";
import { IngredientDto } from "../../contracts/ingredients/IngredientDto";

export const getIngredientsAsync = createAsyncThunk(
    'ingredient/get',
    async (query: GetIngredientsAsyncQuery) => {
        const response = await GetIngredients(query.pageNumber, query.pageSize);
        return response.data;
    }
);

export const addIngredientAsync = createAsyncThunk(
    'ingredient/add',
    async (ingredient: IngredientDto) => {
        const response = await AddIngredient(ingredient);
        return response.data;
    }
);

export const editIngredientAsync = createAsyncThunk(
    'ingredient/edit',
    async (ingredient: IngredientDto) => {
        const response = await EditIngredient(ingredient);
        return response.data;
    }
);