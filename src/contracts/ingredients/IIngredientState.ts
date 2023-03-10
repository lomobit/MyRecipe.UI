import { Ingredient } from "./IngredientDto";

export interface IngredientState {
    ingredientsSlice: Array<Ingredient>;
    ingredientsCount: number;
    ingredientsItemsPerPage: number;
    getIngredientsStatus: 'idle' | 'loading' | 'failed';

    addIngredientIdStatus: 'idle' | 'loading' | 'failed';
    
    editIngredientIdStatus: 'idle' | 'loading' | 'failed';
}