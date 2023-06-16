import {
    Autocomplete,
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    IconButton,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {IngredientForDishDto} from "../../../../contracts/dishes/dtos/IngredientForDishDto";
import {ChangeEvent, SyntheticEvent} from "react";
import {useAppSelector} from "../../../../store/hooks";
import {selectAllIngredients} from "../../../../store/ingredients/reducers";
import {IngredientDto} from "../../../../contracts/ingredients/dtos/IngredientDto";

export declare interface IngredientForDishProps {
    index: number;
    ingredient: IngredientForDishDto;

    deleteIngredientForDish: (index: number) => void;

    changeIngredientId: (index: number, ingredient: IngredientDto) => void;
    changeIngredientQuantity: (index: number, quantity: number) => void;
    changeIngredientOkeiCode: (index: number, okeiCode: string) => void;
    changeIngredientCondition: (index: number, condition: string) => void;
}

const IngredientForDish = (props: IngredientForDishProps) => {

    const allIngredients = useAppSelector(selectAllIngredients);

    const handleDeleteIngredient = () => {
        props.deleteIngredientForDish(props.index);
    }

    const onChangeIngredientName = (
        event: SyntheticEvent<Element, Event>,
        value: string | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<string> | undefined
    ) => {
        debugger;
        let ingredients = allIngredients.filter(x => x.name == value);
        if (ingredients.length > 0) {
            props.changeIngredientId(props.index, ingredients[0]);
        }
    }

    const onChangeIngredientQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeIngredientQuantity(props.index, +event.target.value);
    }

    const onChangeIngredientDescription = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeIngredientCondition(props.index, event.target.value);
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
                        id="combo-box-demo"
                        value={props.ingredient.ingredientName}
                        options={allIngredients.map(x => x.name)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Ингредиент" />}
                        onChange={onChangeIngredientName}
                    />
                    <TextField
                        type="number"
                        autoFocus
                        margin="dense"
                        id="quantity"
                        label="Количество"
                        value={props.ingredient.quantity}
                        variant="outlined"
                        fullWidth
                        required
                        onChange={onChangeIngredientQuantity}
                        style={{width: "100%"}}
                    />
                </Stack>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Condition"
                    label="Состояние"
                    value={props.ingredient.condition}
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