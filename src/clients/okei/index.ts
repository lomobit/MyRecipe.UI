import {checkSuccess, showError} from "../common";

const apiUri = process.env.REACT_APP_API_URL;
const moduleName = "Okei";

export async function GetAllOkeis() {
    let uri = `${apiUri}/${moduleName}/GetAll`;

    return await fetch(uri)
        .then(checkSuccess)
        .catch(showError);
}