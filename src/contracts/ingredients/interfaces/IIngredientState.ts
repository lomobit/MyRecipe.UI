import { IngredientDto } from "../dtos/IngredientDto";

export interface IIngredientState {
    ingredientsSlice: Array<IngredientDto>;
    ingredientsCount: number;
    getIngredientsPageStatus: 'idle' | 'loading' | 'failed';

    allIngredients: Array<IngredientDto>;
    getAllIngredientsStatus: 'idle' | 'loading' | 'failed';

    addIngredientStatus: 'idle' | 'loading' | 'failed';
    
    editIngredientStatus: 'idle' | 'loading' | 'failed';

    ingredientsGridPageSize: number;
}