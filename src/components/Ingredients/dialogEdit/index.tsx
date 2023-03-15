import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { ChangeEvent, useEffect, useState } from 'react';
import { GetIngredientsAsyncQuery } from '../../../contracts/ingredients/GetIngredientsAsyncQuery';
import { IngredientDto } from '../../../contracts/ingredients/IngredientDto';
import { useAppDispatch } from '../../../store/hooks';
import { editIngredientAsync, getIngredientsAsync } from '../../../store/ingredients/thunks';

export declare interface DialogEditIngrediantProps {
    open: boolean;
    pageNumber: number;
    pageSize: number;
    editedIngredientId: number;
    editedIngredientName: string;
    editedIngredientDescription: string;
    setOpen: (open: boolean) => void;
    handleRowSelectionModelChange: (newRowSelectionModel: GridRowSelectionModel) => void;
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
        closeAndClearValidationFieldsInEditButtonDialog();
        clearFieldsInEditButtonDialog();
    };

    const handleEditInEditButtonDialog = async () => {
        if (nameEditedIngredient === undefined || !nameEditedIngredient) {
            setErrorNameEditedIngredient(true);
            setHelperTextNameEditedIngredient("Необходимо ввести имя");

            return;
        }

        closeAndClearValidationFieldsInEditButtonDialog();

        dispatch(editIngredientAsync(new IngredientDto(nameEditedIngredient, descriptionEditedIngredient, props.editedIngredientId)))
            .then(() => dispatch(getIngredientsAsync(new GetIngredientsAsyncQuery(props.pageNumber, props.pageSize))));

        props.handleRowSelectionModelChange([]);
    };

    const closeAndClearValidationFieldsInEditButtonDialog = () => {
        props.setOpen(false);
        setErrorNameEditedIngredient(false);
        setHelperTextNameEditedIngredient("");
    }

    const clearFieldsInEditButtonDialog = () => {
        setNameEditedIngredient(props.editedIngredientName);
        setDescriptionEditedIngredient(props.editedIngredientDescription);
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
