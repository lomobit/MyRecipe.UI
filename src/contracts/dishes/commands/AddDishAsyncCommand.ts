import {IngredientForDishDto} from "../dtos/IngredientForDishDto";

export class AddDishAsyncCommand {
    name: string;
    description: string;
    numberOfPersons: number;
    ingredientsForDish: Array<IngredientForDishDto>;
    dishPhoto?: File;

    constructor(
        name: string,
        description: string,
        numberOfPerson: number,
        ingredientsForDish: Array<IngredientForDishDto>,
        dishPhoto?: File
    ) {
        this.name = name;
        this.description = description;
        this.numberOfPersons = numberOfPerson;
        this.ingredientsForDish = ingredientsForDish;
        this.dishPhoto = dishPhoto;
    }
}