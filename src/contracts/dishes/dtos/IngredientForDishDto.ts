export class IngredientForDishDto {
    ingredientId: number;
    quantity: number;
    ingredientName: string;
    okeiCode: string;
    condition?: string;

     constructor(
         ingredientId: number,
         quantity: number,
         ingredientName: string,
         okeiCode: string,
         condition?: string) {
         this.ingredientId = ingredientId;
         this.quantity = quantity;
         this.ingredientName = ingredientName;
         this.okeiCode = okeiCode;
         this.condition = condition;
     }
}