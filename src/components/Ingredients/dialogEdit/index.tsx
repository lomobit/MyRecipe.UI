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

export declare interface DialogEditIngrediantProps {
    open: boolean;
    setOpen: (open: boolean) => void;

    nameIngredient: string;
    setNameIngredient: (name: string) => void;

    descriptionIngredient: string;
    setDescriptionIngredient: (description: string) => void;

    onEditIngredientClick: () => void;
}

const DialogEditIngredient = (props: DialogEditIngrediantProps) => {
    const [isValidationNameError, setIsValidationNameError] = useState(false);
    const [helperTextErrorForName, setHelperTextErrorForName] = useState("");

    const handleCloseDialog = () => {
        props.setOpen(false);
    };

    const handleCancel = () => {
        closeDialogAndDisableValidationError();
        clearFields();
    };

    const handleEdit = async () => {
        if (props.nameIngredient === undefined || !props.nameIngredient) {
            setIsValidationNameError(true);
            setHelperTextErrorForName("Необходимо ввести имя");

            return;
        }

        closeDialogAndDisableValidationError();
        props.onEditIngredientClick();
        clearFields();
    };

    const closeDialogAndDisableValidationError = () => {
        props.setOpen(false);

        setIsValidationNameError(false);
        setHelperTextErrorForName("");
    }

    const clearFields = () => {
        props.setNameIngredient("");
        props.setDescriptionIngredient("");
    }

    const onChangeIngredientName = (event: ChangeEvent<HTMLInputElement>) => {
        props.setNameIngredient(event.target.value);
    }

    const onChangeIngredientDescription = (event: ChangeEvent<HTMLInputElement>) => {
        props.setDescriptionIngredient(event.target.value);
    }

    return (
        <Dialog open={props.open} onClose={handleCloseDialog}>
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
                <Button onClick={handleCancel}>Отмена</Button>
                <Button onClick={handleEdit}>Изменить</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogEditIngredient;
