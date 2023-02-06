import { Action } from "@reduxjs/toolkit";

const moduleName = "ingredients";

const GET_INGREDIENTS = `${moduleName}/GET_INGREDIENTS`;
const defaultState = {
    ingredients: [],
};

class MyAction implements Action {
    type: any;
    payload: any;

    constructor(type: any, payload: any) {
        this.type = type;
        this.payload = payload;
    }
}

/*
    action = {
        type: "",
        payload: {}
    }
*/
export default (state = defaultState, action: MyAction) => {
    switch (action.type) {
        case GET_INGREDIENTS:
            return { ...state, ingredients: action.payload }
        default:
            return state;
    }
}

export const getIngredients = () => async (dispatch: any) => {
    try {
        await fetch("https://localhost:32770/api/v1/Ingredient/Get?PageNumber=1")
            .then(res => res.json())
            .then(data => dispatch({
                type: GET_INGREDIENTS,
                payload: data.data
            }));
            //.then(data => dispatch(new MyAction(GET_INGREDIENTS, data.data)));
            //.then(data => console.log(data));
    }
    catch (ex) {
        console.log(ex);
    }
}
