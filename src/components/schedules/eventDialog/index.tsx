import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    DialogActions,
    DialogContentText,
    Stack
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import {Fragment} from "react";
import AddIcon from "@mui/icons-material/Add";

export declare interface EventsDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;

    onSave: () => void;

    eventId?: number;
    eventName?: string;
}

// TODO: Посмотреть в сторону @preact (https://preactjs.com/guide/v10/getting-started) для оптимизации ререндера компонентов
//   Использовать вместо useState()
//   Пример использования: https://youtu.be/SO8lBVWF2Y8?si=IKGKMM5ez4z43SVG
const EventsDialog = (props: EventsDialogProps) => {
    return (
        <Dialog
            open={props.openDialog}
            onClose={() => props.setOpenDialog(false)}
            //fullWidth={true}
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
                <TextField
                    autoFocus
                    margin="dense"
                    id="Description"
                    label="Описание"
                    //value={}
                    variant="outlined"
                    fullWidth
                    //onChange={onChangeDishName}
                    //error={isDishNameValidationError}
                    //helperText={isDishNameValidationError && "Не заполнено название блюда"}
                />

                <div
                    style={{marginTop: 10}}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                        <DatePicker
                            label={"Дата начала *"}
                            views={['year', 'month', 'day']}
                        />

                        <DatePicker
                            label={"Дата окончания *"}
                            views={['year', 'month', 'day']}
                        />
                    </LocalizationProvider>
                </div>

                <DialogContentText
                    style={{
                        marginTop: 30,
                        marginBottom: 10,
                        color: /*isDishIngredientsValidationError ? "#d32f2f" : */"rgba(0, 0, 0, 0.6)"
                    }}
                >
                    Приёмы пищи: *
                </DialogContentText>

                <Fragment>

                </Fragment>

                <Stack direction="row-reverse">
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        //onClick={handleAddIngrediantForDish}
                        //color={isDishIngredientsValidationError ? "error" : "primary"}
                    >
                        Добавить приём пищи
                    </Button>
                </Stack>
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