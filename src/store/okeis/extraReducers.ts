import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {IOkeiState} from "../../contracts/okei/interfaces/IOkeiState";
import {getAllOkeisAsync} from "./thunks";

export const addCasesFor_getAllOkeisAsync = (builder: ActionReducerMapBuilder<IOkeiState>) => {
    builder
        .addCase(getAllOkeisAsync.pending, (state) => {
            state.getAllOkeisStatus = 'loading';
        })
        .addCase(getAllOkeisAsync.fulfilled, (state, action) => {
            state.getAllOkeisStatus = 'idle';
            state.allOkeis = action.payload;
        })
        .addCase(getAllOkeisAsync.rejected, (state) => {
            state.getAllOkeisStatus = 'failed';
        });
}