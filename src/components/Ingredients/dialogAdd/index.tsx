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
import { GetIngredientsAsyncQuery } from '../../../contracts/ingredients/GetIngredientsAsyncQuery';
import { IngredientDto } from '../../../contracts/ingredients/IngredientDto';
import { useAppDispatch } from '../../../store/hooks';
import { addIngredientAsync, getIngredientsAsync } from '../../../store/ingredients/thunks';

export declare interface DialogAddIngrediantProps {
    open: boolean;
    pageNumber: number;
    pageSize: number;
    setOpen: (open: boolean) => void;
}

const DialogAddIngredient = (props: DialogAddIngrediantProps) => {
    const dispatch = useAppDispatch();

    const [nameNewIngredient, setNameNewIngredient] = useState("");
    const [errorNameNewIngredient, setErrorNameNewIngredient] = useState(false);
    const [helperTextNameNewIngredient, setHelperTextNameNewIngredient] = useState("");
    const [descriptionNewIngredient, setDescriptionNewIngredient] = useState("");

    const handleCloseAddButtonDialog = () => {
        props.setOpen(false);
    };

    const handleCancelInAddButtonDialog = () => {
        closeAndClearValidationFieldsInAddButtonDialog();
        clearFieldsInAddButtonDialog();
    };

    const handleAddInAddButtonDialog = () => {
        if (nameNewIngredient === undefined || !nameNewIngredient) {
            setErrorNameNewIngredient(true);
            setHelperTextNameNewIngredient("Необходимо ввести имя");

            return;
        }

        closeAndClearValidationFieldsInAddButtonDialog();

        dispatch(addIngredientAsync(new IngredientDto(-1, nameNewIngredient, descriptionNewIngredient)))
            .then(() => dispatch(getIngredientsAsync(new GetIngredientsAsyncQuery(props.pageNumber, props.pageSize))));

        clearFieldsInAddButtonDialog();
    };

    const changeNewIngredientName = (event: ChangeEvent<HTMLInputElement>) => {
        setNameNewIngredient(event.target.value);
    }

    const changeNewIngredientDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescriptionNewIngredient(event.target.value);
    }

    const closeAndClearValidationFieldsInAddButtonDialog = () => {
        props.setOpen(false);
        setErrorNameNewIngredient(false);
        setHelperTextNameNewIngredient("");
    }

    const clearFieldsInAddButtonDialog = () => {
        setNameNewIngredient("");
        setDescriptionNewIngredient("");
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

export default DialogAddIngredient;
