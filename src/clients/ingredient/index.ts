import { IngredientDto } from "../../contracts/ingredients/dtos/IngredientDto";
import {GetIngredientsAsyncQuery} from "../../contracts/ingredients/queries/GetIngredientsAsyncQuery";
import {GetAllIngredientsAsyncQuery} from "../../contracts/ingredients/queries/GetAllIngredientsAsyncQuery";
import {
    AddIngredientAsyncCommand
} from "../../contracts/ingredients/commands/AddIngredientAsyncCommand";
import {checkSuccess, showError} from "../common";

const apiUri = process.env.REACT_APP_API_URL;
const moduleName = "Ingredient";

export async function GetIngredients(query: GetIngredientsAsyncQuery) {
    let uri = `${apiUri}/${moduleName}/Get`
        + `?PageNumber=${query.pageNumber}`
        + `&PageSize=${query.pageSize}`
        + `&SortingOrder=${query.sortingOrder}`
        + `&SortingField=${query.sortingField}`;

    if (query.nameFilter !== undefined && query.nameFilter !== "") {
        uri += `&NameFilter=${query.nameFilter}`;
    }

    return await fetch(uri)
        .then(checkSuccess)
        .catch(showError);
}

export async function GetAllIngredients(query: GetAllIngredientsAsyncQuery) {
    let uri = `${apiUri}/${moduleName}/GetAll`;

    if (query.nameFilter !== undefined && query.nameFilter !== "") {
        uri += `?NameFilter=${query.nameFilter}`;
    }

    return await fetch(uri)
        .then(checkSuccess)
        .catch(showError);
}

export async function AddIngredient(command: AddIngredientAsyncCommand) {
    let bodyQuery = {
        name: command.name,
        description: command.description,
    };

    let queryOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyQuery),
    };

    return await fetch(`${apiUri}/${moduleName}/Add`, queryOptions)
        .then(checkSuccess)
        .catch(showError);
}

export async function EditIngredient(ingredient: IngredientDto) {
    let bodyQuery = {
        id: ingredient.id,
        name: ingredient.name,
        description: ingredient.description,
    };

    let queryOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyQuery),
    };

    return await fetch(`${apiUri}/${moduleName}/Edit`, queryOptions)
        .then(checkSuccess)
        .catch(showError);
}