import {IconButton, MenuItem, Select, Stack, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment } from "react";

export declare interface IngredientForDishProps {
    index: number;
    deleteIngredient: (index: number) => void;
}

const IngredientForDish = (props: IngredientForDishProps) => {

    const handleDeleteIngredient = () => {
        props.deleteIngredient(props.index);
    }

    return (
        /* TODO: Вынести в отдельный компонент и добавлять ингрединеты в список селекторов */
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
                    <Select
                        value={1}
                        //onChange={handleSelectItemPerPageChange}
                        displayEmpty
                        inputProps={{'aria-label': 'Количество элементов'}}
                        style={{width: "100%"}}
                        required
                    >
                        <MenuItem value={1}>Яйцо</MenuItem>
                        <MenuItem value={2}>Бекон</MenuItem>
                        <MenuItem value={3}>Масло</MenuItem>
                    </Select>
                    <TextField
                        type="number"
                        autoFocus
                        margin="dense"
                        id="quantity"
                        label="Количество"
                        // value={props.descriptionIngredient}
                        variant="outlined"
                        fullWidth
                        required
                        // onChange={onChangeIngredientDescription}
                        style={{width: "100%"}}
                    />
                    <Select
                        value={1}
                        //onChange={handleSelectItemPerPageChange}
                        displayEmpty
                        inputProps={{'aria-label': 'Количество элементов'}}
                        style={{width: "100%"}}
                        required
                    >
                        <MenuItem value={1}>Штука</MenuItem>
                        <MenuItem value={2}>Грамм</MenuItem>
                        <MenuItem value={3}>Метр</MenuItem>
                    </Select>
                </Stack>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Description"
                    label="Описание"
                    // value={props.descriptionIngredient}
                    variant="outlined"
                    fullWidth
                    multiline
                    // onChange={onChangeIngredientDescription}
                />
            </div>
        </Stack>
    );
}

export default IngredientForDish;