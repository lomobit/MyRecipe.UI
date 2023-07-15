import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "..";
import { IIngredientState } from "../../contracts/ingredients/interfaces/IIngredientState";
import {
    addCasesFor_addIngredientAsync,
    addCasesFor_editIngredientAsync,
    addCasesFor_getAllIngredientsAsync,
    addCasesFor_getIngredientsAsync
} from "./extraReducers";

const initialState: IIngredientState = {
    // getIngredientsAsync
    ingredientsSlice: [],
    ingredientsCount: 0,
    getIngredientsStatus: 'idle',

    // getAllIngredientsAsync
    allIngredients: [],
    getAllIngredientsStatus: 'idle',

    // addIngredientAsync
    addIngredientIdStatus: 'idle',

    // editIngredientAsync
    editIngredientIdStatus: 'idle',

    // setGridPageSize
    gridPageSize: 20,
};

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        setGridPageSize: (state, action: PayloadAction<number>) => {
            state.gridPageSize = action.payload;
        }
    },
    extraReducers: (builder) => {
        addCasesFor_getIngredientsAsync(builder);
        addCasesFor_getAllIngredientsAsync(builder);
        addCasesFor_addIngredientAsync(builder);
        addCasesFor_editIngredientAsync(builder);
    },
});

export const { setGridPageSize } = ingredientSlice.actions;

export const selectGridPageSize = (state: RootState) => state.ingredient.gridPageSize;
export const selectIngredientsSlice = (state: RootState) => state.ingredient.ingredientsSlice;
export const selectIngredientsCount = (state: RootState) => state.ingredient.ingredientsCount;
export const selectAllIngredients = (state: RootState) => state.ingredient.allIngredients;

export default ingredientSlice.reducer;
