import { ChangeEvent, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewIngredientAsync, getAllIngredientsAsync, selectIngredients } from './ingredientSlice';
import { columns } from './ingredientConstants';
import NoRowsGridOverlay from '../NoRowsGridOverlay/NoRowsGridOverlay';
import MuiGridPagination from '../MuiGridPagination/MuiGridPagination';

import './Ingredients.css';
import { Ingredient } from '../../contracts/ingredients/IngredientDto';


const Ingredients = () => {
    const tempVariable = 1;

    const ingredients = useAppSelector(selectIngredients);
    const dispatch = useAppDispatch();

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [nameNewIngredient, setNameNewIngredient] = useState("");
    const [errorNameNewIngredient, setErrorNameNewIngredient] = useState(false);
    const [helperTextNameNewIngredient, setHelperTextNameNewIngredient] = useState("");
    const [descriptionNewIngredient, setDescriptionNewIngredient] = useState("");

    useEffect(() => {
        dispatch(getAllIngredientsAsync(tempVariable));
    }, [])

    const handleClickAddButton = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddButtonDialog = () => {
        setOpenAddDialog(false);
    };

    const closeAndClearFieldsInAddButtonDialog = () => {
        setOpenAddDialog(false);
        setNameNewIngredient("");
        setDescriptionNewIngredient("");
        setErrorNameNewIngredient(false);
        setHelperTextNameNewIngredient("");
    }
    
    const handleCancelInAddButtonDialog = () => {
        closeAndClearFieldsInAddButtonDialog();
    };

    const handleAddInAddButtonDialog = () => {
        if (typeof nameNewIngredient == undefined || !nameNewIngredient) {
            setErrorNameNewIngredient(true);
            setHelperTextNameNewIngredient("Необходимо ввести имя");

            return;
        }

        dispatch(addNewIngredientAsync(new Ingredient(-1, nameNewIngredient, descriptionNewIngredient)))
            .then(() => dispatch(getAllIngredientsAsync(tempVariable)));

        closeAndClearFieldsInAddButtonDialog();
    };

    const changeNewIngredientName = (event: ChangeEvent<HTMLInputElement>) => {
        setNameNewIngredient(event.target.value);
    }

    const changeNewIngredientDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescriptionNewIngredient(event.target.value);
    }

    return (
        <div className="ingredients">
            <h1>Ингредиенты</h1>
            <Stack direction="row-reverse" spacing={1} style={{ borderStyle: 'solid', border: '2px' }}>
                <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    disabled
                >
                    Изменить
                </Button>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleClickAddButton}
                >
                    Добавить
                </Button>
                <IconButton
                    color="primary"
                    onClick={() => dispatch(getAllIngredientsAsync(tempVariable))}
                >
                    <UpdateIcon />
                </IconButton>
            </Stack>
            <Dialog open={openAddDialog} onClose={handleCloseAddButtonDialog}>
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
            <div style={{ marginTop: 20, height: 994, width: '100%' }}>
                <DataGrid
                    pagination
                    pageSize={25}
                    rowsPerPageOptions={[25, 50]}
                    density='compact'
                    components={{
                        NoRowsOverlay: NoRowsGridOverlay,
                        Pagination: MuiGridPagination,
                    }}
                    rows={ingredients}
                    columns={columns}
                    disableColumnMenu
                />
            </div>
        </div>
    );
}

export default Ingredients;