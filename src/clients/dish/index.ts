import {checkSuccess, showError} from "../common";
import {GetDishesPageAsyncQuery} from "../../contracts/ingredients/queries/GetDishesPageAsyncQuery";

const apiUri = process.env.REACT_APP_API_URL;
const moduleName = "Dish";

export async function GetDishesPage(query: GetDishesPageAsyncQuery) {
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