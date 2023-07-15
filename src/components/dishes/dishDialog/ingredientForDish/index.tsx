import {
    Autocomplete,
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    IconButton,
    Stack,
    TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {ChangeEvent, SyntheticEvent} from "react";
import {useAppSelector} from "../../../../store/hooks";
import {selectAllIngredients} from "../../../../store/ingredients/reducers";
import {IngredientDto} from "../../../../contracts/ingredients/dtos/IngredientDto";
import {selectAllOkeis} from "../../../../store/okeis/reducers";
import {OkeiDto} from "../../../../contracts/ingredients/dtos/OkeiDto";

export declare interface IngredientForDishProps {
    ingredientForDishIndex: number;

    ingredientName: string;
    ingredientQuantity: number;
    ingredientOkeiName: string;
    ingredientCondition?: string;

    deleteIngredientForDish: (index: number) => void;

    changeIngredientId: (index: number, ingredient: IngredientDto) => void;
    changeIngredientQuantity: (index: number, quantity: number) => void;
    changeIngredientOkeiCode: (index: number, okei: OkeiDto) => void;
    changeIngredientCondition: (index: number, condition: string) => void;
}

const IngredientForDish = (props: IngredientForDishProps) => {

    const allIngredients = useAppSelector(selectAllIngredients);
    const allOkeis = useAppSelector(selectAllOkeis);

    const handleDeleteIngredient = () => {
        props.deleteIngredientForDish(props.ingredientForDishIndex);
    }

    const onChangeIngredientName = (
        event: SyntheticEvent<Element, Event>,
        value: string | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<string> | undefined
    ) => {
        let ingredients = allIngredients.filter(x => x.name === value);
        if (ingredients.length > 0) {
            props.changeIngredientId(props.ingredientForDishIndex, ingredients[0]);
        }
    }

    const onChangeIngredientOkei = (
        event: SyntheticEvent<Element, Event>,
        value: string | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<string> | undefined
    ) => {
        let okeis = allOkeis.filter(x => x.name === value);
        if (okeis.length > 0) {
            props.changeIngredientOkeiCode(props.ingredientForDishIndex, okeis[0]);
        }
    }

    const onChangeIngredientQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeIngredientQuantity(props.ingredientForDishIndex, +event.target.value);
    }

    const onChangeIngredientDescription = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeIngredientCondition(props.ingredientForDishIndex, event.target.value);
    }

    return (
        <Stack direction="row" spacing={1} style={{marginTop: 10, marginBottom: 10}}>
            <IconButton
                aria-label="delete"
                color="error"
                onClick={handleDeleteIngredient}
            >
                <DeleteIcon />
            </IconButton>
            <div>
                <Stack direction="row" spacing={1} className="nameFilteringButtons" style={{width: "100%"}}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-ingredients"
                        value={props.ingredientName}
                        options={allIngredients.map(x => x.name)}
                        sx={{ width: 400 }}
                        renderInput={(params) => <TextField {...params} label="Ингредиент" />}
                        onChange={onChangeIngredientName}
                    />
                    <TextField
                        type="number"
                        autoFocus
                        margin="dense"
                        id="quantity"
                        label="Количество"
                        value={props.ingredientQuantity}
                        variant="outlined"
                        fullWidth
                        required
                        onChange={onChangeIngredientQuantity}
                        style={{width: "100%"}}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-okei-codes"
                        value={props.ingredientOkeiName}
                        options={allOkeis.map(x => x.name)}
                        sx={{ width: 400 }}
                        renderInput={(params) => <TextField {...params} label="Единица измерения" />}
                        onChange={onChangeIngredientOkei}
                    />
                </Stack>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Condition"
                    label="Состояние"
                    value={props.ingredientCondition}
                    variant="outlined"
                    fullWidth
                    multiline
                    onChange={onChangeIngredientDescription}
                />
            </div>
        </Stack>
    );
}

export default IngredientForDish;