import { ChangeEvent, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewIngredientAsync, getAllIngredientsAsync, selectIngredientsCount, selectIngredientsSlice, selectItemsPerPage } from './ingredientSlice';
import { columns } from './ingredientConstants';
import NoRowsGridOverlay from '../NoRowsGridOverlay/NoRowsGridOverlay';
import MuiGridPagination from '../MuiGridPagination/MuiGridPagination';

import './Ingredients.css';
import { Ingredient } from '../../contracts/ingredients/IngredientDto';
import { GetAllIngredientsAsyncQuery } from '../../contracts/ingredients/GetAllIngredientsAsyncQuery';



const Ingredients = () => {
    const ingredientsSlice = useAppSelector(selectIngredientsSlice);
    const ingredientsCount = useAppSelector(selectIngredientsCount);
    const itemsPerPage = useAppSelector(selectItemsPerPage);
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
        pageSize: itemsPerPage,
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

    const handleRowSelectionModelChange = (newRowSelectionModel: GridRowSelectionModel) => {
        if (newRowSelectionModel.length > 0) {
            setDisableEditButton(false);
        }
        else {
            setDisableEditButton(true);
        }

        setRowSelectionModel(newRowSelectionModel);
    }

    const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
        setPaginationModel(newPaginationModel);
    }

    const getIngredientsGridHeightByPageSize = () => {
        switch (paginationModel.pageSize) {
            case 10:
                return 454;
            case 20:
                return 814;
            case 30:
                return 1174;
            default:
                return 454;
        }
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
            <div
                className="ingredientsGrid"
                style={{height: getIngredientsGridHeightByPageSize()}}>
                <DataGrid
                    paginationMode="server"
                    rowCount={ingredientsCount}
                    loading={loading}
                    keepNonExistentRowsSelected
                    density='compact'
                    rows={ingredientsSlice}
                    columns={columns}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={handleRowSelectionModelChange}
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationModelChange}
                    disableColumnMenu={true}
                    hideFooterSelectedRowCount={true}
                    slots={{
                        pagination: MuiGridPagination,
                        noRowsOverlay: NoRowsGridOverlay,
                    }}
                />
            </div>
        </div>
    );
}

export default Ingredients;