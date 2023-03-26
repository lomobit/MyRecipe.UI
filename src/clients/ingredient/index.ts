import { IngredientDto } from "../../contracts/ingredients/IngredientDto";

const apiUri = process.env.REACT_APP_API_URL;
const moduleName = "Ingredient";

const checkSuccess = async (res: Response) => {
    let result = res.json();
    if (res.ok) {
        return result;
    }

    let errorResult = await result;
    throw new Error(`${errorResult.messages[0].value}`);
}

const showError = async (error: any) => {
    alert(`${error}`);
}

export async function GetIngredients(pageNumber: number, pageSize: number) {
    return await fetch(`${apiUri}/${moduleName}/Get?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(checkSuccess)
        .catch(showError);
}

export async function AddIngredient(ingredient: IngredientDto) {
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