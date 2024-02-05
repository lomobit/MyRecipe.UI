import './index.css';
import {Fragment} from "react";
import {Autocomplete, Stack, TextField} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';

function Home() {
    return (
        <Fragment>
            <h1>Поиск туров по России</h1>
            <Stack direction="row" spacing={1} className="nameFilteringButtons">
                <Autocomplete
                    id="combo-box-ingredients"
                    value={1}
                    options={[1,2,3]}
                    sx={{ width: 300 }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Куда поедем?"
                            //error={props.ingredientNameError}
                            //helperText={props.ingredientNameError && "Выберите ингредиент"}
                        />}
                    //onChange={onChangeIngredientName}
                />

                <Autocomplete
                    id="combo-box-ingredients"
                    value={1}
                    options={[1,2,3]}
                    sx={{ width: 300 }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Вид отдыха"
                            //error={props.ingredientNameError}
                            //helperText={props.ingredientNameError && "Выберите ингредиент"}
                        />}
                    //onChange={onChangeIngredientName}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                    <DatePicker
                        label={"Даты"}
                        views={['year', 'month', 'day']}
                    />
                </LocalizationProvider>
            </Stack>
        </Fragment>

    );
}

export default Home;