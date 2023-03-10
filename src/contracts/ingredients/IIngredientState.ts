import { Ingredient } from "./IngredientDto";

export interface IngredientState {
    ingredientsSlice: Array<Ingredient>;
    ingredientsCount: number;
    ingredientsStatus: 'idle' | 'loading' | 'failed';

    lastAddedIngredientId: number;
    lastAddedIngredientIdStatus: 'idle' | 'loading' | 'failed';
}