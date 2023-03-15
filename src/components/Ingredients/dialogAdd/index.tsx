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

export declare interface DialogAddIngrediantProps {
    open: boolean;
    setOpen: (open: boolean) => void;

    nameIngredient: string;
    setNameIngredient: (name: string) => void;

    descriptionIngredient: string;
    setDescriptionIngredient: (description: string) => void;

    onAddIngredientClick: () => void;
}

const DialogAddIngredient = (props: DialogAddIngrediantProps) => {
    const [isValidationNameError, setIsValidationNameError] = useState(false);
    const [helperTextErrorForName, setHelperTextErrorForName] = useState("");

    const handleCloseAddButtonDialog = () => {
        props.setOpen(false);
    };

    const handleCancelButtonClick = () => {
        closeAndClearValidationFieldsInAddButtonDialog();
        clearFieldsInAddButtonDialog();
    };

    const handleAddButtonClick = () => {
        if (props.nameIngredient === undefined || !props.nameIngredient) {
            setIsValidationNameError(true);
            setHelperTextErrorForName("Необходимо ввести имя");

            return;
        }

        closeAndClearValidationFieldsInAddButtonDialog();
        props.onAddIngredientClick();
        clearFieldsInAddButtonDialog();
    };

    const onChangeIngredientName = (event: ChangeEvent<HTMLInputElement>) => {
        props.setNameIngredient(event.target.value);
    }

    const onChangeIngredientDescription = (event: ChangeEvent<HTMLInputElement>) => {
        props.setDescriptionIngredient(event.target.value);
    }

    const closeAndClearValidationFieldsInAddButtonDialog = () => {
        props.setOpen(false);
        setIsValidationNameError(false);
        setHelperTextErrorForName("");
    }

    const clearFieldsInAddButtonDialog = () => {
        props.setNameIngredient("");
        props.setDescriptionIngredient("");
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
                    value={props.nameIngredient}
                    variant="outlined"
                    fullWidth
                    required
                    onChange={onChangeIngredientName}
                    error={isValidationNameError}
                    helperText={helperTextErrorForName}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="Description"
                    label="Описание"
                    value={props.descriptionIngredient}
                    variant="outlined"
                    fullWidth
                    multiline
                    onChange={onChangeIngredientDescription}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelButtonClick}>Отмена</Button>
                <Button onClick={handleAddButtonClick}>Добавить</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogAddIngredient;
