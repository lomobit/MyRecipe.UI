//'https://localhost:32768/api/v1/Ingredient/Get?PageNumber=1
const apiUri = `https://localhost:32768/api/v1`;
const moduleName = "Ingredient";

export async function GetAllIngredients(amount = 1) {
  return await fetch(`${apiUri}/${moduleName}/Get?PageNumber=${1}`)
    .then(res => res.json());
}