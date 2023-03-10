import { ChangeEvent, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    LinearProgress,
    Stack,
    TextField
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewIngredientAsync, getAllIngredientsAsync, selectIngredientsCount, selectIngredientsSlice } from './ingredientSlice';
import { columns } from './ingredientConstants';
import NoRowsGridOverlay from '../NoRowsGridOverlay/NoRowsGridOverlay';
import MuiGridPagination from '../MuiGridPagination/MuiGridPagination';

import './Ingredients.css';
import { Ingredient } from '../../contracts/ingredients/IngredientDto';
import { GetAllIngredientsAsyncQuery } from '../../contracts/ingredients/GetAllIngredientsAsyncQuery';



const Ingredients = () => {
    const ingredientsSlice = useAppSelector(selectIngredientsSlice);
    const ingredientsCount = useAppSelector(selectIngredientsCount);
    const dispatch = useAppDispatch();

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [nameNewIngredient, setNameNewIngredient] = useState("");
    const [errorNameNewIngredient, setErrorNameNewIngredient] = useState(false);
    const [helperTextNameNewIngredient, setHelperTextNameNewIngredient] = useState("");
    const [descriptionNewIngredient, setDescriptionNewIngredient] = useState("");
    const [disableEditButton, setDisableEditButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    useEffect(() => {
        let active = true;

        (async () => {
            setLoading(true);
            await dispatch(getAllIngredientsAsync(new GetAllIngredientsAsyncQuery(paginationModel.page + 1, paginationModel.pageSize)));

            if (!active) {
                return;
            }

            setLoading(false);
        })();
    
        return () => {
            active = false;
        };

        ;
    }, [paginationModel])

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
        if (nameNewIngredient == undefined || !nameNewIngredient) {
            setErrorNameNewIngredient(true);
            setHelperTextNameNewIngredient("Необходимо ввести имя");

            return;
        }

        dispatch(addNewIngredientAsync(new Ingredient(-1, nameNewIngredient, descriptionNewIngredient)))
            .then(() => dispatch(getAllIngredientsAsync(new GetAllIngredientsAsyncQuery(paginationModel.page + 1, paginationModel.pageSize))));

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
            <Stack direction="row-reverse" spacing={1}>
                <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    disabled={disableEditButton}
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
            <div style={{ marginTop: 20, height: 300, width: '100%' }}>
                <DataGrid
                    paginationMode="server"
                    pageSizeOptions={[5]}
                    rowCount={ingredientsCount}
                    loading={loading}
                    paginationModel={paginationModel}
                    keepNonExistentRowsSelected
                    density='compact'
                    rows={ingredientsSlice}
                    columns={columns}
                    disableColumnMenu
                    rowSelectionModel={rowSelectionModel}
                    onPaginationModelChange={setPaginationModel}
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                    slots={{
                        pagination: MuiGridPagination,
                        noRowsOverlay: NoRowsGridOverlay,
                        // loadingOverlay: LinearProgress,
                    }}
                />
            </div>
        </div>
    );
}

export default Ingredients;