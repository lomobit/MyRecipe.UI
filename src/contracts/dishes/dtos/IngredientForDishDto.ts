
export class IngredientForDishDto {
    constructor(
        public ingredientId: number,
        public quantity: number,
        public okeiCode: string,
        public condition: string,
        public id?: number
    ) {
    }
}