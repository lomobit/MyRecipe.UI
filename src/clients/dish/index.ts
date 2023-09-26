import {checkSuccess, showError} from "../common";
import {GetDishesPageAsyncQuery} from "../../contracts/dishes/queries/GetDishesPageAsyncQuery";
import {AddDishAsyncCommand} from "../../contracts/dishes/commands/AddDishAsyncCommand";
import {EditDishAsyncCommand} from "../../contracts/dishes/commands/EditDishAsyncCommand";

const apiUri = process.env.REACT_APP_API_URL;
const moduleName = "Dish";

export async function GetDishesPageAsync(query: GetDishesPageAsyncQuery) {
    let uri = `${apiUri}/${moduleName}/GetPage`
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

export async function GetDishById(id: number) {
    let uri = `${apiUri}/${moduleName}/Get/${id}`;

    return await fetch(uri)
        .then(checkSuccess)
        .catch(showError);
}

export async function AddDishAsync(command: AddDishAsyncCommand) {
    let bodyQuery: FormData = new FormData();

    bodyQuery.append("name", command.name);
    bodyQuery.append("description", command.description);
    bodyQuery.append("numberOfPersons", command.numberOfPersons.toString());
    bodyQuery.append("dishPhoto", command.dishPhoto as Blob);

    for (let i = 0; i < command.ingredientsForDish.length; i++) {
        bodyQuery.append(`ingredientsForDish[${i}].ingredientId`, command.ingredientsForDish[i].ingredientId.toString());
        bodyQuery.append(`ingredientsForDish[${i}].quantity`, command.ingredientsForDish[i].quantity.toString());
        bodyQuery.append(`ingredientsForDish[${i}].okeiCode`, command.ingredientsForDish[i].okeiCode);
        bodyQuery.append(`ingredientsForDish[${i}].condition`, command.ingredientsForDish[i].condition);
    }

    let queryOptions = {
        method: 'POST',
        body: bodyQuery,
    };

    return await fetch(`${apiUri}/${moduleName}/Add`, queryOptions)
        .then(checkSuccess)
        .catch(showError);
}

export async function EditDishAsync(command: EditDishAsyncCommand) {
    let bodyQuery: FormData = new FormData();

    bodyQuery.append("id", command.id.toString());
    bodyQuery.append("name", command.name);
    bodyQuery.append("description", command.description);
    bodyQuery.append("numberOfPersons", command.numberOfPersons.toString());
    bodyQuery.append("dishPhoto", command.dishPhoto as Blob);

    for (let i = 0; i < command.ingredientsForDish.length; i++) {
        if (command.ingredientsForDish[i].id !== undefined) {
            bodyQuery.append(`ingredientsForDish[${i}].id`, command.ingredientsForDish[i].id!.toString());
        }

        bodyQuery.append(`ingredientsForDish[${i}].ingredientId`, command.ingredientsForDish[i].ingredientId.toString());
        bodyQuery.append(`ingredientsForDish[${i}].quantity`, command.ingredientsForDish[i].quantity.toString());
        bodyQuery.append(`ingredientsForDish[${i}].okeiCode`, command.ingredientsForDish[i].okeiCode);
        bodyQuery.append(`ingredientsForDish[${i}].condition`, command.ingredientsForDish[i].condition);
    }

    let queryOptions = {
        method: 'POST',
        body: bodyQuery,
    };

    return await fetch(`${apiUri}/${moduleName}/Edit`, queryOptions)
        .then(checkSuccess)
        .catch(showError);
}