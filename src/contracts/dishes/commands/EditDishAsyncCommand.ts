import {IngredientForDishDto} from "../dtos/IngredientForDishDto";

export class EditDishAsyncCommand {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public numberOfPersons: number,
        public ingredientsForDish: Array<IngredientForDishDto>,
        public dishPhoto?: File,
        public dishPhotoGuid?: string
    ) {}
}