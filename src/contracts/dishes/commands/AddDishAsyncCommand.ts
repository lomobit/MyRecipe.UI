import {IngredientForDishDto} from "../dtos/IngredientForDishDto";

export class AddDishAsyncCommand {
    constructor(
        public name: string,
        public description: string,
        public numberOfPersons: number,
        public ingredientsForDish: Array<IngredientForDishDto>,
        public dishPhoto?: File
    ) {
    }
}