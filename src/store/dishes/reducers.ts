import {IDishState} from "../../contracts/ingredients/interfaces/IDishState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";
import {addCasesFor_getDishesPageAsync} from "./extraReducers";

const initialState: IDishState = {
    // getDishesPageAsync
    dishesCount: 0,
    dishesSlice: [],
    getDishesPageStatus: 'idle',

    // addDishAsync
    addDishStatus: 'idle',

    // setGridPageSize
    dishesGridPageSize: 0
}

const dishSlice = createSlice({
    name: 'dish',
    initialState,
    reducers: {
        setDishesGridPageSize: (state, action: PayloadAction<number>) => {
            state.dishesGridPageSize = action.payload;
        }
    },
    extraReducers: (builder) => {
        addCasesFor_getDishesPageAsync(builder);
    },
});


export const { setDishesGridPageSize } = dishSlice.actions;
export const selectDishGridPageSize = (state: RootState) => state.dish.dishesGridPageSize;


export default dishSlice.reducer;