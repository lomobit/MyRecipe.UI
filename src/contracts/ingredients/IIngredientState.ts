import { Ingredient } from "./IngredientDto";

export interface IngredientState {
    ingredients: Array<Ingredient>;
    ingredientsStatus: 'idle' | 'loading' | 'failed';

    lastAddedIngredientId: number;
    lastAddedIngredientIdStatus: 'idle' | 'loading' | 'failed';
}