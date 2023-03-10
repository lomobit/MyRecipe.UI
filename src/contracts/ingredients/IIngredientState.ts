import { Ingredient } from "./IngredientDto";

export class PaginatedItems<T> {
    itemsSlice: Array<T>;
    count: number;

    constructor(count: number, itemsSlice: Array<T>) {
        this.count = count;
        this.itemsSlice = itemsSlice;
    }
}

export interface IngredientState {
    ingredients: PaginatedItems<Ingredient>;
    ingredientsStatus: 'idle' | 'loading' | 'failed';

    lastAddedIngredientId: number;
    lastAddedIngredientIdStatus: 'idle' | 'loading' | 'failed';
}