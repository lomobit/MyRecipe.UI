import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    DialogActions,
    DialogContentText,
    Stack, IconButton
} from "@mui/material";
import { Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import {Fragment} from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export declare interface EventsDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;

    onSave: () => void;

    eventId?: number;
    eventName?: string;
}

const mealtypes = [
    {
        title: "Завтрак",
        value: 1
    },
    {
        title: "Обед",
        value: 2
    },
    {
        title: "Полдник",
        value: 3
    },
    {
        title: "Ужин",
        value: 4
    }
];

const dishes = [
    {
        title: "Солянка",
        id: 1
    },
    {
        title: "Чахиртма",
        id: 2
    },
    {
        title: "Шашлык",
        id: 3
    },
    {
        title: "Хот-доги",
        id: 4
    },
    {
        title: "Нарезанный арбуз",
        id: 5
    },
    {
        title: "Пельмени",
        id: 6
    },
    {
        title: "Яичница",
        id: 7
    }
];

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
                        <Stack direction="row" spacing={1}>
                            <DatePicker
                                label={"Дата начала *"}
                                views={['year', 'month', 'day']}
                            />

                            <DatePicker
                                label={"Дата окончания *"}
                                views={['year', 'month', 'day']}
                            />
                        </Stack>
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

                <Stack direction="row" spacing={1} style={{marginTop: 10, marginBottom: 10, width: 525}}>
                    <IconButton
                        aria-label="delete"
                        color="primary"
                        //onClick={handleDeleteIngredient}
                    >
                        <DeleteIcon />
                    </IconButton>

                    <div style={{width: "100%"}}>
                        <Stack direction="row" spacing={1} style={{marginBottom: "10px"}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                                <DatePicker
                                    label={"Дата приема пищи *"}
                                    views={['year', 'month', 'day']}
                                />
                            </LocalizationProvider>

                            <Autocomplete
                                id="combo-box-mealtypes"
                                style={{width: "50%"}}
                                //fullWidth={true}
                                //value={props.ingredientOkeiName}
                                options={mealtypes.map(x => x.title)}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Тип приёма пищи *"
                                        //error={props.ingredientOkeiNameError}
                                        //helperText={props.ingredientOkeiNameError && "Выберите единицу измерения"}
                                    />}
                                //onChange={onChangeIngredientOkei}
                            />
                        </Stack>

                        <Autocomplete
                            multiple
                            fullWidth={true}
                            id="tags-outlined"
                            options={dishes}
                            getOptionLabel={(option) => option.title}
                            //defaultValue={undefined}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Блюда *"
                                    placeholder="Блюда"
                                />
                            )}
                        />
                    </div>
                </Stack>

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