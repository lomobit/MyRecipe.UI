import {Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions} from "@mui/material";

export declare interface EventsDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;

    onSave: () => void;

    eventId?: number;
    eventName?: string;
}

// TODO: Посмотреть в сторону @preact (https://preactjs.com/guide/v10/getting-started) для оптимизации ререндера компонентов
//   Пример использования: https://youtu.be/SO8lBVWF2Y8?si=IKGKMM5ez4z43SVG
const EventsDialog = (props: EventsDialogProps) => {
    return (
        <Dialog
            open={props.openDialog}
            onClose={() => props.setOpenDialog(false)}
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle>
                {props.eventName === undefined ? 'Добавить событие' : `Изменить событие "${props.eventName}"`}
            </DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Name"
                    label="Название"
                    value={props.eventName}
                    variant="outlined"
                    fullWidth
                    required
                    //onChange={onChangeDishName}
                    //error={isDishNameValidationError}
                    //helperText={isDishNameValidationError && "Не заполнено название блюда"}
                />
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={() => props.setOpenDialog(false)}
                >
                    Отмена
                </Button>
                <Button
                    variant="contained"
                    onClick={() => props.setOpenDialog(false)}
                >
                    {props.eventName === undefined ? 'Добавить' : 'Изменить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EventsDialog;