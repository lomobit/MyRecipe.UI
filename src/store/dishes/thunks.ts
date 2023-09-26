import {createAsyncThunk} from "@reduxjs/toolkit";
import {GetDishesPageAsyncQuery} from "../../contracts/dishes/queries/GetDishesPageAsyncQuery";
import {GetDishesPageAsync, AddDishAsync, GetDishById, EditDishAsync} from "../../clients/dish";
import {AddDishAsyncCommand} from "../../contracts/dishes/commands/AddDishAsyncCommand";
import {EditDishAsyncCommand} from "../../contracts/dishes/commands/EditDishAsyncCommand";


export const getDishesPageAsync = createAsyncThunk(
    'dish/getPage',
    async (query: GetDishesPageAsyncQuery) => {
        const response = await GetDishesPageAsync(query);
        return response.data;
    }
);

export const getDishByIdAsync = createAsyncThunk(
    'dish/get',
    async (id: number)=> {
        const response = await GetDishById(id);
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

export const editDishAsync = createAsyncThunk(
    'dish/edit',
    async (command: EditDishAsyncCommand) => {
        const response = await EditDishAsync(command);
        return response.success;
    }
);
