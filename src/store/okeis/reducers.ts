import {IOkeiState} from "../../contracts/ingredients/interfaces/IOkeiState";
import {createSlice} from "@reduxjs/toolkit";
import {addCasesFor_getAllOkeisAsync} from "./extraReducers";
import {RootState} from "../index";

const initialState: IOkeiState = {
    // getAllOkeisAsync
    allOkeis: [],
    getAllOkeisStatus: 'idle'
}

const okeiSlice = createSlice({
    name: 'okei',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        addCasesFor_getAllOkeisAsync(builder);
    },
});

export const selectAllOkeis = (state: RootState) => state.okei.allOkeis;

export default okeiSlice.reducer;
