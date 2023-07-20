import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddIngredient, EditIngredient, GetAllIngredients, GetIngredientsPage } from "../../clients/ingredient";
import { GetIngredientsPageAsyncQuery } from "../../contracts/ingredients/queries/GetIngredientsPageAsyncQuery";
import { IngredientDto } from "../../contracts/ingredients/dtos/IngredientDto";
import { GetAllIngredientsAsyncQuery } from "../../contracts/ingredients/queries/GetAllIngredientsAsyncQuery";
import {
    AddIngredientAsyncCommand
} from "../../contracts/ingredients/commands/AddIngredientAsyncCommand";

export const getIngredientsPageAsync = createAsyncThunk(
    'ingredient/getPage',
    async (query: GetIngredientsPageAsyncQuery) => {
        const response = await GetIngredientsPage(query);
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