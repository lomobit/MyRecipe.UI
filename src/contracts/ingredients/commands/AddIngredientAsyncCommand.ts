export class AddIngredientAsyncCommand {
    name: string;
    description?: string;

    constructor(name: string, description?: string) {
        this.name = name;
        this.description = description;
    }
}