import {IngredientDto} from "../../ingredients/dtos/IngredientDto";
import {OkeiDto} from "../../ingredients/dtos/OkeiDto";

export class IngredientForDishModel {
    quantity: number;
    condition: string;
    ingredient?: IngredientDto;
    okei?: OkeiDto;
    quantityError: boolean = false;
    conditionError: boolean = false;
    ingredientError: boolean = false;
    okeiError: boolean = false;

     constructor(
         quantity: number,
         condition: string,
         ingredient?: IngredientDto,
         okei?: OkeiDto) {
         this.quantity = quantity;
         this.condition = condition;
         this.ingredient = ingredient;
         this.okei = okei;
     }
}