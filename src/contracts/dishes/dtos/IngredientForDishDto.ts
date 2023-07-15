import {IngredientDto} from "../../ingredients/dtos/IngredientDto";
import {OkeiDto} from "../../ingredients/dtos/OkeiDto";

export class IngredientForDishDto {
    quantity: number;
    condition?: string;
    ingredient?: IngredientDto;
    okei?: OkeiDto;

     constructor(
         quantity: number,
         condition?: string,
         ingredient?: IngredientDto,
         okei?: OkeiDto) {
         this.quantity = quantity;
         this.condition = condition;
         this.ingredient = ingredient;
         this.okei = okei;
     }
}