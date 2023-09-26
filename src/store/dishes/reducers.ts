import {IDishState} from "../../contracts/dishes/interfaces/IDishState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";
import {
    addCasesFor_addDishAsync,
    addCasesFor_getDishByIdAsync,
    addCasesFor_getDishesPageAsync,
    addCasesFor_editDishAsync
} from "./extraReducers";

const initialState: IDishState = {
    // getDishesPageAsync
    dishesCount: 0,
    dishesSlice: [],
    getDishesPageStatus: 'idle',

    // getDishAsync
    getDishStatus: 'idle',

    // addDishAsync
    addDishStatus: 'idle',

    // editDishAsync
    editDishStatus: 'idle',

    // setGridPageSize
    dishesGridPageSize: 9
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
        addCasesFor_getDishByIdAsync(builder);
        addCasesFor_addDishAsync(builder);
        addCasesFor_editDishAsync(builder);
    },
});


export const { setDishesGridPageSize } = dishSlice.actions;
export const selectDishGridPageSize = (state: RootState) => state.dish.dishesGridPageSize;
export const selectDishesSlice = (state: RootState) => state.dish.dishesSlice;
export const selectDishesCount = (state: RootState) => state.dish.dishesCount;
export const isLoadingDishesPage = (state: RootState) => state.dish.getDishesPageStatus == 'loading';



export default dishSlice.reducer;