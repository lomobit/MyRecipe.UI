import {createAsyncThunk} from "@reduxjs/toolkit";
import {GetDishesPageAsyncQuery} from "../../contracts/dishes/queries/GetDishesPageAsyncQuery";
import {GetDishesPageAsync, AddDishAsync} from "../../clients/dish";
import {AddDishAsyncCommand} from "../../contracts/dishes/commands/AddDishAsyncCommand";


export const getDishesPageAsync = createAsyncThunk(
    'dish/getPage',
    async (query: GetDishesPageAsyncQuery) => {
        const response = await GetDishesPageAsync(query);
        return response.data;
    }
);

export const addDishAsync = createAsyncThunk(
    'dish/add',
    async (command: AddDishAsyncCommand) => {
        const response = await AddDishAsync(command);
        return response.success;
    }
);