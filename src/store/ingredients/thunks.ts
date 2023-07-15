import { createAsyncThunk } from "@reduxjs/toolkit";
import {AddIngredient, EditIngredient, GetAllIngredients, GetIngredients} from "../../clients/ingredient";
import { GetIngredientsAsyncQuery } from "../../contracts/ingredients/queries/GetIngredientsAsyncQuery";
import { IngredientDto } from "../../contracts/ingredients/dtos/IngredientDto";
import {GetAllIngredientsAsyncQuery} from "../../contracts/ingredients/queries/GetAllIngredientsAsyncQuery";
import {
    AddIngredientAsyncCommand
} from "../../contracts/ingredients/commands/AddIngredientAsyncCommand";

export const getIngredientsAsync = createAsyncThunk(
    'ingredient/get',
    async (query: GetIngredientsAsyncQuery) => {
        const response = await GetIngredients(query);
        return response.data;
    }
);

export const getAllIngredientsAsync = createAsyncThunk(
    'ingredient/getAll',
    async (query: GetAllIngredientsAsyncQuery) => {
        const response = await GetAllIngredients(query);
        return response.data;
    }
);

export const addIngredientAsync = createAsyncThunk(
    'ingredient/add',
    async (command: AddIngredientAsyncCommand) => {
        const response = await AddIngredient(command);
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