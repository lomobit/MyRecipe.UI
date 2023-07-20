import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "..";
import { IIngredientState } from "../../contracts/ingredients/interfaces/IIngredientState";
import {
    addCasesFor_addIngredientAsync,
    addCasesFor_editIngredientAsync,
    addCasesFor_getAllIngredientsAsync,
    addCasesFor_getIngredientsPageAsync
} from "./extraReducers";

const initialState: IIngredientState = {
    // getIngredientsAsync
    ingredientsSlice: [],
    ingredientsCount: 0,
    getIngredientsPageStatus: 'idle',

    // getAllIngredientsAsync
    allIngredients: [],
    getAllIngredientsStatus: 'idle',

    // addIngredientAsync
    addIngredientStatus: 'idle',

    // editIngredientAsync
    editIngredientStatus: 'idle',

    // setGridPageSize
    ingredientsGridPageSize: 20,
};

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        setIngredientsGridPageSize: (state, action: PayloadAction<number>) => {
            state.ingredientsGridPageSize = action.payload;
        }
    },
    extraReducers: (builder) => {
        addCasesFor_getIngredientsPageAsync(builder);
        addCasesFor_getAllIngredientsAsync(builder);
        addCasesFor_addIngredientAsync(builder);
        addCasesFor_editIngredientAsync(builder);
    },
});

export const { setIngredientsGridPageSize } = ingredientSlice.actions;

export const selectIngredientGridPageSize = (state: RootState) => state.ingredient.ingredientsGridPageSize;
export const selectIngredientsSlice = (state: RootState) => state.ingredient.ingredientsSlice;
export const selectIngredientsCount = (state: RootState) => state.ingredient.ingredientsCount;
export const selectAllIngredients = (state: RootState) => state.ingredient.allIngredients;

export default ingredientSlice.reducer;
