import { Ingredient } from "../../contracts/ingredients/IngredientDto";

//'https://localhost:32768/api/v1/Ingredient/Get?PageNumber=1
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

export async function GetAllIngredients(amount = 1) {
    return await fetch(`${apiUri}/${moduleName}/Get?PageNumber=${1}`)
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