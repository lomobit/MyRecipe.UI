export class IngredientForDishDto {
    ingredientId: number;
    quantity: number;
    okeiCode: string;
    condition?: string;

     constructor(
         ingredientId: number,
         quantity: number,
         okeiCode: string,
         condition?: string) {
         this.ingredientId = ingredientId;
         this.quantity = quantity;
         this.okeiCode = okeiCode;
         this.condition = condition;
     }
}