import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllIngredientsAsync, selectIngredients } from './ingredientSlice';
import { columns } from './ingredientConstants';
import NoRowsGridOverlay from '../NoRowsGridOverlay/NoRowsGridOverlay';
import MuiGridPagination from '../MuiGridPagination/MuiGridPagination';

import './Ingredients.css';
import IconButton from '@mui/material/IconButton/IconButton';
import { useState } from 'react';


const Ingredients = () => {
    const ingredients = useAppSelector(selectIngredients);
    const dispatch = useAppDispatch();

    const [openAddDialog, setOpenAddDialog] = useState(false);


    const handleClickAddButton = () => {
        setOpenAddDialog(true);
    };
    
    const handleCancelInAddButtonDialog = () => {
        setOpenAddDialog(false);
    };

    const handleAddInAddButtonDialog = () => {
        setOpenAddDialog(false);
    };

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
                    onClick={() => dispatch(getAllIngredientsAsync(1))}
                    style={{marginLeft: 0}}
                >
                    <UpdateIcon />
                </IconButton>
            </Stack>
            <Dialog open={openAddDialog} onClose={handleCancelInAddButtonDialog}>
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
                        variant="outlined"
                        fullWidth
                        required
                        // error
                        // helperText="Необходимо ввести имя"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Description"
                        label="Описание"
                        variant="outlined"
                        fullWidth
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
                    rows={ingredients.ingredients}
                    columns={columns}
                    disableColumnMenu
                />
            </div>
        </div>
    );
}

export default Ingredients;