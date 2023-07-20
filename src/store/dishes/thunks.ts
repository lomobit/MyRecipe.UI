import {createAsyncThunk} from "@reduxjs/toolkit";
import {GetDishesPageAsyncQuery} from "../../contracts/ingredients/queries/GetDishesPageAsyncQuery";
import {GetDishesPage} from "../../clients/dish";


export const getDishesPageAsync = createAsyncThunk(
    'ingredient/getPage',
    async (query: GetDishesPageAsyncQuery) => {
        const response = await GetDishesPage(query);
        return response.data;
    }
);