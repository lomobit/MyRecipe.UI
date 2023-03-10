import { Ingredient } from "./IngredientDto";

export class PaginatedItems<T> {
    itemsSlice: Array<T>;
    count: number;

    constructor(itemsSlice: Array<T>, count: number) {
        this.itemsSlice = itemsSlice;
        this.count = count;
    }
}

export interface IngredientState {
    ingredients: PaginatedItems<Ingredient>;
    ingredientsStatus: 'idle' | 'loading' | 'failed';

    lastAddedIngredientId: number;
    lastAddedIngredientIdStatus: 'idle' | 'loading' | 'failed';
}