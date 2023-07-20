import { IngredientDto } from "../dtos/IngredientDto";

export interface IIngredientState {
    ingredientsSlice: Array<IngredientDto>;
    ingredientsCount: number;
    getIngredientsPageStatus: 'idle' | 'loading' | 'failed';

    allIngredients: Array<IngredientDto>;
    getAllIngredientsStatus: 'idle' | 'loading' | 'failed';

    addIngredientIdStatus: 'idle' | 'loading' | 'failed';
    
    editIngredientIdStatus: 'idle' | 'loading' | 'failed';

    gridPageSize: number;
}