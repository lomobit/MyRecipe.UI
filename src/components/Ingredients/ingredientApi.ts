import { Ingredient } from "../../contracts/ingredients/IngredientDto";

const apiUri = `https://localhost:32768/api/v1`;
const moduleName = "Ingredient";

const checkSuccess = async (res: Response) => {
    let result = res.json();
    if (res.ok) {
        return result;
    }

    let messages = await result;
    throw new Error(`${messages.messages[0].value}`);
}

const showError = async (error: any) => {
    alert(`${error}`);
}

export async function GetAllIngredients(pageNumber: number, pageSize: number) {
    return await fetch(`${apiUri}/${moduleName}/Get?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(checkSuccess)
        .catch(showError);
}

export async function AddNewIngredient(ingredient: Ingredient) {
    let bodyQuery = {
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

    return await fetch(`${apiUri}/${moduleName}/Add`, queryOptions)
        .then(checkSuccess)
        .catch(showError);
}