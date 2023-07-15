import {IngredientDto} from "../../ingredients/dtos/IngredientDto";

export class IngredientForDishDto {
    quantity: number;
    okeiCode: string;
    condition?: string;
    ingredient?: IngredientDto;

     constructor(
         quantity: number,
         okeiCode: string,
         condition?: string,
         ingredient?: IngredientDto) {
         this.quantity = quantity;
         this.okeiCode = okeiCode;
         this.condition = condition;
         this.ingredient = ingredient;
     }
}