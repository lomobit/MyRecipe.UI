import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IIngredientState } from "../../contracts/ingredients/interface/IIngredientState";
import { addCasesFor_addIngredientAsync, addCasesFor_editIngredientAsync, addCasesFor_getIngredientsAsync } from "./extraReducers";

const initialState: IIngredientState = {
    // getIngredientsAsync
    ingredientsSlice: [],
    ingredientsCount: 0,
    ingredientsItemsPerPage: 10,
    getIngredientsStatus: 'idle',

    // addIngredientAsync
    addIngredientIdStatus: 'idle',

    // editIngredientAsync
    editIngredientIdStatus: 'idle',
};

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.ingredientsItemsPerPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        addCasesFor_getIngredientsAsync(builder);
        addCasesFor_addIngredientAsync(builder);
        addCasesFor_editIngredientAsync(builder);
    },
});


export const { setItemsPerPage } = ingredientSlice.actions;

export const selectIngredientsSlice = (state: RootState) => state.ingredient.ingredientsSlice;
export const selectIngredientsCount = (state: RootState) => state.ingredient.ingredientsCount;
export const selectItemsPerPage = (state: RootState) => state.ingredient.ingredientsItemsPerPage;

export default ingredientSlice.reducer;
