export class GetAllIngredientsAsyncQuery {
    nameFilter?: string;

    constructor(nameFilter?: string) {
        this.nameFilter = nameFilter;
    }
}