import {IngredientDto} from "../../ingredients/dtos/IngredientDto";
import {OkeiDto} from "../../okei/dtos/OkeiDto";

export class IngredientForDishModel {
    quantity: number;
    condition: string;
    ingredient?: IngredientDto;
    okei?: OkeiDto;
    id?: number;
    quantityError: boolean = false;
    conditionError: boolean = false;
    ingredientError: boolean = false;
    okeiError: boolean = false;

     constructor(
         quantity: number,
         condition: string,
         ingredient?: IngredientDto,
         okei?: OkeiDto,
         id?: number
     ) {
         this.quantity = quantity;
         this.condition = condition;
         this.ingredient = ingredient;
         this.okei = okei;
         this.id = id;
     }
}