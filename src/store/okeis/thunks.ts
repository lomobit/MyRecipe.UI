import {createAsyncThunk} from "@reduxjs/toolkit";
import {GetAllOkeis} from "../../clients/okei";

export const getAllOkeisAsync = createAsyncThunk(
    'okei/getAll',
    async () => {
        const response = await GetAllOkeis();
        return response.data;
    }
);