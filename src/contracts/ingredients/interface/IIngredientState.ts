import { IngredientDto } from "../IngredientDto";

export interface IIngredientState {
    ingredientsSlice: Array<IngredientDto>;
    ingredientsCount: number;
    getIngredientsStatus: 'idle' | 'loading' | 'failed';

    addIngredientIdStatus: 'idle' | 'loading' | 'failed';
    
    editIngredientIdStatus: 'idle' | 'loading' | 'failed';

    gridPageSize: number;
}