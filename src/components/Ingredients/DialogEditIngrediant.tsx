import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { GetIngredientsAsyncQuery } from '../../contracts/ingredients/GetAllIngredientsAsyncQuery';
import { Ingredient } from '../../contracts/ingredients/IngredientDto';
import { editIngredientAsync, getIngredientsAsync } from './ingredientSlice';

export declare interface DialogEditIngrediantProps {
    open: boolean;
    pageNumber: number;
    pageSize: number;
    editedIngredientId: number;
    editedIngredientName: string;
    editedIngredientDescription: string;
    setOpen: (open: boolean) => void;
}

const DialogEditIngredient = (props: DialogEditIngrediantProps) => {
    const dispatch = useAppDispatch();

    const [nameEditedIngredient, setNameEditedIngredient] = useState("");
    const [errorNameEditedIngredient, setErrorNameEditedIngredient] = useState(false);
    const [helperTextNameEditedIngredient, setHelperTextNameEditedIngredient] = useState("");
    const [descriptionEditedIngredient, setDescriptionEditedIngredient] = useState("");

    useEffect(() => {
        setNameEditedIngredient(props.editedIngredientName);
        setDescriptionEditedIngredient(props.editedIngredientDescription);
    }, [props.editedIngredientName, props.editedIngredientDescription]);

    const handleCloseEditButtonDialog = () => {
        props.setOpen(false);
    };

    const handleCancelInEditButtonDialog = () => {
        closeAndClearFieldsInEditButtonDialog();
        setNameEditedIngredient(props.editedIngredientName);
        setDescriptionEditedIngredient(props.editedIngredientDescription);
    };

    const handleEditInEditButtonDialog = () => {
        if (nameEditedIngredient === undefined || !nameEditedIngredient) {
            setErrorNameEditedIngredient(true);
            setHelperTextNameEditedIngredient("Необходимо ввести имя");

            return;
        }

        dispatch(editIngredientAsync(new Ingredient(props.editedIngredientId, nameEditedIngredient, descriptionEditedIngredient)))
            .then(() => dispatch(getIngredientsAsync(new GetIngredientsAsyncQuery(props.pageNumber, props.pageSize))));

        closeAndClearFieldsInEditButtonDialog();
    };

    const closeAndClearFieldsInEditButtonDialog = () => {
        props.setOpen(false);
        setErrorNameEditedIngredient(false);
        setHelperTextNameEditedIngredient("");
    }

    const changeEditedIngredientName = (event: ChangeEvent<HTMLInputElement>) => {
        setNameEditedIngredient(event.target.value);
    }

    const changeEditedIngredientDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescriptionEditedIngredient(event.target.value);
    }

    return (
        <Dialog open={props.open} onClose={handleCloseEditButtonDialog}>
            <DialogTitle>Изменить ингредиент</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Для изменения ингредиента введите данные:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Name"
                    label="Название"
                    value={nameEditedIngredient}
                    variant="outlined"
                    fullWidth
                    required
                    onChange={changeEditedIngredientName}
                    error={errorNameEditedIngredient}
                    helperText={helperTextNameEditedIngredient}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="Description"
                    label="Описание"
                    value={descriptionEditedIngredient}
                    variant="outlined"
                    fullWidth
                    multiline
                    onChange={changeEditedIngredientDescription}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelInEditButtonDialog}>Отмена</Button>
                <Button onClick={handleEditInEditButtonDialog}>Изменить</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogEditIngredient;
