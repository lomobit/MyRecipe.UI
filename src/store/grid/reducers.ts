import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IGridState } from "../../contracts/grid/interface/IGridState";

const initialState: IGridState = {
    gridPageSize: 10,
};

const gridSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.gridPageSize = action.payload;
        }
    },
});

export const { setItemsPerPage } = gridSlice.actions;

export const selectItemsPerPage = (state: RootState) => state.grid.gridPageSize;

export default gridSlice.reducer;
