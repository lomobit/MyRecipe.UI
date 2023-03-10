import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { GetAllIngredientsAsyncQuery } from '../../contracts/ingredients/GetAllIngredientsAsyncQuery';
import { Ingredient } from '../../contracts/ingredients/IngredientDto';
import { addNewIngredientAsync, getAllIngredientsAsync } from './ingredientSlice';

export declare interface DialogAddIngrediantProps {
    open: boolean;
    pageNumber: number;
    pageSize: number;
    setOpen: (open: boolean) => void;
}

const DialogAddIngrediant = (props: DialogAddIngrediantProps) => {
    const dispatch = useAppDispatch();

    const [nameNewIngredient, setNameNewIngredient] = useState("");
    const [errorNameNewIngredient, setErrorNameNewIngredient] = useState(false);
    const [helperTextNameNewIngredient, setHelperTextNameNewIngredient] = useState("");
    const [descriptionNewIngredient, setDescriptionNewIngredient] = useState("");

    const handleCloseAddButtonDialog = () => {
        props.setOpen(false);
    };

    const handleCancelInAddButtonDialog = () => {
        closeAndClearFieldsInAddButtonDialog();
    };

    const handleAddInAddButtonDialog = () => {
        if (nameNewIngredient == undefined || !nameNewIngredient) {
            setErrorNameNewIngredient(true);
            setHelperTextNameNewIngredient("Необходимо ввести имя");

            return;
        }

        dispatch(addNewIngredientAsync(new Ingredient(-1, nameNewIngredient, descriptionNewIngredient)))
            .then(() => dispatch(getAllIngredientsAsync(new GetAllIngredientsAsyncQuery(props.pageNumber, props.pageSize))));

        closeAndClearFieldsInAddButtonDialog();
    };

    const changeNewIngredientName = (event: ChangeEvent<HTMLInputElement>) => {
        setNameNewIngredient(event.target.value);
    }

    const changeNewIngredientDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescriptionNewIngredient(event.target.value);
    }

    const closeAndClearFieldsInAddButtonDialog = () => {
        props.setOpen(false);
        setNameNewIngredient("");
        setDescriptionNewIngredient("");
        setErrorNameNewIngredient(false);
        setHelperTextNameNewIngredient("");
    }

    return (
        <Dialog open={props.open} onClose={handleCloseAddButtonDialog}>
            <DialogTitle>Добавить ингредиент</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Для добавление ингредиента введите данные:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Name"
                    label="Название"
                    value={nameNewIngredient}
                    variant="outlined"
                    fullWidth
                    required
                    onChange={changeNewIngredientName}
                    error={errorNameNewIngredient}
                    helperText={helperTextNameNewIngredient}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="Description"
                    label="Описание"
                    value={descriptionNewIngredient}
                    variant="outlined"
                    fullWidth
                    multiline
                    onChange={changeNewIngredientDescription}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelInAddButtonDialog}>Отмена</Button>
                <Button onClick={handleAddInAddButtonDialog}>Добавить</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogAddIngrediant;
